document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if(menuToggle && sidebar){

    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show-sidebar");
    });

  }


  const cards = document.querySelectorAll(".quick-card");

  cards.forEach(card => {

    card.addEventListener("click", () => {

      const link = card.getAttribute("data-link");

      if(link){
        window.location.href = link;
      }

    });

  });

});
