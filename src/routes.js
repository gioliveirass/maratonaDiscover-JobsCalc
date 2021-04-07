const express = require('express')
// É uma parte do express que gera os caminhos
const routes = express.Router()

// O .ejs já lê por padrão a pasta views, então não precisa das duas linhas comentadas abaixo, e o basePatch pode sair do routes.get
// __dirname é uma variável que pega o caminho do projeto em sua máquina
// const basePatch = __dirname + '/views'
// O routes.get estava assim:
// routes.get('/index', (request, response) => response.render(basePatch + "/index.html"))

const views = __dirname + '/views/' // Como o ejs não achava o local da pasta, foi necessário criar essa constante

// Dados para enviar pro perfil
const profile = {
    name: "Giovana",
    avatar: "https://avatars.githubusercontent.com/u/78885451?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

// Criando rotas: Request, Response
routes.get('/index', (request, response) => response.render(views + "index"))
routes.get('/job', (request, response) => response.render(views + "job"))
routes.get('/job/edit', (request, response) => response.render(views + "job-edit"))
routes.get('/profile', (request, response) => response.render(views + "profile", {profile})) // Envia também o objeto Perfil

// Exporta as rotas para serem utilizadas no server.js
module.exports = routes;