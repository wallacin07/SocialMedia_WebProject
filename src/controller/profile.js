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

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

        res.render('../views/profile', {users,posts, id_user})
    },

    async updateProfile(req, res){

        const id_user = req.params.id;
        const dados = req.body;

        if (req.file) {
            // Recebendo a antiga foto do aluno
            const users= await user.findOne({
                raw: true,
                attributes: ['profilePhoto'],
                where: {idUser: id_user}
            })
            // Excluindo a foto da pasta
            if (users.profilePhoto != 'usuario.png') fs.unlink(`public/img/${users.profilePhoto}`, ( err => { if(err) console.log(err); } ));
            // Update da nova foto no DB
            await aluno.update(
            {profilePhoto: req.file.filename},
            {where: { idUser: id_user  }}
            );
            }


        await user.update({
            name: dados.modalName,
            password: dados.modalPassword,
            birthDate: dados.modalBirth,
            description: dados.modalBio,
            email: dados.modalEmail,
        },
    
    {
        where :{idUser : id_user} 
    });
    res.redirect('/profilePag/:id');
    }

}