const user = require('../model/user');
const comment = require('../model/comment');
const post = require('../model/post');
const reaction = require('../model/reaction');
const follow = require('../model/follow');
const { where } = require('sequelize');

module.exports = {

    async getHome(req, res){

        const id_user = req.params.id_user;
        const followedPosts = '0'


        const users = await user.findAll({
            raw: true,
            attributes: ['idUser','name','password', 'birthDate','description','email','profilePhoto','admin','active']
        });

        const comments = await comment.findAll({
            raw: true,
            attributes: ['idComment','description','commentDate', 'idPost','idUser']
        });

        try{
            followedPosts = await follow.findAll({
                attributes: ['idPost', 'description', 'img'],
                include: [{
                    model: post,
                    required: false
                }],
                where: { idFollower: id_user }
            });
        }
        catch(error){
            console.log('None followed posts')
        }

        const reactions = await reaction.findAll({
            raw: true,
            attributes: ['idReaction','description']
        })

        res.render('../views/home', {users,comments:'0',reactions:'0', id_user, followedPosts});
    }

   
}


    