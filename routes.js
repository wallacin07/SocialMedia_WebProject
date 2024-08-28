const express = require('express');
const route = express();

const home = require('./src/controller/home');
const login = require('./src/controller/login');

route.get('/', login.init);


route.get('/home/:id_user', home.getHome);


module.exports = route;