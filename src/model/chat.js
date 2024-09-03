const Sequelize = require('sequelize')
const database = require('../config/db');
const User = require('./user');


const Chat = database.define('Chat', {
    idChat: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUserA: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "idUser"
        },
        // onUpdate: "CASCADE",
        // onDelete: "CASCADE"
    },
    idUserB: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "idUser"
        },
        // onUpdate: "CASCADE",
        // onDelete: "CASCADE"
    }
});

// Definindo as associações
Chat.belongsTo(User, { as: 'UserA', foreignKey: 'idUserA' });
Chat.belongsTo(User, { as: 'UserB', foreignKey: 'idUserB' });


module.exports = Chat
