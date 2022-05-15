import { BaseRepository } from "../framework/repository.js";

/***
 * NewsRepository
 * Classe responsavel por manipular os dados das noticias.
 */

export class NewsRepository extends BaseRepository {
  constructor() {
    super("news");
  }

  serialize(data) {
    return { ...data };
  }

  deserialize(data) {
    return { ...data };
  }
}
