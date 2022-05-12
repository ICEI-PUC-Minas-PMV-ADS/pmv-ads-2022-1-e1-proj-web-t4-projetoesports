/***
 * Tournament
 * Esta classe representa os torneios a serem exibidas no site.
 */

export class Tournament {
  constructor(name, description, url, created_at) {
    this.id = undefined;
    this.name = name;
    this.description = description;
    this.url = url;
    this.created_at = created_at || new Date().getTime();
  }
}
