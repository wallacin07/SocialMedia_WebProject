const { Sequelize } = require('sequelize')
const user = require('../model/user')


module.exports = {
    async PagInitGet(req, res){
    res.render('../views/index');
    },

    async login(req,res){
        const name = req.body.name;
        const password = req.body.password;
        
        try{
            const id_user = await user.findAll(
                {
                    where: {
                        [Sequelize.Op.and]: [
                            { name: name },
                            { password: password }
                        ]
                    }
                }
            );
                
            if(id_user.length == 0){
                console.log('nao achou');
                console.log(id_user);
            }
            else{
                console.log('achou');
                console.log(id_user);
                res.redirect('/getHome/' + id_user);
            }

        }
        catch(error){
            console.log('Error on LOGIN');
        }





    },


}