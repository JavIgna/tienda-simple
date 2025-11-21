$(document).ready(function () {

    let contador = $("#contadorCarrito").text();

    console.log(contador)
    $('.botonAniadir').on('click',
        function () {
            contador++;

            $("#contadorCarrito").text(contador)
        }
    )
})