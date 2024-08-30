const express = require('express');
const multer = require("multer");
const route = express.Router();
// Importando os Controllers

// Iniciando as rotas
const login = require('./src/controller/login');
route.get('/', login.pagInitGet);
route.post('/login', login.login);

const admin = require('./src/controller/admin');
route.get('/getAdmScreen', admin.showAdmScreen);
route.post('/toggleActive/:id_toggle', admin.toggleActive);


const home = require('./src/controller/home');
route.get('/getHome/:id_user', home.getHome);



const register = require('./src/controller/register');
const profileConfig = require('./src/config/profileMulter');
route.get('/loadRegister', register.pagInitGet)
route.post('/registerUser', multer(profileConfig).single('foto') ,register.registerUser);


const post = require('./src/controller/post');
const postConfig = require('./src/config/postMulter');
route.post('/postPost/:id_user', multer(postConfig).single('new_post_image'), post.postPost)


module.exports = route;