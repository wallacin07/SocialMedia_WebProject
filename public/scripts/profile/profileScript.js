let image = document.getElementById('pessoa');
let file = document.getElementById('imagem');
image.addEventListener('click', () => {
    file.click()
})

file.addEventListener('change', () => 
    {
        if (file.files.length == 0){
            return;
        }


        let reader = new FileReader();
    
        reader.readAsDataURL(file.files[0]);
        
        reader.onload = () => {
            image.src = reader.result
        }
    }
)





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


function validateForm(event) {
    const name = document.getElementById('name').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !bio || !email || !password) 
        event.preventDefault();
}

document.getElementById('formUpdate').addEventListener('submit', validateForm);



// =============================================================================================


document.addEventListener("DOMContentLoaded", function() {
    // Somente exibe o alerta se erroDesativado estiver definido e não for vazio
    const senhaAtual = document.getElementById("password").value;
    localStorage.setItem('senhaAtual', senhaAtual );
    }
);




const formsMudanca = document.getElementById('confirmarSenha');
// Get button to close modal
const modalPassword = document.getElementById('modalPassword');

const confirmBtn = document.getElementById('confirmBtn');

const closeModalBtn = document.getElementById('closeModalBtn');
console.log(formsMudanca)


formsMudanca.addEventListener('submit', function (e) {
    const currentPasswordInput = document.getElementById('password');
    
    // Verifica se o campo de senha foi alterado
    if (currentPasswordInput.value !== localStorage.getItem('senhaAtual')) {
        e.preventDefault(); // Impede o envio do formulário
        
        
        // Abre o modal para confirmação
        modalPassword.style.display = 'flex';
    }else
    {
        const userId = formsMudanca.getAttribute('data-user-id');
        // Defina dinamicamente a ação e o método de envio do formulário
        formsMudanca.setAttribute('action', `/update/${userId}`);
        formsMudanca.setAttribute('method', 'POST');
        formsMudanca.submit(); 
    }
});




confirmBtn.addEventListener('click', function () {
    const newPassword = document.getElementById('newPassword');
    const currentPassword = newPassword.value;

    // Verificação simples da senha atual (você pode fazer uma verificação mais complexa no backend)
    if (currentPassword === localStorage.getItem('senhaAtual')) {
        modal.style.display = 'none'; // Fecha o modal
        modalPassword.display = 'flex'
        const userId = formsMudanca.getAttribute('data-user-id');

        // Defina dinamicamente a ação e o método de envio do formulário
        formsMudanca.setAttribute('action',  `/update/${userId}`);
        formsMudanca.setAttribute('method', 'POST');

        formsMudanca.submit(); // Envia o formulário
    } else {
        alert('Senha atual incorreta.');
    }
});








// Close modal by clicking the close button in the footer
closeModalBtn.addEventListener('click', function () {
    modalPassword.style.display = 'none';
});

// Close modal by clicking outside of the modal content
window.addEventListener('click', function (e) {
  if (e.target === modalPassword) {
    modalPassword.style.display = 'none';
  }
});