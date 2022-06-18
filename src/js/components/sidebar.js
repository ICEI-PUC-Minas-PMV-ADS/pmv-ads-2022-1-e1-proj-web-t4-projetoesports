import { Component } from "../framework/component.js";
import { nav, ul, li, a, img, span } from '../framework/elements.js';

/***
 * Sidebar
 * Componente responsavel por controlar as actions da SideBar.
 */

export class Sidebar extends Component
{
  constructor(props)
  {
    super(props);

    this.renderSidebarItem = this.renderSidebarItem?.bind(this);
  }

  render()
  {
    return (
      nav({ className: 'h-100 c-bg-primary-dark', style: { width: '4rem' }}, 
        ul({ className: 'nav flex-column align-items-center pt-2', style: { width: '4rem' } }, [
          this.renderSidebarItem("imgs/newspaper-solid.svg",        "Noticias", "noticias.html"),
          this.renderSidebarItem("imgs/user-solid.svg",             "Jogadores", "jogadores.html"),
          this.renderSidebarItem("imgs/address-card-solid.svg",     "Vagas", "vagas_equipes.html"),
          this.renderSidebarItem("imgs/users-solid.svg",            "Equipes", "equipes.html"),
          this.renderSidebarItem("imgs/handshake-angle-solid.svg",  "Torneios", "torneios.html"),
        ])
      )
    );
  }

  renderSidebarItem(icon_url, title, url)
  {
    return (
      li({ className: 'nav-item mb-2' },
        a({ href: url, className: 'c-side-icon nav-link d-flex flex-column align-items-center m-0 px-3' }, [
          img({ src: icon_url }),
          span({ className: 'c-text-grey-300' }, title)
        ])
      )
    );
  }
}