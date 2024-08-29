function Imagem() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("imagem").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("pessoa").src = oFREvent.target.result;
    };
}