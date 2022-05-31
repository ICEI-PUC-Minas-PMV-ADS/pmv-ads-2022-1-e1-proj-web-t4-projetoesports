import { NewsRepository } from '../repositories/news_repository.js';
import { TournamentRepository } from '../repositories/tournament_repository.js';
import { UserRepository } from '../repositories/user_repository.js';
import { GameRepository } from '../repositories/game_repository.js';
import { RoleRepository } from '../repositories/role_repository.js';
import { TeamRepository } from '../repositories/team_repository.js';
import { VacancyRepository } from '../repositories/vacancy_repository.js';

import { News } from '../models/news.js';
import { Tournament } from '../models/tournament.js';

import { Sha256 } from './crypto.js';

/***
 * Inicia a massa de dados.
 */

export function initializeDatabase()
{
  initializeNews();
  initializeTournament();
  initializeUsers();
  initializeGames();
  initializeRoles();
  initializeTeams();
  initializeVacancies();
}

/***
 * initializeNews
 */

export function initializeNews()
{
  const newsRepository = new NewsRepository();

  newsRepository.create(new News('News #1', 'Descrição News #1', 'imgs/noticias_images/noticias_1.png', 'https://www.google.com', 1652282098729));
  newsRepository.create(new News('News #2', 'Descrição News #2', 'imgs/noticias_images/noticias_2.png', 'https://www.google.com', 1652281098729));
  newsRepository.create(new News('News #3', 'Descrição News #3', 'imgs/noticias_images/noticias_3.png', 'https://www.google.com', 1652282598729));
  newsRepository.create(new News('News #4', 'Descrição News #4', 'imgs/noticias_images/noticias_4.png', 'https://www.google.com', 1652282298729));
  newsRepository.create(new News('News #5', 'Descrição News #5', 'imgs/noticias_images/noticias_5.png', 'https://www.google.com', 1652281598729));
}

/***
 * initializeTournament
 */

export function initializeTournament()
{
  const tournamentRepository = new TournamentRepository();

  tournamentRepository.create(new Tournament('Tournament #1', 'Descrição Tournament #1', 'url', 1652281598729));
  tournamentRepository.create(new Tournament('Tournament #2', 'Descrição Tournament #2', 'url', 1652281498729));
  tournamentRepository.create(new Tournament('Tournament #3', 'Descrição Tournament #3', 'url', 1652281898729));
  tournamentRepository.create(new Tournament('Tournament #4', 'Descrição Tournament #4', 'url', 1652282098729));
  tournamentRepository.create(new Tournament('Tournament #5', 'Descrição Tournament #5', 'url', 1652281858729));
}

/***
 * initializeUsers
 */

