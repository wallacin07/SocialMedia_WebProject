const Sequelize = require('sequelize');
const database = require('../config/db');
const user = require('./user'); // Importe o modelo de usuário

const follow = database.define('follow', {
    idFollower: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
            key: 'idUser'
        },
        primaryKey: true
    },
    idFollowed: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
            key: 'idUser'
        },
        primaryKey: true
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }   
});

// Definição dos relacionamentos
user.belongsToMany(user, {
    as: 'follower',
    through: follow,
    foreignKey: 'idFollower',
    otherKey: 'idFollowed'
});

user.belongsToMany(user, {
    as: 'followed',
    through: follow,
    foreignKey: 'idFollowed',
    otherKey: 'idFollower'
});

module.exports = follow;