const Sequelize = require('sequelize');
const database = require('../config/db');
const user = require('./user'); 
const { Op } = require('sequelize');
const Chat = require('./chat');

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
}, {
    tableName: 'follows'
});


// Definição dos relacionamentos
user.belongsToMany(user, {
    as: 'followers',
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


// Hook que será executado após a criação de um novo "follow"
follow.afterCreate(async (follow, options) => {
    const chatExists = await Chat.findOne({
      where: {
        [Op.or]: [
          { idUserA: follow.idFollower, idUserB: follow.idFollowed },
          { idUserA: follow.idFollowed, idUserB: follow.idFollower }
        ]
      }
    });
  
    if (!chatExists) {
      // Se o chat não existir, cria um novo
      await Chat.create({
        idUserA: follow.idFollower,
        idUserB: follow.idFollowed
      });
    }
  });


module.exports = follow;