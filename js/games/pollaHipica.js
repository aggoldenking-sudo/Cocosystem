// pollaHipica.js
import { settings } from "../data.js";

// bets = [{ carrera: 1, pick: "Caballo 2" }]
// resultados = [{ carrera: 1, top3: ["Caballo 1","Caballo 2","Caballo 3"] }]
export function calcularPuntosPolla(bets, resultados) {
  let puntosTotal = 0;

  bets.forEach(bet => {
    const race = resultados.find(r => r.carrera === bet.carrera);
    if (!race) return;

    const posicion = race.top3.indexOf(bet.pick);
    if (posicion === 0) puntosTotal += 5;
    if (posicion === 1) puntosTotal += 3;
    if (posicion === 2) puntosTotal += 1;
  });

  return puntosTotal;
}
