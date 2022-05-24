import { Component } from '../framework/component.js'
import { button, div, h1, h5, hr, img, p, component, mapTo } from '../framework/elements.js';
import { If } from '../framework/std-components.js';

import { UserRepository } from '../repositories/user_repository.js';
import { VacancyRepository } from '../repositories/vacancy_repository.js';
import { TeamRepository } from '../repositories/team_repository.js';
import { RoleRepository } from '../repositories/role_repository.js';
import { USER_INFO } from '../framework/state.js';

/***
 * VacancyPage
 */

export class VacancyPage extends Component
{
  constructor(props)
  {
    super(props);

    this.state = { };

    // Apenas para testes
    this.userRepository = new UserRepository();

    this.vacancyRepository = new VacancyRepository();
    this.teamRepository = new TeamRepository();
    this.roleRepository = new RoleRepository();
  }

  onInitialize()
  {
    if (!this.ctrl.params?.id)
    {
      window.location.href = "index.html";
      return;
    }
    
    const vacancy = this.vacancyRepository.get(this.ctrl.params.id);

    if (!vacancy)
    {
      window.location.href = "index.html";
      return;
    }

    const user = (
      this.ctrl.params?.userId
        ? this.userRepository.get(this.ctrl.params?.userId)
        : this.ctrl.appState.load(USER_INFO)
    );

    const team = this.teamRepository.get(vacancy.team_id);
    const role = this.roleRepository.get(vacancy.role_id);
    
    const is_owner = user?.id === team.owner_id;
    const is_player = team.players.find((playerId) => playerId === user?.id) ? true : false;
    const is_reserve = team.reserves.find((playerId) => playerId === user?.id) ? true : false;
    const can_be_role = user?.game_roles.find((roleId) => roleId === vacancy.role_id) ? true : false;
    const can_be_candidate = user !== undefined && user !== null && !is_owner && !is_player && !is_reserve && can_be_role;
    const is_registered = vacancy.candidates.find((vacancy_candidate) => vacancy_candidate === user?.id) ? true : false;

    console.log({
      user, vacancy, team, role
    });

    console.log({
      description: vacancy.description,
      team_name: team.name,
      team_icon_url: team.icon_url,
      role_name: role.name,
      role_icon_url: role.icon_url,
      candidates: vacancy.candidates,
      is_owner,
      can_be_candidate,
      is_registered,
    });

    this.setState({
      description: vacancy.description,
      team_name: team.name,
      team_icon_url: team.icon_url,
      role_name: role.name,
      role_icon_url: role.icon_url,
      candidates: vacancy.candidates,
      is_owner,
      can_be_candidate,
      is_registered,
    });
  }

  render()
  {
    return component(If, this.state.is_owner,

      // Dono da vaga.
      this.renderOwner({...this.state}),

      // Não é o dono da vaga.
      this.renderNotOwner({...this.state}),
    );
  }

  /***
   * renderOwner
   * Renderiza o layout com a seção de candidatos a vaga.
   */

