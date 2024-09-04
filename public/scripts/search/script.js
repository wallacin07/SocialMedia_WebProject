// Função pra abrir e fechar o modal, ajustar conforme necessário
const modal = document.getElementById('modalSearch');
const botaoFechar = document.getElementById('botaoFecharSearch');
const botaoAbrir = document.getElementById('abrirModalSearch');

botaoFechar.addEventListener('click', () => {
    modal.style.display = `none`;
});

botaoAbrir.addEventListener('click', () => {
    modal.style.display = `flex`;
});