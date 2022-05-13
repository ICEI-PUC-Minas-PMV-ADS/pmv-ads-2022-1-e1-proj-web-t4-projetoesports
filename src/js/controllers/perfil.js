import { Controller } from '../framework/controller.js';
import { UserRepository } from '../repositories/user_repository.js';
import { Navbar } from '../components/navbar.js';
import { PerfilPage, SECTION_DEFAULT } from '../components/pages/perfil.js';
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
    this.registerComponent('perfil-page', PerfilPage);
  }
}