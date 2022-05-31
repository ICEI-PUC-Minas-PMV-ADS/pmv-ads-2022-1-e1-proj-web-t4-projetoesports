import { Component } from "../../framework/component.js";
import { div, h5, h6, hr, img, a, mapTo } from '../../framework/elements.js';

import { RoleRepository } from '../../repositories/role_repository.js';
import { TeamRepository } from '../../repositories/team_repository.js';
import { GameRepository } from '../../repositories/game_repository.js';
import { redirectTo, VACANCY_ROUTE } from "../../helpers/routes.js";

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

    this.roleRepository = new RoleRepository();
    this.teamRepository = new TeamRepository();
    this.gameRepository = new GameRepository();
  }

  render()
  {
    /***
     * onClick
     */

    function onClick(id)
    {
      redirectTo(VACANCY_ROUTE, { id });
    }

    return (
      div({ className: 'c-text-white mt-3' }, [
        h5(null, 'Vagas'),
        hr(null, null),
        mapTo('div', null, this.props.vacancies,
          ({ id, role_id, team_id }) => {
            const { name: role_name, icon_url } = this.roleRepository.get(role_id);
            const { name: team_name, game_id } = this.teamRepository.get(team_id);
            const { name: game_name } = this.gameRepository.get(game_id);

            return div({ key: id, className: 'mb-3 p-3 c-bg-primary-dark', style: { borderRadius: '5px', cursor: 'pointer' }, events: { click: () => onClick(id) } }, [
              div({ className: 'd-flex justify-content-between' }, [
                h6({ }, game_name),
                img({ src: icon_url, style: { width: '1.5rem', height: '1.5rem' } }),
              ]),            
              hr({ style: { margin: '0.25rem 0' } }),
              div(null, [              
                div({ className: 'c-text-grey-500' }, team_name),
                div({ className: 'c-text-grey-500' }, role_name),
              ]),
            ])
          }
        )
      ])
    );
  }
}