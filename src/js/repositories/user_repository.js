import { BaseRepository } from "../framework/repository.js";

/***
 * UserRepository
 * Classe responsavel por manipular os dados dos usuarios.
 */

export class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  serialize(data) {
    return { ...data };
  }

  deserialize(data) {
    return { ...data };
  }
}
