const user = require('../model/user');
const comment = require('../model/comment');
const post = require('../model/post');
const reaction = require('../model/reaction');
const follow = require('../model/follow');
// const { where } = require('sequelize');
const sequelize = require('sequelize');

module.exports = {

    async getHome(req, res){

        const id_user = req.params.id_user;
        let followedPosts = '0'


        let nonFollowedPosts = '0'
        let followed = '0'
        let followedIds = '0'


        const users = await user.findAll({
            raw: true,
            attributes: ['idUser','name','password', 'birthDate','description','email','profilePhoto','admin','active']
        });

        const comments = await comment.findAll({
            raw: true,
            attributes: ['idComment','description','commentDate', 'idPost','idUser']
        });


        //FOLLOWED POSTS
        // try{
        //     followedPosts = await follow.findAll({
        //         attributes: ['idPost', 'description', 'img'],
        //         include: [{
        //             model: post,
        //             required: false
        //         }],
        //         where: { idFollower: id_user }
        //     });
        // }
        // catch(error){
        //     console.log('None followed posts found')
        // }



        
        followed = await user.findAll({
            // include: [{
            //     model: follow,
            //     as: 'followed',
            //     attributes: ['idFollowed'],
            //     required: false
            // }]
        });

        console.log(followed);

        //NON FOLLOWED USERS ID
        // followedIds = followed.map(follow => follow.idFollowed)

        // console.log(followedIds)

        //NON FOLLOWED POSTS
        // nonFollowedPosts = await post.findAll({
        //     attributes: ['idPost', 'description', 'img', 'createdAt', 'idUser'],
        //     where: {
        //         idUser: {
                    
        //         }
        //     }
        // });





        const reactions = await reaction.findAll({
            raw: true,
            attributes: ['idReaction','description']
        })

        console.log(nonFollowedPosts)

        res.render('../views/home', {users,comments:'0',reactions:'0', id_user, followedPosts, nonFollowedPosts});
    }

   
}


    