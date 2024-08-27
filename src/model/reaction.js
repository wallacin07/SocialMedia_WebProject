const Sequelize = require('sequelize')
const database = require('../config/db');
// const { type } = require('os');

const reaction = database.define('reaction', 
    {
        idReaction: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull : false,
            primaryKey: true
        },

        description: {
            type: Sequelize.STRING(255),
            allowNull: false
        }
    });

    module.exports = reaction;