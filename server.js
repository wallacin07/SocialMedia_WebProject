require('express-async-errors');
const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Static files
app.use(express.static('public'));
// Configura a pasta de imagens de perfil como estática
app.use('/profile_pictures', express.static(path.join(__dirname, 'public', 'img', 'profile_pictures')));

// EJS
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(routes);

const server = app.listen(3000, () => console.log('Acesse: http://localhost:3000/'));

