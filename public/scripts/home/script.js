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

botaoAbrirPublicar.addEventListener('click', () => {
    modal.style.display = `flex`;
});


const modalComentarios = document.getElementById('modalComentarios');
const botaoFecharComentarios = document.getElementById('botaoFecharComentarios');
const botoesAbrir = document.querySelectorAll(".abrirComentarios");

botoesAbrir.forEach(botao => {
    botao.addEventListener("click", (e) => {
        e.preventDefault();
        modalComentarios.style.display = 'flex';
    });
})

botaoFecharComentarios.addEventListener('click', () => {
    modalComentarios.style.display = `none`;
});
