```js
console.log("APP STARTED");

alert("JavaScript connected successfully");

document.addEventListener("DOMContentLoaded", () => {

  const loginBtn =
    document.getElementById("loginBtn");

  const logoutBtn =
    document.getElementById("logoutBtn");

  const saveProfileBtn =
    document.getElementById("saveProfileBtn");

  if (loginBtn) {

    loginBtn.addEventListener("click", () => {

      alert("Login button works");
    });
  }

  if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

      alert("Logout button works");
    });
  }

  if (saveProfileBtn) {

    saveProfileBtn.addEventListener("click", () => {

      alert("Save profile button works");
    });
  }
});

window.createPost = function () {

  alert("Post button works");
};
```


