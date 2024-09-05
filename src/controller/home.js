const user = require('../model/user');
const post = require('../model/post');
const reaction = require('../model/reaction');
const follow = require('../model/follow');
const sequelize = require('sequelize');

const database = require('../config/db');

module.exports = {

    async getHome(req, res){
        
        const id_user = req.params.id_user;


        const currentUser = await user.findOne({
            where: { idUser: id_user }
        })




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
                    {idUser: {[sequelize.Op.in]: followedIds}},
                    {idUser: id_user}
                ]
            },
            order: [['createdAt', 'DESC']]
            
        })


        const nonFollowedPosts = await post.findAll({
            include: {
                as: 'user',
                model: user
            },
            where: {
                    [sequelize.Op.and]: [
                        {idUser: {[sequelize.Op.notIn]: followedIds}},
                        {idUser: {[sequelize.Op.not]: id_user }}
                    ]
            },
            order: database.literal('RAND()')
        });


        console.log('foll  ' + followedPosts, 'nonfoll  ' + nonFollowedPosts)
        

        const comments = [{
            'user': '0'
        }]




        res.render('../views/home', {comments, currentPost:'0', currentUser, followedPosts, nonFollowedPosts});
    }

   
}


    