import { State } from "./state.js";
import { Component } from "./component.js";
import { renderElementTree } from './template.js';
import { processWindowSearch } from './query_params.js';

import { redirect_flag } from '../helpers/routes.js';

const _APP_KEY = "application";

const _ACTION_DIR = '@action:';
const _STATE_DIR = '@state:';

const TYPE_STATE = 0;
const TYPE_ACTION = 1;
const TYPE_VALUE = 2;

/***
 * currentController
 */

export let currentController;

/***
 * Funções auxiliares
 */

const isDirective = (str) => str.charAt(0) === '@';

const accessMember = (obj, stack) => {
  if (typeof obj === 'object') {
    if (stack.length === 1) {
      return obj[stack[0]];
    }
    const memberKey = stack.shift();
    return accessMember(obj[memberKey], stack);
  }
};

/***
 * Controller
 * Classe responsavel por processar os eventos do sistema
 * e atualizar os views(paginas).
 */

export class Controller {
  constructor(state) {
    this.__appState = new State(_APP_KEY);

    this.onInitialize = this.onInitialize?.bind(this);
    this.buildComponentDatabase = this.buildComponentDatabase?.bind(this);
    this.registerComponent = this.registerComponent?.bind(this);
    
    this.params = processWindowSearch();
    
    this.actions = this.actions?.bind(this);
    
    this.getState = this.getState?.bind(this);
    this.setState = this.setState?.bind(this);
    
    this.__state = state || {};
    this.__components = {};
    this.__cachedComponents = [];
  }

  get state() { return JSON.parse(JSON.stringify(this.__state)); }
  set state(newState) { this.__state = JSON.parse(JSON.stringify(newState)); }

  get appState() { return this.__appState; }

  getState(key) {
    return this.state[key];
  }

  setState(newState) {
    if (typeof newState === 'function')
    {
      this.__state = {...this.__state, ...newState(this.state)};
    }
    else
    {
      this.__state = { ...this.__state, ...newState };
    }

    this.__cachedComponents.forEach((item) => {
      const updatedProps = {};

      // Monta as props atualizadas a partir das dependencias.
      Object.keys(item.dependencies).forEach((depKey) => {
        updatedProps[item.dependencies[depKey]] = this.__state[depKey];
      });

      // Atualiza props.
      item.component.updateProps(updatedProps);

      item.component.__state = item.component.__updated_state;
      item.component.onDidUpdate?.();
      item.component.__state = item.component.__updated_state;

      // Atualiza arvore virtual.
      if (!redirect_flag)
      {
        renderElementTree(
          item.component.__children,
          item.component.render()
        );
      }
    });
  }

  registerComponent(componentId, component) {
    if (this.__components[componentId])
    {
      throw new Error(`Failed to register component '${componentId}'`);
    }
    this.__components[componentId] = component;
  }
}

/***
 * evaluateParameters
 */

function evaluateParameters(controller, parameters) {
  const evaluatedParameters = [];
  Object.keys(parameters).forEach((key) => {
    if (key === 'component') {
      return;
    }

    const value = parameters[key];
    if (isDirective(value)) {
      if (value.substring(0, _STATE_DIR.length) === _STATE_DIR) {
        const stateKey = value.substring(_STATE_DIR.length, value.length);
        const accessSubElements = stateKey.split('.');

        evaluatedParameters[key] = {
          type: TYPE_STATE,
          name: stateKey,
          value: accessMember(controller.state, accessSubElements),
        };
        return;
      }

      if (value.substring(0, _ACTION_DIR.length) === _ACTION_DIR) {
        const actionKey = value.substring(_ACTION_DIR.length, value.length);
        evaluatedParameters[key] = {
          type: TYPE_ACTION,
          value: window.controller[actionKey],
        }
        return;
      }
    }

    evaluatedParameters[key] = { 
      type: TYPE_VALUE,
      value: parameters[key],
    };
  });

  return evaluatedParameters;
}

/***
 * initializeController
 */

 export function initializeController(controller) {
  window.controller = {};

  document.addEventListener("DOMContentLoaded", function () {
    const actions = controller.actions?.();

    // Criar no objeto controlle em window, todas as actions do controlador.
    if (actions !== undefined && actions !== null) {
      Object.keys(actions).forEach((k, v) => {
        window.controller[k] = actions[k].bind(controller);
      });
    }

    currentController = controller;
    currentController?.onInitialize?.();
    currentController?.buildComponentDatabase?.();

    const componentsToRender = document.querySelectorAll('[data-component]');
    componentsToRender.forEach((component) => {
      const componentClass = controller.__components[component.dataset['component']];

      if (componentClass !== undefined && componentClass !== null) {
        const evaluatedParameters = evaluateParameters(controller, { ...component.dataset });
        
        const props = {};
        Object.keys(evaluatedParameters).forEach((key) => {
          props[key] = evaluatedParameters[key].value;
        });

        const obj = new componentClass(props);
        obj.onInitialize?.();

        const dependencies = {};
        Object.keys(evaluatedParameters).forEach((key) => {
          if (evaluatedParameters[key].type === TYPE_STATE) {
            dependencies[evaluatedParameters[key].name] = key;
          }
        });

        obj.buildComponentDatabase?.();

        currentController.__cachedComponents.push({ component: obj, dependencies });

        if (obj instanceof Component) {
          if (!redirect_flag)
          {
            obj.__children = obj.render();
            obj.__element = renderElementTree(obj.__children);
            component.replaceChildren(obj.__element);
          }
        }
      }
    });
  });
}
