// data.js

// Lista de animales de Animalitos
export const animales = [
  { numero: "00", nombre: "Delfín" },
  { numero: "01", nombre: "Gallina" },
  { numero: "02", nombre: "Burro" },
  { numero: "03", nombre: "Gato" },
  // ... hasta el 36
];

// Loterías disponibles
export const loterias = [
  { nombre: "Lotto Activo", horario: "08:00 - 19:00", juegos: "animalitos" },
  { nombre: "La Granjita", horario: "08:00 - 19:00", juegos: "animalitos" },
  // futuras loterías pueden agregarse aquí
];

// Ejemplares/caballos de Polla Hípica
export const caballos = [
  "Caballo 1",
  "Caballo 2",
  "Caballo 3",
  "Caballo 4",
  "Caballo 5",
  "Caballo 6",
  "Caballo 7",
  "Caballo 8"
];

// Configuración inicial
export const settings = {
  valorPolla: 10,        // Valor fijo de la polla
  multiplicadorAnimalitos: 2,
  porcentajePremioPolla: 50 // % del pozo a repartir
};
