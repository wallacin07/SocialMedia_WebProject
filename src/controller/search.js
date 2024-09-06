const { raw } = require('mysql');
const User = require('../model/user');
const Post = require('../model/post');
const Follow = require('../model/follow');
const Chat = require('../model/chat');
const { Op } = require("sequelize");

const getSearch = async (req, res) => {
    const id_user = req.params.id_user;

    res.render('../views/search', { id_user });
}

const searchUser = async (req, res) => {
    const id_user = req.params.id_user;
    const dados = req.body.text;

    console.log('IDUSERS: ' + id_user);
    console.log('DADOS: ' + dados);
    
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
    const posts = await Post.findAll({
        raw: true,
        attributes: ['idPost', 'description', 'img', 'idUser'],
        where: {idUser: id_user}
    })

    
    existingFollow = await Follow.findOne({
        where: {
            idFollower: id_currentUser,
            idFollowed: id_user
        }
    });
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:' + existingFollow)
    
    if(existingFollow == null)
        existingFollow = {'active' : false};
    
    console.log('BGL EXISTIDO DO PROFILE: ' + existingFollow.active)

    // console.log(posts.map(post => post.img));

    res.render('../views/searchProfile.ejs', { id_currentUser, user, posts, existingFollow });
}

const follow = async (req, res) => {
    const id_currentUser = req.body.id_currentUser;
    const id_user = req.body.id_user;

    const user = await User.findOne({
        raw: true,
        attributes: ['idUser', 'name', 'profilePhoto', 'description'],
        where: {
            idUser: id_user
        }
    });
    const posts = await Post.findAll({
        raw: true,
        attributes: ['idPost', 'description', 'img', 'idUser'],
        where: {
            idUser: id_user
        }
    });


    // console.log('IdCurrentUser: ' + id_currentUser);
    // console.log('IdUser: ' + id_user);


    // try {
        // Verificar se o follow já existe
        const existingFollow = await Follow.findOne({
            where: {
                idFollower: id_currentUser,
                idFollowed: id_user
            }
        });

        // console.log('Estado Atual: ' + existingFollow.active)

        if (existingFollow == null) {
            // Se não existir, criar um novo follow
            await Follow.create({
                idFollower: id_currentUser,
                idFollowed: id_user,
                active: 1
            });

            // Verificar se o chat deve ser criado
            const chatExists = await Chat.findOne({
                where: {
                    [Op.or]: [
                        { idUserA: id_currentUser, idUserB: id_user },
                        { idUserA: id_user, idUserB: id_currentUser }
                    ]
                }
            });

            if (!chatExists) {
                // Se o chat não existir, criar um novo chat
                await Chat.create({
                    idUserA: id_currentUser,
                    idUserB: id_user
                });
            }
        } else {
            // Se já existir, atualizar o campo 'active' para 0
            await Follow.update(
                { active: existingFollow.active == true ? 0 : 1 }, // Alternar o estado
                { where: { idFollower: id_currentUser, idFollowed: id_user } }
            );
        }
    // } catch (error) {
    //     const existingFollow = false;
    //     console.error('Erro ao verificar/criar follow:', error);
    // }
    
    res.render('../views/searchProfile.ejs', { id_currentUser, user, posts, existingFollow });

}
module.exports = { getSearch, searchUser, profile, follow }