export function initializeUsers()
{
  const userRepository = new UserRepository();
  
  // Usuario comum, não participa de time e não ha funções registradas.
  userRepository.create({
    name: 'John',
    email: 'john@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [],
    contact_info: [ 'john@email.com' ],
    game_statistics: [ 'https://oce.op.gg/summoners/br/john_cabure' ],
    game_roles: [],
    receive_new_vacancies_notification: true,
  });

  // Este usuario administra o time Team Coffee, não participa de time e não ha funções registradas.
  userRepository.create({
    name: 'Xerima',
    email: 'xer_ima@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [],
    contact_info: [ 'xer_ima@email.com', '@xer_ima_123' ],
    game_statistics: [ 'https://oce.op.gg/summoners/br/xer_ima_xd' ],
    game_roles: [],
    receive_new_vacancies_notification: true,
  });

  // Este usuario deseja jogar League of Legends como Jungle e não participa de time e esta candidatado a vaga no time Team Coffee.
  userRepository.create({
    name: 'Natalia',
    email: 'nat_luca@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [],
    contact_info: [ 'nat_luca@email.com', '@nat_luca23' ],
    game_statistics: [ 'https://oce.op.gg/summoners/br/nat_luca' ],
    game_roles: [2],
    receive_new_vacancies_notification: true,
  });

  // Este usuario joga League of Legends como Top lane e participa do time Team Coffee como ativo.
  userRepository.create({
    name: 'Tanaka',
    email: 'ta_naka@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [1],
    contact_info: [ 'ta_naka@email.com', '@tana_kapa' ],
    game_statistics: [ 'https://oce.op.gg/summoners/br/tana_kapa' ],
    game_roles: [1],
    receive_new_vacancies_notification: true,
  });

  // Este usuario joga League of Legends como Ad carry e participa do time Team Coffee como reserva.
  userRepository.create({
    name: 'Mario',
    email: 'mar_io@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [1],
    contact_info: [ 'mar_io@email.com', '@mar_io123' ],
    game_statistics: [ 'https://oce.op.gg/summoners/br/mar_io123' ],
    game_roles: [4],
    receive_new_vacancies_notification: true,
  });

  // Este usuario joga League of Legends como Support e não participa de time e não esta candidatado a vagas e não e elegivel a vagas.
  userRepository.create({
    name: 'Marcilio',
    email: 'mar_ci_lio@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [],
    contact_info: [ 'mar_ci_lio@email.com', '@mar_ci_lio' ],
    game_statistics: [ 'https://oce.op.gg/summoners/br/mar_ci_lio' ],
    game_roles: [5],
    receive_new_vacancies_notification: true,
  });

  // Este usuario joga League of Legends como Jungle e não participa de time e não esta candidatado a vagas e é elegivel a vaga.
  userRepository.create({
    name: 'Binoculo',
    email: 'bin_oculo@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [],
    contact_info: [ 'bin_oculo@email.com', '@bin_oculo' ],
    game_statistics: [ 'https://oce.op.gg/summoners/br/bin_oculo' ],
    game_roles: [2],
    receive_new_vacancies_notification: true,
  });
}

/***
 * initializeGames
 */

export function initializeGames()
{
  const gameRepository = new GameRepository();

  gameRepository.create({
    name: 'League of Legends',
    icon_url: 'imgs/league_of_legends.jpg',
  });

  gameRepository.create({
    name: 'Counter Strike',
    icon_url: 'imgs/counter_strike.jpg',
  });
}

/***
 * initializeRoles
 */

 export function initializeRoles()
 {
   const roleRepository = new RoleRepository();
 
   roleRepository.create({
    name: 'Top lane',
    game_id: 1,
    icon_url: 'imgs/role_lane_icons/TOP.png',
   });

   roleRepository.create({
    name: 'Jungle',
    game_id: 1,
    icon_url: 'imgs/role_lane_icons/JUNGLE.png',
   });

   roleRepository.create({
    name: 'Mid lane',
    game_id: 1,
    icon_url: 'imgs/role_lane_icons/MIDDLE.png',
   });

   roleRepository.create({
    name: 'Ad carry',
    game_id: 1,
    icon_url: 'imgs/role_lane_icons/ADC.png',
   });

   roleRepository.create({
    name: 'Support',
    game_id: 1,
    icon_url: 'imgs/role_lane_icons/SUPPORT.png',
   });
 }
 
/***
 * initializeTeams
 */

export function initializeTeams()
{
  const teamRepository = new TeamRepository();

  teamRepository.create({
    name: 'Team Coffee',
    email: 'team_coffee_org@email.com',
    owner_id: 2,
    game_id: 1,
    icon_url: 'imgs/team_icons/team_coffee.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    players: [4, 5],
    active_players: [4],
    reserves: [5],
    vacancies: [1, 2],
    contacts: [ 'team_coffee_org@email.com', '@team_coffee_org' ],
  });
}

/***
 * initializeVacancies
 */

export function initializeVacancies()
{
  const vacancyRepository = new VacancyRepository();

  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 1,
    role_id: 2,
    candidates: [3],
    finalized: false,
    created_at: new Date(2022, 5, 15, 9, 25, 0),
  });

  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 1,
    role_id: 3,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
}