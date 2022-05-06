import { State } from "../states/state.js";

/***
 * BaseController
 * Classe responsavel por processar os eventos do sistema
 * e atualizar os views(paginas).
 */

export class BaseController {
  constructor(_BASE_KEY) {
    this.state = new State(_BASE_KEY);
  }

  onInitialize() {}

  actions() {
    return {};
  }
}

/***
 * initializeController
 */

export function initializeController(controller) {
  window.controller = {};

  document.addEventListener("DOMContentLoaded", function () {
    controller.onInitialize();

    const actions = controller.actions();
    Object.keys(actions).forEach((k, v) => {
      window.controller[k] = actions[k].bind(controller);
    });
  });
}
