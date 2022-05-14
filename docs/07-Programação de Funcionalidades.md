# Programação de Funcionalidades

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="4-Metodologia.md"> Metodologia</a>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="5-Arquitetura da Solução.md"> Arquitetura da Solução</a>

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo

> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)

## Tela home(RF-01, RF-03, RF-04, RF-05)

A tela principal do sistema tem como objetivo integrar o usuário ao ambiente competitivo, desta forma ela apresenta até 5 notícias recentes sobre o cenário, permite visualizar até 5 vagas recentes notificadas pelos times e listar até 5 torneios recentes que estão em andamento.
Por ela também e possível se autenticar no sistema ou criar um novo usuário. Uma vez autenticado, o usuário pode navegar para a página com informações do perfil, visualizar as notificações recebidas, pode navegar para a página de suas equipes e também e possível sair do perfil.
Através do menu lateral, ele pode navegar por diferentes seções que fornecem acesso a outros recursos do sistema.

<img src="img/funcionalidades_home.jpg" />

Por este modal de login, por ela é possível se autenticar no sistema. 

<img src="img/funcionalidades_log_in.png" />

Por este modal de registro, por ela é possível se cadastrar no sistema. 

<img src="img/funcionalidades_registro.jpg" />

### Requisitos atendidos
  - RF-01
  - RF-03
  - RF-04
  - RF-05

### Artefatos
  - index.html
  - js/controllers/home.js
  - js/components/pages/home/*
  - css/home.css
  - imgs/noticias_images/*
  - imgs/torneio_images/*
  - imgs/role_lane_icons/*

### Estrutura de dados

```
  {
    "userInfo": {
      "id":1,
      "name":"John",
      "email":"john@email.com",
      "password":"a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
    },
    "news": [
      {
        "id":2,
        "title":"News #2",
        "description":"Descrição News #2",
        "carousel_img_url":"imgs/noticias_images/noticias_2.png",
        "url":"https://www.google.com",
        "created_at":1652281098729
      },
    ],
    "tournaments": [
      {
        "id":2,
        "name":"Tournament #2",
        "description":"Descrição Tournament #2",
        "url":"url",
        "created_at":1652281498729
      }
    ],
    "vacancies": [
      {
        "id":3,
        "game":"League of Legends",
        "team":"Team #3",
        "role":"Mid lane",
        "icon_url":"imgs/role_lane_icons/MIDDLE.png",
        "created_at":1652212098729
      }
    ]
  }
```

## Criar Equipe

A tela Criar Equipe possui um formulário onde o usuário pode castrar sua equipe. Para o cadastro é necessário preencher os dados: Nome, Email, Jogo, Logo e Objetivo.

<img src = "https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-1-e1-proj-web-t4-projetoesports/blob/main/docs/img/Criar_equipes.png"/>



### Requisitos atendidos

- RF-08
- RF-09

### Artefatos da funcionalidade

- feature_equipes.html
- equipe.css
- icon_time.png
- models.js
- team.js

### Estrutura de Dados

```
{
    "id":1,
    "name":"",
    "game_id":"",
    "icon_url":"",
    "objective":"",
    "players":null,
    "reserves":null,
    "vacancies":null,
    "contacts":null
}
```
