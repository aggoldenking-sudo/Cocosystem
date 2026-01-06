// Cerrar sesión
function logout() {
  auth.signOut().then(() => location.href = "index.html");
}

// Crear taquilla
async function crearTaquilla() {
  const nombre = document.getElementById("nombreTaquilla").value;
  if (!nombre) return alert("Ingrese un nombre válido");

  const docRef = await db.collection("taquillas").add({
    nombre,
    creador: auth.currentUser.uid,
    fechaCreacion: new Date()
  });

  alert("Taquilla creada!");
  mostrarTaquillas();
}

// Mostrar taquillas creadas por este recolector
async function mostrarTaquillas() {
  const taquillasSnap = await db.collection("taquillas")
    .where("creador", "==", auth.currentUser.uid).get();

  const listDiv = document.getElementById("taquillasList");
  const select = document.getElementById("selectTaquilla");
  listDiv.innerHTML = "";
  select.innerHTML = "";

  taquillasSnap.forEach(doc => {
    const taquilla = doc.data();
    listDiv.innerHTML += `<p>${taquilla.nombre}</p>`;
    select.innerHTML += `<option value="${doc.id}">${taquilla.nombre}</option>`;
  });
}

// Registrar ticket
async function registrarTicket() {
  const taquillaId = document.getElementById("selectTaquilla").value;
  const juego = document.getElementById("selectJuego").value;

  if (!taquillaId) return alert("Seleccione una taquilla");

  // Ticket base
  const ticket = {
    taquilla: taquillaId,
    juego,
    apuestas: [],       // Aquí se agregarán las apuestas reales luego
    creador: auth.currentUser.uid,
    fecha: new Date(),
    premio: 0,
    puntos: 0
  };

  await db.collection("tickets").add(ticket);
  alert("Ticket registrado!");
  mostrarTickets(taquillaId);
}

// Mostrar tickets de la taquilla seleccionada
async function mostrarTickets(taquillaId) {
  const ticketsSnap = await db.collection("tickets")
    .where("taquilla", "==", taquillaId).get();

  const ticketsDiv = document.getElementById("ticketsList");
  ticketsDiv.innerHTML = "";
  ticketsSnap.forEach(doc => {
    const t = doc.data();
    ticketsDiv.innerHTML += `<p>Ticket ID: ${doc.id} | Juego: ${t.juego}</p>`;
  });
}

// Inicializar al cargar la página
auth.onAuthStateChanged(user => {
  if (user) mostrarTaquillas();
  else location.href = "index.html";
});

// Exponer funciones al HTML
window.logout = logout;
window.crearTaquilla = crearTaquilla;
window.registrarTicket = registrarTicket;
