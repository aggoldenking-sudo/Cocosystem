// animalitos.js
import { settings } from "../data.js";

// Función para calcular premio de un ticket de Animalitos
export function calcularPremioAnimalitos(ticket) {
  // ticket.apuestas = [{animal, monto}]
  let totalPremio = 0;
  ticket.apuestas.forEach(a => {
    // Multiplicador del admin
    totalPremio += a.monto * settings.multiplicadorAnimalitos;
  });
  return totalPremio;
}
