import { Component } from "../../framework/component.js";
import { div, h5, h6, hr, img, mapTo } from '../../framework/elements.js';

/***
 * HomeVacancy
* Component responsavel por renderizar o painel de vagas.
 * Props:
 *    vacancies: Recebe o array com os objetos que representam as vagas.
 */

export class HomeVacancy extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      div({ className: 'c-text-white mt-3' }, [
        h5(null, 'Vagas'),
        hr(null, null),
        mapTo('div', null, this.props.vacancies,
          (vacancy) => div({ key: vacancy.id, className: 'mb-3 p-3 c-bg-primary-dark', style: { borderRadius: '5px' } }, [
            div({ className: 'd-flex justify-content-between' }, [
              h6({ }, vacancy.game),
              img({ src: vacancy.icon_url, style: { width: '1.5rem', height: '1.5rem' } }),
            ]),            
            hr({ style: { margin: '0.25rem 0' } }),
            div(null, [              
              div({ className: 'c-text-grey-500' }, vacancy.team),
              div({ className: 'c-text-grey-500' }, vacancy.role),
            ]),
          ])
        )
      ])
    );
  }
}