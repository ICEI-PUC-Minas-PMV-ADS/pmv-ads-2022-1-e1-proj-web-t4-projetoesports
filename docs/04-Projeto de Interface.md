
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
 Quando o usuário se encontra deslogado, a barra de navegacão de topo traz o componenente "Entrar" que posibilita o usuário realizar login.
 
 ![Home page para usuário deslogado](https://raw.githubusercontent.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-1-e1-proj-web-t4-projetoesports/main/docs/img/Desktop%20-%20home.jpg)
 
 Quando o usuário se encontra logado, a barra de navegação de topo traz quatro elementos distintos:
- `Componente sair`: desloga o usuário do sistema;
- `Componente perfil`: leva o usuário para a sua tela de perfil;
- `Componente minhas equipes`: leva o usuário para sua tela de minhas equipes;
- `Componente notificações `: exibe ao usuário uma janela contendo as últimas notificações.

![Home page para usuário logado](https://raw.githubusercontent.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-1-e1-proj-web-t4-projetoesports/main/docs/img/Desktop%20-%20home%20autenticada.png)
 
