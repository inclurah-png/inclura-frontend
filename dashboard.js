document.addEventListener("DOMContentLoaded", () => {

  // SIDEBAR TOGGLE

  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");

  if (menuToggle && sidebar) {

    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show-sidebar");
    });

  }


  // QUICK CARD NAVIGATION

  const quickCards = document.querySelectorAll(".quick-card");

  quickCards.forEach(card => {

    card.addEventListener("click", () => {

      const link = card.getAttribute("data-link");

      if (link) {
        window.location.href = link;
      }

    });

  });


  // FLOATING BUTTON

  const fabButton = document.getElementById("fabButton");

  if (fabButton) {

    fabButton.addEventListener("click", () => {

      alert(
        "Create new content feature coming soon on Inclura."
      );

    });

  }


  // THEME TOGGLE

  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("light-mode");

    });

  }


  // ACCESSIBILITY BUTTON

  const accessibilityToggle =
    document.getElementById("accessibilityToggle");

  if (accessibilityToggle) {

    accessibilityToggle.addEventListener("click", () => {

      alert(
        "Accessibility controls panel coming soon."
      );

    });

  }


  // NOTIFICATION BUTTON

  const notificationBtn =
    document.getElementById("notificationBtn");

  if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

      window.location.href =
        "notifications.html";

    });

  }

});
