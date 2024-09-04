const { raw } = require('mysql');
const User = require('../model/user');
const { Op } = require("sequelize");

const getSearch = async (req, res) => {
    const id_user = req.params.id_user;

    res.render('../views/search', { id_user });
}

const searchUser = async (req, res) => {
    const id_user = req.params.id_user;
    const dados = req.body.text;
    
    const users = await User.findAll({
        where: {
            [Op.and]: [{
                    name: { [Op.like]: `%${dados}%` }
                },
                {
                    active:'1'
                }
            ],
        },
        attributes: ['idUser','name', 'profilePhoto', 'admin']
    });

    console.log(users.map(user => user.name)); // Imprime os nomes

    res.render('../views/search', { id_user, users });
}

const profile = async (req, res) => {
    const id_currentUser = req.params.id_currentUser;
    const id_user = req.params.id_user;

    // console.log('IdCurrentUser: ' + id_currentUser);
    // console.log('IdUser: ' + id_user);

    const user = await User.findOne({
        raw: true,
        attributes: ['idUser', 'name', 'profilePhoto', 'description'],
        where: {
            idUser: id_user
        }
    });

    console.log(user);



    res.render('../views/searchProfile.ejs', { id_currentUser, user });
}

module.exports = { getSearch, searchUser, profile }