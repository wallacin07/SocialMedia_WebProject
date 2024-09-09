const messageBox = document.querySelector("#messageBox")

//Pegar o Id do usuario e do chat pelo js por meio da url da pagina
const url = window.location.pathname; 

const parts = url.split('/').filter(Boolean);

const lastNumber = parts[parts.length - 1];
const secondLastNumber = parts[parts.length - 2];

const idChat = parseInt(lastNumber, 10);
const id = parseInt(secondLastNumber, 10);
//



const loadMessages = async() => {
    const res = await fetch(`${window.location.pathname}/get`);
    const mensagens = await res.json();

    //Limpar elementos
    messageBox.innerHTML = '';


    mensagens.forEach(msg => {
        messageBox.insertAdjacentHTML('beforeend', `
                <div class="${msg.idSender === id ? 'owner' : 'recipient'}">
                    ${msg.message}
                </div>
            `)
    })
}

document.addEventListener('DOMContentLoaded',async function() {
    const res = await fetch(`${window.location.pathname}/get`);
    const mensagens = await res.json();
    if (!localStorage.getItem('chat:')){
        localStorage.setItem('Modal', '0');
        modalComentarios.style.display = `none`;
    }
});



setInterval(() => {
    loadMessages();
}, 500);
