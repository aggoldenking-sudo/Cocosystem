// app.js
export function initSistema() {
  const loterias = ["Lotto Activo", "La Granjita"];
  const sorteos = ["Mañana", "Tarde", "Noche"];
  const animales = [
    "00-Delfín","01-Ballena","02-Caballo","03-Gallina","04-Gato",
    "05-Perro","06-Conejo","07-Rana","08-Zamuro","09-Tigre",
    "10-León","11-Oso","12-Cerdo","13-Vaca","14-Pollo",
    "15-Gallito","16-Gallina Negra","17-Burro","18-Culebra","19-Mono",
    "20-Pavo","21-Camello","22-Caballo Negro","23-Ciervo","24-Conejo Blanco",
    "25-Loro","26-Cabra","27-Rinoceronte","28-Zamuro","29-Cocodrilo",
    "30-Lobo","31-Foca","32-Pinguino","33-Serpiente","34-Búfalo",
    "35-Gallina Roja","36-Culera"
  ];

  const loteriasDiv = document.getElementById("loterias");
  const sorteosDiv = document.getElementById("sorteos");
  const animalesDiv = document.getElementById("animales");
  const seleccionadosDiv = document.getElementById("seleccionados");
  const agregarBtn = document.getElementById("agregarBtn");
  const montoInput = document.getElementById("monto");

  let seleccionados = [];

  // Mostrar loterías
  loteriasDiv.innerHTML = loterias.map(l => `<div>${l}</div>`).join("");
  // Mostrar sorteos
  sorteosDiv.innerHTML = sorteos.map(s => `<div>${s}</div>`).join("");
  // Mostrar animales
  animalesDiv.innerHTML = animales.map(a => `<div>${a}</div>`).join("");

  // Selección de animales
  agregarBtn.addEventListener("click", () => {
    const monto = montoInput.value;
    const animal = prompt("Escribe el código del animal a agregar (ej: 00-Delfín):");
    if (animal && monto > 0) {
      seleccionados.push({ animal, monto });
      renderSeleccionados();
    }
  });

  function renderSeleccionados() {
    seleccionadosDiv.innerHTML = seleccionados.map(s => `<div>${s.animal} - $${s.monto}</div>`).join("");
  }
}
