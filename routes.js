const express = require('express');
const route = express.Router();
// Importando os Controllers
const login = require('./src/controller/login');
const home = require('./src/controller/home');
// Iniciando as rotas
route.get('/', login.PagInitGet);
route.post('/login', login.login);

route.get('/getHome/:id_user', home.getHome);

module.exports = route;