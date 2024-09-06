const post = require('../model/post');
const user = require('../model/user');
const comment = require('../model/comment');
const fs = require('fs');

module.exports = 
{
    async PagProfileGet(req, res){

        const id_user = req.params.id_user;

        const users= await user.findOne({
            raw: true,
            attributes: ['idUser','name','password', 'birthDate','description','email','profilePhoto','admin','active'],
            where: {idUser: id_user}
        })
        const posts = await post.findAll({
            raw: true,
            attributes: ['idPost','description','img', 'idUser'],
            where: {idUser: id_user}
        })

        
        // const comments = await comment.findAll({
        //   raw: true,
        //   attributes: ['idComment', 'description', 'commentDate', 'idPost', 'idUser'],
        //   include: [{
        //     model: post,
        //     required: true,  // Isso cria o INNER JOIN
        //     attributes: ['idPost','idUser'],  // Atributos do post que você deseja
        //     where: { idUser: id_user }  // Filtra os posts pelo id do usuário
        //   }],
        // });
        

        res.render('../views/profile', {users,posts, id_user })
    },

    async updateProfile(req, res) {

        const id_user = req.params.id_user;
        const dados = req.body;


        
      

        if (req.file) {
          // Recebendo a antiga foto do aluno
          const antigaFoto = await user.findAll({
          raw: true,
          attributes: ['profilePhoto'],
          where: { idUser: id_user }
          });
          // Excluindo a foto da pasta
          if (antigaFoto[0].Foto != 'usuario.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));
          // Update da nova foto no DB
          await user.update(
          {profilePhoto: req.file.filename},
          {where: { idUser: id_user }}
          );
          }


        console.log(req.body.olaa); // For debugging purposes (remove if not needed)
      
        try {
          await user.update({
            name: dados.name,
            password: dados.password,
            birthDate: dados.birth,
            description: dados.bio,
            email: dados.email,
          }, {
            where: { idUser: id_user },
          });
      
          res.redirect('/profilePag/' + id_user); // Redirect after successful update
        } catch (error) {
          console.error('Error updating user profile:', error);
          // Handle the error appropriately, e.g., return an error response to the user
        }
      }

}