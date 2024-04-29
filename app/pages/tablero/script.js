import {  push, ref, remove, onValue, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../Environments/firebaseConfig.js"

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const tabla = document.getElementById("tableroChorrera");
    const submitBtn = document.getElementById("submitForm-btn");
    const itemsPerPage = 50; // Número de elementos por página
    let currentPage = 1; // Página actual
    let isSubmitting = false;

    // ========== ========== NavBar ========== ==========
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    abrir.addEventListener("click", () => { nav.classList.add("visible"); });
    cerrar.addEventListener("click", () => { nav.classList.remove("visible"); });
    // ========== ========== NavBar ========== ==========

    // Evento para enviar el formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que se recargue la página al enviar el formulario

        console.log("Evento submit está funcionando"); // Agregar este console.log

        if (!isSubmitting) {
            isSubmitting = true; // Bloquea el formulario

            const unidadInput = document.getElementById("validationCustom01").value;
            const estadoInput = document.getElementById("validationCustom04").value;

            // Verifica que los campos no estén vacíos
            if (unidadInput.trim() !== "" && estadoInput.trim() !== "") {
                // Crear un nuevo objeto con los datos a guardar
                const nuevoRegistro = {
                    unidad: unidadInput,
                    estado: estadoInput
                };

                // Obtener una referencia a la ubicación en la base de datos donde se guardarán los datos
                const referenciaUnidades = ref(database, "unidades");

                // Agregar datos a la base de datos
                push(referenciaUnidades, nuevoRegistro)
                    .then(() => {
                        // Limpia los campos del formulario
                        form.reset();
                        // Desbloquea el formulario después de 1 segundos
                        setTimeout(() => {
                            isSubmitting = false;
                        }, 1000);
                        // Recarga la página después de enviar el formulario
                        setTimeout(() => {
                            location.reload();
                        }, 100);
                    })
                    .catch(error => {
                        console.error("Error al enviar datos a la base de datos:", error);
                    });
            } else {
                alert("Por favor completa todos los campos.");
            }
        } else {
            alert("Ya se está enviando un formulario. Por favor espera unos momentos antes de intentar de nuevo.");
        }
    });

    // Función para mostrar los datos en la tabla
    function mostrarDatos() {
        // Vacía la tabla antes de agregar los nuevos datos
        tabla.innerHTML = "";

        // Obtén los datos de la base de datos
        onValue(ref(database, "unidades"), snapshot => {
            const data = [];
            snapshot.forEach(childSnapshot => {
                data.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedData = data.slice(startIndex, endIndex);

            // Inicializa el contador de fila
            let filaNumero = startIndex + 1;

            paginatedData.forEach(childData => {
                const row = `
                      <tr>
                          <td class="text-center">${filaNumero++}</td>
                          <td class="text-center">${childData.unidad}</td>
                          <td class="text-center">${childData.estado}</td>
                      </tr>
                      `;
                tabla.innerHTML += row;
            });
        });
    }

    // Mostrar datos al cargar la página
    mostrarDatos();

    // Suscribirse a eventos en tiempo real para actualizar la tabla automáticamente
    onValue(ref(database, "unidades"), snapshot => {
        mostrarDatos(); // Mostrar los datos actualizados en la tabla
        setTimeout(mostrarDatos, 200); // Actualizar la tabla automáticamente después de 1 segundo
    });

    // Evento para actualizar el estado al cambiar el select
    tabla.addEventListener("change", function (event) {
        if (event.target.classList.contains("estado-select")) {
            const confirmar = confirm("¿Estás seguro de que deseas cambiar el estado?");
            if (confirmar) {
                const id = event.target.getAttribute("data-id");
                const nuevoEstado = event.target.value;
                update(ref(database, `unidades/${id}`), { estado: nuevoEstado })
                    .then(() => {
                        console.log("Estado actualizado exitosamente");
                        location.reload(); // Recargar la página después de cambiar el estado
                    })
                    .catch(error => {
                        console.error("Error al actualizar el estado:", error);
                    });
            } else {
                // Volver al estado original si se cancela la operación
                mostrarDatos();
            };
        };
    });

    // Accion de Desplazamiento ===========================
    // Botón de desplazamiento hacia Arriba/Abajo
    const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Evento de clic en el botón de desplazamiento hacia abajo
    scrollToBottomBtn.addEventListener("click", function () {
        const lastRow = tabla.rows[tabla.rows.length - 1];
        lastRow.scrollIntoView({ behavior: "smooth", block: "end" });
    });

    // Evento de clic en el botón de desplazamiento hacia arriba
    scrollToTopBtn.addEventListener("click", function () {
        const firstRow = tabla.rows[0];
        firstRow.scrollIntoView({ behavior: "smooth", block: "start" });
    }); // Accion de Desplazamiento ===========================

    // Evento para eliminar una entrada
    tabla.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const confirmar = confirm("¿Estás seguro de que deseas eliminar este elemento?");
            if (confirmar) {
                const id = event.target.getAttribute("data-id");
                remove(ref(database, `unidades/${id}`));
                mostrarDatos();
            }
        }
    });
});
console.log(database);

