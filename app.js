// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb7YlZynAbMKjPWAwuOH61D4uUeAVtUlU",
  authDomain: "inclura-prod-90734.firebaseapp.com",
  databaseURL: "https://inclura-prod-90734-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "inclura-prod-90734",
  storageBucket: "inclura-prod-90734.firebasestorage.app",
  messagingSenderId: "694509989399",
  appId: "1:694509989399:web:dda8a2ba4cd25efd4af652",
  measurementId: "G-H5YMTQ3FPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

// Google Login
window.login = async function () {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    alert(error.message);
  }
};

// Handle Redirect Login Result
getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      alert("Login successful");
      console.log(result.user);
    }
  })
  .catch((error) => {
    console.log(error);
    alert(error.message);
  });

// Logout
window.logoutUser = async function () {
  try {
    await signOut(auth);
    alert("Logged out");
  } catch (error) {
    alert(error.message);
  }
};

// Create Post
window.createPost = async function () {

  const text = document.getElementById("postInput").value;

  if (!text) {
    alert("Please write something");
    return;
  }

  try {

    await addDoc(collection(db, "posts"), {
      text: text,
      created: new Date()
    });

    alert("Post created");

    document.getElementById("postInput").value = "";

    loadPosts();

  } catch (error) {
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

      const post = document.createElement("div");

      post.className = "post";

      post.innerHTML = `
        <p>${doc.data().text}</p>
      `;

      feed.appendChild(post);

    });

  } catch (error) {
    console.log(error);
  }
}

// Load posts on startup
loadPosts();
