const sequelize = require('sequelize');

const database = new sequelize (

    'kangoroo',         //DATABASE
    'Admin',            //USER
    'admin',         //PASSWORDD

    {
    host: 'localhost',
    // port: 3306,
    // port: 56604,
    port: 54317,
    dialect: 'mssql' 
    }
);

database.sync();

module.exports = database;