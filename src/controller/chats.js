const { Op } = require("sequelize");
const Chat = require("../model/chat");
const Message = require("../model/message");
const User = require('../model/user');

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
        },
        include: [
            {
                model: User,
                as: 'UserA',
                attributes: ['idUser', 'name', 'profilePhoto', 'birthDate']
            },
            {
                model: User,
                as: 'UserB',
                attributes: ['idUser', 'name', 'profilePhoto', 'birthDate']
            }
        ]
    });

    

    res.render('../views/chats.ejs', { id, chats });
}

//Envia a pagina EJS de um chat especifo
const UserchatGet = async (req, res) => {
    const { id, idChat } = req.params;

    // Encontre o chat específico com base no idChat
    const chat = await Chat.findOne({
        where: {
            idChat: idChat, // Busca pelo id do chat específico
            [Op.or]: [
                { idUserA: id },
                { idUserB: id }
            ]
        },
        include: [
            {
                model: User,
                as: 'UserA',
                attributes: ['idUser', 'name', 'profilePhoto', 'birthDate']
            },
            {
                model: User,
                as: 'UserB',
                attributes: ['idUser', 'name', 'profilePhoto', 'birthDate']
            }
        ]
    });

    // Verificação de existência do chat
    if (!chat) {
        return res.status(404).send('Chat não encontrado');
    }

    // Log para verificar se o chat está sendo recuperado corretamente
    console.log(JSON.stringify(chat, null, 2));

    // Passa o chat específico para a view
    res.render('../views/userChat.ejs', { id, chat });
};





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

    // Reencontra o chat após adicionar a mensagem
    const chat = await Chat.findOne({
        where: {
            idChat: idChat,
            [Op.or]: [
                { idUserA: id },
                { idUserB: id }
            ]
        },
        include: [
            {
                model: User,
                as: 'UserA',
                attributes: ['idUser', 'name', 'profilePhoto', 'birthDate']
            },
            {
                model: User,
                as: 'UserB',
                attributes: ['idUser', 'name', 'profilePhoto', 'birthDate']
            }
        ]
    });


    res.render('../views/userChat.ejs', { id, idChat, chat })
}

module.exports = { ChatsPageGet, UserchatGet, UserchatQuery, UserchatPost }