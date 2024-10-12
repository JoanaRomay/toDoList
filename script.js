let ingresarTarea = document.getElementById("ingresarTarea");
const botonIngresar = document.getElementById("botonIngresar");
let listaTareas = document.getElementById("listaTareas");

document.addEventListener("DOMContentLoaded", cargarTareas);

function agregarTarea() {
    if (ingresarTarea.value === "") {
        alert("Ingrese una tarea");
    } else {
        let tareaTexto = ingresarTarea.value;

        // Crear la tarea en el DOM
        let tarea = document.createElement("div");
        tarea.classList.add("tarea");

        let textoTarea = document.createElement("span");
        textoTarea.innerText = tareaTexto;
        tarea.appendChild(textoTarea);

        listaTareas.appendChild(tarea);

        let contenedorBoton = document.createElement("div");
        contenedorBoton.classList.add("contenedorBoton");
        tarea.appendChild(contenedorBoton);

        let botonCompletar = document.createElement("button");
        botonCompletar.classList.add("botonCompletar");
        botonCompletar.innerHTML = `<i class="fa-regular fa-circle"></i>`;
        contenedorBoton.appendChild(botonCompletar);

        botonCompletar.addEventListener("click", (e) => {
            textoTarea.classList.toggle("completada");

            if (botonCompletar.innerHTML === `<i class="fa-regular fa-circle-check" style="color: rgb(255, 20, 147);"></i>`) {
                botonCompletar.innerHTML = `<i class="fa-regular fa-circle"></i>`;
            } else {
                botonCompletar.innerHTML = `<i class="fa-regular fa-circle-check" style="color: rgb(255, 20, 147);"></i>`;
            }
        });

        let botonBorrar = document.createElement("button");
        botonBorrar.classList.add("botonBorrar");
        botonBorrar.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
        contenedorBoton.appendChild(botonBorrar);

        botonBorrar.addEventListener("click", (e) => {
            tarea.remove();
            eliminarTareaLocal(tareaTexto);
        });

        // Guardar la tarea en Local Storage
        guardarTareaLocal(tareaTexto);

        ingresarTarea.value = "";
    }
}

function guardarTareaLocal(tarea) {
    let tareas = localStorage.getItem("tareas") ? JSON.parse(localStorage.getItem("tareas")) : [];
    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
    let tareas = localStorage.getItem("tareas") ? JSON.parse(localStorage.getItem("tareas")) : [];
    tareas.forEach(tareaTexto => {
        agregarTareaDesdeLocal(tareaTexto);
    });
}

function agregarTareaDesdeLocal(tareaTexto) {
    let tarea = document.createElement("div");
    tarea.classList.add("tarea");

    let textoTarea = document.createElement("span");
    textoTarea.innerText = tareaTexto;
    tarea.appendChild(textoTarea);

    listaTareas.appendChild(tarea);

    let contenedorBoton = document.createElement("div");
    contenedorBoton.classList.add("contenedorBoton");
    tarea.appendChild(contenedorBoton);

    let botonCompletar = document.createElement("button");
    botonCompletar.classList.add("botonCompletar");
    botonCompletar.innerHTML = `<i class="fa-regular fa-circle"></i>`;
    contenedorBoton.appendChild(botonCompletar);

    botonCompletar.addEventListener("click", (e) => {
        textoTarea.classList.toggle("completada");

        if (botonCompletar.innerHTML === `<i class="fa-regular fa-circle-check" style="color: rgb(255, 20, 147);"></i>`) {
            botonCompletar.innerHTML = `<i class="fa-regular fa-circle"></i>`;
        } else {
            botonCompletar.innerHTML = `<i class="fa-regular fa-circle-check" style="color: rgb(255, 20, 147);"></i>`;
        }
    });

    let botonBorrar = document.createElement("button");
    botonBorrar.classList.add("botonBorrar");
    botonBorrar.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    contenedorBoton.appendChild(botonBorrar);

    botonBorrar.addEventListener("click", (e) => {
        tarea.remove();
        eliminarTareaLocal(tareaTexto);
    });
}

// Función para eliminar una tarea del Local Storage
function eliminarTareaLocal(tareaTexto) {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    tareas = tareas.filter(t => t !== tareaTexto);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

botonIngresar.addEventListener("click", agregarTarea);
