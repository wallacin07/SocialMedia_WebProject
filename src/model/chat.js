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
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    idUserB: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "idUser"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
})


module.exports = Chat
