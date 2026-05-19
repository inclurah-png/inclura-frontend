/* =========================================
   INCLURA GLOBAL NAVIGATION SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

/* =========================================
   ELEMENTS
========================================= */

const sidebar =
document.querySelector(".sidebar");

const mobileMenuBtn =
document.querySelector(".mobile-menu-btn");

const sidebarOverlay =
document.querySelector(".sidebar-overlay");

const collapseBtn =
document.querySelector(".collapse-sidebar");

const navLinks =
document.querySelectorAll(".sidebar-nav a");

/* =========================================
   MOBILE SIDEBAR TOGGLE
========================================= */

if(mobileMenuBtn){

mobileMenuBtn.addEventListener("click", () => {

sidebar.classList.toggle("active");

if(sidebarOverlay){

sidebarOverlay.classList.toggle("active");
}

});
}

/* =========================================
   OVERLAY CLOSE
========================================= */

if(sidebarOverlay){

sidebarOverlay.addEventListener("click", () => {

sidebar.classList.remove("active");

sidebarOverlay.classList.remove("active");

});
}

/* =========================================
   SIDEBAR COLLAPSE
========================================= */

if(collapseBtn){

collapseBtn.addEventListener("click", () => {

sidebar.classList.toggle("collapsed");

localStorage.setItem(
"incluraSidebarCollapsed",
sidebar.classList.contains("collapsed")
);

});
}

/* =========================================
   LOAD COLLAPSE STATE
========================================= */

const savedCollapseState =
localStorage.getItem(
"incluraSidebarCollapsed"
);

if(savedCollapseState === "true"){

sidebar.classList.add("collapsed");
}

/* =========================================
   ACTIVE PAGE DETECTION
========================================= */

const currentPage =
window.location.pathname.split("/").pop();

navLinks.forEach(link => {

const href =
link.getAttribute("href");

if(href === currentPage){

link.classList.add("active");
}

});

/* =========================================
   ESCAPE KEY CLOSE
========================================= */

document.addEventListener("keydown", (e) => {

if(
e.key === "Escape" &&
sidebar.classList.contains("active")
){

sidebar.classList.remove("active");

if(sidebarOverlay){

sidebarOverlay.classList.remove("active");
}

}

});

/* =========================================
   ACCESSIBILITY NAVIGATION
========================================= */

navLinks.forEach(link => {

link.setAttribute(
"tabindex",
"0"
);

});

/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener("keydown", (e) => {

if(
e.altKey &&
e.key.toLowerCase() === "m"
){

e.preventDefault();

if(sidebar){

sidebar.classList.toggle("active");

if(sidebarOverlay){

sidebarOverlay.classList.toggle("active");
}

}

}

});

/* =========================================
   AUTO CLOSE MOBILE SIDEBAR
========================================= */

navLinks.forEach(link => {

link.addEventListener("click", () => {

if(window.innerWidth <= 1100){

sidebar.classList.remove("active");

if(sidebarOverlay){

sidebarOverlay.classList.remove("active");
}

}

});

});

/* =========================================
   RESPONSIVE RESET
========================================= */

window.addEventListener("resize", () => {

if(window.innerWidth > 1100){

sidebar.classList.remove("active");

if(sidebarOverlay){

sidebarOverlay.classList.remove("active");
}

}

});

/* =========================================
   FUTURE NOTIFICATION BADGES
========================================= */

function updateBadge(
selector,
count
){

const badge =
document.querySelector(selector);

if(!badge) return;

badge.textContent = count;

if(count > 0){

badge.style.display = "inline-flex";

}else{

badge.style.display = "none";
}

}

/* EXAMPLES */

updateBadge(
".messages-badge",
3
);

updateBadge(
".notifications-badge",
12
);

/* =========================================
   FUTURE LIVE STATUS
========================================= */

function setLiveIndicator(){

const liveElements =
document.querySelectorAll(
".live-indicator"
);

liveElements.forEach(el => {

el.innerHTML =
"🔴 LIVE";

});
}

setLiveIndicator();

/* =========================================
   TOUCH OPTIMIZATION
========================================= */

document.addEventListener(
"touchstart",
() => {},
{passive:true}
);

/* =========================================
   REDUCED MOTION SUPPORT
========================================= */

const prefersReducedMotion =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;

if(prefersReducedMotion){

document.documentElement.style.scrollBehavior =
"auto";
}

/* =========================================
   FOCUS MANAGEMENT
========================================= */

document.addEventListener("keyup", (e) => {

if(e.key === "Tab"){

document.body.classList.add(
"keyboard-navigation"
);

}

});

document.addEventListener("mousedown", () => {

document.body.classList.remove(
"keyboard-navigation"
);

});

/* =========================================
   SAFE ACCESSIBILITY FOCUS
========================================= */

const focusableElements =
document.querySelectorAll(
'button, a, input, textarea, select'
);

focusableElements.forEach(el => {

el.addEventListener("focus", () => {

el.classList.add("focus-visible");

});

el.addEventListener("blur", () => {

el.classList.remove("focus-visible");

});

});

/* =========================================
   SCROLL POSITION MEMORY
========================================= */

window.addEventListener(
"beforeunload",
() => {

localStorage.setItem(
"incluraScrollPosition",
window.scrollY
);

}
);

const savedScroll =
localStorage.getItem(
"incluraScrollPosition"
);

if(savedScroll){

window.scrollTo({
top:parseInt(savedScroll),
behavior:"smooth"
});

}

/* =========================================
   FUTURE MULTILINGUAL SUPPORT
========================================= */

function setLanguage(lang){

document.documentElement.lang = lang;

localStorage.setItem(
"incluraLanguage",
lang
);

}

const savedLanguage =
localStorage.getItem(
"incluraLanguage"
);

if(savedLanguage){

setLanguage(savedLanguage);
}

/* =========================================
   FUTURE DARK/LIGHT MODE
========================================= */

function setTheme(theme){

document.body.setAttribute(
"data-theme",
theme
);

localStorage.setItem(
"incluraTheme",
theme
);

}

const savedTheme =
localStorage.getItem(
"incluraTheme"
);

if(savedTheme){

setTheme(savedTheme);
}

/* =========================================
   FUTURE REALTIME SYSTEMS READY
========================================= */

window.IncluraSystem = {

updateBadge,
setTheme,
setLanguage

};

});
