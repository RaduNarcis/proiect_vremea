// be sure to replace 'your_api_key_here' with your actual OpenWeatherMap API key
const apiKey = "your_api_key_here";
let selectedCity;
let weatherData;

async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ro`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Afisare date brute in consola
    console.log("Date brute:\n", data);

    if (response.ok && data.cod === 200) {
      weatherData = mapWeatherData(data);
      console.log("Date procesate:\n", weatherData);

      displayCurrentWeather(weatherData);
    } else {
      console.log("Orasul nu a fost gasit.");
    }
  } catch (error) {
    console.log("Eroare la preluarea datelor meteo:", error.message);
  }
}

function mapWeatherData(rawData) {
  return {
    city: rawData.name,
    country: rawData.sys.country,
    temperature: Math.round(rawData.main.temp),
    feelsLike: Math.round(rawData.main.feels_like),
    humidity: rawData.main.humidity,
    windSpeed: rawData.wind.speed,
    description: rawData.weather[0].description,
    sunset: new Date(rawData.sys.sunset * 1000).toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    sunrise: new Date(rawData.sys.sunrise * 1000).toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    iconUrl: `https://openweathermap.org/img/wn/${rawData.weather[0].icon}@2x.png`,
  };
}

function displayCurrentWeather(data) {
  const container = document.querySelector(".current-weather");

  container.innerHTML = `
    <div class="city">
      <div class="city-name"><strong>${data.city}</strong></div>
      <div class="city-day"><strong>${data.day}</strong>, ${data.time}</div>
      <div class="city-temperature icon">
        <strong>${data.temperature}°C</strong>
        <img src="${data.iconUrl}" alt="${data.description}">
      </div>
      <div class="city-details">
        <p>Real feel: <strong>${data.feelsLike}°C</strong></p>
        <p>${data.description}</p>
        <p>Vânt: <strong>${data.windSpeed} km/h</strong></p>
      </div>
    </div>
  `; 
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
