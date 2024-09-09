let carrito = [];

const botonesCarrito = document.querySelectorAll(".agregar-carrito");

botonesCarrito.forEach((boton) => {
  boton.addEventListener("click", agregarAlCarrito);
});

function agregarAlCarrito(event) {
  const productoId = event.target.getAttribute("data-id");
  const productoNombre = event.target.getAttribute("data-nombre");
  const productoPrecio = parseInt(event.target.getAttribute("data-precio"));

  const producto = {
    id: productoId,
    nombre: productoNombre,
    precio: productoPrecio,
    cantidad: 1,
  };

  const productoExistente = carrito.find((item) => item.id === productoId);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push(producto);
  }

  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoItems = document.getElementById("carrito-items");
  const carritoTotal = document.getElementById("carrito-total");

  carritoItems.innerHTML = "";

  let total = 0;

  carrito.forEach((item) => {
    const productoElement = document.createElement("div");
    productoElement.classList.add("d-flex", "justify-content-between", "mb-2");
    productoElement.innerHTML = `
            <span>${item.nombre} <strong>(${item.cantidad}un.)</strong></span>
            <span><strong>$${(item.precio * item.cantidad).toFixed(
              2
            )}</strong></span>
        `;
    carritoItems.appendChild(productoElement);

    total += item.precio * item.cantidad;
  });

  if (carrito.length === 0) {
    carritoItems.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
  }

  carritoTotal.textContent = total.toFixed(2);
}
