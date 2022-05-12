/***
 * User
 * Esta classe representa o usuário cadastrado no site.
 */

export class User {
  constructor(name, email, password, created_at) {
    this.id = undefined;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
