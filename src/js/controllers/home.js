import { Controller } from '../framework/controller.js';
import { NewsRepository } from '../repositories/news_repository.js';
import { UserRepository } from '../repositories/user_repository.js';
import { TournamentRepository } from '../repositories/tournament_repository.js';
import { VacancyRepository } from '../repositories/vacancy_repository.js';
import { Navbar } from '../components/navbar.js';
import { HomeCarousel } from '../components/pages/home/home_carousel.js';
import { HomeTournament } from '../components/pages/home/home_tournament.js';
import { HomeVacancy } from '../components/pages/home/home_vacancy.js';
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
    this.newsRepository.create(new News('News #1', 'Descrição News #1', 'imgs/noticias_images/noticias_1.png', 'https://www.google.com', 1652282098729));
    this.newsRepository.create(new News('News #2', 'Descrição News #2', 'imgs/noticias_images/noticias_2.png', 'https://www.google.com', 1652281098729));
    this.newsRepository.create(new News('News #3', 'Descrição News #3', 'imgs/noticias_images/noticias_3.png', 'https://www.google.com', 1652282598729));
    this.newsRepository.create(new News('News #4', 'Descrição News #4', 'imgs/noticias_images/noticias_4.png', 'https://www.google.com', 1652282298729));
    this.newsRepository.create(new News('News #5', 'Descrição News #5', 'imgs/noticias_images/noticias_5.png', 'https://www.google.com', 1652281598729));
  }
  
  initializeTournament()
  {
    this.tournamentRepository.create(new Tournament('Tournament #1', 'Descrição Tournament #1', 'url', 1652281598729));
    this.tournamentRepository.create(new Tournament('Tournament #2', 'Descrição Tournament #2', 'url', 1652281498729));
    this.tournamentRepository.create(new Tournament('Tournament #3', 'Descrição Tournament #3', 'url', 1652281898729));
    this.tournamentRepository.create(new Tournament('Tournament #4', 'Descrição Tournament #4', 'url', 1652282098729));
    this.tournamentRepository.create(new Tournament('Tournament #5', 'Descrição Tournament #5', 'url', 1652281858729));
  }
  
  initializeVacancies()
  {
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #1', 'Top lane', 'imgs/role_lane_icons/TOP.png', 1652284098729));
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #2', 'Ad carry', 'imgs/role_lane_icons/ADC.png', 1652283698729));
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #3', 'Mid lane', 'imgs/role_lane_icons/MIDDLE.png', 1652212098729));
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #4', 'Support', 'imgs/role_lane_icons/SUPPORT.png', 1652281598729));
    this.vacancyRepository.create(new Vacancy('League of Legends', 'Team #5', 'Jungle', 'imgs/role_lane_icons/JUNGLE.png', 1652281098729));
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
              // TODO: Implementar recurso de notificações.
            }
            break;

          case 'minha equipe':
            {
              // TODO: Incluir link para pagina minha_equipe.
            }
            break;

          case 'perfil':
            {
              window.location.href = 'perfil.html';
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

        const email = form['login_email'].value.trim();
        const password = form['login_password'].value.trim();

        // Verifica se todos os campos foram prenchidos.
        if (!email.length() || !password.length())
        {
          alert('Todos os campos devem ser preenchidos');
          return;
        }
        
        // Busca o usuario e verifica a senha.
        const user = this.userRepository.getAll().find((user) => {
          return (
            user.email === email &&
            user.password === Sha256.hash(password)
          );
        });

        // Limpa o formulario
        form['login_email'].value = '';
        form['login_password'].value = '';

        // Carrega as informações do usuario no sistema ou
        // emite uma mensagem de erro.
        if (user)
        {
          this.appState.store(USER_INFO, user);
          this.setState({ userInfo: user });
        }
        else
        {
          alert('Usuário e/ou senha invalidos!');
        }

        // Esconde o formulario
        this.loginModal.toggle();
      },
      onSubmitRegister: function(event, form)
      {
        event.preventDefault();

        const username = form['register_username'].value.trim();
        const email = form['register_email'].value.trim();
        const password = form['register_password'].value.trim();
        const re_password = form['register_re_password'].value.trim();

        // Verifica se todos os campos foram prenchidos.
        if (!username.length() || !email.length() || !password.length())
        {
          alert('Todos os campos devem ser preenchidos');
          return;
        }

        // Busca na base de dados um usuario com o email digitado.
        const user = this.userRepository.getAll().find((user) => {
          return (
            user.email === email
          );
        });

        // Verifica se o email ja esta em uso.
        if (user)
        {
          alert('Este email já esta em uso!');
          return;
        }

        // Verifica se o senha e a mesma nos dois campos de senha.
        if (password !== re_password)
        {
          alert('A senha e a confirmação de senha devem ser a mesma!');
          return;
        }

        // Limpa o formulario
        form['register_username'].value = '';
        form['register_email'].value = '';
        form['register_password'].value = '';
        form['register_re_password'].value = '';

        // Persiste o usuario na base de dados.
        this.userRepository.create(new User(
          username, 
          email,
          Sha256.hash(password),
        ));

        // Esconde o formulario de cadastro.
        this.criarPerfilModal.toggle();

        // Emite uma mensagem de sucesso.
        alert('O usuário foi cadastrado com sucesso!');
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