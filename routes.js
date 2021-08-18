const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const cadastroContatoController = require('./src/controllers/contatoController');
const cadastroControll = require('./src/controllers/cadastroController');
const agendaController = require('./src/controllers/agendaController');
const {urlUser} = require('./src/middlewares/middleware')


route.get('/', homeController.home)
// Rotas de login
route.get('/login/index', urlUser, homeController.paginaInicial);
route.post('/login/login', homeController.login);
route.get('/login/logout',  homeController.logout);

// Rotas de cadastro
route.get('/cadastro/index', cadastroControll.cadastroPage);
route.post('/cadastro/register', cadastroControll.createUser)


route.get('/agenda',  agendaController.agenda)
// Rotas da agenda


// Rotas de cadastro de contato
route.get('/contato/index', cadastroContatoController.cadastrarContato)
route.post('/contato/register', cadastroContatoController.register)
route.get('/contato/index/:id', cadastroContatoController.userIndex)
route.post('/contato/edit/:id', cadastroContatoController.alteraContato)
route.get('/contato/delete/:id', cadastroContatoController.deleteContato)


module.exports = route;
