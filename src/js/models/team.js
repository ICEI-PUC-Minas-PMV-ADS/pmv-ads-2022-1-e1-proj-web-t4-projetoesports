/***
 * Team
 * Esta classe representa os times cadastrados no sistema.
 */

 export class Team {
  constructor(name, email, game_id, icon_url) {
    this.id = undefined;
    this.name = name;    
    this.email = email;
    this.game_id = game_id;
    this.icon_url = icon_url;
    this.objective = null;
    this.players = null;
    this.reserves = null;
    this.vacancies = null;
    this.contacts = null;
  }
}