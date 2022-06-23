
import { UserRepository } from '/src/js/repositories/user_repository.js';
import { GameRepository } from '/src/js/repositories/game_repository.js';
import { RoleRepository } from '/src/js/repositories/role_repository.js';
import { TeamRepository } from '/src/js/repositories/team_repository.js';
import { VacancyRepository } from '/src/js/repositories/vacancy_repository.js';
import { Sha256 } from '/src/js/helpers/crypto.js';
import { isUser } from '/src/js/helpers/authentication.js';
import { getUser } from '/src/js/helpers/authentication.js';

//Simulação banco de dados
function gamesInitialize() {
  const gameRepository = new GameRepository();

  gameRepository.create({
    name: 'League of Legends',
    icon_url: 'imgs/league_of_legends.jpg',
  });
};
function rolesInitialize() {
  const roleRepository = new RoleRepository();

  roleRepository.create({
    name: 'Top lane',
    tag: 'Top lane Topo',
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_roles/icone_top_vagas.png',
  });

  roleRepository.create({
    name: 'Jungle',
    tag: 'Jungle Caçador Cacador JG',
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_roles/icone_jungle_vagas.png',
  });

  roleRepository.create({
    name: 'Mid lane',
    tag: 'Mid lane Meio',
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_roles/icone_mid_vagas.png',
  });

  roleRepository.create({
    name: 'Ad Carry',
    tag: 'Ad Carry ADC Atirador',
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_roles/icone_adc_vagas.png',
  });

  roleRepository.create({
    name: 'Support',
    tag: 'Support Suporte',
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_roles/icone_support_vagas.png',
  });
};
function usersInitialize() {
  const userRepository = new UserRepository();
  userRepository.create({
    name: 'Xerima',
    email: 'xer_ima@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [1],
    contact_info: ['xer_ima@email.com', '@xer_ima_123'],
    game_statistics: ['https://oce.op.gg/summoners/br/xer_ima_xd'],
    game_roles: [],
    receive_new_vacancies_notification: true,
  });
  userRepository.create({
    name: 'RatoFofo',
    email: 'ratofofo@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [],
    contact_info: ['ratofofo@email.com', '@ratofofo'],
    game_statistics: ['https://oce.op.gg/summoners/br/ratofofo_xd'],
    game_roles: [],
    receive_new_vacancies_notification: true,
  });
  userRepository.create({
    name: 'G0rila',
    email: 'g0rila@email.com',
    password: Sha256.hash('123'),
    img_url: 'imgs/RC.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    participated_teams: [3, 1, 2],
    contact_info: ['g0rila@email.com', '@g0rila'],
    game_statistics: ['https://oce.op.gg/summoners/br/g0rila_xd'],
    game_roles: [],
    receive_new_vacancies_notification: true,
  });
};
function teamsInitialize() {
  const teamRepository = new TeamRepository();

  teamRepository.create({
    name: 'ASUS',
    email: 'asusteam@email.com',
    owner_id: 1,
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_times/icone_time_asus.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    players: [],
    active_players: [],
    reserves: [],
    vacancies: [],
    contacts: ['asusteam@email.com', '@asusteam'],
  });
  teamRepository.create({
    name: 'BKN',
    email: 'bknteam@email.com',
    owner_id: 2,
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_times/icone_time_BKN.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    players: [],
    active_players: [],
    reserves: [],
    vacancies: [],
    contacts: ['bknteam@email.com', '@bknteam'],
  });
  teamRepository.create({
    name: 'G2V',
    email: 'g2vteam@email.com',
    owner_id: 3,
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_times/icone_time_G2V.png',
    objective: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    players: [],
    active_players: [],
    reserves: [],
    vacancies: [],
    contacts: ['g2vteam@email.com', '@g2vteam'],
  });

};
function vancancysInitialize() {
  const vacancyRepository = new VacancyRepository();

  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 1,
    role_id: 1,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 9, 25, 0),
  });

  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 1,
    role_id: 2,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 1,
    role_id: 3,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 1,
    role_id: 4,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 1,
    role_id: 5,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 2,
    role_id: 1,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 2,
    role_id: 2,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 2,
    role_id: 3,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 2,
    role_id: 4,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 2,
    role_id: 5,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 3,
    role_id: 1,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 3,
    role_id: 2,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 3,
    role_id: 3,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 3,
    role_id: 4,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
  vacancyRepository.create({
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, minima.',
    team_id: 3,
    role_id: 5,
    candidates: [],
    finalized: false,
    created_at: new Date(2022, 5, 15, 8, 25, 0),
  });
};

