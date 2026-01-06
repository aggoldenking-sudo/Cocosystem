// auth.js
import { auth } from './firebase.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { initSistema } from './app.js'; // función que inicializa loterías y animales

const loginPanel = document.getElementById("loginPanel");
const mainContainer = document.getElementById("mainContainer");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const logoutBtn = document.getElementById("logoutBtn");

// Login
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginPanel.style.display = "none";
      mainContainer.style.display = "block";
      loginError.style.display = "none";
      initSistema();
    })
    .catch(() => {
      loginError.style.display = "block";
      loginError.textContent = "Correo o contraseña incorrectos";
    });
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    mainContainer.style.display = "none";
    loginPanel.style.display = "block";
    emailInput.value = "";
    passwordInput.value = "";
  });
});

// Mantener sesión activa
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginPanel.style.display = "none";
    mainContainer.style.display = "block";
    initSistema();
  } else {
    mainContainer.style.display = "none";
    loginPanel.style.display = "block";
  }
});
