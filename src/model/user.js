const Sequelize = require('sequelize')
const database = require('../config/db');
// const { type } = require('os');

const user = database.define('user', 
    {
        idUser: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull : false,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        birthDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        profilePhoto: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        admin:  {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        ative: { 
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    module.exports = user;