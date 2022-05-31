import { Component } from "../framework/component.js";
import { div, h2, h4, h5, p, img, textarea, button, mapTo } from '../framework/elements.js';
import { HOME_ROUTE, redirectTo, VACANCY_ROUTE } from "../helpers/routes.js";
import { sendNotificationWithRedirect } from '../helpers/notification.js';

import { Vacancy } from '../models/vacancy.js';

import { VacancyRepository } from '../repositories/vacancy_repository.js';
import { TeamRepository } from '../repositories/team_repository.js';
import { RoleRepository } from '../repositories/role_repository.js';
import { USER_INFO } from "../framework/state.js";
import { UserRepository } from "../repositories/user_repository.js";

/***
 * CreateVacancyPage
 * Component responsavel por renderizar o carrocel de noticias.
 * Props:
 *    news: Recebe o array com os objetos que representam a noticia.
 */

export class CreateVacancyPage extends Component
{
  /***
   * constructor
   */

  constructor(props)
  {
    super(props);

    this.userRepository = new UserRepository();
    this.vacancyRepository = new VacancyRepository();
    this.teamRepository = new TeamRepository();
    this.roleRepository = new RoleRepository();

    if (this.ctrl.params?.id) {
      const team = this.teamRepository.get(this.ctrl.params?.id);
      const roles = this.roleRepository.getAll().filter((role) => role.game_id === team.game_id);

      this.state = {
        team,
        roles,
        description: '',
        selected_role: null
      };
    } else {
      this.state = {
        team: null,
        roles: null,
        description: '',
        selected_role: null
      };
    }
  }

  /***
   * onInitialize
   */

  onInitialize()
  {
    const userInfo = this.ctrl.appState.load(USER_INFO);

    if (
      !this.state.team ||
      !this.state.roles ||
      !this.state.roles.length ||
      !userInfo || userInfo.id !== this.state.team.owner_id
    ) {
      redirectTo(HOME_ROUTE);
    }
  }

  /***
   * onDidUpdate
   */

  onDidUpdate()
  {
    const userInfo = this.ctrl.appState.load(USER_INFO);

    if (
      !this.state.team ||
      !this.state.roles ||
      !this.state.roles.length ||
      !userInfo || userInfo.id !== this.state.team.owner_id
    ) {
      redirectTo(HOME_ROUTE);
    }
  }

  /***
   * render
   */

  render()
  {
    /***
     * onCreateVacancy
     */

    function onCreateVacancy()
    {
      const userInfo = this.ctrl.appState.load(USER_INFO);
      
      if (!userInfo || userInfo.id !== this.state.team.owner_id)
      {
        alert('Você não ter permissão para criar esta vaga!');
        return;
      }

      if (!this.state.selected_role)
      {
        alert('Você deve selecionar a função relacionada a vaga!');
        return;
      }

      const vacancy = this.vacancyRepository.create(new Vacancy(
        this.state.description,
        this.ctrl.params?.id,
        this.state.selected_role?.id
      ));

      if (confirm('Você deseja notificar os jogadores que possam se interessar pela vaga?'))
      {
        // Filtra os jogadores que se enquadrem na função e tem interesse em receber notificações.
        const match_players = this.userRepository
          .getAll()
          .filter(
            (user) => (
              user.game_roles.includes(this.state.selected_role.id) &&
              user.receive_new_vacancies_notification
            )
          );

        // Emite notificações aos jogadores filtrados.
        match_players.forEach((player) => {
          sendNotificationWithRedirect(
            'Nova vaga',
            `Ola ${player.name}! O time ${this.state.team.name} acabar de criar uma vaga para ${this.state.selected_role.name}!`,
            `vaga.html?id=${vacancy.id}`, this.state.team.owner_id, player.id
          );
        });
      }

      redirectTo(VACANCY_ROUTE, { id: vacancy.id });
    }

    return (
      div(null, [

        // Cabeçalho
        div({ className: "c-linear-header" },
          div({ className: "container" }, [
            div({ style: { backgroundColor: '#261423', height: '8rem', position: 'relative'} },
              div({ className: "d-flex", style: { position: 'absolute', bottom: '-2rem', left: '3rem' } }, [
                div({ style: { backgroundColor: 'white', padding: '0.2rem', width: '7rem', borderRadius: '50%' } },

                  // Imagem do logo do time.
                  img({ className: "w-100", src: this.state.team.icon_url, style: { borderRadius: '50%' } })
                ),
                
                div({ className: "d-flex align-items-end" },

                  // Nome do time.
                  h4({ className: "m-0", style: { color: 'white' } }, this.state.team.name)
                )
              ])
            ),

            div({ style: { marginTop: '5rem' } },
              h2({ style: { color: 'white', paddingBottom: '0.5rem' } }, "Criar vaga")
            )
          ])
        ),

        div({ className: "container flex-fill", style: { color: 'white' } }, [
          div({ className: 'c-bg-primary-dark mb-2 p-3', style: { borderRadius: '3px' } }, [
            p(null, 'Descrição'),
            textarea({
              className: 'w-100',
              style: { outline: 'none', height: '7rem', resize: 'none' },
              events: { change: (evt) => {
                this.setState({ description: evt.target.value?.trim() });
              }} }, this.state.description),
          ]),

          div({ className: 'c-bg-primary-dark p-3', style: { borderRadius: '3px' } },
            mapTo('div', { className: 'd-flex justify-content-center flex-wrap' }, this.state.roles,
              (role) => (
                div({ key: role.id, className: 'py-2 px-2' },
                  div(
                    {
                      className: 'p-3 c-bg-primary',
                      style: {
                        cursor: 'pointer',
                        borderRadius: '5px',
                        border: (
                          this.state.selected_role?.id === role.id
                            ? '2px solid #c5a769'
                            : 'none'
                        ),
                        boxShadow: (
                          this.state.selected_role?.id === role.id
                            ? '0 0 10px #c5a769'
                            : 'none'
                        )
                      },
                      events: {
                        click: () => {
                          this.setState({ selected_role: role });
                        },
                      }
                    },
                    [
                      img({ src: role.icon_url, style: { width: '10rem', height: '10rem' } }),
                      h5({ className: 'text-center c-text-black' }, role.name),
                    ]
                  )
                )
              )
            )
          ),

          div({ className: 'd-flex justify-content-center mt-3 mb-5'},
            button({ type: 'button', className: 'btn c-bg-secondary', events: { click: onCreateVacancy.bind(this) } }, 'Criar vaga')
          )
        ]),
      ])
    );
  }
}