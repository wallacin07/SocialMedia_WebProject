let image = document.getElementById('imgPublicar');
let file = document.getElementById('inputPublicar');
image.addEventListener('click', () => {
    file.click()
})

file.addEventListener('change', () => 
    {
        if (file.files.length == 0) {
            return;
        }

        let reader = new FileReader();
    
        reader.readAsDataURL(file.files[0]);
        
        reader.onload = () => {
            image.src = reader.result
        }
    }
)

// Função pra ver o tamanho da descrição do post, não mexa!!
const textareas = document.querySelectorAll('.inputDescricao');

textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto'; // Reseta a altura para que o scrollHeight possa ser calculado corretamente
        this.style.height = this.scrollHeight + 'px'; // Define a altura baseada no scrollHeight
    });
});


// Função pra abrir e fechar o modal, ajustar conforme necessário
const modal = document.getElementById('modal');
const botaoFechar = document.getElementById('botaoFechar');
const botaoAbrir = document.getElementById('botaoAbrirPublicar');

botaoFechar.addEventListener('click', () => {
    modal.style.display = `none`;
});

botaoAbrir.addEventListener('click', () => {
    modal.style.display = `flex`;
});


const modalComentarios = document.getElementById('modalComentarios');
const botaoFecharComentarios = document.getElementById('botaoFecharComentarios');
const botoesAbrirComentarios = document.querySelectorAll(".abrirComentarios");

botoesAbrirComentarios.forEach(botao => {
    botao.addEventListener("click", (e) => {
        localStorage.setItem('Modal', '1');
    });
})

botaoFecharComentarios.addEventListener('click', () => {
    localStorage.setItem('Modal', '0');
    modalComentarios.style.display = `none`;
});


// Recupera o estado do modal no localStorage
function verificarModal() {
    const modalEstado = localStorage.getItem('Modal');
    if (modalEstado === '1') {
        modalComentarios.style.display = 'flex';
    } else {
        modalComentarios.style.display = 'none';
    }
}

// Vê como estava o estado do modal quando recarrega a página
window.addEventListener('load', verificarModal);




const kangureButton = document.getElementById('kangureButton');
kangureButton.addEventListener('click', (event) => {
    this.form.submit();
    
});


const sendCommentButton = document.getElementById('sendCommentButton');
sendCommentButton.addEventListener('click', () => {
    localStorage.setItem('Modal', '0');
    modalComentarios.style.display = `none`;
})



document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('Modal')) {
        localStorage.setItem('Modal', '0');
        modalComentarios.style.display = `none`;
    }
});
