import { Component } from "../framework/component.js";
import { div, component, h5, h4, h6, nav, a, p, hr, li, img, mapTo } from '../framework/elements.js';
import { If } from '../framework/std-components.js';

import { USER_INFO } from "../framework/state.js";
import { Switch } from '../framework/std-components.js';

import { UserRepository } from '../repositories/user_repository.js';
import { TeamRepository } from '../repositories/team_repository.js';
import { VacancyRepository } from '../repositories/vacancy_repository.js';
import { RoleRepository } from '../repositories/role_repository.js';

import { VACANCY_ROUTE, CREATE_VACANCY_ROUTE, redirectTo } from '../helpers/routes.js';
import { GameRepository } from "../repositories/game_repository.js";

/***
 * Constantes
 */

const PROFILE_IMG              = 'imgs/icone_time.png';

const SECTION_SOBRE            = 'sobre';
const SECTION_EQUIPE      = 'equipe';
const SECTION_VAGAS          = 'vagas';
 
export const SECTION_DEFAULT   = SECTION_SOBRE;

const SOBRE_SECTION_INFOS   = 'Informações Gerais';
const SOBRE_SECTION_CONTATO    = 'Contato';

const SOBRE_SECTION_DEFAULT    = SOBRE_SECTION_INFOS;

const OPTION_NOVA_VAGA         = 'nova vaga';
const OPTION_ALTERAR_FOTO      = 'alterar foto';
const OPTION_ALTERAR_EQUIPE    = 'alterar equipe';
const OPTION_DELETAR_EQUIPE    = 'deletar equipe';

/***
 * TeamPage
 * Component responsavel por renderizar o carrocel de noticias.
 * Props:
 *    news: Recebe o array com os objetos que representam a noticia.
 */

