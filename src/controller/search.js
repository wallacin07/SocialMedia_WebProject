const User = require('../model/user');
const Post = require('../model/post');
const Follow = require('../model/follow');
const Chat = require('../model/chat');
const comment = require('../model/comment');

const { Op } = require("sequelize");
const sequelize = require("sequelize");
const database = require('../config/db');
const notification = require('../model/notification');

const getSearch = async (req, res) => {
    const id_user = req.params.id_user;

    const allPosts = await Post.findAll({
        order: database.literal('RAND()'),
        where: { [Op.not]: {img: ''} }
    })
    const users = await User.findAll()

    
    res.render('../views/search', { id_user, allPosts, users });
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

    const allPosts = await Post.findAll({
        order: database.literal('RAND()'),
        where: { [Op.not]: {img: ''} }
    })


    res.render('../views/search', { id_user, users, allPosts });
}

const profile = async (req, res) => {
    const id_currentUser = req.params.id_currentUser;
    const id_user = req.params.id_user;




    const user = await User.findOne({
        raw: true,
        attributes: ['idUser', 'name', 'profilePhoto', 'description'],
        where: {
            idUser: id_user
        }
    });


    const following = await Follow.count({
        where:{[Op.and]: [{idFollower: id_user}, {active: 1}]}
      })
  
    const followers = await Follow.count({
        where:{
            [Op.and]: [{idFollowed: id_user}, {active: 1}]}
    })



    const posts = await Post.findAll({
        attributes: ['idPost', 'description', 'img', 'idUser'],
        include: [{
            model: comment,
            as: 'comments',
            required: false,
            include: [{
              model: User
            }]
          }],
        where: {
            [Op.and]: [
                {idUser: id_user},
                {[Op.not]: {img: ''}}
            ]
        }
    })

    let existingFollow = await Follow.findOne({
        where: {
            idFollower: id_currentUser,
            idFollowed: id_user
        }
    });
    
    if(existingFollow == null)
        existingFollow = {'active' : false};
    

    res.render('../views/searchProfile', { id_currentUser, user, posts, existingFollow, followers, following });
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

    const actualUser = await User.findOne({
        raw: true,
        attributes: ['name'],
        where: {
            idUser: id_currentUser
        }
    });
    await notification.create({
        message : `O usuario ${actualUser.name} começou a te seguir.`,
        idTarget: id_user,
        idSended: id_currentUser

    })

    const posts = await Post.findAll({
        raw: true,
        attributes: ['idPost', 'description', 'img', 'idUser'],
        where: {
            idUser: id_user
        }
    });


        let existingFollow = await Follow.findOne({
            where: {
                idFollower: id_currentUser,
                idFollowed: id_user
            }
        });


        if (existingFollow == null) {
         existingFollow = await Follow.create({
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
            { active: sequelize.literal('active ^ 1')}, // Alternar o estado
            { where: { idFollower: id_currentUser, idFollowed: id_user } }
        );
    }
  
    res.redirect(`/searchUser/${id_currentUser}/${id_user}`);

}
module.exports = { getSearch, searchUser, profile, follow }