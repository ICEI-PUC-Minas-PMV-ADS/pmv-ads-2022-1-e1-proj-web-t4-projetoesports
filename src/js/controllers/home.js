import { Controller } from '../framework/controller.js';
import { NewsRepository } from '../repositories/news_repository.js';
import { UserRepository } from '../repositories/user_repository.js';
import { TournamentRepository } from '../repositories/tournament_repository.js';
import { VacancyRepository } from '../repositories/vacancy_repository.js';
import { RoleRepository } from '../repositories/role_repository.js';
import { Navbar } from '../components/navbar.js';
import { Sidebar } from '../components/sidebar.js';
import { HomeCarousel } from '../components/home/home_carousel.js';
import { HomeTournament } from '../components/home/home_tournament.js';
import { HomeVacancy } from '../components/home/home_vacancy.js';
import { User } from '../models/user.js';
import { Sha256 } from '../helpers/crypto.js';
import { USER_INFO } from '../framework/state.js';

import { initializeDatabase } from '../helpers/mock_data.js';

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
    this.roleRepository = new RoleRepository();
    this.loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    this.criarPerfilModal = new bootstrap.Modal(document.getElementById('criarPerfilModal'));

    this.initializeSystem = this.initializeSystem?.bind(this);

    this.initializeSystem();
  }

  /***
   * initializeSystem
   */

  initializeSystem()
  {
    if (!this.newsRepository.getAll().length)
    {
      initializeDatabase();
    }
  }

  /***
   * onInitialize
   */

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

          case 'minha equipe':
            {
              window.location.href = 'minhas_equipes.html';
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

                // Recarrega a pagina.
                window.location.reload();
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
        if (!email.length || !password.length)
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

        // Recarrega a pagina.
        window.location.reload();
      },
      onSubmitRegister: function(event, form)
      {
        event.preventDefault();

        const username = form['register_username'].value.trim();
        const email = form['register_email'].value.trim();
        const password = form['register_password'].value.trim();
        const re_password = form['register_re_password'].value.trim();

        // Verifica se todos os campos foram prenchidos.
        if (!username.length || !email.length || !password.length)
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
    this.registerComponent('sidebar', Sidebar);
    
    this.registerComponent('home-carousel', HomeCarousel);
    this.registerComponent('home-tournament', HomeTournament);
    this.registerComponent('home-vacancy', HomeVacancy);
  }
}