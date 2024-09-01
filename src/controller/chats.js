const { Op } = require("sequelize");
const Chat = require("../model/chat");
const Message = require("../model/message");

//Envia a pagina EJS com todos os chats de um usuario
const ChatsPageGet = async (req, res) => {
    const { id } = req.params;

    const chats = await Chat.findAll({
        where: {
            // or fofo pra ver quais chats tem, independente da ordem dos ids
            [Op.or]: [
                {
                    idUserA: id
                },
                {
                    idUserB: id
                }
            ]
        }
    });

    res.render('../views/chats.ejs', { id, chats});
}

//Envia a pagina EJS de um chat especifo
const UserchatGet = async (req, res) => {
    const { id, idChat } = req.params;

    res.render('../views/userChat.ejs', {id, idChat })
}

//Envia em formato json as mensagens de um chat especifico
const UserchatQuery = async (req, res) => {
    const { id, idChat } = req.params;
    
    const messages = await Message.findAll({
        where: {
            idChat: idChat
        }
    })

    res.json(messages);
}

//Enviar a msg do usuario pro banco
const UserchatPost = async (req, res) => {
    const {id, idChat} = req.params;
    const {message} = req.body;

    await Message.create({
        idChat: idChat,
        message: message,
        messageDate: new Date(),
        idSender: id
    });


    res.render('../views/userChat.ejs', {id, idChat })
}

module.exports = { ChatsPageGet, UserchatGet, UserchatQuery, UserchatPost }