  renderOwner({
    description,
    team_name,
    team_icon_url,
    role_name,
    role_icon_url,
  })
  {
    return div({ style: { color: 'white' } }, [
      h1({ className: 'mx-4' }, 'Vagas'),
      hr({ className: 'mx-4' }),
      div({ className: 'container' }, [
        div({ className: 'row', style: { minHeight: '10rem' } }, [

          // Card equipe
          div({ className: 'h-100 col-xxl-2 col-lg-3 col-md-4 col-sm-8 offset-sm-2 offset-md-0' }, [
            div({ className: 'c-bg-primary-dark p-4' }, [
              img({ src: team_icon_url, className: 'w-100' }),
              h5({ className: 'text-center p-2' }, team_name)
            ]),
            button({ className: 'btn c-text-white c-bg-secondary w-100 mt-3' }, 'Ir para o time')
          ]),

          // Container role / vaga.
          div({ className: 'd-flex flex-column col-xxl-10 col-lg-9 col-md-8 col-sm-8 offset-sm-2 offset-md-0' }, [
            div({ className: 'c-bg-primary-dark p-4 flex-fill' }, [
              div({ className: 'row' }, [

                // Card role.
                div({ className: 'col-xxl-2 col-lg-3 col-md-4 col-sm-12' }, 
                  div({ className: 'd-flex flex-column align-items-center'}, [
                    img({ src: role_icon_url }),
                    h5(null, role_name)
                  ])
                ),

                // Vaga description.
                div({ className: 'col-xxl-10 col-lg-9 col-md-8 col-sm-12' }, [
                  h5(null, 'Descrição'),
                  p(null, description),
                ]),
              ])
            ]),
            div({ className: 'd-flex justify-content-end' },
              button({ className: 'btn c-text-white c-bg-secondary mt-3' }, 'Excluir vaga'),
            )
          ]),
        ]),

        // Container com os candidatos a vaga.
        div({ className: 'my-4' }, [
          h5(null, 'Canditados'),
          hr(),
          mapTo('div', { className: 'd-flex flex-wrap justify-content-center c-bg-primary-dark py-2 px-2' }, this.state.candidates,
            (candidate, index) => {
              const player = this.userRepository.get(candidate);

              if (!player)
              {
                alert('Erro interno!');
                window.location.href = 'index.html';
                return null;
              }

              return div({ key: index, className: 'py-2 px-2' }, [
                div({ className: 'p-3 c-bg-secondary', style: { borderRadius: '5px' } }, [
                  img({ src: player.img_url, style: { width: '10rem', height: '10rem' } }),
                  h5({ className: 'text-center c-text-black' }, player.name),
                ]),
                button({ className: 'btn c-bg-primary c-text-white w-100 mt-3'}, 'Aceitar'),
              ]);
            }
          ),
        ])
      ])
    ]);
  }

  /***
   * renderNotOwner
   * Renderiza o layout sem a seção de candidatos a vaga.
   */

  renderNotOwner({
    description,
    team_name,
    team_icon_url,
    role_name,
    role_icon_url,
    can_be_candidate,
    is_registered
  })
  {
    return div({ style: { color: 'white' } }, [
      h1({ className: 'mx-4' }, 'Vagas'),
      hr({ className: 'mx-4' }),
      div({ className: 'container' }, 
        div({ className: 'row', style: { minHeight: '10rem' } }, [

          // Card equipe
          div({ className: 'h-100 col-xxl-2 col-lg-3 col-md-4 col-sm-8 offset-sm-2 offset-md-0' }, [
            div({ className: 'c-bg-primary-dark p-4' }, [
              img({ src: team_icon_url, className: 'w-100' }),
              h5({ className: 'text-center p-2' }, team_name)
            ]),
            button({ className: 'btn c-text-white c-bg-secondary w-100 mt-3' }, 'Ir para o time')
          ]),

          // Container role / vaga.
          div({ className: 'd-flex flex-column col-xxl-10 col-lg-9 col-md-8 col-sm-8 offset-sm-2 offset-md-0' }, [
            div({ className: 'c-bg-primary-dark p-4 flex-fill' }, [
              div({ className: 'row' }, [

                // Card role.
                div({ className: 'col-xxl-2 col-lg-3 col-md-4 col-sm-12' }, 
                  div({ className: 'd-flex flex-column align-items-center'}, [
                    img({ src: role_icon_url }),
                    h5(null, role_name)
                  ])
                ),

                // Vaga description.
                div({ className: 'col-xxl-10 col-lg-9 col-md-8 col-sm-12' }, [
                  h5(null, 'Descrição'),
                  p(null, description),
                ]),
              ])
            ]),
            div({ className: 'd-flex justify-content-end' },
              component(If, can_be_candidate,

                // Ser elegival para a vaga.
                component(If, is_registered,
                  
                  // Estar cadastrado.
                  button({ className: 'btn c-text-white c-bg-secondary mt-3' }, 'Remover candidatura'),

                  // Não estar cadastrado.
                  button({ className: 'btn c-text-white c-bg-secondary mt-3' }, 'Candidatar'),
                ),

                // Não ser elegivel para a vaga.
                div()
              ),
            )
          ]),
        ])
      )
    ]);
  }
}