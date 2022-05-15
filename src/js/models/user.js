/***
 * User
 * Esta classe representa o usuário cadastrado no site.
 */

export class User {
  constructor(name, email, password) {
    this.id = undefined;
    this.name = name;
    this.email = email;
    this.password = password;
    this.img_url = null;
    this.objective = null;
    this.participated_teams = null;
    this.contact_info = null;
    this.game_statistics = null;
    this.game_roles = null;
  }
}
