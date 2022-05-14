import { BaseRepository } from "../framework/repository.js";

/***
 * TournamentRepository
 * Classe responsavel por manipular os dados dos torneios.
 */

export class TournamentRepository extends BaseRepository {
  constructor() {
    super("tournament");
  }

  serialize(data) {
    return { ...data };
  }

  deserialize(data) {
    return { ...data };
  }
}
