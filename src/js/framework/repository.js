/***
 * BaseRepository
 * Classe base para manipular os repositorios do modelos.
 */

export class BaseRepository {
  constructor(_BASE_KEY) {
    this._CURRENT_ID_K = "_DATA_INDEX_" + _BASE_KEY;
    this._DATA_K = "_DATA_" + _BASE_KEY;

    // Inicia a chave para indexar registros.
    if (window.localStorage.getItem(this._CURRENT_ID_K) === null) {
      window.localStorage.setItem(this._CURRENT_ID_K, 1);
    }

    // Inicia base de dados.
    if (window.localStorage.getItem(this._DATA_K) === null) {
      window.localStorage.setItem(this._DATA_K, JSON.stringify({}));
    }
  }

  /***
   * create
   * Responsavel por criar um registro na base de dados.
   */

  create(data) {
    let localStorage = window.localStorage;
    let current_index = parseInt(localStorage.getItem(this._CURRENT_ID_K));
    let rep_data = JSON.parse(window.localStorage.getItem(this._DATA_K));

    rep_data[current_index] = this.serialize({ ...data, id: current_index++ });

    // Cria novo registro no localStorage.
    localStorage.setItem(this._DATA_K, JSON.stringify({ ...rep_data }));

    // Atualiza a chave de indexação para criação de registros.
    localStorage.setItem(this._CURRENT_ID_K, current_index);
  }

  /***
   * get
   * Responsavel por recuperar registro unico na base de dados.
   */

  get(id) {
    let localStorage = window.localStorage;
    let rep_data = JSON.parse(localStorage.getItem(this._DATA_K));
    return this.deserialize(rep_data[id]);
  }

  /***
   * getAll
   * Responsavel por recuperar todos os registros da base de dados.
   */

  getAll() {
    let localStorage = window.localStorage;
    let rep_data = JSON.parse(localStorage.getItem(this._DATA_K));
    return Object.keys(rep_data).map((k, i) => this.deserialize(rep_data[k]));
  }

  /***
   * update
   * Responsavel por atualizar um registro na base de dados.
   */

  update(data) {
    if (
      data === undefined ||
      data instanceof this._MODEL_BASE === false ||
      data.id === undefined
    ) {
      throw new Error("Failed to update record");
    }

    let localStorage = window.localStorage;
    let rep_data = JSON.parse(localStorage.getItem(this._DATA_K));
    let rep_item = this.deserialize(rep_data[data.id]);

    if (rep_item === undefined) {
      return undefined;
    }

    const old_news = rep_data[data.id];
    rep_data[data.id] = this.serialize({ ...old_news, ...data, id: data.id });
    const updated_rep_item = rep_data[data.id];

    // Persiste o registro no localStorage.
    localStorage.setItem(this._DATA_K, JSON.stringify({ ...rep_data }));

    return updated_rep_item;
  }

  /***
   * delete
   * Responsavel por apagar um registro na base de dados.
   */

  delete(data) {
    if (
      data === undefined ||
      data instanceof this._MODEL_BASE === false ||
      data.id === undefined
    ) {
      throw new Error("Failed to delete record");
    }

    let localStorage = window.localStorage;
    let rep_data = JSON.parse(localStorage.getItem(this._DATA_K));
    let rep_item = rep_data[id];

    if (rep_item === undefined) {
      return;
    }
    delete rep_data[id];

    // Persiste o registro no localStorage.
    localStorage.setItem(this._DATA_K, JSON.stringify({ ...rep_data }));
  }

  /***
   * deleteAll
   * Responsavel por apagar todos os registros na base de dados.
   */

  deleteAll() {
    localStorage.setItem(this._CURRENT_ID_K, 1);
    localStorage.setItem(this._DATA_K, JSON.stringify({}));
  }

  /***
   * serialize
   * Faz a conversão do modelo para a dados a serem armazenados na base de dados.
   */

  serialize(data) {
    throw new Error("Este recurso não foi implementado: serialize");
  }

  /***
   * deserialize
   * Faz a conversão dos dados na base de dados para o modelo.
   */

  deserialize(data) {
    throw new Error("Este recurso não foi implementado: deserialize");
  }
}
