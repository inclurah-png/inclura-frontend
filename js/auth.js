import {
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  auth,
  provider
} from "./firebase.js";


// LOGIN
async function login() {

  try {

    await signInWithRedirect(auth, provider);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
}


// HANDLE LOGIN RESULT
getRedirectResult(auth)
  .then((result) => {

    if (result && result.user) {

      console.log("Login successful");

      window.location.href = "dashboard.html";
    }
  })
  .catch((error) => {

    console.error(error);
  });


// AUTH STATE
onAuthStateChanged(auth, (user) => {

  if (user) {

    console.log("Logged in:", user.email);
  }
});


// LOGOUT
async function logoutUser() {

  try {

    await signOut(auth);

    window.location.href = "index.html";

  } catch (error) {

    console.error(error);
  }
}


window.login = login;
window.logoutUser = logoutUser;
