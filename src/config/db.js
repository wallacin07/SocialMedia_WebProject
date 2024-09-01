const sequelize = require('sequelize');

const database = new sequelize (

    'kangoroo',         //DATABASE
    'root',            //USER
    '123321',         //PASSWORDD

    {
    host: 'localhost',
    port: 3306,
    // port: 56604,
    // port: 54317,
    dialect: 'mysql' 
    }
);

database.sync();

module.exports = database;