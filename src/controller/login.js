const { Sequelize } = require('sequelize')
const crypto = require('crypto');
const users = require('../model/user')

function encript(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex'); 
}

module.exports = {
    async pagInitGet(req, res){
    res.render('../views/index');
    },

    async login(req,res){
        const name = req.body.name;
        const password = encript(req.body.password);
        try{
            const user = await users.findOne(
                {
                    raw: true,
                    attributes: ['idUser', 'admin', 'active'],
                    where: {
                        [Sequelize.Op.and]: [
                            { name: name },
                            { password: password }
                        ]
                    }
                }
            );
                
            if(user.length == 0){
                res.render('../views/index', {erroDesativado : 0, erroConta: 0});
            }
            else{
                if(user.admin)
                    res.redirect('/getAdmScreen');
                else
                    if (user.active) {
                        res.redirect('/getHome/' + user.idUser);
                    }
                    else{
                        const desativado = "Sua conta esta no momento desativada, Entre em contato com o suporte ou faça uma nova conta"
                        res.render('../views/index', {erroDesativado : desativado, erroConta: 0});
                    }
            }

        }
        catch(error){
            console.log('Error on LOGIN');
            const Undefined = "Não achamos nenhuma conta com esse nome e senha, por favor verifique se escreveu corretamente ou crie uma nova conta"
            res.render('../views/index', {erroDesativado : 0, erroConta: Undefined});

        }
    }
}