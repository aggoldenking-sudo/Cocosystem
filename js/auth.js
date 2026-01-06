import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { initApp } from "./app.js";

// Elementos del DOM
const loginForm = document.getElementById("login-form");
const userInput = document.getElementById("username");
const passInput = document.getElementById("password");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = userInput.value.trim();
    const password = passInput.value.trim();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log("Usuario logueado:", userCredential.user.email);

        document.getElementById("login-container").style.display = "none";
        document.getElementById("pos-container").style.display = "block";

        initApp();
      })
      .catch(error => {
        alert("❌ Error de login: " + error.message);
      });
  });
});
