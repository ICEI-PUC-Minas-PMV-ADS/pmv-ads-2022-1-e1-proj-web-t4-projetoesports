# Framework

O framework segue o padrão MVC(MODEL, VIEW, CONTROLLER). Ou seja a parte logica e separada dos dados
e do HTML. E funciona atraves da composição de partes menores chamadas COMPONENTES.

## Estrutura basica

Segue uma descrição dos elementos basicos do framework.

### Controller

O controller é responsavel por desempenhar varias funcões dentro da pagina, alem de processar as informações. Ele tambem e responsavel por armazenar informações necessarias a aplicação e que não fazem parte da base de dados(os MODELS). Segue uma lista com as principais funcionalidades do controller:

- Gerenciar o estado da aplicação: armazenar variaveis que estão disponiveis em qualquer pagina da aplicação, essas informações ficam salvas na sessao de usuario e é deletada quando a aplicação não esta em uso(ou seja quando todas as paginas abertas são fechadas).
- Gerenciar o estado da pagina: armazenar variaveis que estão disponiveis apenas naquela pagina.
- Fornecer actions para a pagina: actions(são funções que estão no escopo global da pagina e podem ser chamados de qualquer lugar) são funções usadas geralmente para processar eventos dos elementos da pagina.
- Gerenciar componentes: gerenciar os componentes que podem ser criados na pagina.

### Componente

Uma pagina normalmente e dividida em partes, podemos dizer que essas partes são os componentes, são blocos menores responsaveis por desempenhar uma função especifica na pagina. O componente tambem armazena informações proprias que estao isolada de outros componentes.

### Repositorio

O repositorio e o objeto responsavel por gerenciar as informações da base de dados(MODELS).

## Referencia de uso

Segue uma descrição dos metodos e variaveis importantes para cada objeto do framework.

IMPORTANTE: a principal diferença entre uma variavel normal e as variaveis de estado e que a pagina só é atualizada
quando os valores das VARIAVEIS DE ESTADO mudam. Ou seja se o valor de uma variavel normal muda a PAGINA NÂO É ATUALIZADA.

### Controller

#### onInitialize

Este metodo DEVE ser sobrescrito, ele e chamado quando o controller e criado, antes da pagina ser desenhada.

#### buildComponentDatabase

Este metodo DEVE ser sobrescrito, nele deve se registrar todos os componentes que serao usados na pagina.

#### registerComponent

Este metodo NÃO DEVE ser sobrescrito, ele se faz o registro de um componente a ser usado na pagina.

#### actions

Este metodo DEVE ser sobrescrito e deve retornar um objeto, ele é incorporado a estrutura da pagina e as funções retornadas por ele são acessiveis de qualquer lugar da pagina.

#### getState

Este metodo NÃO DEVE ser sobrescrito, ele retorna o estado(as variaveis) do controller.

#### setState

Este metodo NÃO DEVE ser sobrescrito, ele atribui/atualiza o estado(as variaveis) do controller.

### Exemplo de um controller

```
class HomeController extends Controller
{
  // Esta declaração e padrão e sempre deve existir.
  constructor()
  {
    super();

    // Aqui são criadas as variaveis do controllador.
    this.variavelTexto = 'valor';
    this.variavelNumero = 10;
    this.userRepository = new UserRepository(); // Esta variavel e responsavel por acessar as informações dos usuarios.
  }

  // Esta declaração é necessaria apenas se algum procedimento
  // for realizado enquanto o controller e iniciado, EX: Carregar informações da base de dados.
  onInitialize()
  {
    // Aqui uma lista com todos os usuarios cadastrados no sistema e armazenado na variavel users.
    const users = this.userRepository.getAll();

    // Aqui a lista com os usuarios e colocada no estado da aplicação.
    // ou seja esses usuarios poderao ser acessados no pagina(HTML) ou nos componentes.
    this.setState({ users: users });
  }

  // Esta declaração é necessarios apenas se for necessario acionar algum evento ou coisa do tipo.
  actions()
  {
    return {
      // Exemplo de uma action que poderia ser acionado quando um botao for clicado.
      onClick: function()
      {
        alert('Click');
      }
    };
  }

  // Esta declaração é necessaria apenas se algum componente for usado na pagina.
  buildComponentDatabase()
  {
    // Este comando registra o componente navbar
    // ou seja ele pode ser criado na pagina(HTML).
    this.registerComponent('navbar', Navbar);
  }
}
```

### Componente

#### setState

Este metodo NÃO deve ser sobrescrito, ele atribui/atualiza o estado(as variaveis) do componente.

#### state

Este objeto SÓ DEVE SER SOBRESCRITO NO CONSTRUTOR, no resto do codigo é usado APENAS PARA LEITURA de dados.

#### props

Este objeto NÃO DEVE SER SOBRESCRITO, ele é usado para LEITURA DE DADOS que vem no construtor do componente.

#### ctrl

Este objeto NÃO DEVE SER SOBRESCRITO, ele da acesso ao controller da pagina.

#### render

Este metodo SEMPRE DEVE SER SOBRESCRITO, ele é responsavel por desenhar a estrutura do componente.

#### buildComponentDatabase

Este metodo DEVE ser sobrescrito, nele deve se registrar todos os componentes que serao usados na pagina.

