import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { loginCheck } from "./auth/loginCheck.js";

// Login
import "./auth/login_Google.js";
import "./auth/signupForm.js";
// import "./auth/logout.js";

// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         loginCheck(user);
//     } else {
//     }
// });
