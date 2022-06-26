import { TeamRepository } from '/src/js/repositories/team_repository.js';

//Inicialização banco de dados

const teamsRepository = new TeamRepository();

const teams = teamsRepository.getAll();

teams.reverse();

//Configuração da paginação
let perPage = 9;

const state = {
  page: 1,
  perPage,
  totalPage: Math.ceil(teams.length / perPage),
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
  create(team) {
    let containerTeams = document.getElementById('teamsContainer');
    containerTeams.innerHTML += `<a href = "equipe.html?id=${team.id}">
                                    <div class="cardTeam cardTeam_`+ team.id + `">
                                        <img class="iconeTime" src="`+ team.icon_url + `" alt="Icone Time"/>
                                        <h1 class="c-text-white nomeTime">`+ team.name + `</h1>
                                    </div>
                                  </a>
`;

  },
  update(teamsFound) {
    document.querySelector('#teamsContainer').innerHTML = '';

    let page = state.page - 1
    let start = page * state.perPage
    let end = start + state.perPage

    const paginatedTeams = teamsFound.slice(start, end)

    paginatedTeams.forEach(list.create)

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
  const teamsFound = teamsFilter(searched);
  let containerTeams = document.getElementById('teamsContainer');
  let pagination = document.getElementById('paginate');

  if (teamsFound.length >= 1 & teamsFound.length != teams.length) {
    removeTeams();
    pagination.style.display = 'none';
    teamsFound.forEach(list.create);
  }
  else if (teamsFound.length == teams.length) {
    removeTeams();
    pagination.style.display = 'block';
    init();
  }
  else {
    removeTeams();
    pagination.style.display = 'none';
    containerTeams.innerHTML += `<div class= "cardTeam_2 c-text-white">
                                    <h2 style = "text-align: center; ">Nenhum time encontrado.</h2>
                                    </div>`;
  }
  console.log(teamsFound);
};
function teamsFilter(searched) {
  return teams.filter(teams => {
    return teams.name.toLowerCase().includes(searched.toLowerCase());

  })
};
function removeTeams() {
  let containerTeams = document.getElementById('teamsContainer');
  while (containerTeams.firstChild) {
    containerTeams.removeChild(containerTeams.firstChild);
  }
};


//Inicialização da página
function update() {
  list.update(teams)
  buttons.update();
}
function init() {
  update();
  controls.createListeners();
}
init();
