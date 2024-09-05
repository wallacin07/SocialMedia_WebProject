const user = require('../model/user');
const comment = require('../model/comment');
const post = require('../model/post');
const reaction = require('../model/reaction');
const follow = require('../model/follow');
const sequelize = require('sequelize');

const database = require('../config/db');


module.exports = {
    async kangure(req,res){
        const id_user = req.params.id_user;
        const id_post = req.body.post;
        

        const check = await reaction.findOne({
            where: {
                [sequelize.Op.and]: [
                    {idUser: id_user},
                    {idPost: id_post}
                ]
            }
        });

        if(check != null){
            await reaction.update(
                {
                    active: sequelize.literal('active ^ 1')
                },
                {
                    where: {[sequelize.Op.and]: [{idUser: id_user}, {idPost: id_post}]}
                }
            );
        }
        else{
            await reaction.create({
                idPost: id_post,
                idUser: id_user
            });
        }


        res.redirect('/getHome/' + id_user);
    },


    

    async getComments(req,res){
        const id_user = req.params.id_user;
        const id_post = req.query.post;


        const currentUser = await user.findOne({
            where: { idUser: id_user }
        });

        const currentPost = await post.findByPk(id_post);


        const followed = await follow.findAll({
            raw: true,
            attributes: ['idFollowed'],
            where: {idFollower: id_user}
        })

        const followedIds = followed.map(follow => follow.idFollowed);


        const followedPosts = await post.findAll({
            include: [
                {
                    as: 'user',
                    model: user
                },
                {
                    model: reaction,
                    attributes: ['active'],
                    where:{idUser: id_user}
                }
            ],
            where: {
                [sequelize.Op.or]:[
                    {idUser: {[sequelize.Op.in]: {followedIds}}},
                    {idUser: id_user}
                ]
            },
            order: [['createdAt', 'DESC']]
            
        })


        const nonFollowedPosts = await post.findAll({
            include: [
                {
                    as: 'user',
                    model: user
                },
                {
                    model: reaction,
                    attributes: ['active'],
                    where:{idUser: id_user}
                }
            ],
            where: {
                    [sequelize.Op.and]: [
                        {idUser: {[sequelize.Op.notIn]: followedIds}},
                        {idUser: {[sequelize.Op.not]: id_user }}
                    ]
            },
            order: database.literal('RAND()')
        });


        const comments = await comment.findAll({
            where: {idPost: id_post},
            include: {
                model: user
            }
        });



        res.render('../views/home', {comments, currentPost, currentUser, followedPosts, nonFollowedPosts});
    },




    async comment(req,res){
        const id_user = req.params.id_user;
        const id_post = req.body.post;
        const text_comment = req.body.text_comment;



        await comment.create({
            idPost: id_post,
            idUser: id_user,
            description: text_comment
        });

        res.redirect('/getHome/' + id_user)
    }
}