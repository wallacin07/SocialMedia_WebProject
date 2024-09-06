// Seleciona todos os botões de abrir e fechar modais
const botaoAbrir = document.querySelectorAll('.botaoPost');
const botaoFechar = document.querySelectorAll('.botaoFechar');

// Adiciona um listener de click para todos os botões de abrir
botaoAbrir.forEach(botao => {
    botao.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o comportamento padrão do link

        // Obtém o ID do modal associado
        const modalId = botao.getAttribute('data-modal-id');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.style.display = 'flex';
        }
    });
});

// Adiciona um listener de click para todos os botões de fechar
botaoFechar.forEach(botao => {
    botao.addEventListener('click', () => {
        // Obtém o ID do modal associado
        const modalId = botao.getAttribute('data-modal-id');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Função pra ver o tamanho da descrição do post, não mexa!!
const textareas = document.querySelectorAll('.inputDescricao');

textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto'; // Reseta a altura para que o scrollHeight possa ser calculado corretamente
        this.style.height = this.scrollHeight + 'px'; // Define a altura baseada no scrollHeight
    });
});