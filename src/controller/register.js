const user = require('../model/user')


module.exports = {
    async PagRegisterGet(req, res){
    res.render('../views/register');
    },

    async registerUser(req,res)
    {
        const dados = req.body;
        let foto = 'profile.svg';
        // Verificando se foi enviada alguma foto
        if (req.file) {
        // Pegar novo nome da foto
            foto = req.file.filename;
        }

        await user.create({
            name: dados.name,
            password: dados.password,
            birthDate: dados.birth,
            description: dados.bio,
            email: dados.email,
            profilePhoto: foto,
            admin: true,
            active: true
        });
        res.redirect('/')
    }


}