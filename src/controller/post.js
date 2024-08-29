const post = require('../model/post');


module.exports = {

    async postPost(req,res){
        const id_user = req.params.id_user;

        const data = req.body;

        let postPicture = 'post.png';
        // Verificando se foi enviada alguma foto
        if (req.file || data.new_post_description) {
            postPicture = req.file.filename;

            // await post.create('')
            

        }

        res.redirect('/getHome/' + id_user)

    }
}