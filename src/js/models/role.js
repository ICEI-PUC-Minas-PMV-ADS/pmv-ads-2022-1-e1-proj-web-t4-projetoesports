/***
 * Role
 * Esta classe representa as funções que os jogadores podem exercer no jogo.
 */

 export class Role {
  constructor(name, game_id, icon_url) {
    this.id = undefined;
    this.name = name;
    this.game_id = game_id;
    this.icon_url = icon_url;
  }
}