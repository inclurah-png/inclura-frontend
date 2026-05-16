// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb7YlZynAbMKjPWAwuOH61D4uUeAVtUlU",
  authDomain: "inclura-prod-90734.firebaseapp.com",
  projectId: "inclura-prod-90734",
  storageBucket: "inclura-prod-90734.appspot.com",
  messagingSenderId: "694509989399",
  appId: "1:694509989399:web:dda8a2ba4cd25efd4af652"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Google provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

// Login button
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
}

// Redirect result
getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      alert("Login successful");
    }
  })
  .catch((error) => {
    console.error(error);
    alert(error.message);
  });

// Auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.email);
  } else {
    console.log("No user logged in");
  }
});

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("Logged out");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
}

// Create Post
window.createPost = async function () {

  const input = document.getElementById("postInput");

  if (!input) {
    alert("Post input not found");
    return;
  }

  const text = input.value.trim();

  if (!text) {
    alert("Write something first");
    return;
  }

  try {

    await addDoc(collection(db, "posts"), {
      text: text,
      created: serverTimestamp()
    });

    input.value = "";

    alert("Post created successfully");

    loadPosts();

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Load Posts
async function loadPosts() {

  const feed = document.getElementById("feed");

  if (!feed) return;

  feed.innerHTML = "";

  try {

    const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach((doc) => {

      const data = doc.data();

      const post = document.createElement("div");

      post.style.border = "1px solid gray";
      post.style.padding = "10px";
      post.style.marginBottom = "10px";
      post.style.borderRadius = "10px";

      post.innerHTML = `
        <p>${data.text}</p>
      `;

      feed.appendChild(post);

    });

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

// Load posts immediately
loadPosts();
