import { RoleRepository } from '/src/js/repositories/role_repository.js';
import { TeamRepository } from '/src/js/repositories/team_repository.js';
import { VacancyRepository } from '/src/js/repositories/vacancy_repository.js';

//Inicialização banco de dados
const vacancysRepository = new VacancyRepository();

const teamsRepository = new TeamRepository();

const rolesRepository = new RoleRepository();

const vacancys = vacancysRepository.getAll();

vacancys.reverse();


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
              <a href = "vaga.html?id=${vacancy.id}">
                <div class="cardVacancy card_`+ vacancy.id + `">
                  <div class="iconesFlex">
                    <img class="iconeTime" src="`+ teamRender.icon_url + `" alt="Icone Time"/>
                    <img class="iconeRole" src="`+ roleRender.icon_url + `" alt="Icone Role"/>
                  </div>
                    <h1 class="c-text-white nomeTime">`+ teamRender.name + `</h1>
                </div>
              </a>
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
    button.classList.add('buttonsNumbers')
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

  if (vacancysFound.length > 0 & vacancysFound.length != vacancys.length) {
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

};
function vacancysFilter(searched) {
  return vacancys.filter(vaga => {
    let team = teamsRepository.get(vaga.team_id);
    let role = rolesRepository.get(vaga.role_id);
    return role.tag.toLowerCase().includes(searched.toLowerCase());
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
