const Sequelize = require('sequelize');
const database = require('../config/db');
const user = require('./user');

const story = database.define('story',
    {
        idStory: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        img: {
            type: Sequelize.STRING(1000),
            allowNull: true
        },
        pubDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

story.belongsTo(user, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'idUser',
    as: 'user'
});



module.exports = story;