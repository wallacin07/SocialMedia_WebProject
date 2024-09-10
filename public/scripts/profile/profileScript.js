
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




const formsMudanca = document.getElementById('formUpdate');

// Get button to close modal
const modalPassword = document.getElementById('modalPassword');

const confirmBtn = document.getElementById('confirmBtn');

const closeModalBtn = document.getElementById('closeModalBtn');

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

        modalPassword.style.display = 'flex'
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