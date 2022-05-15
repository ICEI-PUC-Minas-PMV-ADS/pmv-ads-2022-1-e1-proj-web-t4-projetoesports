import { BaseRepository } from "../framework/repository.js";

/***
 * GameRepository
 * Classe responsavel por manipular os dados dos jogos.
 */

export class GameRepository extends BaseRepository {
  constructor() {
    super("game");
  }

  serialize(data) {
    return { ...data };
  }

  deserialize(data) {
    return { ...data };
  }
}
