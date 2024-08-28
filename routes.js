const express = require('express');
const route = express();

const home = require('./src/controller/home');

route.get('home/:id_user', home.getHome);


module.exports = route;