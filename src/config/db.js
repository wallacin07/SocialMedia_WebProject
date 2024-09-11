const sequelize = require('sequelize');

const database = new sequelize (

    'Kangoroo',         //DATABASE
    'Admin',            //USER
    'admin',            //PASSWORDD

    // 'root',            //USER
    // '123321',            //PASSWORDD
    {
    host: 'localhost',
    port: 1433, // Porta padrão sala perfeita
    // port: 56604,
    // port: 58868,    //cr
    // port: 54317, // Porta Sabrina sala fedida
    // port: 3306, // Porta Sabrina casa
    dialect: 'mssql' 
    }
);

database.sync();

module.exports = database;