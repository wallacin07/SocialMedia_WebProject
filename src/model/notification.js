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
User.hasMany(notification, { foreignKey: 'idTarget', as: 'receivedNotifications' });
User.hasMany(notification, { foreignKey: 'idSended', as: 'sentNotifications' });

notification.belongsTo(User, { foreignKey: 'idTarget', as: 'targetUser' });
notification.belongsTo(User, { foreignKey: 'idSended', as: 'sendedUser' });



module.exports = notification