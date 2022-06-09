import { Component } from "../framework/component.js";
import { div, component, h5, h4, nav, a, p, hr, li, img, mapTo } from '../framework/elements.js';
import { USER_INFO } from "../framework/state.js";
import { Switch } from '../framework/std-components.js';

import { UserRepository } from '../repositories/user_repository.js';
import { HOME_ROUTE, redirectTo } from '../helpers/routes.js';

/***
 * Constantes
 */

const PROFILE_IMG              = 'imgs/RC.png';

const SECTION_SOBRE            = 'sobre';
const SECTION_EQUIPE      = 'equipe';
const SECTION_VAGAS          = 'vagas';
 
export const SECTION_DEFAULT   = SECTION_SOBRE;

const SOBRE_SECTION_INFOS   = 'Informações Gerais';
const SOBRE_SECTION_CONTATO    = 'Contato';

const SOBRE_SECTION_DEFAULT    = SOBRE_SECTION_INFOS;

const OPTION_ALTERAR_FOTO      = 'alterar foto';
const OPTION_ALTERAR_PERFIL    = 'alterar perfil';
const OPTION_DELETAR_PERFIL    = 'deletar perfil';

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

    this.userRepository = new UserRepository();

    this.renderSobreSection              = this.renderSobreSection?.bind(this);
    this.renderEquipeSection        = this.renderEquipeSection?.bind(this);
    this.renderVagasSection            = this.renderVagasSection?.bind(this);

    this.renderSobreSectionInfos      = this.renderSobreSectionInfos?.bind(this);
    this.renderSobreSectionContato       = this.renderSobreSectionContato?.bind(this);

    this.user = (
      this.ctrl.params?.id
        ? this.userRepository.get(this.ctrl.params?.id)
        : this.ctrl.appState.load(USER_INFO)
    );
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

    const img_url = this.user?.img_url || PROFILE_IMG;

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
        case OPTION_ALTERAR_FOTO:
          {}
          break;

        case OPTION_ALTERAR_PERFIL:
          {}
          break;

        case OPTION_DELETAR_PERFIL:
          {
            if (1)
            {}
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
                  img({ className: "w-100", src: img_url, style: { borderRadius: '50%' } })
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
   * Renderiza a seção sobre.
   */

  renderEquipeSection()
  {
    const game_statistics = this.user?.game_statistics || [];

    return (
      div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
        div({ className: "container mt-5" }, 
          div({ className: "d-flex p-3 mb-5", style: { backgroundColor: '#261423', minHeight: '30rem', borderRadius: '5px' } }, [
            div({ className: 'flex-fill', style: { color: 'white' } }, [
              h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, 'Equipe'),
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
   * renderVagasSection
   * Renderiza a seção vagas.
   */

  renderVagasSection()
  {
    const game_roles = this.user?.game_roles || [];

    return (
      div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
        div({ className: "container mt-5" }, 
          div({ className: "d-flex p-3 mb-5", style: { backgroundColor: '#261423', minHeight: '30rem', borderRadius: '5px' } }, [
            div({ className: 'flex-fill', style: { color: 'white' } }, [
              h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, 'Vagas'),
              mapTo('div', null, game_roles, (game_role, index) => (
                p({ key: index }, game_role)
              )),
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
      p(null, this.user?.objective)
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
}