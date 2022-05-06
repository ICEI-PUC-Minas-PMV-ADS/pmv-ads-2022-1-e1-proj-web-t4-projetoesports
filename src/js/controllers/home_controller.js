import { BaseController } from "./controller.js";
import { NewsRepository } from "../repositories/local_repository.js";
import { createElement } from "../helpers/element.js";

/***
 * Chaves de estado.
 */

const USER_INFO = "user_info";

/***
 * HomeController
 */

export class HomeController extends BaseController {
  constructor() {
    super("home");

    // Criar o repositorio de noticias.
    this._news_repository = new NewsRepository();
  }

  onInitialize() {
    const newest_news = this.filterNewestNews();

    // Verifica se existem informações do usuario logado.
    if (this.state.exists(USER_INFO)) {
      this._user = this.state.load(USER_INFO);
    }
  }

  actions() {
    return {
      teste: function () {},
    };
  }

  /***
   * filterNewestNews
   * Filtra as noticias por order de cadastro, onde as mais novas vem primeiro.
   */

  filterNewestNews() {
    return this._news_repository
      .getAll()
      .sort(
        (newsA, newsB) =>
          newsB.created_at.getTime() - newsA.created_at.getTime()
      );
  }

  /***
   * user_info
   * Retorna o estado com informações do usuário.
   * Tipo: Objeto(User)
   */

  get user_info() {
    return this.state.load(USER_INFO);
  }
}
