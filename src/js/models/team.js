/***
 * Team
 * Esta classe representa os times cadastrados no sistema.
 */

 export class Team {
  constructor(name, game_id, icon_url) {
    this.id = undefined;
    this.name = name;    
    this.game_id = game_id;
    this.icon_url = icon_url;
    this.players = null;
    this.reserves = null;
    this.vacancies = null;
    this.objective = null;
    this.contacts = null;
  }
}