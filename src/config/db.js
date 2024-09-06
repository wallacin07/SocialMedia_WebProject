const sequelize = require('sequelize');

const database = new sequelize (

    'kangoroo',         //DATABASE
    'Admin',            //USER
    'admin',         //PASSWORDD

    {
    host: 'localhost',
    // port: 1433, // Porta padrão sala perfeita
    // port: 56604,
    port: 54317, // Porta Sabrina sala fedida
    // port: 1433,
    dialect: 'mssql' 
    }
);

database.sync();

module.exports = database;