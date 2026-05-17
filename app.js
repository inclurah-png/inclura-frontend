// FIREBASE IMPORTS
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
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCb7YlZynAbMKjPWAwuOH61D4uUeAVtUlU",
  authDomain: "inclura-prod-90734.firebaseapp.com",
  projectId: "inclura-prod-90734",
  storageBucket: "inclura-prod-90734.appspot.com",
  messagingSenderId: "694509989399",
  appId: "1:694509989399:web:dda8a2ba4cd25efd4af652"
};


// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// GOOGLE PROVIDER
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});


// LOGIN FUNCTION
async function login() {

  try {

    await signInWithRedirect(auth, provider);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
}


// HANDLE REDIRECT RESULT
getRedirectResult(auth)
  .then((result) => {

    if (result && result.user) {

      console.log("Login successful");

      alert("Login successful");
    }

  })
  .catch((error) => {

    console.error(error);

    alert(error.message);

  });


// LOGOUT FUNCTION
async function logoutUser() {

  try {

    await signOut(auth);

    alert("Logged out");

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
}


// MAKE FUNCTIONS GLOBAL
window.login = login;
window.logoutUser = logoutUser;


// LOGIN BUTTON
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

  loginBtn.addEventListener("click", login);
}


// LOGOUT BUTTON
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", logoutUser);
}


// AUTH STATE
onAuthStateChanged(auth, async (user) => {

  if (user) {

    console.log("Logged in:", user.email);

    loadProfile(user.uid);

  } else {

    console.log("No user logged in");
  }
});


// SAVE PROFILE
async function saveProfile() {

  const user = auth.currentUser;

  if (!user) {

    alert("Please login first");

    return;
  }

  const displayName =
    document.getElementById("displayName").value;

  const imageUrl =
    document.getElementById("imageUrl").value;

  try {

    await setDoc(doc(db, "profiles", user.uid), {
      displayName,
      imageUrl,
      email: user.email
    });

    alert("Profile saved");

    loadProfile(user.uid);

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
}


// MAKE GLOBAL
window.saveProfile = saveProfile;


// SAVE PROFILE BUTTON
const saveProfileBtn =
  document.getElementById("saveProfileBtn");

if (saveProfileBtn) {

  saveProfileBtn.addEventListener(
    "click",
    saveProfile
  );
}


// LOAD PROFILE
async function loadProfile(uid) {

  const profileOutput =
    document.getElementById("profileOutput");

  if (!profileOutput) return;

  try {

    const docRef =
      doc(db, "profiles", uid);

    const docSnap =
      await getDoc(docRef);

    if (docSnap.exists()) {

      const data = docSnap.data();

      profileOutput.innerHTML = `
        <div style="margin-top:20px;">

          <img
            src="${data.imageUrl}"
            width="100"
            style="border-radius:50%;"
          />

          <h3>${data.displayName}</h3>

          <p>${data.email}</p>

        </div>
      `;
    }

  } catch (error) {

    console.error(error);
  }
}


// CREATE POST
async function createPost() {

  const input =
    document.getElementById("postInput");

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
      text,
      created: serverTimestamp()
    });

    input.value = "";

    alert("Post created successfully");

    loadPosts();

  } catch (error) {

    console.error(error);

    alert(error.message);
  }
}


// MAKE GLOBAL
window.createPost = createPost;


// LOAD POSTS
async function loadPosts() {

  const feed =
    document.getElementById("feed");

  if (!feed) return;

  feed.innerHTML = "";

  try {

    const querySnapshot =
      await getDocs(collection(db, "posts"));

    querySnapshot.forEach((documentData) => {

      const data =
        documentData.data();

      const post =
        document.createElement("div");

      post.style.border =
        "1px solid gray";

      post.style.padding =
        "10px";

      post.style.marginBottom =
        "10px";

      post.style.borderRadius =
        "10px";

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


// INITIAL LOAD
loadPosts();
