import { currentController } from './controller.js';
import { renderElementTree } from './template.js';

/***
 * Component
 * Classe base para a criação de componente. É reponsavel
 * por gerenciar o estado, eventos do componente e inclui funções
 * auxiliares para o processamento do framework de componentes.
 */

export class Component {
  constructor(props) {
    if (currentController === undefined || currentController === null) {
      throw new Error('Failed to create component: must have a controller');
    }

    this.__ctrl = {
      state:    currentController?.state,
      setState: currentController?.setState,
      actions:  currentController?.actions,
      appState: currentController?.appState,
    };

    this.__children = null;
    this.__props = props;
            
    this.updateProps = (newProps) => {
      this.__props = {...this.__props, ...newProps};
    };

    this.checkUpdate = (oldState, newState) => {
      return (
        this.needUpdate
          ? this.needUpdate(oldState, newState)
          : true
      );
    };

    this.setState = (newState) => {
      let updatedState;
      if (typeof newState === 'function')
      {
        updatedState = {...this.__state, ...newState(this.state)};
      }
      else
      {
        updatedState = { ...this.__state, ...newState };
      }
      
      if (this.checkUpdate(this.__state, updatedState)) {
        this.state = updatedState;
        renderElementTree(this.__children, this.render?.());
      }
    };

    this.render = this.render?.bind(this);
    this.registerComponent = this.registerComponent?.bind(this);
    this.buildComponentDatabase = this.buildComponentDatabase?.bind(this);
  }

  get state() { return JSON.parse(JSON.stringify(this.__state)); }  
  set state(newState) { this.__state = JSON.parse(JSON.stringify(newState)); }

  get props() { return this.__props; }
  set props(newProps) { this.__props = newProps; }

  get ctrl() { return this.__ctrl; }

  registerComponent(componentId, component)
  {
    if (currentController)
    {
      currentController.registerComponent(componentId, component);
    }
  }
}