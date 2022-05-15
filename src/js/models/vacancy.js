/***
 * Vacancy
 * Esta classe representa os vagas a serem exibidas no site.
 */

export class Vacancy {
  constructor(game, team, role, icon_url, created_at) {
    this.id = undefined;
    this.game = game;
    this.team = team;
    this.role = role;
    this.icon_url = icon_url;
    this.created_at = created_at || new Date().getTime();
  }
}
