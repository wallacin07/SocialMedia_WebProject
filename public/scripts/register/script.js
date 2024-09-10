function Imagem() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("imagem").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("pessoa").src = oFREvent.target.result;
    };
}

function validateForm(event) {
    const name = document.getElementById('name').value.trim();
    const birth = document.getElementById('birth').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !birth || !bio || !email || !password) 
        event.preventDefault();
}

document.querySelector('form').addEventListener('submit', validateForm);