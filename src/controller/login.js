const { Sequelize } = require('sequelize')
const users = require('../model/user')


module.exports = {
    async pagInitGet(req, res){
    res.render('../views/index');
    },

    async login(req,res){
        const name = req.body.name;
        const password = req.body.password;
        
        try{
            const user = await users.findOne(
                {
                    raw: true,
                    attributes: ['idUser', 'admin'],
                    where: {
                        [Sequelize.Op.and]: [
                            { name: name },
                            { password: password }
                        ]
                    }
                }
            );
                
            if(user.length == 0){
                console.log('nao achou');
                console.log(user.idUser);
                redirect('/');
            }
            else{
                console.log('achou');

                if(user.admin)
                    res.redirect('/getAdmScreen');
                else
                    res.redirect('/getHome/' + user.idUser);
            }

        }
        catch(error){
            console.log('Error on LOGIN');
            res.redirect('/')
        }





    }
}