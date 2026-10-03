// filtered-temples.js: builds the temple cards and filters them from the menu

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "images/aba-nigeria.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "images/manti-utah.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "images/payson-utah.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "images/yigo-guam.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "images/washington-dc.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "images/lima-peru.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "images/mexico-city-mexico.jpg"
  },
  // Three temples added for this assignment
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
    "images/salt-lake-utah.jpg"
  },
  {
    templeName: "Rexburg Idaho",
    location: "Rexburg, Idaho, United States",
    dedicated: "2008, February, 10",
    area: 57504,
    imageUrl:
    "images/rexburg-idaho.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
    "images/rome-italy.jpg"
  }
];

const albumTitle = document.querySelector("#album-title");
const albumCount = document.querySelector("#album-count");
const album = document.querySelector("#temple-album");
const navLinks = document.querySelectorAll("[data-filter]");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

// Gets the year a temple was dedicated from text like "2005, August, 7"
function getDedicatedYear(temple) {
  return Number(temple.dedicated.split(",")[0]);
}

// Each filter is a function that says whether a temple should be shown
const filters = {
  home: () => true,
  old: (temple) => getDedicatedYear(temple) < 1900,
  new: (temple) => getDedicatedYear(temple) > 2000,
  large: (temple) => temple.area > 90000,
  small: (temple) => temple.area < 10000
};

// Builds the HTML for one temple card
function createTempleCard(temple) {
  return `
    <figure class="temple-card">
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Size:</strong> ${temple.area.toLocaleString("en-US")} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" width="400" height="250" loading="lazy">
    </figure>`;
}

// Shows the given temples on the page
function displayTemples(templeList) {
  album.innerHTML = templeList.map(createTempleCard).join("");
  albumCount.textContent = `Showing ${templeList.length} of ${temples.length} temples`;
}

// Applies a filter, then updates the heading and the active menu item
function applyFilter(filterName) {
  displayTemples(temples.filter(filters[filterName]));

  navLinks.forEach((link) => {
    if (link.dataset.filter === filterName) {
      link.setAttribute("aria-current", "page");
      albumTitle.textContent = link.textContent;
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    applyFilter(link.dataset.filter);
  });
});

// Footer: current year and the date this page was last changed
currentYear.textContent = `${new Date().getFullYear()}`;
lastModified.textContent = `Last updated: ${new Date(document.lastModified).toLocaleDateString("en-US", { dateStyle: "long" })}`;

// Show every temple when the page first loads
applyFilter("home");
