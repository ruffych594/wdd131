const yearElement = document.querySelector("#currentyear");
const modifiedElement = document.querySelector("#lastModified");
const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");

function setFooterDates() {
  yearElement.textContent = `${new Date().getFullYear()}`;
  modifiedElement.textContent = `${document.lastModified}`;
}

function toggleMenu() {
  const isOpen = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
}

setFooterDates();
menuButton.addEventListener("click", toggleMenu);
