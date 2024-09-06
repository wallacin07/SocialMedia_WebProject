const modal = document.getElementById('modalSearch');
const botaoFechar = document.getElementById('botaoFecharSearch');
const botaoAbrir = document.getElementById('abrirModalSearch');

// Recupera o estado do modal no localStorage
function verificarModal() {
    const modalEstado = localStorage.getItem('Modal');
    if (modalEstado === '1') {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

// Vê como estava o estado do modal quando recarrega a página
window.addEventListener('load', verificarModal);

botaoAbrir.addEventListener('click', () => {
    modal.style.display = 'flex';
    localStorage.setItem('Modal', '1');
});

botaoFechar.addEventListener('click', () => {
    modal.style.display = 'none';
    localStorage.setItem('Modal', '0');
});

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('Modal')) {
        modal.style.display = 'none';
        localStorage.setItem('Modal', '0');
    }
});
