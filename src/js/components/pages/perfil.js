import { Component } from "../../framework/component.js";
import { div, component, h5, h4, nav, a, p, ul, li, img, mapTo } from '../../framework/elements.js';
import { Switch } from '../../framework/std-components.js';

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

/***
 * PerfilPage
 * Component responsavel por renderizar o carrocel de noticias.
 * Props:
 *    news: Recebe o array com os objetos que representam a noticia.
 */

export class PerfilPage extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      section: SECTION_DEFAULT,
      sobreSection: SOBRE_SECTION_DEFAULT,
    };

    this.renderSobreSection              = this.renderSobreSection?.bind(this);
    this.renderEstatisticaSection        = this.renderEstatisticaSection?.bind(this);
    this.renderFuncoesSection            = this.renderFuncoesSection?.bind(this);

    this.renderSobreSectionObjetivo      = this.renderSobreSectionObjetivo?.bind(this);
    this.renderSobreSectionMinhasEquipes = this.renderSobreSectionMinhasEquipes?.bind(this);
    this.renderSobreSectionContato       = this.renderSobreSectionContato?.bind(this);
  }

  render()
  {
    const { section } = this.state;

    const img_url = this.props.userInfo?.img_url || PROFILE_IMG;

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
                  h4({ className: "m-0", style: { color: 'white' } }, this.props.userInfo?.name)
                )
              ])
            ),

            div({ className: "c-ret", style: { height: '3rem', borderBottom: '1px solid #888' } },
              a({ href: "#", style: { fontSize: '2rem', float: 'right', color: 'white'} }, '...')
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

        div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
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
    const game_statistics = this.props.userInfo?.game_statistics || [];

    return (
      div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
        div({ className: "container mt-5" }, 
          div({ className: "d-flex p-3 mb-5", style: { backgroundColor: '#261423', minHeight: '30rem', borderRadius: '5px' } }, [
            div({ className: 'flex-fill', style: { color: 'white' } }, [
              h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, 'Estatísticas'),
              mapTo('div', null, game_statistics, (statistic) => (
                p(null, statistic)
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
    const game_roles = this.props.userInfo?.game_roles || [];

    return (
      div({ className: "flex-fill", style: { backgroundColor: '#591E55' } },
        div({ className: "container mt-5" }, 
          div({ className: "d-flex p-3 mb-5", style: { backgroundColor: '#261423', minHeight: '30rem', borderRadius: '5px' } }, [
            div({ className: 'flex-fill', style: { color: 'white' } }, [
              h5({ className: "pb-2", style: { borderBottom: '1px solid #888' } }, 'Funções'),
              mapTo('div', null, game_roles, (game_role) => (
                p(null, game_role)
              )),
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
      p(null, this.props.userInfo?.objective)
    );
  }

  /***
   * renderSobreSectionMinhasEquipes
   * Renderiza a sub seção com minhas equipes.
   */

  renderSobreSectionMinhasEquipes()
  {
    return (
      div(null, 'Minhas equipes #')
    );
  }

  /***
   * renderSobreSectionContato
   * Renderiza a sub seção com contatos.
   */

  renderSobreSectionContato()
  {
    const contatos = this.props.userInfo?.contact_info || [];

    return (
      div(null, 
        mapTo('ul', null, contatos, (contato) => (
          li(null, contato)
        ))
      )
    );
  }  
}