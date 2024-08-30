let image = document.getElementById('imgPublicar');
let file = document.getElementById('inputPublicar');
image.addEventListener('click', () => 
    {
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
    })

// Função pra ver o tamanho da descrição do post, não mexa!!
const textarea = document.getElementById('new_post_description');

textarea.addEventListener('input', function() {
    this.style.height = 'auto'; // Reseta a altura para que o scrollHeight possa ser calculado corretamente
    this.style.height = this.scrollHeight + 'px'; // Define a altura baseada no scrollHeight
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