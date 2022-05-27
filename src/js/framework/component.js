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
      params: currentController?.params,
    };

    this.__children = null;
    this.__props = props;
    this.__render_prom = null;
    this.__updated_state = null;

    // JSON.parse(JSON.stringify(this.__state))
            
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
      if (typeof newState === 'function')
      {
        this.__updated_state = {...this.__state, ...newState(this.state)};
      }
      else
      {
        this.__updated_state = { ...this.__state, ...newState };
      }

      if (!this.__render_prom)
      {
        this.__render_prom = new Promise((accept) => {
          setTimeout(() => {
            accept()
          }, 0);
        });

        // Renderiza componente.
        this.__render_prom.then(() => {
          if (this.checkUpdate(this.__state, this.__updated_state)) {
            this.__state = JSON.parse(JSON.stringify(this.__updated_state));
            this.onDidUpdate?.();
            this.__state = JSON.parse(JSON.stringify(this.__updated_state));
            renderElementTree(this.__children, this.render?.());
          }
        });

        // Limpa promise de renderização.
        this.__render_prom.then(() => {
          this.__render_prom = null;
        });
      }
    };

    this.onInitialize = this.onInitialize?.bind(this);
    this.onDidUpdate = this.onDidUpdate?.bind(this);
    this.render = this.render?.bind(this);
    this.registerComponent = this.registerComponent?.bind(this);
    this.buildComponentDatabase = this.buildComponentDatabase?.bind(this);
  }

  get state() { return this.__state; }
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