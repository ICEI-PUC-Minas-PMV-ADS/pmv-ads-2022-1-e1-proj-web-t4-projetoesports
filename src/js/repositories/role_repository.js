import { BaseRepository } from "../framework/repository.js";

/***
 * RoleRepository
 * Classe responsavel por manipular os dados das funções.
 */

export class RoleRepository extends BaseRepository {
  constructor() {
    super("role");
  }

  serialize(data) {
    return { ...data };
  }

  deserialize(data) {
    return { ...data };
  }
}
