const user = require('../model/user')


module.exports = {
    async init(req, res){
    res.render('../views/teste');
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



    }


}