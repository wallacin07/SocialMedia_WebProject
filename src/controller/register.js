const {where,Op} = require('sequelize');
const user = require('../model/user')
const crypto = require('crypto');

function encript(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex'); 
}


module.exports = {
    async PagRegisterGet(req, res){
    res.render('../views/register', {errorName : '',errorEmail : ''});
    },

    async registerUser(req,res)
    {
        const dados = req.body;

        const usersEmail= await user.findAll({
            raw: true,
            attributes: ['idUser','name','password', 'birthDate','description','email','profilePhoto','admin','active'],
            where: {email: dados.email}

        })
        

        const usersName= await user.findAll({
            raw: true,
            attributes: ['idUser','name','password', 'birthDate','description','email','profilePhoto','admin','active'],
            where: {name: dados.name}

        })

        if (usersEmail.length === 0) {

            if (usersName.length === 0) {
                let foto = 'profile.svg';
                // Verificando se foi enviada alguma foto
                if (req.file) {
                // Pegar novo nome da foto
                    foto = req.file.filename;
                }
        
                await user.create({
                    name: dados.name,
                    password: encript(dados.password),
                    birthDate: dados.birth,
                    description: dados.bio,
                    email: dados.email,
                    profilePhoto: foto
                });
                res.redirect('/')
            }
            else
            {
                const erroNome = "Já existe alguém com o mesmo Nome, tente novamente"
                res.render('../views/register',  {errorName : erroNome, errorEmail : ''})
            }
        }
        else
        {
            const erroEmail = "Já existe alguém com o mesmo email, tente novamente"
            res.render('../views/register', {errorEmail : erroEmail, errorName :''})
        }

    }


}