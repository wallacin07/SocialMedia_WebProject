const Sequelize = require('sequelize')
const database = require('../config/db');
const User = require('./user');
const Chat = require('./chat');



const Message = database.define('Message', {
    idMessage: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idChat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Chat,
            key: 'idChat'
        },
        // onUpdate: "CASCADE",
        // onDelete: "CASCADE"
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    messageDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    idSender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'idUser'
        },
        // onUpdate: "CASCADE",
        // onDelete: "CASCADE"
    }
})


module.exports = Message