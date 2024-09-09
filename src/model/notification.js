const Sequelize = require('sequelize')
const database = require('../config/db');
const User = require('./user');
const Chat = require('./chat');



const notification = database.define('notification', {
    idNotification: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    notificationDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    idSender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'idUser'
        }
    },
        idTarget: {
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


module.exports = notification