import { Controller } from '../framework/controller.js';
import { UserRepository } from '../repositories/user_repository.js';
import { Navbar } from '../components/navbar.js';
import { Sidebar } from '../components/sidebar.js';
import { ProfilePage, SECTION_DEFAULT } from '../pages/profile.js';
import { User } from '../models/user.js';
import { Sha256 } from '../helpers/crypto.js';
import { USER_INFO } from '../framework/state.js';

/***
 * PerfilController
 * Controlador responsavel por gerenciar a parte logica da pagina.
 */

export class PerfilController extends Controller
{
  /***
   * O construtor é indicado para iniciar as variaveis do controlador,
   * ele é chamado antes de onInitialize.
   */

  constructor()
  {
    super();

    this.userRepository = new UserRepository();
    this.loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    this.criarPerfilModal = new bootstrap.Modal(document.getElementById('criarPerfilModal'));
  }

  /***
   * onInitialize
   * Este metodo e chamado quando o controlador esta iniciando, antes de
   * qualquer componente ser adicionado ao DOM. Nele é possivel carregar
   * os dados no sistema para alimentar os componentes.
   */

  onInitialize()
  {
    // Se o usuário não esta logado, redireciona para a home.
    if (!this.appState.load(USER_INFO))
    {
      //window.location.href = 'index.html';
      //return;
    }

    this.setState({
      userInfo: this.appState.load(USER_INFO),
      section: SECTION_DEFAULT,
    });
  }

  /***
   * actions
   * Este metodo retorna um objeto que é anexado ao "window"(o objeto global da pagina).
   * Neste objeto retornado são incluidos os metodos que serão "passados" aos eventos dos elementos
   * do DOM.
   */

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
      },
      onChangeSection: function (section)
      {
        this.setState({
          section: section,
        });
      }
    };
  }

  /***
   * buildComponentDatabase
   * Este metodo registrar os componentes que serão renderizadas na pagina.
   */

  buildComponentDatabase()
  {
    this.registerComponent('navbar', Navbar);
    this.registerComponent('sidebar', Sidebar);
    this.registerComponent('profile-page', ProfilePage);
  }
}