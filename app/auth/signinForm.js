import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from "../firebase";
import { showMessage } from "../showMessage";


const signInForm = document.querySelector("#signInForm");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signInForm["signInEmail"].value;
  const password = signInForm["signInPassword"].value;

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      showMessage("¡Contraseña incorrecta", "error");
    } else if (error.code === "auth/user-not-found") {
      showMessage("¡Usuario no encontrado!", "error");
    } else {
      showMessage(error.message, "error");
    }
  }
});


