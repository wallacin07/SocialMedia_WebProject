const express = require('express');
const multer = require("multer");
const route = express.Router();
// Importando os Controllers
const login = require('./src/controller/login');
const home = require('./src/controller/home');
const config = require('./src/config/multer');
// Iniciando as rotas
route.get('/', login.PagInitGet);


route.post('/registerUser', multer(config).single('foto') ,login.register)
module.exports = route;