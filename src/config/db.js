const sequelize = require('sequelize');

const database = new sequelize (

    'Database',
    'User   ',
    'Password',

    {
    host: '',
    port: '',
    dialect: '' 
    }
);

database.sync();

module.exports = database;