// NavBar - Functions
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});
// ----------------------------------------------------------------------------------

// Modal - Functions
// Función para abrir un modal específico
function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}

// Función para cerrar un modal específico
function cerrarModal(id) {
  document.getElementById(id).style.display = "none";
}

// Secretarios
document.getElementById("btnModal-chapalin").onclick = function () {
  abrirModal("modal-chapalin");
};
document.getElementById("btnModal-gabriel").onclick = function () {
  abrirModal("modal-gabriel");
};
document.getElementById("btnModal-pollito").onclick = function () {
  abrirModal("modal-pollito");
};
// ----------------------------------------------------------------------------------
