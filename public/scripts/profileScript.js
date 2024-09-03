let modal = document.getElementById("profile-Modal");

// Obtém o botão que abre o modal
let btn = document.getElementById("editPerfil");

// Obtém o <span> que fecha o modal
let span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no botão, abre o modal 
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