//Inicialização banco de dados
const vacancysRepository = new VacancyRepository();

const teamsRepository = new TeamRepository();

const rolesRepository = new RoleRepository();

const user = getUser();

document.addEventListener('DOMContentLoaded', initializeLocalStorage);

function initializeLocalStorage() {
  if (!localStorage.primeiraVisita) {
    localStorage.primeiraVisita = 1
    for (let i = 0; i < 3; i++) {
      gamesInitialize();
      rolesInitialize();
      usersInitialize();
      teamsInitialize();
      vancancysInitialize();
    }
    document.location.reload(true);
  }
};


//Inicialização da página

function uptade() {
  let containerTeams = document.getElementById('teamsContainer');
  const user = getUser();
  if (isUser() == false) {
    removeTeams();
    containerTeams.innerHTML += `<div class= "card_2 c-text-white">
                                          <h2>Nenhum usuário conectado.</h2>
                                    </div>`;
  }
  else if (isUser() == true & user.participated_teams.length == 0) {
    removeTeams();
    containerTeams.innerHTML += `<div class= "card_2 c-text-white">
                                          <h2 style = "text-align: center; ">Você não é membro de nenhuma equipe.</h2>
                                    </div>`;
  }
  else {
    user.participated_teams.forEach((team) => {
      let containerMinhasEquipes = document.getElementById('teamsContainer');
      let teamRender = teamsRepository.get(team);
      containerMinhasEquipes.innerHTML += `
              <a href = "equipe.html?id=${team}">
                <div class="cardTeam card_`+ team + `">
                    <img class="iconeTime" src="`+ teamRender.icon_url + `" alt="Icone Time"/>
                    <h1 class="c-text-white nomeTime">`+ teamRender.name + `</h1>
                </div>
              </a>
`;
    })
  }
}
uptade();

//Configuração barra de pesquisa
const search = document.getElementById('searchInput');

search.addEventListener('keyup', _.debounce(searchInKeyUp, 400));

function searchInKeyUp(event) {
  const searched = event.target.value;
  const teamsFound = teamsFilter(searched);
  let containerTeams = document.getElementById('teamsContainer');
  console.log(teamsFound);

  if (teamsFound.length > 0) {
    removeTeams();
    teamsFound.forEach((team) => {
      let containerMinhasEquipes = document.getElementById('teamsContainer');
      let teamRender = teamsRepository.get(team);
      containerMinhasEquipes.innerHTML += `
              <a href = "equipe.html?id=${team}">
                <div class="cardTeam card_`+ team + `">
                    <img class="iconeTime" src="`+ teamRender.icon_url + `" alt="Icone Time"/>
                    <h1 class="c-text-white nomeTime">`+ teamRender.name + `</h1>
                </div>
              </a>
`;
    })
  }
  else {
    removeTeams();
    containerTeams.innerHTML += `<div class= "card_2 c-text-white">
                                          <h2>Nenhuma equipe encontrada.</h2>
                                    </div>`;
  }

};
function teamsFilter(searched) {
  return user.participated_teams.filter(vaga => {
    let team = teamsRepository.get(vaga);
    return team.name.toLowerCase().includes(searched.toLowerCase());
  })
};

function removeTeams() {
  let containerTeams = document.getElementById('teamsContainer');
  while (containerTeams.firstChild) {
    containerTeams.removeChild(containerTeams.firstChild);
  }
};



