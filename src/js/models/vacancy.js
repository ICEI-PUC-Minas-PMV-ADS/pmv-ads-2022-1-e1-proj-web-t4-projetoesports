/***
 * Vacancy
 * Esta classe representa os vagas a serem exibidas no site.
 */

export class Vacancy {
  constructor(game_id, team_id, role_id, created_at) {
    this.id = undefined;
    this.game_id = game_id;
    this.team_id = team_id;
    this.role_id = role_id;
    this.open = true;
    this.description = null;
    this.registered_players = null;
    this.created_at = created_at || new Date().getTime();
  }
}
