/***
 * State
 * Classe responsavel por manipular estados dos controladores.
 */

export class State {
  constructor(_BASE_KEY) {
    this.storage = window.sessionStorage;
    this._STATE_K = "_STATE_" + _BASE_KEY;

    if (this.storage.getItem(this._STATE_K) === null) {
      this.storage.setItem(this._STATE_K, JSON.stringify({}));
    }
  }

  get state() {
    return JSON.parse(this.storage.getItem(this._STATE_K));
  }

  set state(state) {
    if (typeof index === "object") {
      this.storage.setItem(this._STATE_K, JSON.stringify(state));
    }
  }

  /***
   * store
   * Guarda um estado key com valor no storage.
   */

  store(key, value) {
    let state = this.state;
    state[key] = value;
    this.state = state;
  }

  /***
   * load
   * Carrega um estado key do storage.
   */

  load(key) {
    return this.state[key];
  }

  /***
   * exists
   * Verifica se um estado key existe.
   */

  exists(key) {
    return this.state[key] !== undefined;
  }
}
