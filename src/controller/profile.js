const post = require('../model/post');
const user = require('../model/user');


module.exports = 
{
    async PagProfileGet(req, res){

        const id_user = req.params.id;
        const users= await user.findOne({
            raw: true,
            attributes: ['idUser','name','password', 'birthDate','description','email','profilePhoto','admin','active'],
            where: {idUser: id_user}
        })
        const posts= await post.findAll({
            raw: true,
            attributes: ['idPost','description','img', 'hashtag','postdate','idUser'],
            where: {idUser: id_user}
        })

        res.render('../views/profile', {users,posts, id_user})
    }

}