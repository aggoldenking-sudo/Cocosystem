import { settings, loterias, animales, caballos } from "./data.js";
import { calcularPremioAnimalitos } from "./games/animalitos.js";
import { calcularPuntosPolla } from "./games/pollaHipica.js";

// Cerrar sesión
function logout() {
  auth.signOut().then(() => location.href = "index.html");
}

// Guardar configuración
function guardarSettings() {
  const valorPolla = parseInt(document.getElementById("valorPolla").value);
  const multiplicador = parseInt(document.getElementById("multiplicadorAnimalitos").value);
  const porcentaje = parseInt(document.getElementById("porcentajePolla").value);

  db.collection("settings").doc("config").set({
    valorPolla,
    multiplicadorAnimalitos: multiplicador,
    porcentajePremioPolla: porcentaje
  }).then(() => alert("Configuración guardada!"))
    .catch(err => alert(err.message));
}

// Crear usuario (Recolector o Vendedor)
function crearUsuario() {
  const email = document.getElementById("nuevoEmail").value;
  const password = document.getElementById("nuevoPassword").value;
  const role = document.getElementById("nuevoRol").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection("users").doc(cred.user.uid).set({ role });
    })
    .then(() => alert("Usuario creado correctamente!"))
    .catch(err => alert(err.message));
}

// Cargar resultados de juegos
function cargarResultados() {
  const juego = document.getElementById("selectJuego").value;

  if (juego === "animalitos") {
    // Aquí se implementaría la carga de resultados de Animalitos
    alert("Función carga resultados Animalitos pendiente!");
  } else if (juego === "pollaHipica") {
    // Aquí se implementaría la carga de resultados de Polla Hípica
    alert("Función carga resultados Polla Hípica pendiente!");
  }
}

// Exponer funciones al HTML
window.logout = logout;
window.guardarSettings = guardarSettings;
window.crearUsuario = crearUsuario;
window.cargarResultados = cargarResultados;
