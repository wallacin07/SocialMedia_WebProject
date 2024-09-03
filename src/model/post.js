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
            type: Sequelize.STRING(100),
            allowNull: true
        },
        img: {
            type: Sequelize.STRING(128),
            allowNull: true
        }
    });

post.belongsTo(user, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'idUser'
});

module.exports = post;