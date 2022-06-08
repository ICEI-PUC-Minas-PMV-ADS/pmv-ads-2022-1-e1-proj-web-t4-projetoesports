import { Component } from "../../framework/component.js";
import { button, div, img, span, mapTo } from '../../framework/elements.js';

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
    /***
     * onClick
     */

    function onClick(url)
    {
      window.open(url, '_blank');
    }

    return (
      div({ id: 'carouselNews', className: 'carousel slide mt-4', data: { bsRide: 'carousel' } }, [
        mapTo('div', { className: 'carousel-inner' }, this.props.news,
          (news, _index, isFirst) => (
            div({ className: `carousel-item ${isFirst ? 'active' : ''}`, key: news.id },            
              img({ className: 'w-100', src: news.carousel_img_url, style: { maxHeight: '30rem', cursor: 'pointer' }, events: { click: () => onClick(news.url) } })
            )
          )
        ),
        button({ type: 'button', className: 'carousel-control-prev', data: { bsTarget: '#carouselNews', bsSlide: 'prev' } }, [
          span({ className: 'carousel-control-prev-icon', aria: { hidden: 'true' } }),
          span({ className: 'visually-hidden' }, 'Previous'),
        ]),
        button({ type: 'button', className: 'carousel-control-next', data: { bsTarget: '#carouselNews', bsSlide: 'next' } }, [
          span({ className: 'carousel-control-next-icon', ariaHidden: 'true' }),
          span({ className: 'visually-hidden' }, 'Next'),
        ])
      ])
    );
  }
}