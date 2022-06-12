//Simulação banco de dados
import { UserRepository } from '/src/js/repositories/user_repository.js';
import { GameRepository } from '/src/js/repositories/game_repository.js';
import { RoleRepository } from '/src/js/repositories/role_repository.js';
import { TeamRepository } from '/src/js/repositories/team_repository.js';
import { VacancyRepository } from '/src/js/repositories/vacancy_repository.js';
import { Sha256 } from '/src/js/helpers/crypto.js';


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
    name: 'Top lane Topo',
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_roles/icone_top_vagas.png',
  });

  roleRepository.create({
    name: 'Jungle Caçador Cacador JG',
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_roles/icone_jungle_vagas.png',
  });

  roleRepository.create({
    name: 'Mid lane Meio',
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_roles/icone_mid_vagas.png',
  });

  roleRepository.create({
    name: 'Ad Carry ADC Atirador',
    game_id: 1,
    icon_url: 'imgs/imgs_vagas_equipes/icones_roles/icone_adc_vagas.png',
  });

  roleRepository.create({
    name: 'Support Suporte',
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
    participated_teams: [],
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
    participated_teams: [],
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

const vacancys = vacancysRepository.getAll();

vacancys.reverse();

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

//Configuração da paginação
let perPage = 9;

const state = {
  page: 1,
  perPage,
  totalPage: Math.ceil(vacancys.length / perPage),
  maxVisibleButtons: 5,
};
const controls = {
  next() {
    state.page++
    const lastPage = state.page > state.totalPage
    if (lastPage) {
      state.page--
    }
  },
  prev() {
    state.page--
    if (state.page < 1) {
      state.page++
    }
  },
  goTo(page) {
    if (page < 1) {
      page = 1;
    }
    state.page = +page
    if (page > state.totalPage) {
      state.page = state.totalPage;
    }
  },
  createListeners() {
    document.querySelector('.first').addEventListener('click', () => {
      controls.goTo(1);
      update();
    })
    document.querySelector('.last').addEventListener('click', () => {
      controls.goTo(state.totalPage);
      update();
    })
    document.querySelector('.next').addEventListener('click', () => {
      controls.next();
      update();
    })
    document.querySelector('.prev').addEventListener('click', () => {
      controls.prev();
      update();
    })
  }
};
const list = {
  create(vacancy) {
    let containerVacancys = document.getElementById('vagasContainer');
    let teamRender = teamsRepository.get(vacancy.team_id);
    let roleRender = rolesRepository.get(vacancy.role_id);
    containerVacancys.innerHTML += `
              <div>
                <div class="cardVaga card_`+ vacancy.id + `">
                  <div class="iconesFlex">
                    <img class="iconeTime" src="`+ teamRender.icon_url + `" alt="Icone Time"/>
                    <img class="iconeRole" src="`+ roleRender.icon_url + `" alt="Icone Role"/>
                  </div>
                  <div class="botaoFlex">
                    <h1 class="c-text-white nomeTime">`+ teamRender.name + `</h1>
                    <button class="buttom_card">Ir para vaga</button>
                  </div>
                </div>
              </div>
`;

  },
  update(vacancysFound) {
    document.querySelector('#vagasContainer').innerHTML = '';

    let page = state.page - 1
    let start = page * state.perPage
    let end = start + state.perPage

    const paginatedVacancys = vacancysFound.slice(start, end)

    paginatedVacancys.forEach(list.create)

  }

};
const buttons = {
  create(number) {
    const button = document.createElement('div');

    button.innerHTML = number;

    if (state.page == number) {
      button.classList.add('active')
    }

    button.addEventListener('click', (event) => {
      const page = event.target.innerText;
      controls.goTo(page);
      update();
    });

    document.querySelector('.numbers').appendChild(button);
  },
  update() {
    document.querySelector('.numbers').innerHTML = '';
    const { maxLeft, maxRight } = buttons.calculateMaxVisible();
    for (let page = maxLeft; page <= maxRight; page++) {
      buttons.create(page);
    };
  },
  calculateMaxVisible() {
    const { maxVisibleButtons } = state;
    let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
    let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = maxVisibleButtons;
    }

    if (maxRight > state.totalPage) {
      maxLeft = state.totalPage - (maxVisibleButtons - 1);
      maxRight = state.totalPage;
      if (maxLeft < 1) {
        maxLeft = 1
      }
    }
    return { maxLeft, maxRight };
  }
};

//Configuração barra de pesquisa
const search = document.getElementById('searchInput');

search.addEventListener('keyup', _.debounce(searchInKeyUp, 400));

function searchInKeyUp(event) {
  const searched = event.target.value;
  const vacancysFound = vacancysFilter(searched);
  let containerVacancys = document.getElementById('vagasContainer');
  let pagination = document.getElementById('paginate');

  if (vacancysFound.length > 1 & vacancysFound.length != vacancys.length) {
    removeVacancys();
    pagination.style.display = 'none';
    vacancysFound.forEach(list.create);
  }
  else if (vacancysFound.length == vacancys.length) {
    removeVacancys();
    pagination.style.display = 'block';
    init();
  }
  else {
    removeVacancys();
    pagination.style.display = 'none';
    containerVacancys.innerHTML += `<div class= "card_2 c-text-white">
                                          <h2>Nenhuma vaga encontrada.</h2>
                                    </div>`;
  }
  console.log(vacancys);
  console.log(vacancysFound);
};
function vacancysFilter(searched) {
  return vacancys.filter(vaga => {
    let team = teamsRepository.get(vaga.team_id);
    let role = rolesRepository.get(vaga.role_id);
    return role.name.toLowerCase().includes(searched.toLowerCase());

  })
};
function removeVacancys() {
  let containerVacancys = document.getElementById('vagasContainer');
  while (containerVacancys.firstChild) {
    containerVacancys.removeChild(containerVacancys.firstChild);
  }
};


//Inicialização da página
function update() {
  list.update(vacancys)
  buttons.update();
}
function init() {
  update();
  controls.createListeners();
}
init();