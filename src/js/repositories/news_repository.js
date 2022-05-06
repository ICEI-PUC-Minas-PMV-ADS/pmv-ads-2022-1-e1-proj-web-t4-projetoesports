import { BaseRepository } from "./repository.js";

/***
 * NewsRepository
 * Classe base para manipular os repositorios do sistema.
 */

export class NewsRepository extends BaseRepository {
  constructor() {
    super("news");
  }

  serialize(data) {
    return { ...data, created_at: data.created_at.getTime() };
  }

  deserialize(data) {
    return { ...data, created_at: new Date(data.created_at) };
  }
}
