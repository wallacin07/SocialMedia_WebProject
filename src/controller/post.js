const post = require('../model/post');
const story = require('../model/story');


const postPost = async (req,res) => {
    const id_user = req.params.id_user;
    const data = req.body;

    let postPicture = '';
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
                img: postPicture
            }
        )
        

    }

    res.redirect('/getHome/' + id_user)

}

const postStory = async (req, res) => {
    const id_user = req.params.id_user;
    const data = req.body;
    
    let postPicture = '';
    // Verificando se foi enviada alguma foto

    if (req.file){
        if(req.file)
            postPicture = req.file.filename;
        


        await story.create({
            idUser: id_user,
            img: postPicture,
            pubDate: new Date(),
            active: true
        })
        

    }

    res.redirect('/getHome/' + id_user)
}


module.exports = { postPost, postStory }