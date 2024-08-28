const Sequelize = require('sequelize')
const database = require('../config/db');
const user = require('./user')
const post = require('./post')
// const { type } = require('os');

const follow = database.define('follow',
    {
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
);

module.exports = follow;