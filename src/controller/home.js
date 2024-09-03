const user = require('../model/user');
const comment = require('../model/comment');
const post = require('../model/post');
const reaction = require('../model/reaction');

module.exports = {

    async getHome(req, res){
        const dados = req.body
        
        const id_user = req.params.id_user;

        const users = await user.findAll({
            raw: true,
            attributes: ['idUser','name','password', 'birthDate','description','email','profilePhoto','admin','active']
        })
        const comments = await comment.findAll({
            raw: true,
            attributes: ['idComment','description','commentDate', 'idPost','idUser']
        })
        const posts = await post.findAll({
            raw: true,
            attributes: ['idPost','description','img', 'idUser']
        })
        const reactions = await reaction.findAll({
            raw: true,
            attributes: ['idReaction','description']
        })

        res.render('../views/home', {users,comments:'0',posts,reactions:'0', id_user});
    }

   
}


    