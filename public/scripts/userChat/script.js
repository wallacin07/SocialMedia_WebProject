// Função pra ver o tamanho da descrição do post, não mexa!!
const textarea = document.getElementById('inputComentario');


textarea.addEventListener('input', function() {
    this.style.height = 'auto'; // Reseta a altura para que o scrollHeight possa ser calculado corretamente
    this.style.height = this.scrollHeight + 'px'; // Define a altura baseada no scrollHeight
});
