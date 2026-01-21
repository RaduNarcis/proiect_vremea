
async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ro`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok && data.cod === 200) {
      const weatherData = mapWeatherData(data);

      displayCurrentWeather(weatherData);
    } else {
      console.log("Orasul nu a fost gasit.");
    }
  } catch (error) {
    console.log("Eroare la preluarea datelor meteo:", error.message);
  }
}

function mapWeatherData(rawData) {
  const { dayName, time } = convertTimeStampToTime(rawData.dt);
  return {
    city: rawData.name,
    temperature: Math.round(rawData.main.temp),
    feelsLike: Math.round(rawData.main.feels_like),
    windSpeed: rawData.wind.speed,
    description: rawData.weather[0].description,
    day: dayName,
    time: time,
    iconUrl: `https://openweathermap.org/img/wn/${rawData.weather[0].icon}@2x.png`,
  };
}

function displayCurrentWeather(data) {
  const container = document.getElementById("local-weather");

  container.innerHTML = `

      <div class="current-weather
              d-flex
              flex-wrap
              justify-content-evenly
              align-items-center">
        <div class="px-3">
          <div class="fs-2 mb-2"><strong>${data.city}</strong></div>
          <div class="fs-4"><strong>${data.day}</strong>, ${data.time}</div>
          <div class="d-flex align-items-center justify-content-center">
            <strong class="fs-1">${data.temperature}°C</strong>
            <img src="${data.iconUrl}" alt="Weather Icon" />
          </div>
        </div>
        <div class="px-3">
          <p class="fs-5">Real feel: <strong>${data.feelsLike}°C</strong></p>
          <p class="fs-5 text-capitalize">${data.description}</p>
          <p class="fs-5">Vânt: <strong>${data.windSpeed} km/h</strong></p>
        </div>
      </div>
      `;
}
