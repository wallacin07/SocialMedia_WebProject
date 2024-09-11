const Sequelize = require('sequelize')
const database = require('../config/db');
const { defaultValueSchemable, toDefaultValue } = require('sequelize/lib/utils');

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
            type: Sequelize.STRING(100),
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
            allowNull: false,
            defaultValue: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },{ 
        
        hooks: {
            afterSync: async (options) => {
                try {
                    const existingAdmin = await user.findOne({ where: { admin: true } });
                    if (!existingAdmin) {
                        await user.create({
                            name: 'admin',
                            password: 'admin',
                            birthDate: '0001-01-01', // Ajuste o formato da data para ISO 8601
                            description: 'chefe é chefe né pae',
                            email: 'admin@admin.com',
                            profilePhoto: 'admin.png',
                            admin: true
                        });
                    }
                } catch (error) {
                    console.error('Error creating admin user:', error);
                }
            }
        }
});


module.exports = user;