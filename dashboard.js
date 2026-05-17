// ========================================
// INCLURA DASHBOARD SYSTEM
// ========================================

// MOBILE SIDEBAR TOGGLE
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {

  menuToggle.addEventListener("click", () => {

    sidebar.classList.toggle("show-sidebar");

  });

}


// CLOSE SIDEBAR ON MOBILE
const closeSidebar = document.getElementById("closeSidebar");

if (closeSidebar && sidebar) {

  closeSidebar.addEventListener("click", () => {

    sidebar.classList.remove("show-sidebar");

  });

}


// ACCESSIBILITY TOGGLE
const accessibilityToggle =
  document.getElementById("accessibilityToggle");

if (accessibilityToggle) {

  accessibilityToggle.addEventListener("click", () => {

    document.body.classList.toggle("high-accessibility");

  });

}


// DARK/LIGHT MODE
const themeToggle =
  document.getElementById("themeToggle");

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

  });

}


// NOTIFICATION PANEL
const notificationBtn =
  document.getElementById("notificationBtn");

const notificationPanel =
  document.getElementById("notificationPanel");

if (notificationBtn && notificationPanel) {

  notificationBtn.addEventListener("click", () => {

    notificationPanel.classList.toggle("show-notifications");

  });

}


// SEARCH BAR
const dashboardSearch =
  document.getElementById("dashboardSearch");

if (dashboardSearch) {

  dashboardSearch.addEventListener("keyup", (e) => {

    console.log("Searching:", e.target.value);

  });

}


// FLOATING ACTION BUTTON
const fabButton =
  document.getElementById("fabButton");

if (fabButton) {

  fabButton.addEventListener("click", () => {

    window.location.href = "posts.html";

  });

}


// QUICK NAVIGATION CARDS
const quickCards =
  document.querySelectorAll(".quick-card");

quickCards.forEach((card) => {

  card.addEventListener("click", () => {

    const target =
      card.getAttribute("data-link");

    if (target) {

      window.location.href = target;

    }

  });

});


// DASHBOARD WELCOME
window.addEventListener("load", () => {

  console.log("Inclura Dashboard Loaded");

});


// FAKE LIVE NOTIFICATION COUNT
const notificationCount =
  document.getElementById("notificationCount");

if (notificationCount) {

  let count = 4;

  setInterval(() => {

    count++;

    notificationCount.innerText = count;

  }, 45000);

}


// FLOATING ANIMATION EFFECT
const floatingCards =
  document.querySelectorAll(".floating-card");

floatingCards.forEach((card, index) => {

  card.style.animationDelay =
    `${index * 0.2}s`;

});


// PROFILE DROPDOWN
const profileButton =
  document.getElementById("profileButton");

const profileDropdown =
  document.getElementById("profileDropdown");

if (profileButton && profileDropdown) {

  profileButton.addEventListener("click", () => {

    profileDropdown.classList.toggle("show-profile-dropdown");

  });

}


// EMERGENCY BUTTON
const emergencyButton =
  document.getElementById("emergencyButton");

if (emergencyButton) {

  emergencyButton.addEventListener("click", () => {

    alert(
      "Emergency accessibility system activated."
    );

  });

}


// AI ASSIST BUTTON
const aiAssistButton =
  document.getElementById("aiAssistButton");

if (aiAssistButton) {

  aiAssistButton.addEventListener("click", () => {

    alert(
      "Inclura AI Assistant coming soon."
    );

  });

                                   }
