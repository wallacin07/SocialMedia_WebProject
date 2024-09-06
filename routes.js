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
route.get('/loadRegister', register.PagRegisterGet)
route.post('/registerUser', multer(profileConfig).single('foto') ,register.registerUser);


const post = require('./src/controller/post');
const postConfig = require('./src/config/postMulter');
const profile = require('./src/controller/profile');
route.post('/postPost/:id_user', multer(postConfig).single('new_post_image'), post.postPost)

route.get('/profilePag/:id_user', profile.PagProfileGet);
route.post('/update/:id_user',multer(profileConfig).single('foto'), profile.updateProfile);

const chats = require('./src/controller/chats')
route.get('/chats/:id', chats.ChatsPageGet);
route.get('/chats/:id/:idChat', chats.UserchatGet)
route.get('/chats/:id/:idChat/get', chats.UserchatQuery)
route.post('/chats/:id/:idChat', chats.UserchatPost);


const search = require('./src/controller/search');
route.get('/search/:id_user', search.getSearch);
route.post('/searchUser/:id_user', search.searchUser);
route.get('/searchUser/:id_currentUser/:id_user', search.profile);
route.post('/searchUser/:id_currentUser/:id_user/follow', search.follow);

module.exports = route;