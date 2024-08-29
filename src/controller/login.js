const user = require('../model/user')


module.exports = {
    async PagInitGet(req, res){
    res.render('../views/index');
    },

    async login(req,res){
        const name = req.body.name;
        const password = req.body.password;

        const id_user = await user.findAll(
            {
                raw: true,
                attributes: ['idUser']
            },
            {
                where: {
                    [Op.and]: [
                        { name: name },
                        { password: password }
                    ]
                }
            }
        );

        console.log(id_user);



    },

    async register(req,res)
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