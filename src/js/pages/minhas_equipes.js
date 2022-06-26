import { TeamRepository } from '/src/js/repositories/team_repository.js';
import { isUser } from '/src/js/helpers/authentication.js';
import { getUser } from '/src/js/helpers/authentication.js';

//Inicialização banco de dados

const teamsRepository = new TeamRepository();

const user = getUser();


//Inicialização da página

function uptade() {
  let containerTeams = document.getElementById('teamsContainer');
  let buttonCreateTeam = document.getElementById('buttonCreateTeam');
  const user = getUser();
  if (isUser() == false) {
    removeTeams();
    containerTeams.innerHTML += `<div class= "card_2 c-text-white">
                                          <h2>Nenhum usuário conectado.</h2>
                                    </div>`;
    buttonCreateTeam.style.display = "none";
  }
  else if (isUser() == true & user.participated_teams.length == 0) {
    removeTeams();
    buttonCreateTeam.style.display = "block";
    containerTeams.innerHTML += `<div class= "card_2 c-text-white">
                                          <h2 style = "text-align: center; ">Você não é membro de nenhuma equipe.</h2>
                                    </div>`;

  }
  else {
    user.participated_teams.forEach((team) => {
      let containerMinhasEquipes = document.getElementById('teamsContainer');
      let teamRender = teamsRepository.get(team);
      buttonCreateTeam.style.display = "block";
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

