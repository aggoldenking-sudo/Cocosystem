function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(async (cred) => {
      const uid = cred.user.uid;
      const userDoc = await db.collection("users").doc(uid).get();

      if (!userDoc.exists) {
        alert("Usuario sin rol asignado");
        return;
      }

      const role = userDoc.data().role;

      if (role === "admin") location.href = "admin.html";
      else if (role === "collector") location.href = "collector.html";
      else if (role === "seller") location.href = "seller.html";
      else alert("Rol no válido");
    })
    .catch(err => alert(err.message));
}
