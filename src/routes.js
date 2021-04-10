const express = require('express')
const routes = express.Router() // É uma parte do express que gera os caminhos
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

// Criando rotas: Request, Response
routes.get('/index', JobController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

// Exporta as rotas para serem utilizadas no server.js
module.exports = routes;