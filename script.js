let selectedCity;
const apiKey = "42bf47e055b40c2949c1df28bfe30f74";
let weatherData;

async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ro`;

    try {
        const response = await fetch(apiUrl);
        weatherData = await response.json();
        console.log(weatherData, "date");
    } catch {
        console.log("hey am prins eroarea");
    }
}

function updateCity(city) {
  selectedCity = document.querySelector(".current-city");
  selectedCity.textContent = city;
  saveToLocalStorage(city);
  fetchWeatherData(city);
}

function saveToLocalStorage(city) {
  localStorage.setItem("selectedCity", city);
}

function loadFromLocalStorage() {
  const city = localStorage.getItem("selectedCity");
  if (city) {
    updateCity(city);
  } else {
    updateCity("București");
  }
}

window.onload = function () {
  loadFromLocalStorage();
};
