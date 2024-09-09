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


document.addEventListener("DOMContentLoaded", function() {
    // Somente exibe o alerta se erroDesativado estiver definido e não for vazio
    const senhaAtual = document.getElementById("password");
    localStorage.setItem('senhaAtual', senhaAtual );
    }
);


const modalPassword = document.getElementById('modalPassword');

// Get button to close modal
const closeModalBtn = document.getElementById('closeModalBtn');

// Get the close button (x)
const closeBtn = document.querySelector('.close');

const confirmBtn = document.querySelector('.confirmBtn');

const currentPasswordInput = document.getElementById('password');

const newPassword = document.getElementById('newPassword');


form.addEventListener('submit', function (e) {
    // Verifica se o campo de senha foi alterado
    if (passwordInput.value !== "<%=users.password%>") {
        e.preventDefault(); // Impede o envio do formulário

        // Abre o modal para confirmação
        modalPassword.style.display = 'block';
    }
});




confirmBtn.addEventListener('click', function () {
    const currentPassword = currentPasswordInput.value;

    // Verificação simples da senha atual (você pode fazer uma verificação mais complexa no backend)
    if (currentPassword === "<%=users.password%>") {
        modal.style.display = 'none'; // Fecha o modal

        // Defina dinamicamente a ação e o método de envio do formulário
        form.setAttribute('action', `/update/<%= users.idUser %>`);
        form.setAttribute('method', 'POST');

        form.submit(); // Envia o formulário
    } else {
        alert('Senha atual incorreta.');
    }
});








// Close modal by clicking the close button
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

// Close modal by clicking the close button in the footer
closeModalBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

// Close modal by clicking outside of the modal content
window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


















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
