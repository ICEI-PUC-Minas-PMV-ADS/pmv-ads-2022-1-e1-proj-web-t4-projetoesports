import { Component } from "../../framework/component.js";
import { div, img, mapTo } from '../../framework/elements.js';

/***
 * HomeCarousel
 * Component responsavel por renderizar o carrossel de noticias.
 * Props:
 *    news: Recebe o array com os objetos que representam a noticia.
 */

export class HomeCarousel extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      div({ className: 'carousel slide mt-4', data: { bsRide: 'carousel' } },
        mapTo('div', { className: 'carousel-inner' }, this.props.news,
          (news, index, isFirst) => (
            div({ className: `carousel-item ${isFirst ? 'active' : ''}`, key: news.id },
              img({ className: 'w-100', src: news.carousel_img_url, style: { maxHeight: '30rem' } }))
          )
        )
      )
    );
  }
}