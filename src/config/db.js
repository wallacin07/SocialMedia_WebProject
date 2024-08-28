const sequelize = require('sequelize');

const database = new sequelize (

    'Kangoroo',         //DATABASE
    'Admin',            //USER
    'admin',         //PASSWORDD

    {
    host: 'localhost',
    port: 1433,
    dialect: 'mssql' 
    }
);

database.sync();

module.exports = database;