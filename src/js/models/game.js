/***
 * Game
 * Esta classe representa os jogos cadastrados no sistema.
 */

 export class Game {
  constructor(name, icon_url) {
    this.id = undefined;
    this.name = name;    
    this.icon_url = icon_url;
  }
}