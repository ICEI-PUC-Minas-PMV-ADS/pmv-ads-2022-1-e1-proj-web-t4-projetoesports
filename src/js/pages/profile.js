import { Component } from "../framework/component.js";
import { div, component, h5, h4, nav, a, p, hr, li, img, mapTo, input, button } from '../framework/elements.js';
import { USER_INFO } from "../framework/state.js";
import { Switch } from '../framework/std-components.js';
import { If } from '../framework/std-components.js';

import { UserRepository } from '../repositories/user_repository.js';
import { HOME_ROUTE, TEAM_ROUTE, redirectTo } from '../helpers/routes.js';
import { RoleRepository } from "../repositories/role_repository.js";
import { GameRepository } from "../repositories/game_repository.js";
import { TeamRepository } from "../repositories/team_repository.js";

/***
 * Constantes
 */

const PROFILE_IMG              = 'imgs/RC.png';

const SECTION_SOBRE            = 'sobre';
const SECTION_ESTATISTICA      = 'estatistica';
const SECTION_FUNCOES          = 'funcoes';
 
export const SECTION_DEFAULT   = SECTION_SOBRE;

const SOBRE_SECTION_OBJETIVO   = 'Objetivo';
const SOBRE_SECTION_EQUIPES    = 'Minhas equipes';
const SOBRE_SECTION_CONTATO    = 'Contato';

const SOBRE_SECTION_DEFAULT    = SOBRE_SECTION_OBJETIVO;

const OPTION_ALTERAR_FOTO      = 'alterar foto';
const OPTION_ALTERAR_PERFIL    = 'alterar perfil';
const OPTION_DELETAR_PERFIL    = 'deletar perfil';

/***
 * ProfilePage
 * Component responsavel por renderizar o carrocel de noticias.
 * Props:
 *    news: Recebe o array com os objetos que representam a noticia.
 */

