import { api } from "./utils.js"; //conectar axios de utils.js

import "./funcionesProductos.js";

// abrir el modal
export const modal = new bootstrap.Modal("#formularioGestion", {
  keyboard: false,
});
document.addEventListener("DOMContentLoaded", function () {
  cargarDatosProducto(); //llamado a la funcion cargarDatosProducto

  const form = document.querySelector("form");

  const {nombre, categoria, descripcion, precio, imagen, editar} = form.elements

  form.addEventListener("submit", function (event) {
    event.preventDefault(); //evita que se recargue la pagina

    const data = {
      nombre: nombre.value,
      categoria: categoria.value,
      descripcion: descripcion.value,
      precio: precio.value,
      imagen: imagen.value,
    };

    //enviar los datos
    api({
      method: editar.value ? "PUT" : "POST",
      url: editar.value ? `/producto/${editar.value}` : "/producto",
      data,
    })
      .then(({ data }) => {
        console.log(data);
        swal.fire("Exito!", data.message, "success");
        cargarDatosProducto(); //actualizar la tabla despues de agregar un nuevo cliente
        form.reset();
        modal.hide();
      })
      .catch((err) =>
        swal.fire("Error!: " + err?.response?.data?.message, "error")
      );
  });
});



export function cargarDatosProducto(pagina = 1) {
  const wrapper = document.querySelector("#card-wrapper");
  wrapper.innerHTML = ""; 

   // Solicitud API, ajustando la ruta según corresponda
   api.get(`/productos?page=${pagina}&perPage=8`).then(({ data }) => {
    for (const producto of data) {
      // Formatear los datos como sea necesario

      const precioFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(producto.precio); // Formatear el precio

      wrapper.innerHTML += ` 
          <div class="card" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <div>
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text"><small class="text-muted">Precio: ${precioFormateado}</small></p>
                <br/>
              </div>
              <div class="d-grid gap-2">
                  <button type="button" class="btn btn-primary" onclick="editarProducto(${producto.id})">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button type="button" class="btn btn-danger" onclick="eliminarProducto(${producto.id})" >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
              </div>
            </div>
          </div>`
    }
  });
}
