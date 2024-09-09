const sequelize = require('sequelize');

const database = new sequelize (

    'Kangoroo',         //DATABASE
    // 'Admin',            //USER
    // 'admin',            //PASSWORDD

    'root',            //USER
    '123321',            //PASSWORDD
    {
    host: 'localhost',
    // port: 1433, // Porta padrão sala perfeita
    // // port: 56604,
    // port: 54317, // Porta Sabrina sala fedida
    port: 3306, // Porta Sabrina casa
    dialect: 'mysql' 
    }
);

database.sync();

module.exports = database;