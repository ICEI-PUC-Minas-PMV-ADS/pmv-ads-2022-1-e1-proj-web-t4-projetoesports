/***
 * Vacancy
 * Esta classe representa os vagas a serem exibidas no site.
 */

export class Vacancy {
  constructor(description, owner_id, game_id, team_id, role_id, created_at) {
    this.id = undefined;
    this.description = description; // Descrição da vaga.
    this.team_id = team_id;         // Id do time da qual a vaga esta relacionada.
    this.role_id = role_id;         // Id da função da qual a vaga esta relacionada.
    this.candidates = [];           // Array com os Ids dos candidatos.
    this.finalized = false;
    this.created_at = created_at || new Date().getTime();
  }
}
