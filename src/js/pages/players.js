import { Component } from "../framework/component.js";
import { div, h4, img, input, mapTo, span, a } from '../framework/elements.js';
import { redirectTo } from '../helpers/routes.js';

import { UserRepository } from "../repositories/user_repository.js";

const PAGE_SIZE = 15;


/***
 * PlayersPage
 * Component responsavel por renderizar o carrocel de noticias.
 * Props:
 *    news: Recebe o array com os objetos que representam a noticia.
 */

export class PlayersPage extends Component
{
  constructor(props) {
    super(props);

    this.userRepository = new UserRepository();

    const users = this.userRepository.getAll().sort((userA, userB) => userA.created_at - userB.created_at);

    this.state = {
      users,
      current_page: 1,
      page_count: Math.ceil(users.length / PAGE_SIZE),
      search_filter: "",
    };
  }

  render() {
    const paged_users = [];
    const page_buttons = [];

    this.state.users?.forEach((user, index) => {
      if (paged_users.length < PAGE_SIZE) {
        if (
          (index >= (this.state.current_page - 1) * PAGE_SIZE) &&
          (index < this.state.current_page * PAGE_SIZE)
        ) {
          const filter = this.state.search_filter.trim();

          if (filter.length) {
            if (user.name.toLowerCase().includes(filter.toLowerCase())) {
              paged_users.push(user);
            }
          } else {
            paged_users.push(user);
          }
        }
      }
    });

    for (let i = 0; i < Math.ceil(this.state.users.length / PAGE_SIZE); i++) {
      page_buttons.push(i);
    }

    return (
      div({ className: "p-3", style: { color: 'white' } }, [

        // Titulo e barra de busca
        div({ className: "d-flex justify-content-between pb-2 mb-4", style: { borderBottom: '1px solid #aaa' } }, [

          // Titulo
          div({ className: "d-flex align-items-center" }, [
            img({ src: "imgs/user-solid.svg", style: { width: '1.5rem' } }),
            h4({ style: { marginLeft: '0.5rem' } }, "Jogadores"),
          ]),

          // Barra de busca
          div({ className: "d-flex align-items-center", style: { position: 'relative' } }, [
            input({
              type: "text",
              placeholder: 'Pesquisa',
              style: {
                borderRadius: '1rem',
                width: '15rem',
                paddingLeft: '1.75rem'
              },
              value: this.state.search_filter,
              events: {
                change: (evt) => {
                  this.setState({ search_filter: evt.target.value });
                },
              }
            }),
            span({ className: "", style: { position: 'absolute', top: '0.25rem', left: '0.5rem' } },
              img({ src: "imgs/magnifying-glass.svg", style: { width: '1.0rem' } })
            )
          ])
        ]),

        // Conteudo
        mapTo('div', { className: "row" }, paged_users,
          (user) => {
            return (
              div(
                {
                  key: user.id,
                  className: 'd-flex justify-content-center col-10 offset-1 col-md-6 offset-md-0 col-lg-4 mb-4'
                },
                [
                  a(
                    {
                      events: {
                        click: () => {
                          redirectTo('perfil.html', { id: user.id });
                        }
                      },
                      className: "d-flex align-items-center flex-column w-75 c-bg-secondary p-4",
                      style: {
                        cursor: 'pointer',
                        border: '1px solid black',
                        borderRadius: '0.75rem',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '1.25rem'
                      }
                    }, [
                      img({ src: user.img_url, style: { width: '8rem', borderRadius: '50%' } }),
                      div(null, user.name),
                    ]
                  )
                ]
              )
            );
          }
        ),

        // Barra de paginação.
        mapTo('div', { className: 'd-flex justify-content-center my-4'}, page_buttons, 
          (button_index) => (
            a(
              {
                key: button_index,
                className: 'mx-2',
                style: {
                  cursor: 'pointer',
                  color: this.state.current_page === button_index + 1 ? '#c5a769' : 'white',
                  fontSize: '1.5rem',
                },
                events: {
                  click: () => {
                    this.setState({ current_page: button_index + 1 })
                  },
                }
              },
              button_index + 1
            )
          )
        ),
      ])
    );
  }
}