// Static weather values (they match what the Weather section shows)
const temperature = 9;   // degrees Celsius
const windSpeed = 15;    // km/h

// Metric wind chill formula, kept to a single line as required
function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

// Only calculate the wind chill when the conditions make it meaningful:
// temperature at or below 10 C and wind speed above 4.8 km/h
let windChill = "N/A";

if (temperature <= 10 && windSpeed > 4.8) {
    windChill = `${calculateWindChill(temperature, windSpeed).toFixed(1)}°C`;
}

document.getElementById("wind-chill").textContent = windChill;

// Footer: current year and the date this document was last modified
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;
