const post = require('../model/post');


module.exports = {

    async postPost(req,res){
        const id_user = req.params.id_user;
        const data = req.body;
        let postPicture = 'post.png';
        let description = '';
        // Verificando se foi enviada alguma foto
        if (req.file || data.new_post_description){
            if(req.file)
                postPicture = req.file.filename;
            if(data.new_post_description)
                description = data.new_post_description

            await post.create(
                {
                    idUser: id_user,
                    description: description,
                    img: postPicture,
                    // hashtag: '',
                    // postDate: 'NOW'
                }

            )
            

        }

        res.redirect('/getHome/' + id_user)

    }
}