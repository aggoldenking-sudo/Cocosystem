/* =========================
   APP.JS
   Lógica principal del POS
   ========================= */

import {
  SYSTEM_HOURS,
  DRAW_TIMES,
  LOTTERIES,
  ANIMALS,
  DEFAULTS
} from "./data.js";

/* =========================
   ESTADO GLOBAL
   ========================= */
let selectedLottery = null;
let selectedDraw = null;

// Estructura:
// sales[lotteryId][drawHour][animalNumber] = amount
let sales = {};

/* =========================
   UTILIDADES DE HORARIO
   ========================= */
function getCurrentHour() {
  return new Date().getHours();
}

function isSalesAllowed() {
  const h = getCurrentHour();
  return h >= SYSTEM_HOURS.salesStart && h <= SYSTEM_HOURS.drawEnd;
}

function getAvailableDraws() {
  const h = getCurrentHour();

  // Antes de las 6am → nada
  if (h < SYSTEM_HOURS.salesStart) return [];

  // De 6:00 a 7:59 → solo 8:00 AM
  if (h < SYSTEM_HOURS.drawStart) {
    return DRAW_TIMES.filter(d => d.hour24 === SYSTEM_HOURS.drawStart);
  }

  // De 8:00 AM en adelante → sorteos desde la hora actual
  return DRAW_TIMES.filter(d => d.hour24 >= h);
}

/* =========================
   INICIALIZACIÓN
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (!isSalesAllowed()) {
    alert("⛔ El sistema está cerrado. Ventas desde las 6:00 AM.");
    return;
  }

  renderLotteries();
  renderDraws();
  renderAnimals();
});

/* =========================
   LOTERÍAS
   ========================= */
function renderLotteries() {
  const container = document.getElementById("lotteries");
  if (!container) return;

  container.innerHTML = "";

  LOTTERIES.filter(l => l.active).forEach(lottery => {
    const btn = document.createElement("button");
    btn.textContent = lottery.name;
    btn.className = "lottery-btn";
    btn.onclick = () => selectLottery(lottery.id);
    container.appendChild(btn);
  });
}

function selectLottery(lotteryId) {
  selectedLottery = lotteryId;

  if (!sales[selectedLottery]) {
    sales[selectedLottery] = {};
  }

  selectedDraw = null;
  renderDraws();
  clearAnimalAmounts();
}

/* =========================
   SORTEOS
   ========================= */
function renderDraws() {
  const container = document.getElementById("draws");
  if (!container) return;

  container.innerHTML = "";

  if (!selectedLottery) {
    container.innerHTML = "<p>Seleccione una lotería</p>";
    return;
  }

  const available = getAvailableDraws();

  available.forEach(draw => {
    const btn = document.createElement("button");
    btn.textContent = draw.label;
    btn.className = "draw-btn";
    btn.onclick = () => selectDraw(draw.hour24);
    container.appendChild(btn);
  });
}

function selectDraw(hour24) {
  selectedDraw = hour24;

  if (!sales[selectedLottery][selectedDraw]) {
    sales[selectedLottery][selectedDraw] = {};
  }

  loadAnimalAmounts();
}

/* =========================
   ANIMALES
   ========================= */
function renderAnimals() {
  const container = document.getElementById("animals");
  if (!container) return;

  container.innerHTML = "";

  ANIMALS.forEach(animal => {
    const card = document.createElement("div");
    card.className = "animal-card";

    card.innerHTML = `
      <div class="animal-number">${animal.number}</div>
      <div class="animal-name">${animal.name}</div>
      <input 
        type="number"
        min="${DEFAULTS.minBet}"
        placeholder="Monto"
        data-animal="${animal.number}"
      />
    `;

    const input = card.querySelector("input");
    input.addEventListener("input", e => {
      if (!selectedLottery || !selectedDraw) {
        e.target.value = "";
        return;
      }

      const value = Number(e.target.value);
      if (value < DEFAULTS.minBet) return;

      sales[selectedLottery][selectedDraw][animal.number] = value;
    });

    container.appendChild(card);
  });
}

function clearAnimalAmounts() {
  document
    .querySelectorAll("#animals input")
    .forEach(i => (i.value = ""));
}

function loadAnimalAmounts() {
  document
    .querySelectorAll("#animals input")
    .forEach(input => {
      const animal = input.dataset.animal;
      const value =
        sales[selectedLottery]?.[selectedDraw]?.[animal] || "";
      input.value = value;
    });
}

/* =========================
   DEPURACIÓN (opcional)
   ========================= */
window._salesDebug = () => console.log(sales);
