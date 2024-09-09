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
    idTarget: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'idUser'
        }
    },
    idSended: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'idUser'
        }
    }
});


// Definição dos relacionamentos
User.belongsToMany(User, {
    as: 'idSended',
    through: notification,
    foreignKey: 'idSended',
    otherKey: 'idTarget'
});

User.belongsToMany(User, {
    as: 'idTarget',
    through: notification,
    foreignKey: 'idTarget',
    otherKey: 'idSended'
});



module.exports = notification