export class TeamPage extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      section: SECTION_DEFAULT,
      sobreSection: SOBRE_SECTION_DEFAULT,
      contextMenu: false,
    };

    this.teamRepository = new TeamRepository();
    this.userRepository = new UserRepository();
    this.vacancyRepository = new VacancyRepository();
    this.roleRepository = new RoleRepository();
    this.gameRepository = new GameRepository();

    this.renderSobreSection = this.renderSobreSection?.bind(this);
    this.renderEquipeSection = this.renderEquipeSection?.bind(this);
    this.renderVagasSection = this.renderVagasSection?.bind(this);

    this.renderSobreSectionInfos = this.renderSobreSectionInfos?.bind(this);
    this.renderSobreSectionContato = this.renderSobreSectionContato?.bind(this);

    this.team = (
      this.ctrl.params?.id
        ? this.teamRepository.get(this.ctrl.params?.id)
        : this.ctrl.appState.load(USER_INFO)
    );

    this.vacancies = [];
    this.team?.vacancies.forEach((vacancyId) => {
      this.vacancies.push(this.vacancyRepository.get(vacancyId));
    });

    this.active_players = [];
    this.reserves = [];

    this.team?.active_players.forEach((playerId) => {
      this.active_players.push(this.userRepository.get(playerId));
    });

    this.team?.reserves.forEach((playerId) => {
      this.reserves.push(this.userRepository.get(playerId));
    });

    this.loggedUser = this.teamRepository.getLoggedUser();
  }

  /***
   * onInitialize
   */

  onInitialize()
  {
    
  }

  /***
   * onDidUpdate
   */

  onDidUpdate()
  {
  }

  /***
   * render
   */

  render()
  {
    const { contextMenu, section } = this.state;

    const img_url = this.team?.img_url || PROFILE_IMG;

    const section_components = {};

    section_components[SECTION_SOBRE]       = this.renderSobreSection();
    section_components[SECTION_EQUIPE] = this.renderEquipeSection();
    section_components[SECTION_VAGAS]     = this.renderVagasSection();

    /***
     * checkSectionActive
     * Verifica se a section esta ativa.
     */

    const checkSectionActive = (element_section) => (
      element_section === section ? 'active' : ''
    );

    /***
     * onSectionClick
     * Evento que altera o a section atual.
     */

    const onSectionClick = (evt, element_section) => {
      evt.preventDefault();
      this.setState({ section: element_section })
    };

    /***
     * onContextMenuClick
     * Mostra/esconde o menu de contexto.
     */

    const onContextMenuClick = (evt) => {
      evt.preventDefault();
      this.setState({ contextMenu: !contextMenu })
    };

    /***
     * onContextOptionClick
     * Evento disparado ao clicar em uma opção do menu de contexto.
     */

     const onContextOptionClick = (evt, option) => {
      evt.preventDefault();
      switch (option)
      {
        case OPTION_NOVA_VAGA:
          {
            let id = this.team.id;
            redirectTo(CREATE_VACANCY_ROUTE, { id })
          }
          break;

        case OPTION_ALTERAR_FOTO:
          {
            document.getElementById('inputFile').click();;
            const querySelector = document.querySelector("#inputFile");
            querySelector.team = this.team;
            querySelector.teamRepository = this.teamRepository;
            querySelector.addEventListener("change", function() {
              this.team.icon_url = "imgs/team_icons/" + this.files[0].name
              this.teamRepository.update(this.team);
              document.location.reload(true);
            })
          }
          break;

        case OPTION_ALTERAR_EQUIPE:
          {
            let index = 1;
            
            let teamName = prompt("Nome da equipe:", this.team.name);
            this.team.name = (teamName) ? teamName : this.team.name;

            let teamObjetivo = prompt("Objetivo", this.team.objective);
            this.team.objective = (teamObjetivo) ? teamObjetivo : this.team.objective
;
            this.team.contacts?.forEach(contato => {
              let teamContato =  prompt("Contato " + index + " :", contato)
              this.team.contacts[index - 1] = (teamContato) ? teamContato : this.team.contacts[index - 1];
              index += 1;
            })

            this.teamRepository.update(this.team);
          }
          break;

        case OPTION_DELETAR_EQUIPE:
          {
            let usuarios = [];
            this.team.players?.forEach(userId => {
              usuarios.push(this.userRepository.get(userId));
            })

            usuarios.forEach(usuario => {
              usuario.players.filter(teamId => teamId !== this.team.id);
              
              this.userRepository.update(usuario);
            });

            this.teamRepository.delete(this.team.id);
            redirectTo(HOME_ROUTE);
          }
          break;
      }

      // Esconde menu de contexto.
      this.setState({ contextMenu: !contextMenu });
    };

    return (
      div(null, [
        div({ className: "c-linear-header" },
          div({ className: "container" }, [
            div({ style: { backgroundColor: '#261423', height: '8rem', position: 'relative'} },
              div({ className: "d-flex", style: { position: 'absolute', bottom: '-2rem', left: '3rem' } }, [
                div({ style: { backgroundColor: 'white', padding: '0.2rem', width: '7rem', borderRadius: '50%' } },
                  // Imagem de perfil do jogador.
                  img({ className: "w-100", src: this.team?.icon_url, style: { borderRadius: '50%' } })
                ),
                
                div({ className: "d-flex align-items-end" },
                  // Nome do jogador.
                  h4({ className: "m-0", style: { color: 'white' } }, this.team?.name)
                )
              ])
            ),

            div({ className: 'clearfix', style: { borderBottom: '1px solid white' } },
              div({ className: 'float-end', style: { height: '3rem', position: 'relative' } },
              component(If, this.loggedUser.id === this.team.owner_id,
                div({ className: 'd-flex justify-content-end flex-column'}, [
                  div({ className: 'd-flex justify-content-end align-items-end' },
                    a({
                      href: "#",
                      style: { textDecoration: 'none', fontSize: '2rem', color: 'white'},
                      events: { click: (evt) => onContextMenuClick(evt) }
                    }, '...')
                  ),
                  
                  div({
                    style: { display: contextMenu ? 'block' : 'none',
                    width: '10rem', backgroundColor: 'white',
                    borderRadius: '0 0px 5px 5px',
                    padding: '0.5rem', zIndex: 10 } },[
                      div(null,
                        a({
                          href: '#',
                          events: { click: (evt) => { onContextOptionClick(evt, OPTION_NOVA_VAGA) } },
                          style: { textDecoration: 'none', color: 'black' },
                        }, 'Nova Vaga')
                      ),
                      hr(),
                      div(null,
                        a({
                          href: '#',
                          carnica: '',
                          events: { click: (evt) => { onContextOptionClick(evt, OPTION_ALTERAR_FOTO) } },
                          style: { textDecoration: 'none', color: 'black' },
                        }, 'Alterar foto')
                      ),
                      div(null,
                        a({
                          href: '#',
                          events: { click: (evt) => { onContextOptionClick(evt, OPTION_ALTERAR_EQUIPE) } },
                          style: { textDecoration: 'none', color: 'black' },
                        }, 'Alterar equipe')
                      ),
                      hr(),
                      div(null,
                        a({
                          href: '#',
                          events: { click: (evt) => { onContextOptionClick(evt, OPTION_DELETAR_EQUIPE) } },
                          style: { textDecoration: 'none', color: 'black' },
                        }, 'Deletar equipe')
                      ),
                  ])
                ])
              )
              )
            ),
            
            div(null,
              nav({ className: "nav" }, [
                a({
                  className: `nav-link c-nav-link-header ${checkSectionActive(SECTION_SOBRE)}`,
                  events: { click: (evt) => { onSectionClick(evt, SECTION_SOBRE) } },
                  href: "#" 
                }, 'Sobre'),

                a({
                  className: `nav-link c-nav-link-header ${checkSectionActive(SECTION_EQUIPE)}`,
                  events: { click: (evt) => { onSectionClick(evt, SECTION_EQUIPE) } },
                  href: "#" 
                }, 'Equipe'),

                a({
                  className: `nav-link c-nav-link-header ${checkSectionActive(SECTION_VAGAS)}`,
                  events: { click: (evt) => { onSectionClick(evt, SECTION_VAGAS) } },
                  href: "#"
                }, 'Vagas')
              ])
            )
          ])
        ),

        div({ className: "flex-fill", style: { backgroundColor: '#591E55', zIndex: 5 } },
          component(Switch, section, section_components)
        ),
      ])
    );
  }

  /***
   * renderSobreSection
   * Renderiza a seção sobre.
   */

  renderSobreSection()
  {
    const { sobreSection } = this.state;

    const sobre_section_components = [];

    sobre_section_components[SOBRE_SECTION_INFOS] = this.renderSobreSectionInfos();
    sobre_section_components[SOBRE_SECTION_CONTATO]  = this.renderSobreSectionContato();

    /***
     * checkSelectedSection
     * Verifica se a seção selecionada é a seção do parametro.
     */

    const checkSelectedSection = (selected_section) => (
      selected_section === sobreSection
        ? 'active'
        : ''
    );

    /***
     * onSectionClick
     * Executa o evento quando a seção for trocada.
     */

    const onSectionClick = (evt, section) => {
      evt.preventDefault();
      this.setState({ sobreSection: section });
    };

    return (
      div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
        div({ className: "container mt-5" }, 
          div({ className: "d-flex p-3 mb-5", style: { backgroundColor: '#261423', minHeight: '30rem', borderRadius: '5px' } }, [
            div({ className: "pe-3", style: { color: 'white', borderRight: '1px solid #888', minWidth: '12rem' } }, [
              h5(null, 'Sobre'),
              nav({ className: "nav flex-column nav-pills", style: { textAlign: 'center', marginTop: '3rem' } }, [
                a({
                  className: `nav-link c-sobre-sidebar ${checkSelectedSection(SOBRE_SECTION_INFOS)}`,
                  events: { click: (evt) => { onSectionClick(evt, SOBRE_SECTION_INFOS) } },
                  href: "#"
                }, 'Informações Gerais'),

                a({
                  className: `nav-link c-sobre-sidebar ${checkSelectedSection(SOBRE_SECTION_CONTATO)}`,
                  events: { click: (evt) => { onSectionClick(evt, SOBRE_SECTION_CONTATO) } },
                  href: "#"
                }, 'Contato')
              ])
            ]),

            div({ className: "flex-fill ps-4", style: { color: 'white' } }, [
              h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, sobreSection),
              component(Switch, sobreSection, sobre_section_components)
            ])
          ])
        )
      )
    );
  }

  /***
   * renderEquipeSection
   * Renderiza a seção sobre equipe.
   */

  renderEquipeSection()
  {
    return (
      div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
        div({ className: "container mt-5" }, 
          div({ className: "d-flex p-3 mb-5", style: { backgroundColor: '#261423', minHeight: '30rem', borderRadius: '5px' } }, [
            div({ className: 'flex-fill', style: { color: 'white' } }, [
              
              component(If, this.active_players?.length > 0, 
                div(null, [
                  h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, 'Time principal'),
                  div({ className: 'div', style: {border: '2px', display: 'table', maxWidth: '240px', borderSpacing:'16px'}}, [
                    mapTo('div', null, this.active_players,
                      ({ id, name, img_url }) => {
                        const { name: role_name } = this.roleRepository.get(this.active_players.find(x => x.id == id).id);

                        return div({ key: id, className: 'c-bg-primary-dark p-4', style: { borderRadius: '5px', cursor: 'pointer', display: 'table-cell', backgroundColor: 'rgba(255, 255, 255, 0.1)'  }}, [  
                          div(null, [
                            img({ className: "w-100", src: img_url, style: { borderRadius: '50%' } },),
                            h5({ className: 'text-center p-2' }, name)
                          ]),
                          h5({ className: 'text-center p-2' }, role_name)
                        ])
                      }
                    )
                  ])
                ])
              ),

              component(If, this.reserves?.length > 0, 
                div(null, [
                  h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, 'Reservas'),
                  div({ className: 'div', style: {border: '2px', display: 'table', maxWidth: '240px', borderSpacing:'16px'}}, [
                    mapTo('div', null, this.reserves,
                      ({ id, name, img_url }) => {
                        const { name: role_name } = this.roleRepository.get(this.reserves.find(x => x.id == id).id);

                        return div({ key: id, className: 'c-bg-primary-dark p-4', style: { borderRadius: '5px', cursor: 'pointer', display: 'table-cell', backgroundColor: 'rgba(255, 255, 255, 0.1)'  }}, [  
                          div(null, [
                            img({ className: "w-100", src: img_url, style: { borderRadius: '50%' } },),
                            h5({ className: 'text-center p-2' }, name)
                          ]),
                          h5({ className: 'text-center p-2' }, role_name)
                        ])
                      }
                    )
                  ])
                ])
              ),
            ])
          ])
        )
      )
    );
  }

  /***
   * renderVagasSection
   * Renderiza a seção vagas.
   */

  renderVagasSection()
  {
    return (
      div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
        div({ className: "container mt-5" }, 
          div({ className: "d-flex p-3 mb-5", style: { backgroundColor: '#261423', minHeight: '30rem', borderRadius: '5px' } }, [
            div({ className: 'flex-fill', style: { color: 'white' } }, [
              h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, 'Vagas'),

              component(If, this.vacancies?.length > 0, 
                div({ className: 'div', style: {border: '2px', display: 'table', borderSpacing:'16px'}}, [
                mapTo('div', null, this.vacancies,
                  ({ id, role_id, team_id }) => {
                    const { name: role_name, icon_url } = this.roleRepository.get(role_id);
                    const { id: game_id } = this.teamRepository.get(team_id);
                    const { name: game_name } = this.gameRepository.get(game_id);
        
                    return div({ key: id, className: 'c-bg-primary-dark p-4', style: { borderRadius: '5px', cursor: 'pointer', display: 'table-cell', backgroundColor: 'rgba(255, 255, 255, 0.1)'  },
                    events: { click: () => { redirectTo(VACANCY_ROUTE, { id }) }} }, [
                      div({ className: 'd-flex justify-content-between' }, [
                        h6({ }, game_name),
                      ]),            
                      hr({ style: { margin: '0.25rem 0' } }),
                      div(null, [
                        img({ src: icon_url, className: 'w-100' }),
                        h5({ className: 'text-center p-2' }, role_name)
                      ]),
                    ])
                  }
                )
              ])
            ),
            ])
          ])
        )
      )
    );
  }

  /***
   * renderSobreSectionInfos
   * Renderiza a sub seção com Infos.
   */

  renderSobreSectionInfos()
  {
    return (
      p(null, this.team?.objective)
    );
  }

  /***
   * renderSobreSectionContato
   * Renderiza a sub seção com contatos.
   */

  renderSobreSectionContato()
  {
    const contatos = this.team?.contacts || [];

    return (
      div(null, 
        mapTo('ul', null, contatos, (contato, index) => (
          li({ key: index }, contato)
        ))
      )
    );
  }  
}