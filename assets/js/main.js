$(document).ready(function () {

    // Helpers o funciones auxiliares
    function cargarCarrito() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }
    function guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }

    let carrito = cargarCarrito();

    function refrescarContador() {
        $('#contadorCarrito').text(carrito.length);
    }

    refrescarContador()


    $('.botonAniadir').on('click',
        function () {
            const carta = $(this).closest('.border');
            const titulo = carta.find("h5").text().trim();
            const precio = carta.find("strong").text().trim();
            const imagen = carta.find("img").attr('src');

            console.log(titulo);

            const producto = { titulo, precio, imagen };
            carrito.push(producto);

            guardarCarrito(carrito);
            refrescarContador()

            const idBoton = $(this).attr('id');

            $(`#${idBoton}`).addClass('disabled')
        }
    )

    if ($('#productosCarrito').length) {
        renderizarCarrito();
    }

    function renderizarCarrito() {
        const contenedor = $('#productosCarrito');
        contenedor.empty();
        if (carrito.length === 0) {
            contenedor.html('<span>El carrito está vacío</span>')
            $('#totalCarrito').text('0 CLP');
            return;
        }

        let total = 0;
        carrito.forEach(function (producto, index) {
            const numero = parseInt((producto.precio || '').replace(/\D/g, '')) || 0;
            total += numero;

            const item = $('<div class="row mb-3 align-items-center border rounded p-2"></div>');
            item.append('<div class="col-2"><img src="' + producto.imagen + '" class="img-fluid" alt="' + producto.titulo + '"></div>');
            item.append('<div class="col-6"><h5 class="mb-0">' + producto.titulo + '</h5></div>');
            item.append('<div class="col-2 text-end"><strong>' + producto.precio + '</strong></div>');
            item.append('<div class="col-2 text-end"><button class="btn btn-sm btn-danger removeItem" data-index="' + index + '">Eliminar</button></div>');
            contenedor.append(item);
        })

        $('#totalCarrito').text(formatoCLP(total));

    }

    function formatoCLP(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' CLP'; }
})