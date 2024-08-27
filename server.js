const routes = require('./routes')
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view', './src/view');
app.set('view engine', 'ejs');

app.use(routes);

app.listen(5000, () => console.log('access: http://localhost:5000'))