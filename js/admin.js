import { settings, animales, caballos } from "./data.js";
import { calcularPremioAnimalitos } from "./games/animalitos.js";
import { calcularPuntosPolla } from "./games/pollaHipica.js";

// Función para cargar resultados
async function cargarResultados() {
  const juego = document.getElementById("selectJuego").value;

  if (juego === "animalitos") {
    const resultadosAnimalitos = prompt("Ingrese los números ganadores separados por coma (ej: 00,01,02)").split(",");
    
    // Guardar resultados en Firebase
    await db.collection("resultados").doc("animalitos").set({ resultados: resultadosAnimalitos });

    // Actualizar tickets y calcular premios
    const ticketsSnap = await db.collection("tickets").where("juego", "==", "animalitos").get();

    ticketsSnap.forEach(ticketDoc => {
      const ticket = ticketDoc.data();
      const premio = calcularPremioAnimalitos({ apuestas: ticket.apuestas });
      ticketDoc.ref.update({ premio });
    });

    alert("Resultados de Animalitos cargados y premios calculados!");

  } else if (juego === "pollaHipica") {
    // Ejemplo de prompt para 8 carreras, cada carrera top3 separados por coma
    const resultados = [];
    for (let i = 1; i <= 8; i++) {
      const top3 = prompt(`Carrera ${i} - Ingrese los 3 primeros caballos separados por coma (ej: Caballo 1,Caballo 2,Caballo 3)`).split(",");
      resultados.push({ carrera: i, top3 });
    }

    // Guardar resultados en Firebase
    await db.collection("resultados").doc("pollaHipica").set({ resultados });

    // Actualizar tickets y calcular puntos
    const ticketsSnap = await db.collection("tickets").where("juego", "==", "pollaHipica").get();

    ticketsSnap.forEach(ticketDoc => {
      const ticket = ticketDoc.data();
      const puntos = calcularPuntosPolla(ticket.apuestas, resultados);
      ticketDoc.ref.update({ puntos });
    });

    alert("Resultados de Polla Hípica cargados y puntos calculados!");
  }
}

// Exponer al HTML
window.cargarResultados = cargarResultados;
