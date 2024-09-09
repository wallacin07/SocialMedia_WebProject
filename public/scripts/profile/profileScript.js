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

const posts = document.querySelectorAll('.botaoPost');
const modalList = document.querySelectorAll('.modal[data-modal]');

modalList.forEach(m => {
    const closeBtn = m.querySelector(".close-post");

    closeBtn.addEventListener("click", () => {
        m.style.display = 'none';
    })
});

posts.forEach(post => {
    const id = post.getAttribute("data-for")
    post.addEventListener('click', (e) => {
        e.preventDefault();

        const element = e.target;

        const targetModal = document.querySelector(`.modal[data-modal="${id}"]`)

        targetModal.style.display = "block";

    })
})

// =============================================================================================


document.addEventListener("DOMContentLoaded", function() {
    // Somente exibe o alerta se erroDesativado estiver definido e não for vazio
    const senhaAtual = document.getElementById("password").value;
    localStorage.setItem('senhaAtual', senhaAtual );
    }
);


const modalPassword = document.getElementById('modalPassword');

const formsMudanca = document.getElementById('confirmarSenha');
// Get button to close modal
const closeModalBtn = document.getElementById('closeModalBtn');


const confirmBtn = document.getElementById('confirmBtn');

const currentPasswordInput = document.getElementById('password');

const newPassword = document.getElementById('newPassword');

const userId = formsMudanca.getAttribute('data-user-id');

const botaoFechar = document.getElementById('botaoFechar');

formsMudanca.addEventListener('submit', function (e) {
    // Verifica se o campo de senha foi alterado
    if (currentPasswordInput.value !== localStorage.getItem('senhaAtual')) {
        e.preventDefault(); // Impede o envio do formulário
        // Abre o modal para confirmação
        modalPassword.style.display = 'flex';
        modal.style.display = "none"
    } else {
                // Defina dinamicamente a ação e o método de envio do formulário
                formsMudanca.setAttribute('action', `/update/${userId}`);
                formsMudanca.setAttribute('method', 'POST');
                formsMudanca.submit(); 
    }
});




confirmBtn.addEventListener('click', function () {
    const currentPassword = newPassword.value;

    // Verificação simples da senha atual (você pode fazer uma verificação mais complexa no backend) // Da próxima vez, tira os comentários do chatgpt :)
    if (currentPassword === localStorage.getItem('senhaAtual')) {
        modalPassword.style.display = 'none'; // Fecha o modal

        // Defina dinamicamente a ação e o método de envio do formulário
        formsMudanca.setAttribute('action',  `/update/${userId}`);
        formsMudanca.setAttribute('method', 'POST');

        formsMudanca.submit(); // Envia o formulário
    } else {
        alert('Senha atual incorreta.');
    }
});


botaoFechar.addEventListener('click', () => {
    modalPassword.style.display = 'none';
})

// Close modal by clicking the close button
// Close modal by clicking the close button in the footer
closeModalBtn.addEventListener('click', function () {
    modalPassword.style.display = 'none';
});