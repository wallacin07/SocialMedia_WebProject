const { Sequelize } = require('sequelize')
const users = require('../model/user')


module.exports = {
    async showAdmScreen(req,res){

        //MORE
        allUsers = await users.findAll({
            raw: true,
            attributes: ['idUser', 'name', 'profilePhoto', 'active', 'admin']
        })
        res.render('../views/adminScreen', {allUsers})
    },

    async toggleActive (req,res){
        const id_toggle = req.params.id_toggle;
        await users.update(
            {
                active: Sequelize.literal('active ^ 1'),
            },
            {
                where: { idUser: id_toggle }
            }
        )
    }
}