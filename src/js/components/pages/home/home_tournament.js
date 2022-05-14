import { Component } from "../../../framework/component.js";
import { div, h5, h6, hr, mapTo } from '../../../framework/elements.js';

/***
 * HomeTournament
 * Component responsavel por renderizar o painel de torneios.
 * Props:
 *    tournaments: Recebe o array com os objetos que representam os torneios.
 */

export class HomeTournament extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      div({ className: 'c-text-white mt-3' }, [
        h5(null, 'Torneios'),
        hr(null, null),
        mapTo('div', null, this.props.tournaments,
          (tournament) => div({ key: tournament.id, className: 'mb-3 p-3 c-bg-primary-dark', style: { borderRadius: '5px' } }, [
            h6(null, tournament.name),
            div({ className: 'c-text-grey-500' }, tournament.description),
          ])
        )
      ])
    );
  }
}