// Reusable utility functions for the weather app
// These are global functions (browser) so other non-module scripts can call them.
// be sure to replace 'your_api_key_here' with your actual OpenWeatherMap API key
const apiKey = "42bf47e055b40c2949c1df28bfe30f74";

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

