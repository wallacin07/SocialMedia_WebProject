let modal = document.getElementById("profile-Modal");

// Obtém o botão que abre o modal
let btn = document.getElementById("editPerfil");

// Obtém o <span> que fecha o modal
let span = document.getElementsByClassName("close")[0];

// Obtém todos os botões que abrem o modal


btn.onclick = function() {
    modal.style.display = "block";
}

// Quando o usuário clicar no <span> (x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clicar em qualquer lugar fora do modal, fecha-o


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function Imagem() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("imagem").files[0]);
    
    oFReader.onload = function (oFREvent) {
        document.getElementById("pessoa").src = oFREvent.target.result;
    };
}

let btns_openPost = document.querySelectorAll(".btn-open-post");

// Obtém todos os modais
let modals_post = document.querySelectorAll(".modal");

// Obtém todos os elementos <span> que fecham o modal
let spans_post = document.querySelectorAll(".close-post");

// Adiciona um event listener para cada botão
btns_openPost.forEach((btn, index) => {
    btn.onclick = function() {
        modals_post[index].style.display = "block";
    }
});

// Adiciona um event listener para cada <span> (fechar)
spans_post.forEach((span, index) => {
    span.onclick = function() {
        modals_post[index].style.display = "none";
    }
});

// Fechar o modal quando o usuário clica fora do modal
window.onclick = function(event) {
    modals_post.forEach((modal) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

// =============================================================================================

// const modalComentarios = document.getElementById('modalComentarios');
// const botaoFecharComentarios = document.getElementById('botaoFecharComentarios');
// const botoesAbrir = document.querySelectorAll(".abrirComentarios");

// botoesAbrir.forEach(botao => {
//     botao.addEventListener("click", (e) => {
//         e.preventDefault();
//         modalComentarios.style.display = 'flex';
//     });
// })

// botaoFecharComentarios.addEventListener('click', () => {
//     modalComentarios.style.display = `none`;
// });
