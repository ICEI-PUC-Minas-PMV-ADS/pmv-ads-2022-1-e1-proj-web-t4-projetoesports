import { Component } from "../framework/component.js";
import { If } from '../framework/std-components.js';
import { div, ul, li, a, span, img, component, mapTo } from '../framework/elements.js';
import { USER_INFO } from "../framework/state.js";

import { NotificationRepository } from '../repositories/notification_repository.js';

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

    this.state = {
      notification_count: 0,
      notifications: [],
      show_notifications: false
    };

    this.notificationRepository = new NotificationRepository();
    this.updateNoficationData = this.updateNoficationData?.bind(this);
  }

  /***
   * onInitialize
   */

  onInitialize()
  {
    this.updateNoficationData();
  }

  /***
   * onDidUpdate
   */

  onDidUpdate()
  {
    this.updateNoficationData();
  }

  /***
   * updateNoficationData
   */

  updateNoficationData()
  {
    const userInfo = this.ctrl.appState.load(USER_INFO);
    
    if (userInfo && userInfo.id !== undefined && userInfo.id !== null)
    {
      const notifications = this.notificationRepository.getAll();
      const user_notifications = notifications.filter((notification) => notification.receiver_id === userInfo.id);
      const not_viewed_notification_count = user_notifications.reduce((acc, notification) => notification.viewed ? acc : acc + 1, 0);

      this.setState({
        notification_count: not_viewed_notification_count,
        notifications: user_notifications,
        show_notifications: user_notifications.length ? this.state.show_notifications : false,
      });
    }
    else
    {
      this.setState({
        show_notifications: false,
      });
    }
  }

  /***
   * onClick
   */

  onClick(evt)
  {
    const { currentTarget } = evt;
    evt.preventDefault();
    
    if (currentTarget.dataset['action'] === 'notificações' && this.state.notifications?.length) {

      this.state.notifications.forEach((notification) => {
        this.notificationRepository.update({...notification, viewed: true});
      });

      this.setState({
        show_notifications: !this.state.show_notifications
      });

    } else {
      this.props.onAction?.(currentTarget.dataset['action']);
    }
  }

  /***
   * render
   */

  render()
  {
    /***
     * deleteNotification
     */

    const deleteNotification = (evt, notification_id) =>
    {
      evt.preventDefault();
      
      this.notificationRepository.delete(notification_id);

      this.updateNoficationData();
    }

    return (
      component(If, !this.ctrl.appState.load(USER_INFO),
      
        // Não logado
        ul({ className: 'nav' },
          li({ className: 'nav-item'},
            a({ href: '#', className: 'nav-link nav-link-c d-flex flex-column align-items-center grey-200', data: { action: 'entrar' }, events: { click: this.onClick.bind(this) }},
              span({ className: 'c-icon c-bg-primary-dark'},
                img({ src: 'imgs/arrow-right-to-bracket-solid.svg' })
              )
            )
          )
        ),

        // Logado.
        ul({ className: 'nav' }, [

          // Botão de notificações.
          li({ className: 'nav-item' }, [
            a({ href: '#', className: 'nav-link nav-link-c d-flex flex-column align-items-center grey-200', data: { action: 'notificações' }, events: { click: this.onClick.bind(this) }},
              span({ className: 'c-icon c-bg-primary-dark', style: { position: 'relative' } }, [
                img({ src: 'imgs/bell-solid.svg' }),
                div({ style: {
                    display: this.state.notification_count > 0 ? 'block' : 'none',
                    position: 'absolute',
                    backgroundColor: '#f09eea',
                    textAlign: 'center',
                    color: 'black',
                    width: '0.95rem',
                    height: '0.95rem',
                    borderRadius: '50%',
                    right: 0,
                    top: 0,
                    fontSize: '0.7rem',
                  }
                }, this.state.notification_count),
              ])
            ),

            // Container de noficações.
            mapTo('div', { className: `notification-container ${this.state.show_notifications ? '' : 'hide'}` }, this.state.notifications,
              ({ id: nid, title, body, redirect_url }) => (
                div({ key: nid, className: 'd-flex' }, [
                  div({ className: 'flex-fill' }, [
                    div({ style: { fontWeight: 'bold' } }, title),
                    div({ className: 'c-text-grey-700 pe-4', align: 'justify' }, body),
                  ]),
                  div({ className: 'd-flex flex-column justify-content-center' }, [

                    // Botão para redirecionar para url.
                    component(If, redirect_url !== undefined && redirect_url !== null,
                      a({ href: redirect_url },
                        img({ src: 'imgs/location-crosshairs-solid.svg', style: { width: '1rem', height: '1rem' } })
                      ),
                    ),

                    // Botão para deletar notificação
                    a({
                        href: '#',
                        events: { click: (evt) => deleteNotification(evt, nid) }
                      },
                      img({ src: 'imgs/trash-can-solid.svg', style: { width: '1rem', height: '1rem' } })
                    ),
                  ]),
                ])
              )
            )
          ]),

          // Botão minhas equipes.
          li({ className: 'nav-item'},
            a({ href: '#', className: 'nav-link nav-link-c d-flex flex-column align-items-center grey-200', data: { action: 'minha equipe' }, events: { click: this.onClick.bind(this) }},
              span({ className: 'c-icon c-bg-primary-dark' },
                img({ src: 'imgs/users-solid.svg' })
              )
            )
          ),

          // Botão meu perfil.
          li({ className: 'nav-item'},
            a({ href: '#', className: 'nav-link nav-link-c d-flex flex-column align-items-center grey-200', data: { action: 'perfil' }, events: { click: this.onClick.bind(this) }},
              span({ className: 'c-icon c-bg-primary-dark' },
                img({ src: 'imgs/user-solid.svg' })
              )
            )
          ),

          // Botão sair.
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