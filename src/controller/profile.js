const post = require('../model/post');
const user = require('../model/user');
const comment = require('../model/comment');
const follow = require('../model/follow');
const { Op } = require("sequelize");
const fs = require('fs');

module.exports =
{
  async PagProfileGet(req, res) {

    const id_user = req.params.id_user;

    const users = await user.findOne({
      raw: true,
      attributes: ['idUser', 'name', 'password', 'birthDate', 'description', 'email', 'profilePhoto', 'admin', 'active'],
      where: { idUser: id_user }
    })
    const posts = await post.findAll({
      raw: true,
      attributes: ['idPost', 'description', 'img', 'idUser'],
      // include: {
      //   model: comment
      // },
      where: 
      {
        [Op.and]: [
          { idUser: id_user },
          { [Op.not]: {img: ''} }
        ]
      }
    })


    // console.log('\n\n\n\n\n\n\n-' + posts[0].comments + '-\n\n\n\n\n\n\n')
    // posts.forEach((o) => {
    //   console.log(o)
      
    // })



    const following = await follow.count({
      where: { [Op.and]: [{ idFollower: id_user }, { active: 1 }] }
    })

    const followers = await follow.count({
      where: {
        [Op.and]: [{ idFollowed: id_user }, { active: 1 }]
      }
    })


    res.render('../views/profile', { users, posts, id_user, novaSenha: 0, confirmarTroca: 0, following, followers })
  },

  async updateProfile(req, res) {

    const id_user = req.params.id_user;
    const dados = req.body;



    const check = await user.findAll({
      where:{
        [Op.and]:[
          {
            [Op.or]: [
                {name: dados.name},
                {email: dados.email}
            ]
          },
          {
            [Op.not]: {idUser: id_user}
          }
        ]
      }
    })


    if(check.length > 0){
      res.redirect('back');
      return;
    }




    if (req.file) {
      // Recebendo a antiga foto do aluno
      const antigaFoto = await user.findAll({
        raw: true,
        attributes: ['profilePhoto'],
        where: { idUser: id_user }
      });
      // Excluindo a foto da pasta
      if (antigaFoto[0].Foto != 'usuario.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, (err => { if (err) console.log(err); }));
      // Update da nova foto no DB
      await user.update(
        { profilePhoto: req.file.filename },
        { where: { idUser: id_user } }
      );
    }


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
    }
  }
}

