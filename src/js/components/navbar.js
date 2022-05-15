import { Component } from "../framework/component.js";
import { If } from '../framework/std-components.js';
import { ul, li, a, span, img, component } from '../framework/elements.js';
import { USER_INFO } from "../framework/state.js";

/***
 * Navbar
 * Componente responsavel por controlar as actions da TopBar.
 * Props:
 *    onAction: Função chamada para disparar os eventos da action bar,
 *              recebe como parametro um texto com a identificação da
 *              action acionada.
 */

export class Navbar extends Component
{
  constructor(props)
  {
    super(props);
  }

  onClick(evt)
  {
    const { currentTarget } = evt;
    evt.preventDefault();
    this.props.onAction?.(currentTarget.dataset['action']);
  }

  render()
  {
    return (
      component(If, !this.ctrl.appState.load(USER_INFO),
      
        // Não logado
        ul({ className: 'nav' },
          li({ className: 'nav-item'},
            a({ href: '#', className: 'nav-link nav-link-c d-flex flex-column align-items-center grey-200', data: { action: 'entrar' }, events: { click: this.onClick.bind(this) }},
              span({ className: 'c-icon c-bg-primary-dark' },
                img({ src: 'imgs/arrow-right-to-bracket-solid.svg' })
              )
            )
          )
        ),

        // Logado.
        ul({ className: 'nav' }, [
          li({ className: 'nav-item'},
            a({ href: '#', className: 'nav-link nav-link-c d-flex flex-column align-items-center grey-200', data: { action: 'notificações' }, events: { click: this.onClick.bind(this) }},
              span({ className: 'c-icon c-bg-primary-dark' },
                img({ src: 'imgs/bell-solid.svg' })
              )
            )
          ),
          li({ className: 'nav-item'},
            a({ href: '#', className: 'nav-link nav-link-c d-flex flex-column align-items-center grey-200', data: { action: 'minha equipe' }, events: { click: this.onClick.bind(this) }},
              span({ className: 'c-icon c-bg-primary-dark' },
                img({ src: 'imgs/users-solid.svg' })
              )
            )
          ),
          li({ className: 'nav-item'},
            a({ href: '#', className: 'nav-link nav-link-c d-flex flex-column align-items-center grey-200', data: { action: 'perfil' }, events: { click: this.onClick.bind(this) }},
              span({ className: 'c-icon c-bg-primary-dark' },
                img({ src: 'imgs/user-solid.svg' })
              )
            )
          ),
          li({ className: 'nav-item'},
            a({ href: '#', className: 'nav-link nav-link-c d-flex flex-column align-items-center grey-200', data: { action: 'sair' }, events: { click: this.onClick.bind(this) }},
              span({ className: 'c-icon c-bg-primary-dark' },
                img({ src: 'imgs/right-from-bracket-solid.svg' })
              )
            )
          )
        ])
      )
    );
  }
}