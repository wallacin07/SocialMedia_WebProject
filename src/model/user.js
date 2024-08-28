const Sequelize = require('sequelize')
const database = require('../config/db');
// const { type } = require('os');

const user = database.define('user',
    {
        idUser: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },

        password: {
            type: Sequelize.STRING(25),
            allowNull: false
        },
        birthDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        profilePhoto: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

user.belongsToMany(user, {
    as: 'seguidor',  // Alias para diferenciar o relacionamento
    through: 'follows',  // Tabela de junção
    foreignKey: 'seguidorId',  // FK para o usuário que é seguido
    otherKey: 'seguidoId'  // FK para o usuário que segue
});

user.belongsToMany(user, {
    as: 'seguindo',  // Alias para o outro lado do relacionamento
    through: 'follows',
    foreignKey: 'seguidoId',  // FK para o usuário que segue
    otherKey: 'seguidorId'  // FK para o usuário que é seguido
});


module.exports = user;