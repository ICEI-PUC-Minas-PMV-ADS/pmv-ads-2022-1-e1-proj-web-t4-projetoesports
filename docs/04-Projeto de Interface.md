
# Projeto de Interface

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

Dentre as preocupações para a montagem da interface do sistema, estamos estabelecendo 
foco em questões como agilidade, acessibilidade e usabilidade. Desta forma, o projeto tem 
uma identidade visual padronizada em todas as telas que são projetadas para funcionamento 
em desktops e dispositivos móveis.

## User Flow

Segue o fluxo para usuários não autenticados.

![Fluxo para usuário não autenticado](img/userflow_n_auth.jpg)

Em seguida o fluxo para usuários autenticados.

![Fluxo para usuário não autenticado](img/userflow_auth.jpg)

## Wireframes

Conforme  fluxo  de  telas  do  projeto,  apresentado  no  item  anterior,  as  telas  do  sistema  são 
apresentadas em detalhes nos itens que se seguem. As telas do sistema apresentam uma 
estrutura comum que é apresentada na Figura X. Nesta estrutura, existem 3 grandes blocos, 
descritos a seguir. São eles:

- `Barra de navegação de topo`:  local onde estão dispostos todos as funcionalidades ligadas ao usuário;
- `Barra de navegação esquerda`: local onde estão dispostos todos os elementos que auxiliam na navegação pelo site;
- `Conteúdo`: apresenta o conteúdo da tela em questão.

![Layout padrão](img/standard_layout.jpg)

### Tela - Home-Page

Com base na estrutura padrão, o bloco de Conteúdo traz as notícias, torneios e vagas em destaque (título, resumo, imagem). 
O bloco barra de navegação esquerda traz cinco elementos disitintos:
- `Componente Notícias`: leva o usuário para a tela de notícias;
- `Componente Jogadores`: leva o usuário para a tela de busca de jogadores;
- `Componente Vagas`: leva o usuário para a tela de vagas disponíveis em equipes;
- `Componente Equipes `: leva o usuário para a tela de busca por equipes;
- `Componente Torneios `: leva o usuário para a tela de busca por torneios;
 
Quando o usuário estiver deslogado, a barra de navegacão de topo traz o componenente `Entrar` que leva o usuário a tela de login.
 
![Home page para usuário deslogado](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-1-e1-proj-web-t4-projetoesports/blob/65b8895aa5bb406e58642bda079c3678ce26aace/docs/img/Desktop%20-%20home.jpg)
 
Quando o usuário estiver logado, a barra de navegação de topo traz quatro elementos distintos:
- `Componente Sair`: desloga o usuário do sistema;
- `Componente Perfil`: leva o usuário para a sua tela de perfil;
- `Componente Minhas equipes`: leva o usuário para sua tela de minhas equipes;
- `Componente Notificações `: exibe ao usuário uma janela contendo as últimas notificações.

![Home page para usuário logado](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-1-e1-proj-web-t4-projetoesports/blob/65b8895aa5bb406e58642bda079c3678ce26aace/docs/img/Desktop%20-%20home%20autenticada.png)
 
 ### Tela - Log in

A tela de login permite que o usuário acesse a plataforma, inserindo o nome de usuário e senha adquiridos através de um cadastro feito pelo usuário ou um administrador. A tela contém os seguintes elementos:
- `Componente Email`: caixa de texto onde o usuário digitará seu email para autenticação;
- `Componente Senha`: caixa de texto onde o usuário digitará sua senha para autenticação;
- `Componente Esqueceu sua senha?`: redireciona o usuário para a tela de recuperação de senha;
- `Componente Entrar`: botão que confirma a autenticação do usuário e o redireciona para a tela Home-Page;
- `Componente Google`: botão que leva o usuário para a tela de log in do Google;
- `Componente Facebook`: botão que redireciona o usuário para a tela de log in do Facebook;
- `Componente Criar nova conta`: redireciona o usuário a tela de Sign up.

![Tela Log in](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-1-e1-proj-web-t4-projetoesports/blob/3abea04e2b4d580dd46ddd118592908f6baabb95/docs/img/Modal%20-%20Log%20in.jpg)























