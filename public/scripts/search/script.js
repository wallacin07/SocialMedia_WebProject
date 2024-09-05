// // Função pra abrir e fechar o modal, ajustar conforme necessário
// const modal = document.getElementById('modalSearch');
// const botaoFechar = document.getElementById('botaoFecharSearch');
// const botaoAbrir = document.getElementById('abrirModalSearch');

// let modalAberto = 0;



// // botaoFechar.addEventListener('click', () => {
// //     // modal.style.display = `none`;
// //     modalAberto = 0; 
// // });

// botaoAbrir.addEventListener('click', () => {
//     // modal.style.display = `flex`;
//     // alert('aaaaaaaaa')
//     modalAberto = 1;
// });

// localStorage.setItem('Modal', modalAberto);

// // const searchForm = document.getElementById('searchForm')

// // searchForm.addEventListener('submit', (event) => {
// //     event.preventDefault();
// // });


// function verificarModal() {
//     if (localStorage.getItem('Modal').valueOf == 1) {
//         modal.style.display = `flex`;
//     }
//     else {
//         modal.style.display = `flex`;
//     }
// }



// window.addEventListener('beforeunload', () => {
//     verificarModal();
// })

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
    modal.style.display = 'none';d
    localStorage.setItem('Modal', '0');
});
