const Sequelize = require('sequelize')
const database = require('../config/db');
// const { type } = require('os');

const user = database.define('user', 
    {
        IDUser: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull : false,
            primaryKey: true
        },

        Name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        BirthDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Email: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        ProfilePhoto: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        Admin:  {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        Ative: { 
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    module.exports = user;