const reaction = require('../model/reaction');
const post = require('../model/reaction');
const sequelize = require('sequelize');



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

        
       
        // res.redirect('/getHome/' + id_user);
    }
}