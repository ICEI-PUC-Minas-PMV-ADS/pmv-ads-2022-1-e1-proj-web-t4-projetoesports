/***
 * Team
 * Esta classe representa os times cadastrados no sistema.
 */

 export class Team {
  constructor(name, owner_id, email, game_id, icon_url) {
    this.id = undefined;
    this.name = name;    
    this.owner_id = owner_id;
    this.email = email;
    this.game_id = game_id;
    this.icon_url = icon_url;
    this.objective = '';
    this.players = [];
    this.active_players = [];
    this.reserves = [];
    this.vacancies = [];
    this.contacts = [];
  }
}