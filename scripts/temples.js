// Get the current year
const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

// Display the date the document was last modified
document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

// Hamburger menu
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");

  if (navigation.classList.contains("open")) {
    menuButton.textContent = "✕";
    menuButton.setAttribute("aria-label", "Close navigation menu");
  } else {
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }
});
