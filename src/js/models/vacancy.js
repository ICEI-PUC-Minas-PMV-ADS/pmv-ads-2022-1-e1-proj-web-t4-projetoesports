/***
 * Vacancy
 * Esta classe representa os vagas a serem exibidas no site.
 */

export class Vacancy {
<<<<<<< HEAD
  constructor(game, team, role, icon_url, created_at) {
    this.id = undefined;
    this.game = game;
    this.team = team;
    this.role = role;
    this.icon_url = icon_url;
=======
  constructor(game_id, team_id, role_id, created_at) {
    this.id = undefined;
    this.game_id = game_id;
    this.team_id = team_id;
    this.role_id = role_id;
    this.open = true;
    this.description = null;
    this.registered_players = null;
>>>>>>> f27baf3ba608bba6c496bdcb07d4ae9498509896
    this.created_at = created_at || new Date().getTime();
  }
}
