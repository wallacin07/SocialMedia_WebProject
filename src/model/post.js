const Sequelize = require('sequelize')
const database = require('../config/db');
const user = require('./user')
// const { type } = require('os');

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
        }
    });

post.belongsTo(user, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'idUser',
    as: 'user'
});

module.exports = post;