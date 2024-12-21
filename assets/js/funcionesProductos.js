import {cargarDatosProducto, modal} from "./script.js"; 

const form = document.querySelector("form")

window.editarProducto = function(id){
    fetch("http://localhost:3000/producto/" + id).then(response => response.json()).then(data => {
        const {editar, nombre, descripcion, precio, imagen, categoria} = form.elements

        //asignar los valores a los campos del funcionario
        
        editar.value = data.id
        nombre.value = data.nombre
        categoria.value = data.categoria
        descripcion.value = data.descripcion
        precio.value = data.precio
        imagen.value = data.imagen

        modal.show()
    })
}

window.limpiarFormulario = function(){
    form.reset()
}

window.eliminarProducto = function (id){
    swal.fire({
        //alarma al momento de eliminar un producto
        title: '¿Estás seguro de eliminar este Producto?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: "cancelar",
      }).then(function(result) {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/producto/${id}`, {
                method: 'DELETE',
            }).then((response) => response.json()).then((data) => {
                swal.fire("Eliminado!", data.message, "success")
                cargarDatosProducto()
            })
        }
      });
    }


    //paginacion
    let pagina = 1;
    const contador = document.querySelector("#paginacion h3")
    window.paginaSiguiente = function(){
        pagina++;
        contador.innerText = pagina;
        cargarDatosProducto(pagina)
    }



    window.paginaAnterior = function(){
        if(pagina - 1 == 0){
            swal.fire("Error", "Esta es la primera pagina", "error")
        } else{
            pagina--;
            contador.innerText = pagina
            cargarDatosProducto(pagina)
        }
        
    }

