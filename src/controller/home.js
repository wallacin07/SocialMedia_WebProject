const user = require('../model/user');
const comment = require('../model/comment');
const post = require('../model/post');
const reaction = require('../model/reaction');
const follow = require('../model/follow');
const sequelize = require('sequelize');

const database = require('../config/db');

module.exports = {

    async getHome(req, res){
        const dados = req.body
        
        const id_user = req.params.id_user;
        let followed = '0'
        let followedIds = '0'
        
        let followedPosts = '0'
        let nonFollowedPosts = '0'


        const currentUser = await user.findOne({
            where: { idUser: id_user }
        })


        const users = await user.findAll({});


        followed = await follow.findAll({
            raw: true,
            attributes: ['idFollowed'],
            where: {idFollower: id_user}
        })

        followedIds = followed.map(follow => follow.idFollowed);
        followedPosts = await post.findAll({
            include: {
                as: 'user',
                model: user
            },
            where: {
                [sequelize.Op.or]:[
                    {idUser: {[sequelize.Op.in]: followedIds}},
                    {idUser: id_user}
                ]
            },
            order: [['createdAt', 'DESC']]
        })


        nonFollowedPosts = await post.findAll({
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
        })





        


        res.render('../views/home', {users,comments:'0',reactions:'0', currentUser, followedPosts, nonFollowedPosts});
    }

   
}


    