import { BaseRepository } from "../framework/repository.js";

/***
 * NotificationRepository
 * Classe responsavel por manipular os dados das notificações.
 */

export class NotificationRepository extends BaseRepository {
  constructor() {
    super("notification");
  }

  serialize(data) {
    return { ...data };
  }

  deserialize(data) {
    return { ...data };
  }
}
