import { BaseRepository } from "../framework/repository.js";

/***
 * VacancyRepository
 * Classe responsavel por manipular os dados das vagas.
 */

export class VacancyRepository extends BaseRepository {
  constructor() {
    super("vacancy");
  }

  serialize(data) {
    return { ...data };
  }

  deserialize(data) {
    return { ...data };
  }
}
