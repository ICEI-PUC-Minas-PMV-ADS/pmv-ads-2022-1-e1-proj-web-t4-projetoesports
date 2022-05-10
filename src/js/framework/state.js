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

  /***
   * store
   * Guarda um estado key com valor no storage.
   */

  store(key, value) {
    if (typeof value === "object") {
      const state = JSON.parse(this.storage.getItem(this._STATE_K));
      state[key] = value;
      this.storage.setItem(this._STATE_K, JSON.stringify({ ...state }));
    }
  }

  /***
   * load
   * Carrega um estado key do storage.
   */

  load(key) {
    return JSON.parse(this.storage.getItem(this._STATE_K));
  }

  /***
   * exists
   * Verifica se um estado key existe.
   */

  exists(key) {
    return JSON.parse(this.storage.getItem(this._STATE_K)) !== undefined;
  }
}
