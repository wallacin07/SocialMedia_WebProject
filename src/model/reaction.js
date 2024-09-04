const Sequelize = require('sequelize')
const database = require('../config/db');
const post = require('../model/post');
const user = require('../model/user');
const sequelize = require('sequelize');

const reaction = database.define('reaction', 
{
    idReaction: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey: true
    },
    active: {
        type: sequelize.BOOLEAN,
        defaultValue: true
    }
});

reaction.belongsTo(user, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'idUser',
    as: 'user'
});

post.hasMany(reaction, {
    foreignKey: 'idPost'
});
reaction.belongsTo(post, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'idPost',
    as: 'post'
});


module.exports = reaction;