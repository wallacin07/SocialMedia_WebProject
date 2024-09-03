const user = require('../model/user');
const comment = require('../model/comment');
const post = require('../model/post');
const reaction = require('../model/reaction');
const follow = require('../model/follow');
const sequelize = require('sequelize');

module.exports = {

    async getHome(req, res){
        const dados = req.body
        
        const id_user = req.params.id_user;
        let followed = '0'
        let followedIds = '0'
        
        let followedPosts = '0'
        let nonFollowedPosts = '0'



        const users = await user.findAll({
            raw: true,
            attributes: ['idUser','name','password', 'birthDate','description','email','profilePhoto','admin','active']
        });

        const comments = await comment.findAll({
            raw: true,
            attributes: ['idComment','description','commentDate', 'idPost','idUser']
        });




        followed = await follow.findAll({
            raw: true,
            attributes: ['idFollowed'],
            where: {
                idFollower: id_user
            }
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
            }
        })



        //=============================================
       
        //=============================================





        const reactions = await reaction.findAll({
            raw: true,
            attributes: ['idReaction','description']
        })


        res.render('../views/home', {users,comments:'0',reactions:'0', id_user, followedPosts});
    }

   
}


    