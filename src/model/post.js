const Sequelize = require('sequelize');
const database = require('../config/db');
const user = require('./user');

const post = database.define('post',
    {
        idPost: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        description: {
            type: Sequelize.STRING(1000),
            allowNull: true
        },
        img: {
            type: Sequelize.STRING(1000),
            allowNull: true
        },
        reactionCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

post.belongsTo(user, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'idUser',
    as: 'user'
});



module.exports = post;