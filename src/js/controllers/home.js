import { Controller } from '../framework/controller.js';
import { NewsRepository } from '../repositories/news_repository.js';
import { UserRepository } from '../repositories/user_repository.js';
import { TournamentRepository } from '../repositories/tournament_repository.js';
import { VacancyRepository } from '../repositories/vacancy_repository.js';
import { Navbar } from '../components/navbar.js';
import { HomeCarousel } from '../components/pages/home_carousel.js';
import { HomeTournament } from '../components/pages/home_tournament.js';
import { HomeVacancy } from '../components/pages/home_vacancy.js';
import { User } from '../models/user.js';
import { News } from '../models/news.js';
import { Sha256 } from '../helpers/crypto.js';
import { Tournament } from '../models/tournament.js';
import { Vacancy } from '../models/vacancy.js';
import { USER_INFO } from '../framework/state.js';

/***
 * HomeController
 * Controlador responsavel por gerenciar a parte logica da pagina.
 */

export class HomeController extends Controller
{
  constructor()
  {
    super();

    this.newsRepository = new NewsRepository();
    this.userRepository = new UserRepository();
    this.tournamentRepository = new TournamentRepository();
    this.vacancyRepository = new VacancyRepository();
    this.loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    this.criarPerfilModal = new bootstrap.Modal(document.getElementById('criarPerfilModal'));

    this.initializeSystem = this.initializeSystem?.bind(this);

    this.initializeNews = this.initializeNews?.bind(this);
    this.initializeTournament = this.initializeTournament?.bind(this);
    this.initializeVacancies = this.initializeVacancies?.bind(this);

    this.initializeSystem();
  }

  initializeSystem()
  {
    if (!this.newsRepository.getAll().length)
    {
      this.initializeNews();
    }

    if (!this.tournamentRepository.getAll().length)
    {
      this.initializeTournament();
    }

    if (!this.vacancyRepository.getAll().length)
    {
      this.initializeVacancies();
    }
  }

  initializeNews()
  {
    this.newsRepository.create(new News('News #1', 'Descrição News #1', 'imgs/news/news_1.jpg', 'https://www.google.com', 1652282098729));
    this.newsRepository.create(new News('News #2', 'Descrição News #2', 'imgs/news/news_2.jpg', 'https://www.google.com', 1652281098729));
    this.newsRepository.create(new News('News #3', 'Descrição News #3', 'imgs/news/news_3.jpg', 'https://www.google.com', 1652282598729));
    this.newsRepository.create(new News('News #4', 'Descrição News #4', 'imgs/news/news_4.jpg', 'https://www.google.com', 1652282298729));
    this.newsRepository.create(new News('News #5', 'Descrição News #5', 'imgs/news/news_5.jpg', 'https://www.google.com', 1652281598729));
    this.newsRepository.create(new News('News #6', 'Descrição News #6', 'imgs/news/news_6.jpg', 'https://www.google.com', 1652281798729));
  }
  
  initializeTournament()
  {
    this.tournamentRepository.create(new Tournament('Tournament #1', 'Descrição Tournament #1', 'url', 1652281598729));
    this.tournamentRepository.create(new Tournament('Tournament #2', 'Descrição Tournament #2', 'url', 1652281498729));
    this.tournamentRepository.create(new Tournament('Tournament #3', 'Descrição Tournament #3', 'url', 1652281898729));
    this.tournamentRepository.create(new Tournament('Tournament #4', 'Descrição Tournament #4', 'url', 1652282098729));
    this.tournamentRepository.create(new Tournament('Tournament #5', 'Descrição Tournament #5', 'url', 1652281858729));
    this.tournamentRepository.create(new Tournament('Tournament #6', 'Descrição Tournament #6', 'url', 1652281798729));
  }
  
