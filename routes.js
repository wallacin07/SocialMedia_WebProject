const express = require('express');
const multer = require("multer");
const route = express.Router();
// Importando os Controllers

// Iniciando as rotas
const login = require('./src/controller/login');
route.get('/', login.pagInitGet);
route.post('/login', login.login);


const home = require('./src/controller/home');
route.get('/getHome/:id_user', home.getHome);



const register = require('./src/controller/register');
const profileConfig = require('./src/config/profileMulter');
route.get('/loadRegister', register.PagRegisterGet)
route.post('/registerUser', multer(profileConfig).single('foto') ,register.registerUser);


const post = require('./src/controller/post');
const postConfig = require('./src/config/postMulter');
const profile = require('./src/controller/profile');
route.post('/postPost/:id_user', multer(postConfig).single('new_post_image'), post.postPost)

route.get('/profilePag/:id', profile.PagProfileGet);
module.exports = route;