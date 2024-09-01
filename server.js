require('express-async-errors');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Static files
app.use(express.static('public'));

// EJS
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(routes);

const server = app.listen(3000, () => console.log('Acesse: http://localhost:3000/'));

