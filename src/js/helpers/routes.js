/***
 * Rotas
 */

export const HOME_ROUTE = 'index.html';

export const RECOVER_PASSWORD = 'recuperar_senha.html';

export const PROFILE_ROUTE = 'perfil.html';

export const CREATE_VACANCY_ROUTE = 'criar_vaga.html';
export const VACANCY_ROUTE = 'vaga.html';
export const VACANCIES_ROUTE = 'vagas_equipes.html';

export const MY_TEAMS_ROUTE = 'minhas_equipes.html';

export const CREATE_TEAM_ROUTE = 'Criar_equipes.html';
export const TEAM_ROUTE = 'equipe.html';
export const TEAMS_ROUTE = 'equipes.html';

export const TOURNAMENTS_ROUTE = 'torneios.html';
export const PLAYERS_ROUTE = 'jogadores.html';

export const NEWS_ROUTE = 'noticias.html';

/***
 * redirectTo
 */

export function redirectTo(route, params)
{
  window.location.href = `${route}?${Object.entries(params).map((param) => param.join('=')).join('&')}`;
}