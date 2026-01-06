// Login con Firebase
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login exitoso
      loginPanel.style.display = "none";
      mainContainer.style.display = "block";
      loginError.style.display = "none";
      initSistema(); // Inicializa loterías y animales
    })
    .catch((error) => {
      console.error(error);
      loginError.style.display = "block";
      loginError.textContent = "Correo o contraseña incorrectos";
    });
});
