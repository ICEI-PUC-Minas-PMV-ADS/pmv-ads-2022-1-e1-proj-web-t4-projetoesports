/***
 * Role
 * Esta classe representa as funções que os jogadores podem exercer no jogo.
 */

 export class Role {
  constructor(name, tag, game_id, icon_url) {
    this.id = undefined;
    this.name = name;
    this.tag = tag;
    this.game_id = game_id;
    this.icon_url = icon_url;
  }
}