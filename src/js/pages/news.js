import { Component } from "../framework/component.js";
import { div, h4, img, input, mapTo, span, a } from '../framework/elements.js';

import { NewsRepository } from "../repositories/news_repository.js";

const PAGE_SIZE = 15;


/***
 * NewsPage
 * Component responsavel por renderizar o carrocel de noticias.
 * Props:
 *    news: Recebe o array com os objetos que representam a noticia.
 */

export class NewsPage extends Component
{
  constructor(props) {
    super(props);

    this.NewsRepository = new NewsRepository();

    const news = this.NewsRepository.getAll().sort((newsA, newsB) => newsA.created_at - newsB.created_at);

    this.state = {
      news,
      current_page: 1,
      page_count: Math.ceil(news.length / PAGE_SIZE),
      search_filter: 0,
    };
  }

  render() {
    const paged_news = [];
    const page_buttons = [];

    this.state.news?.forEach((news, index) => {
      if (paged_news.length < PAGE_SIZE) {
        if (
          (index >= (this.state.current_page - 1) * PAGE_SIZE) &&
          (index < this.state.current_page * PAGE_SIZE)
        ) {
          paged_news.push(news);
        }
      }
    });

    for (let i = 0; i < Math.ceil(this.state.news.length / PAGE_SIZE); i++) {
      page_buttons.push(i);
    }

    return (
      div({ className: "p-3", style: { color: 'white' } }, [

        // Titulo e barra de busca
        div({ className: "d-flex justify-content-between pb-2 mb-4", style: { borderBottom: '1px solid #aaa' } }, [

          // Titulo
          div({ className: "d-flex align-items-center" }, [
            img({ src: "imgs/newspaper-solid.svg", style: { width: '1.5rem' } }),
            h4({ style: { marginLeft: '0.5rem' } }, "Noticias"),
          ]),
        ]),

        // Conteudo
        mapTo('div', { className: "row" }, paged_news,
          (news) => {
            return (
              div({ key: news.id, className: 'col-10 offset-1 col-md-6 offset-md-0 col-lg-4 mb-4' }, [
                a({ href: news.url, target: '_blank' }, img({ src: news.carousel_img_url, className: 'w-100' }))
              ])
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