  initializeVacancies()
  {
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #1', 'Top lane', 'imgs/role_lane_icons/TOP.png', 1652284098729));
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #2', 'Ad carry', 'imgs/role_lane_icons/ADC.png', 1652283698729));
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #3', 'Mid lane', 'imgs/role_lane_icons/MIDDLE.png', 1652212098729));
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #4', 'Support', 'imgs/role_lane_icons/SUPPORT.png', 1652281598729));
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #5', 'Jungle', 'imgs/role_lane_icons/JUNGLE.png', 1652281098729));
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #6', 'Top lane', 'imgs/role_lane_icons/TOP.png', 1652282698729));
  }

  onInitialize()
  {
    const newsNewest = [];
    const tournamentsNewest = [];
    const vacanciesNewest = [];
    
    // Filtra as 5 noticias mais recentes.
    this.newsRepository
      .getAll()
      .sort((newsA, newsB) => newsA.created_at - newsB.created_at)
      .forEach((news) => {
        if (newsNewest.length < 5)
        {
          newsNewest.push(news);
        }
      });

    // Filtra os 5 torneios mais recentes.
    this.tournamentRepository
      .getAll()
      .sort((tournamentA, tournamentB) => tournamentA.created_at - tournamentB.created_at)
      .forEach((tournament) => {
        if (tournamentsNewest.length < 5)
        {
          tournamentsNewest.push(tournament);
        }
      });

    // Filtra as 5 vagas mais recentes.
    this.vacancyRepository
      .getAll()
      .sort((vacancyA, vacancyB) => vacancyA.created_at - vacancyB.created_at)
      .forEach((vacancy) => {
        if (vacanciesNewest.length < 5)
        {
          vacanciesNewest.push(vacancy);
        }
      });

    this.setState({
      news: newsNewest,
      tournaments: tournamentsNewest,
      vacancies: vacanciesNewest,
      userInfo: this.appState.load(USER_INFO),
    });
  }

  actions()
  {
    return {
      onNavbarAction: function(action)
      {
        switch (action)
        {
          case 'entrar':
            {
              this.loginModal.toggle();
            }
            break;

          case 'notificações':
            {
              
            }
            break;

          case 'minha equipe':
            {
              
            }
            break;

          case 'perfil':
            {
              
            }
            break;

          case 'sair':
            {
              if (this.state.userInfo)
              {
                this.appState.store(USER_INFO, null);
                this.setState({ userInfo: null });
              }
            }
            break;
        }
      },
      onClickNovoPerfil: function()
      {
        this.loginModal.toggle();
        this.criarPerfilModal.toggle();
      },
      onSubmitLogIn: function(event, form)
      {
        event.preventDefault();

        const email = form['login_email'].value;
        const password = form['login_password'].value;
        
        const user = this.userRepository.getAll().find((user) => {
          return (
            user.email === email &&
            user.password === Sha256.hash(password)
          );
        });

        form['login_email'].value = '';
        form['login_password'].value = '';

        if (user)
        {
          this.appState.store(USER_INFO, user);
          this.setState({ userInfo: user });
        }
        else
        {
          alert('Usuário e/ou senha invalidos!');
        }

        this.loginModal.toggle();
      },
      onSubmitRegister: function(event, form)
      {
        event.preventDefault();

        const user = this.userRepository.getAll().find((user) => {
          return (
            user.email === form['register_email'].value
          );
        });

        if (user)
        {
          alert('Este email já esta em uso!');
          return;
        }

        if (form['register_password'].value !== form['register_re_password'].value)
        {
          alert('A senha e a confirmação de senha devem ser a mesma!');
          return;
        }

        const username = form['register_username'].value;
        const email = form['register_email'].value;
        const password = form['register_password'].value;

        form['register_username'].value = '';
        form['register_email'].value = '';
        form['register_password'].value = '';
        form['register_re_password'].value = '';

        this.userRepository.create(new User(
          username, 
          email,
          Sha256.hash(password),
        ));

        this.criarPerfilModal.toggle();
      }
    };
  }

  buildComponentDatabase()
  {
    this.registerComponent('navbar', Navbar);
    this.registerComponent('home-carousel', HomeCarousel);
    this.registerComponent('home-tournament', HomeTournament);
    this.registerComponent('home-vacancy', HomeVacancy);
  }
}