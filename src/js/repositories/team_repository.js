import { BaseRepository } from "../framework/repository.js";

/***
 * TeamRepository
 * Classe responsavel por manipular os dados dos times.
 */

export class TeamRepository extends BaseRepository {
  constructor() {
    super("team");
  }

  serialize(data) {
    return { ...data };
  }

  deserialize(data) {
    return { ...data };
  }
}
