// Reusable utility functions for the weather app
// These are global functions (browser) so other non-module scripts can call them.

// API key is read from `window.APP_CONFIG.apiKey` so it can be provided via a
// local `config.js` (see `config.example.js`). Do NOT commit your real `config.js`.

// Read API key from window.APP_CONFIG (set locally in config.js copied from config.example.js)
const apiKey = (window.APP_CONFIG && window.APP_CONFIG.apiKey) || "";
if (!apiKey) {
  console.warn(
    "API key not found: create a local config.js from config.example.js and add your OpenWeatherMap key."
  );
}

function saveToLocalStorage(city) {
  localStorage.setItem("selectedCity", city);
}

function loadFromLocalStorage() {
  const city = localStorage.getItem("selectedCity");
  if (city) {
    // updateCity is defined in the main city script
    updateCity(city);
  } else {
    updateCity("București");
  }
}

function updateCity(city) {
  selectedCity = document.querySelector(".current-city");
  selectedCity.textContent = city;

  saveToLocalStorage(city);
  fetchWeatherData(city);
  fetchForecastWeatherData(city);
}

window.onload = function () {
  loadFromLocalStorage();
};

function convertTimeStampToTime(timestamp) {
  const date = new Date(timestamp * 1000);

  // extract day name and time in "HH:MM" format
  const dayNameRaw = date.toLocaleDateString("ro-RO", { weekday: "long" });

  const dayName = dayNameRaw.charAt(0).toUpperCase() + dayNameRaw.slice(1);

  const time = date.toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { dayName, time };
}