#### registerComponent

Este metodo NÃO DEVE ser sobrescrito, ele se faz o registro de um componente a ser usado na pagina.

### Exemplo de um componente

```
class MyComponent extends Component
{
  // Esta declaração e padrão e sempre deve existir.
  constructor(props)
  {
    super(props);

    // Inicia o estado do componente.
    this.state = {
      mensagem: 'helloWorld!',
    };
  }

  // Esta declaração sempre devera existir,
  // ela e responsavel por desenhar o componente.
  render()
  {
    return div(null, this.state.mensagem);
  }
}
```

Quando este componente for chamado em algum lugar da pagina, ele sera desenhado como:

```
<div>helloWorld!</div>
```

Se em um dado momento o estado MENSAGEM for alterado para 'vai Brasil!!!', ele sera redesenhado como:

```
<div>vai Brasil!!!</div>
```

### Templates dentro do componente

O framework tem uma lista de declaraçõs equivalente as TAGs do HTML. Que podem ser usadas nos componentes.
A forma de uso é simples e segue uma ordem bem definida.

```
  <TAG>(<ATRIBUTOS>, <CONTEUDO>)

  Ex1:
    div({ className: 'teste' }, 'helloWorld!')
  Gera o HTML:
    <div class="teste">helloWorld!</div>

  Ex2:
    ul({ className: 'lista' }, [
      li({ className: 'item' }, 'Item #1'),
      li({ className: 'item' }, 'Item #2'),
      li({ className: 'item' }, 'Item #3'),
    ])
  Gera o HTML:
    <ul class="lista">
      <li class="item">Item #1</li>
      <li class="item">Item #2</li>
      <li class="item">Item #3</li>
    </ul>
```

Há alguns atributos especiais como 'events', que serve para atribuir eventos ao elemento.
O objeto 'events' deve receber FUNCOES e o nome de cada chave deve ser equivalente ao evento a ser incluido.

```
  Ex:
    div({ events: { click: function() { alert('Fui clicado!'); } } }, 'Teste')
  Gera o HTML:
    <div onclick="function() { alert('Fui clicado!'); }">helloWorld!</div>
```

E por fim e possivel declarar CSS inline pelo objeto 'style'.

```
Ex:
  div({ style: { backgroundColor: 'red' } }, 'helloWorld!')
Gera o HTML:
  <div style="background-color: red">helloWorld!</div>
```

### Chamar um componente na pagina HTML

Para chamar um componente na pagina HTML, basta apenas declara o atributo "data-component" e definir seu valor com o valor passado como primeiro parametro ao registrar um componente.

#### Exemplo

Ao registar um componente navbar:

```
this.registerComponent('navbar', Navbar);
```

Você deve chamar o componente da seguinte forma:

```
<div data-componente="navbar"></div>
```

Desta forma o componente navbar vai ser desenhado dentro da div.

### Chamar um componente dentro de outro componente.

- Primeiramente deve-se criar o componente PAI:

```
class PaiComponent extends Component
{
  // Esta declaração e padrão e sempre deve existir.
  constructor(props)
  {
    super(props);
  }

  // Esta declaração sempre devera existir,
  // ela e responsavel por desenhar o componente.
  render()
  {
    return div(null, [
      div(null, 'Eu sou o componente pai!'),
    ]);
  }
}
```

- Depois deve-se criar o componente FILHO:

```
class FilhoComponent extends Component
{
  // Esta declaração e padrão e sempre deve existir.
  constructor(props)
  {
    super(props);
  }

  // Esta declaração sempre devera existir,
  // ela e responsavel por desenhar o componente.
  render()
  {
    return div(null, 'Ola, eu sou o componente filho!');
  }
}
```

- Depois deve-se registrar o componente FILHO dentro do componente PAI:

```
class PaiComponent extends Component
{
  // Esta declaração e padrão e sempre deve existir.
  constructor(props)
  {
    super(props);
  }

  // Esta declaração sempre devera existir,
  // ela e responsavel por desenhar o componente.
  render()
  {
    return div(null, [
      div(null, 'Eu sou o componente pai!'),
    ]);
  }

  // Esta declaração é necessaria apenas se algum componente for usado na pagina.
  buildComponentDatabase()
  {
    // Este comando registra o componente navbar
    // ou seja ele pode ser criado na pagina(HTML).
    this.registerComponent('filho', FilhoComponente);
  }
}
```

- Depois deve-se chamar o componente FILHO dentro do componente PAI:

```
class PaiComponent extends Component
{
  // Esta declaração e padrão e sempre deve existir.
  constructor(props)
  {
    super(props);
  }

  // Esta declaração sempre devera existir,
  // ela e responsavel por desenhar o componente.
  render()
  {
    return div(null, [
      div(null, 'Eu sou o componente pai!'),
      component('filho'),
    ]);
  }

  // Esta declaração é necessaria apenas se algum componente for usado na pagina.
  buildComponentDatabase()
  {
    // Este comando registra o componente navbar
    // ou seja ele pode ser criado na pagina(HTML).
    this.registerComponent('filho', FilhoComponente);
  }
}
```

- No final os componentes serão desenhados da seguinte forma:

```
<div>
  <div>Eu sou o componente pai!</div>
  <div>Ola, eu sou o componente filho!</div>
</div>
```