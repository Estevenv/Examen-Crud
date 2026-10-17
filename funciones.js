const boton = document.querySelector(".boton");
const campoTexto = document.querySelector(".campoTexto");
const tabla = document.querySelector("#tablaTareas");

let contador = 0;

// Función principal para agregar tarea
function agregarTarea() {
  const tarea = campoTexto.value.trim();

  if (tarea === "") {
    alert("⚠️ Debes escribir una tarea antes de agregarla.");
    return;
  }

  contador++;

  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${contador}</td>
    <td>${tarea}</td>
    <td>
      <span class="editar btn btn-warning btn-sm">✏️</span>
      <span class="eliminar btn btn-danger btn-sm">❌</span>
    </td>
  `;

  tabla.appendChild(fila);
  campoTexto.value = "";

  // Editar tarea
  fila.querySelector(".editar").addEventListener("click", () => {
    const nuevaTarea = prompt("Editar tarea:", tarea);
    if (nuevaTarea !== null && nuevaTarea.trim() !== "") {
      fila.cells[1].textContent = nuevaTarea.trim();
    } else if (nuevaTarea !== null) {
      alert("⚠️ No puedes dejar la tarea vacía.");
    }
  });

  // Eliminar tarea con confirmación
  fila.querySelector(".eliminar").addEventListener("click", () => {
    if (confirm("¿Deseas eliminar esta tarea?")) {
      fila.remove();
      reordenarNumeros();
    }
  });
}

// Evento click en el botón
boton.addEventListener("click", agregarTarea);

// Evento Enter en el campo de texto
campoTexto.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita que se envíe el formulario
    agregarTarea();
  }
});

// Reordenar números al eliminar
function reordenarNumeros() {
  contador = 0;
  const filas = tabla.querySelectorAll("tr");
  filas.forEach(fila => {
    contador++;
    fila.cells[0].textContent = contador;
  });
}
