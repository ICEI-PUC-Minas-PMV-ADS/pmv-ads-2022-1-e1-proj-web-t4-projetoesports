import { Component } from '../framework/component.js'
import { button, div, h1, h5, hr, img, p, component, mapTo } from '../framework/elements.js';
import { If } from '../framework/std-components.js';

import { UserRepository } from '../repositories/user_repository.js';
import { VacancyRepository } from '../repositories/vacancy_repository.js';
import { TeamRepository } from '../repositories/team_repository.js';
import { RoleRepository } from '../repositories/role_repository.js';

import { sendNotification, sendNotificationWithRedirect } from '../helpers/notification.js';

import { USER_INFO } from '../framework/state.js';
import { HOME_ROUTE, redirectTo, TEAM_ROUTE } from '../helpers/routes.js';

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

    this.onRemoveCandidate = this.onRemoveCandidate?.bind(this);
    this.onCandidate = this.onCandidate?.bind(this);
    this.onUpdate = this.onUpdate?.bind(this);
    this.onDeleteVacancy = this.onDeleteVacancy?.bind(this);
    this.onInviteCandidate = this.onInviteCandidate?.bind(this);
    this.onUninviteCandidate = this.onUninviteCandidate?.bind(this);

    this.renderOwner = this.renderOwner?.bind(this);
    this.renderNotOwner = this.renderNotOwner?.bind(this);
    this.renderInviteModal = this.renderInviteModal?.bind(this);
  }

  /***
   * user get accessor.
   */

  get user()
  {
    return this.ctrl.appState.load(USER_INFO);
  }

  /***
   * onInitialize
   */

  onInitialize()
  {
    this.onUpdate?.();
  }

  /***
   * onCandidate
   * Eventos disparado ao pressionar o botão Candidatar
   */

  onRemoveCandidate()
  {
    const vacancy = this.vacancyRepository.get(this.ctrl.params.id);
    const userIdIndex = vacancy.candidates.indexOf(this.user.id);

    vacancy.candidates.splice(userIdIndex, 1);
    this.vacancyRepository.update(vacancy);

    this.onUpdate?.();
  }

  /***
   * onCandidate
   * Eventos disparado ao pressionar o botão Candidatar
   */

  onCandidate()
  {
    const vacancy = this.vacancyRepository.get(this.ctrl.params.id);

    vacancy.candidates.push(this.user.id);
    this.vacancyRepository.update(vacancy);

    this.onUpdate?.();
  }

  /***
   * onDeleteVacancy
   */

  onDeleteVacancy()
  {
    const vacancy = this.vacancyRepository.get(this.ctrl.params.id);

    const team = this.teamRepository.get(vacancy.team_id);
    const role = this.roleRepository.get(vacancy.role_id);

    if (confirm('Você confirma a exclusão desta vaga?'))
    {
      // Envia notificação ao jogadores cadastrados.
      vacancy?.candidates.forEach((candidateId) => {
        const candidate = this.userRepository.get(candidateId);

        sendNotification(
          'Vaga excluida',
          `Ola ${candidate.name}! Lamentamos informar que a vaga de ${role.name} para o time ${team.name} foi excluida pelo administrador do time.`,
          this.user.id,
          candidateId
        );
      });

      // Remove a vaga do sistema.
      this.vacancyRepository.delete(vacancy.id);

      // Redireciona para a home.
      redirectTo(HOME_ROUTE);
    }
  }

  /***
   * onInviteCandidate
   */

  onInviteCandidate(candidateId)
  {
    const candidate = this.userRepository.get(candidateId);

    const vacancy = this.vacancyRepository.get(this.ctrl.params?.id);

    const team = this.teamRepository.get(vacancy.team_id);
    const role = this.roleRepository.get(vacancy.role_id);

    if (confirm(`Você confirma o convite para ${candidate.name} se juntar ao time?`))
    {
      // Envia notificação ao jogador.
      sendNotificationWithRedirect(
        'Convite para time',
        `Ola ${candidate.name}! Você foi convidado a fazer parte do time ${team.name} como ${role.name}.`,
        `vaga.html?id=${vacancy.id}`,
        this.user.id,
        candidateId
      );

      // Indica que vaga esta pendente de aceitação.
      vacancy.pending_invite_from = candidateId;
      this.vacancyRepository.update(vacancy);

      // Atualiza a pagina.
      this.onUpdate?.();
    }
  }

  /***
   * onUninviteCandidate
   */

   onUninviteCandidate(candidateId)
   {
     const candidate = this.userRepository.get(candidateId);
 
     const vacancy = this.vacancyRepository.get(this.ctrl.params?.id);
 
     const team = this.teamRepository.get(vacancy.team_id);
     const role = this.roleRepository.get(vacancy.role_id);
 
     if (confirm(`Você deseja desconvidar ${candidate.name} de se juntar ao time?`))
     {
       // Envia notificação ao jogador.
       sendNotification(
         'Convite para time',
         `Ola ${candidate.name}! Você foi desconvidado a fazer parte do time ${team.name} como ${role.name}.`,
         this.user.id,
         candidateId
       );
 
       // Indica que vaga esta pendente de aceitação.
       vacancy.pending_invite_from = null;
       this.vacancyRepository.update(vacancy);
 
       // Atualiza a pagina.
       this.onUpdate?.();
     }
   }

  /***
   * onUpdate
   */

  onUpdate()
  {
    if (!this.ctrl.params?.id)
    {
      redirectTo(HOME_ROUTE);
      return;
    }
    
    const vacancy = this.vacancyRepository.get(this.ctrl.params.id);

    if (!vacancy)
    {
      redirectTo(HOME_ROUTE);
      return;
    }

    const team = this.teamRepository.get(vacancy.team_id);
    const role = this.roleRepository.get(vacancy.role_id);
    
    const is_owner = this.user?.id === team.owner_id;
    const is_player = team.players.find((playerId) => playerId === this.user?.id) ? true : false;
    const is_reserve = team.reserves.find((playerId) => playerId === this.user?.id) ? true : false;
    const is_registered = vacancy.candidates.find((vacancy_candidate) => vacancy_candidate === this.user?.id) ? true : false;
    
    const can_be_role = this.user?.game_roles.find((roleId) => roleId === vacancy.role_id) ? true : false;
    const can_be_candidate = this.user !== undefined && this.user !== null && !is_owner && !is_player && !is_reserve && can_be_role;

    const pending_invite_from = vacancy.pending_invite_from;

    this.setState({
      description: vacancy.description,
      team_id: team.id,
      team_name: team.name,
      team_icon_url: team.icon_url,
      role_name: role.name,
      role_icon_url: role.icon_url,
      candidates: vacancy.candidates,
      is_owner,
      can_be_candidate,
      is_registered,
      pending_invite_from
    });

    // Mostra o modal de convite.
    if (this.user && pending_invite_from === this.user.id)
    {
      setTimeout(() => {
        const inviteModal = new bootstrap.Modal(document.getElementById('inviteModal'), {});
        inviteModal.toggle();
      }, 0);
    }
  }

  /***
   * render
   */

  render()
  {
    return component(If, this.state.is_owner,

      // Dono da vaga.
      div(null, [ this.renderOwner({...this.state}), this.renderInviteModal({...this.state}) ]),

      // Não é o dono da vaga.
      div(null, [ this.renderNotOwner({...this.state}), this.renderInviteModal({...this.state}) ]),
    );
  }

  /***
   * renderOwner
   * Renderiza o layout com a seção de candidatos a vaga.
   */

  renderOwner({
    description,
    team_id,
    team_name,
    team_icon_url,
    role_name,
    role_icon_url,
    pending_invite_from
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
            button(
              {
                className: 'btn c-text-white c-bg-secondary w-100 mt-3',
                events: {
                  click: () => {
                    redirectTo(TEAM_ROUTE, { id: team_id });
                  }
                }
              },
              'Ir para o time'
            )
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
              button(
                {
                  className: 'btn c-text-white c-bg-secondary mt-3',
                  events: { click: this.onDeleteVacancy }
                },
                'Excluir vaga'
              ),
            )
          ]),
        ]),

        // Container com os candidatos a vaga.
        div({ className: 'my-4' }, [
          h5(null, 'Canditados'),
          hr(),
          mapTo('div', { className: 'd-flex flex-wrap justify-content-center c-bg-primary-dark py-2 px-2' }, this.state.candidates,
            (candidateId) => {
              const candidate = this.userRepository.get(candidateId);

              if (!candidate)
              {
                alert('Erro interno!');
                redirectTo(HOME_ROUTE);
                return null;
              }

              return (
                div({ key: candidateId, className: 'py-2 px-2' }, [
                  div({ className: 'p-3 c-bg-secondary', style: { borderRadius: '5px' } }, [
                    img({ src: candidate.img_url, style: { width: '10rem', height: '10rem' } }),
                    h5({ className: 'text-center c-text-black' }, candidate.name),
                  ]),

                  component(If, pending_invite_from === candidateId,

                    // Remover convite.
                    button(
                      {
                        className: 'btn c-bg-primary c-text-white w-100 mt-3',
                        events: { click: () => { this.onUninviteCandidate(candidateId) } }
                      },
                      'Desconvidar'
                    ),

                    // Enviar convite.
                    button(
                      {
                        className: `btn c-bg-primary c-text-white w-100 mt-3 ${pending_invite_from ? 'disabled' : ''}`,
                        events: {
                          click: () => {
                            if (!pending_invite_from)
                            {
                              this.onInviteCandidate(candidateId);
                            }
                          }
                        }
                      },
                      'Convidar'
                    ),
                  ),
                ])
              );
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
    team_id,
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
            button(
              {
                className: 'btn c-text-white c-bg-secondary w-100 mt-3',
                events: {
                  click: () => {
                    redirectTo(TEAM_ROUTE, { id: team_id });
                  }
                }
              },
              'Ir para o time'
            )
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
                  button({ className: 'btn c-text-white c-bg-secondary mt-3', events: { click: this.onRemoveCandidate } }, 'Remover candidatura'),

                  // Não estar cadastrado.
                  button({ className: 'btn c-text-white c-bg-secondary mt-3', events: { click: this.onCandidate } }, 'Candidatar'),
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

  /***
   * renderInviteModal
   */

  renderInviteModal({
    team_name,
    team_icon_url,
    role_name,
    role_icon_url,
  })
  {
    /***
     * acceptInvite
     */

    function acceptInvite()
    {
      if (this.user)
      {
        const vacancy = this.vacancyRepository.get(this.ctrl.params.id);

        if (!vacancy)
        {
          redirectTo(HOME_ROUTE);
          return;
        }

        const team = this.teamRepository.get(vacancy.team_id);
        const role = this.roleRepository.get(vacancy.role_id);
        const administrator = this.userRepository.get(team.owner_id);

        if (!administrator)
        {
          redirectTo(HOME_ROUTE);
          return;
        }
        
        // Envia notificação ao jogador.
        sendNotification(
          'Convite aceito',
          `Ola ${administrator.name}! O jogador ${this.user.name} aceitou seu convite para fazer parte do time ${team.name} como ${role.name}.`,
          null,
          administrator.id
        );

        // Adiciona usuario ao time.
        team.players.push(this.user.id);
        team.reserves.push(this.user.id);
        this.teamRepository.update(team);

        // Atualiza o jogador.
        if (!this.user.participated_teams?.includes(team.id))
        {
          this.user.participated_teams.push(team.id);
          this.userRepository.update(this.user);

          // Atualiza controller.
          this.ctrl.appState.store(USER_INFO, this.user);
        }

        // Envia notificação ao jogadores não selecionados.
        vacancy?.candidates.forEach((candidateId) => {
          if (this.user.id !== candidateId)
          {
            const candidate = this.userRepository.get(candidateId);

            sendNotification(
              'Vaga preenchida',
              `Ola ${candidate.name}! Lamentamos informar que a vaga de ${role.name} para o time ${team.name} foi preechida e vocè não foi selecionado, boa sorte na proxima =).`,
              null,
              candidateId
            );
          }
        });

        // Apaga vaga.
        this.vacancyRepository.delete(vacancy.id);

        // Redireciona para a home.
        redirectTo(HOME_ROUTE);
      }
    }
    
    /***
     * rejectInvite
     */

    function rejectInvite()
    {
      if (this.user)
      {
        const vacancy = this.vacancyRepository.get(this.ctrl.params.id);

        if (!vacancy)
        {
          redirectTo(HOME_ROUTE);
          return;
        }

        const team = this.teamRepository.get(vacancy.team_id);
        const role = this.roleRepository.get(vacancy.role_id);
        const administrator = this.userRepository.get(team.owner_id);

        if (!administrator)
        {
          redirectTo(HOME_ROUTE);
          return;
        }
        
        // Envia notificação ao jogador.
        sendNotification(
          'Convite rejeitado',
          `Ola ${administrator.name}! O jogador ${this.user.name} rejeitou seu convite para fazer parte do time ${team.name} como ${role.name}.`,
          null,
          administrator.id
        );

        // Remove jogador da vaga.
        vacancy.candidates.splice(vacancy.candidates.indexOf(this.user.id), 1);
        vacancy.pending_invite_from = null;
        this.vacancyRepository.update(vacancy);

        // Remove fundo preto do bootstrap.
        const bsBackdrops = document.getElementsByClassName('modal-backdrop')
        for (let i = 0; i < bsBackdrops.length; i++)
        {
          bsBackdrops[i].remove();
        }

        // Atualiza a pagina.
        this.onUpdate?.();
      }
    }

    return (
      div({ id: "inviteModal", className: "modal", tabindex: "-1", data: { bsBackdrop: "static" } },
        div({ className: "modal-dialog" },
          div({ className: "modal-content" }, [
            div({ className: "modal-header" }, [
              h5({ className: "modal-title" }, 'Convite para a vaga'),
            ]),
            div({ className: "modal-body" }, 
              div({ className: "row" }, [
                div({ className: "col-6" }, 
                  div({ className: 'c-bg-primary p-4', style: { borderRadius: '5px' } }, [
                    img({ src: team_icon_url, className: 'w-100' }),
                    h5({ className: 'c-text-white text-center p-2' }, team_name)
                  ]),             
                ),
                div({ className: "col-6" },
                  div({ className: 'p-4' }, [
                    img({ src: role_icon_url, className: 'w-100' }),
                    h5({ className: 'text-center p-2' }, role_name)
                  ]),
                )
              ])
            ),
            div({ className: "d-flex modal-footer" }, [

              // Rejeitar convite
              button(
                {
                  type: "button",
                  className: "btn c-bg-secondary flex-fill",
                  events: { click: () => { rejectInvite.bind(this)?.() }}
                },
                'Rejeitar convite'
              ),

              // Aceitar convite
              button(
                {
                  type: "button",
                  className: "btn c-bg-primary c-text-white flex-fill",
                  events: { click: () => { acceptInvite.bind(this)?.() }}
                },
                'Aceitar convite'
              ),
            ])
          ])
        )
      )
    );
  }
}