export class ProfilePage extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      section: SECTION_DEFAULT,
      sobreSection: SOBRE_SECTION_DEFAULT,
      contextMenu: false,
    };

    this.userRepository = new UserRepository();
    this.roleRepository = new RoleRepository();
    this.gameRepository = new GameRepository();
    this.teamRepository = new TeamRepository();

    this.renderSobreSection              = this.renderSobreSection?.bind(this);
    this.renderEstatisticaSection        = this.renderEstatisticaSection?.bind(this);
    this.renderFuncoesSection            = this.renderFuncoesSection?.bind(this);

    this.renderSobreSectionObjetivo      = this.renderSobreSectionObjetivo?.bind(this);
    this.renderSobreSectionMinhasEquipes = this.renderSobreSectionMinhasEquipes?.bind(this);
    this.renderSobreSectionContato       = this.renderSobreSectionContato?.bind(this);

    this.user = (
      this.ctrl.params?.id
        ? this.userRepository.get(this.ctrl.params?.id)
        : this.ctrl.appState.load(USER_INFO)
    );

    this.userRoles = [];
    this.user?.game_roles?.forEach((roleId) => {
      this.userRoles.push(this.roleRepository.get(roleId));
    });

    this.userTeams = [];
    this.user?.participated_teams.forEach((teamId) => {
      this.userTeams.push(this.teamRepository.get(teamId));
    });
  }

  /***
   * onInitialize
   */

  onInitialize()
  {
    if (!this.user)
    {
      redirectTo(HOME_ROUTE);
    }
  }

  /***
   * onDidUpdate
   */

  onDidUpdate()
  {
    if (!this.user)
    {
      redirectTo(HOME_ROUTE);
    }
  }

  /***
   * render
   */

  render()
  {
    const { contextMenu, section } = this.state;

    const img_url = this.user?.img_url || PROFILE_IMG;

    const section_components = {};

    section_components[SECTION_SOBRE]       = this.renderSobreSection();
    section_components[SECTION_ESTATISTICA] = this.renderEstatisticaSection();
    section_components[SECTION_FUNCOES]     = this.renderFuncoesSection();

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
        case OPTION_ALTERAR_FOTO:
          {
            document.getElementById('inputFile').click();;
            const querySelector = document.querySelector("#inputFile");
            querySelector.user = this.user;
            querySelector.userRepository = this.userRepository;
            querySelector.addEventListener("change", function() {
              this.user.img_url = "imgs/" + this.files[0].name
              this.userRepository.update(this.user);
            })
          }
          break;

        case OPTION_ALTERAR_PERFIL:
          {
            let index = 1;
            
            this.user.name = prompt("Nome de usuário:", this.user.name);

            this.user.game_statistics?.forEach(estatistica =>{
              this.user.game_statistics[index - 1] = prompt("Estatística " + index + " :", estatistica);
              index += 1;
            })
            index = 1;

            this.user.objective = prompt("Objetivo", this.user.objective)

            this.user.contact_info?.forEach(contato => {
              this.user.contact_info[index - 1] = prompt("Contato " + index + " :", contato)
              index += 1;
            })

            this.userRepository.update(this.user);
          }
          break;

        case OPTION_DELETAR_PERFIL:
          {
            let equipes = [];
            this.user.participated_teams?.forEach(equipeId => {
              equipes.push(this.teamRepository.get(equipeId));
            })

            equipes.forEach(equipe => {
              equipe.players.filter(playerId => playerId !== this.user.id);
              equipe.active_players.filter(playerId => playerId !== this.user.id );
              equipe.reserves.filter(playerId => playerId !== this.user.id );
              
              this.teamRepository.update(equipe);
            });

            this.userRepository.delete(this.user.id);
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
                  img({ className: "w-100", src: this.user?.img_url, style: { borderRadius: '50%' } })
                ),
                
                div({ className: "d-flex align-items-end" },
                  // Nome do jogador.
                  h4({ className: "m-0", style: { color: 'white' } }, this.user?.name)
                )
              ])
            ),

            div({ className: 'clearfix', style: { borderBottom: '1px solid white' } },
              div({ className: 'float-end', style: { height: '3rem', position: 'relative' } },
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
                          carnica: '',
                          events: { click: (evt) => { onContextOptionClick(evt, OPTION_ALTERAR_FOTO) } },
                          style: { textDecoration: 'none', color: 'black' },
                        }, 'Alterar foto')
                      ),
                      div(null,
                        a({
                          href: '#',
                          events: { click: (evt) => { onContextOptionClick(evt, OPTION_ALTERAR_PERFIL) } },
                          style: { textDecoration: 'none', color: 'black' },
                        }, 'Alterar perfil')
                      ),
                      hr(),
                      div(null,
                        a({
                          href: '#',
                          events: { click: (evt) => { onContextOptionClick(evt, OPTION_DELETAR_PERFIL) } },
                          style: { textDecoration: 'none', color: 'black' },
                        }, 'Deletar perfil')
                      ),
                  ])
                ])
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
                  className: `nav-link c-nav-link-header ${checkSectionActive(SECTION_ESTATISTICA)}`,
                  events: { click: (evt) => { onSectionClick(evt, SECTION_ESTATISTICA) } },
                  href: "#" 
                }, 'Estatística'),

                a({
                  className: `nav-link c-nav-link-header ${checkSectionActive(SECTION_FUNCOES)}`,
                  events: { click: (evt) => { onSectionClick(evt, SECTION_FUNCOES) } },
                  href: "#"
                }, 'Funções')
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
  callrepository(){
    console.log(this.user);
  }
  renderSobreSection()
  {
    const { sobreSection } = this.state;

    const sobre_section_components = [];

    sobre_section_components[SOBRE_SECTION_OBJETIVO] = this.renderSobreSectionObjetivo();
    sobre_section_components[SOBRE_SECTION_EQUIPES]  = this.renderSobreSectionMinhasEquipes();
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
                  className: `nav-link c-sobre-sidebar ${checkSelectedSection(SOBRE_SECTION_OBJETIVO)}`,
                  events: { click: (evt) => { onSectionClick(evt, SOBRE_SECTION_OBJETIVO) } },
                  href: "#"
                }, 'Objetivo'),

                a({
                  className: `nav-link c-sobre-sidebar ${checkSelectedSection(SOBRE_SECTION_EQUIPES)}`,
                  events: { click: (evt) => { onSectionClick(evt, SOBRE_SECTION_EQUIPES) } },
                  href: "#"
                }, 'Minhas Equipes'),

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
   * renderEstatisticaSection
   * Renderiza a seção sobre.
   */

  renderEstatisticaSection()
  {
    const game_statistics = this.user?.game_statistics || [];

    return (
      div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
        div({ className: "container mt-5" }, 
          div({ className: "d-flex p-3 mb-5", style: { backgroundColor: '#261423', minHeight: '30rem', borderRadius: '5px' } }, [
            div({ className: 'flex-fill', style: { color: 'white' } }, [
              h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, 'Estatísticas'),
              mapTo('div', null, game_statistics, (statistic, index) => (
                p({ key: index }, statistic)
              )),
            ])
          ])
        )
      )
    );
  }

  /***
   * renderFuncoesSection
   * Renderiza a seção funções.
   */

  renderFuncoesSection()
  {
    return (
      div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
        div({ className: "container mt-5" }, 
          div({ className: "d-flex p-3 mb-5", style: { backgroundColor: '#261423', minHeight: '30rem', borderRadius: '5px' } }, [
            div({ className: 'flex-fill', style: { color: 'white' } }, [
              h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, 'Funções'),
              
              component(If, this.userRoles.length > 0, 
                  div({ className: 'div', style: {border: '2px', display: 'table', maxWidth: '240px', borderSpacing:'16px'}}, [
                    mapTo('div', null, this.userRoles,
                      ({id, name, icon_url, game_id}) => {
                        const { name: game_name } = this.gameRepository.get(game_id);

                        return div({ key: id, className: 'c-bg-primary-dark p-4', style: { borderRadius: '5px', cursor: 'pointer', display: 'table-cell', backgroundColor: 'rgba(255, 255, 255, 0.1)'  }}, [  
                          div(null, [
                            img({ className: "w-100", src: icon_url, style: { borderRadius: '50%' } },),
                            h5({ className: 'text-center p-2' }, game_name)
                          ]),
                          h5({ className: 'text-center p-2' }, name)
                        ])
                      }
                    )
                  ])
              )
            ])
          ])
        )
      )
    );
  }

  /***
   * renderSobreSectionObjetivo
   * Renderiza a sub seção com objetivo.
   */

  renderSobreSectionObjetivo()
  {
    return (
      p(null, this.user?.objective)
    );
  }

  /***
   * renderSobreSectionMinhasEquipes
   * Renderiza a sub seção com minhas equipes.
   */

  renderSobreSectionMinhasEquipes()
  {
    return (
      div({ className: "flex-fill", },
            div({ className: 'flex-fill' }, [
              component(If, this.userTeams.length > 0, 
                  div({ className: 'div', style: {border: '2px', display: 'table', maxWidth: '240px', borderSpacing:'16px'}}, [
                    mapTo('div', null, this.userTeams,
                      ({id, name, icon_url}) => {
                        return div({ key: id, style: { borderRadius: '5px', cursor: 'pointer', display: 'table-cell'  }, 
                        events: { click: () => { redirectTo(TEAM_ROUTE, { id }) }}}, [  
                          div(null, [
                            img({ className: "w-100", src: icon_url, style: { borderRadius: '50%' } },),
                          ]),
                          h5({ className: 'text-center p-2' }, name)
                        ])
                      }
                    )
                  ])
              )
            ])
      )
    );
  }

  /***
   * renderSobreSectionContato
   * Renderiza a sub seção com contatos.
   */

  renderSobreSectionContato()
  {
    const contatos = this.user?.contact_info || [];

    return (
      div(null, 
        mapTo('ul', null, contatos, (contato, index) => (
          li({ key: index }, contato)
        ))
      )
    );
  }  

  abrirPerfilInput()
  {
   return (
     input({type:'file', accept: 'image/png, image/jpeg'})
   );
  }
}