/* =========================
   DATA.JS
   Datos oficiales del sistema
   ========================= */

// Horarios generales
export const SYSTEM_HOURS = {
  salesStart: 6,   // 6:00 AM se puede vender
  drawStart: 8,    // 8:00 AM primer sorteo
  drawEnd: 19,     // 7:00 PM último sorteo
  drawInterval: 1 // cada 1 hora
};

// Generar horarios de sorteos (8am a 7pm)
export const DRAW_TIMES = (() => {
  const times = [];
  for (let h = SYSTEM_HOURS.drawStart; h <= SYSTEM_HOURS.drawEnd; h++) {
    times.push({
      hour24: h,
      label: h < 12
        ? `${h}:00 AM`
        : h === 12
        ? `12:00 PM`
        : `${h - 12}:00 PM`
    });
  }
  return times;
})();

// Loterías activas
export const LOTTERIES = [
  {
    id: "lotto_activo",
    name: "Lotto Activo",
    active: true
  },
  {
    id: "la_granjita",
    name: "La Granjita",
    active: true
  }
];

// Animales oficiales (00 al 36 = 37 animales)
export const ANIMALS = [
  { number: "00", name: "Ballena" },
  { number: "0",  name: "Delfín" },
  { number: "1",  name: "Carnero" },
  { number: "2",  name: "Toro" },
  { number: "3",  name: "Ciempíes" },
  { number: "4",  name: "Alacrán" },
  { number: "5",  name: "León" },
  { number: "6",  name: "Rana" },
  { number: "7",  name: "Perico" },
  { number: "8",  name: "Ratón" },
  { number: "9",  name: "Águila" },
  { number: "10", name: "Tigre" },
  { number: "11", name: "Gato" },
  { number: "12", name: "Caballo" },
  { number: "13", name: "Mono" },
  { number: "14", name: "Paloma" },
  { number: "15", name: "Zorro" },
  { number: "16", name: "Oso" },
  { number: "17", name: "Pavo" },
  { number: "18", name: "Burro" },
  { number: "19", name: "Chivo" },
  { number: "20", name: "Cochino" },
  { number: "21", name: "Gallo" },
  { number: "22", name: "Camello" },
  { number: "23", name: "Cebra" },
  { number: "24", name: "Iguana" },
  { number: "25", name: "Gallina" },
  { number: "26", name: "Vaca" },
  { number: "27", name: "Perro" },
  { number: "28", name: "Zamuro" },
  { number: "29", name: "Elefante" },
  { number: "30", name: "Caimán" },
  { number: "31", name: "Lapa" },
  { number: "32", name: "Ardilla" },
  { number: "33", name: "Pescado" },
  { number: "34", name: "Venado" },
  { number: "35", name: "Jirafa" },
  { number: "36", name: "Culebra" }
];

// Configuración por defecto de venta
export const DEFAULTS = {
  currency: "Bs",
  maxBetPerAnimal: 100000,
  minBet: 1
};
