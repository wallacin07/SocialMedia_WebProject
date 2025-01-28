const Sequelize = require('sequelize');

const database = new Sequelize(
    'railway',         // Nome do banco de dados
    'postgres',        // Usuário
    'ZiWAARLsXuTystOmsXbDxykyDNNcyYIK', // Senha
    {
        host: 'autorack.proxy.rlwy.net',  // Host
        port: 55338,                      // Porta
        dialect: 'postgres'               // Dialeto
    }
);

database.sync();

module.exports = database;
