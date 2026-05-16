import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

window.login = async function () {

  try {

    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      alert("Login successful");
    }

  } catch (error) {

    console.log(error);

    alert(error.message);

  }

};

window.logoutUser = async function () {

  try {

    await signOut(auth);

    alert("Logged out");

  } catch (error) {

    alert(error.message);

  }

};

window.createPost = async function () {

  const text = document.getElementById("postInput").value;

  if (!text) {
    alert("Write something");
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

    console.log(error);

    alert(error.message);

  }

};

async function loadPosts() {

  const feed = document.getElementById("feed");

  if (!feed) return;

  feed.innerHTML = "";

  try {

    const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach((doc) => {

      const post = document.createElement("div");

      post.innerHTML = `
        <p>${doc.data().text}</p>
      `;

      feed.appendChild(post);

    });

  } catch (error) {

    console.log(error);

  }

}

loadPosts();

document.getElementById("loginBtn").addEventListener("click", window.login);

document.getElementById("logoutBtn").addEventListener("click", window.logoutUser);

document.getElementById("postBtn").addEventListener("click", window.createPost);  
