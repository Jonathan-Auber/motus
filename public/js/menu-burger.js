const NAVBARCONTAINER = document.querySelector("#link-container");
const MENUBURGER = document.querySelector("#menu-burger");
const BURGERTOP = document.querySelector(".burger-top");
const BURGERMIDDLE = document.querySelector(".burger-middle");
const BURGERBOTTOM = document.querySelector(".burger-bottom");

function menuBurger() {
  MENUBURGER.classList.toggle("fixed");
  BURGERTOP.classList.toggle("close-top");
  BURGERMIDDLE.classList.toggle("off");
  BURGERBOTTOM.classList.toggle("close-bottom");
  NAVBARCONTAINER.classList.toggle("display-link-container");
}

MENUBURGER.addEventListener("click", menuBurger);
