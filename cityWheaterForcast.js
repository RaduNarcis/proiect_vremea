async function fetchForecastWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ro`;

  try {
    const response = await fetch(apiUrl);
    const rawData = await response.json();
    console.log(rawData);

    if (response.ok && rawData.cod === "200") {
      const forecastData = mapForecastData(rawData);

      displayForecastWeather(forecastData);

    } else {
      console.log("Orasul nu a fost gasit pentru prognoza.");
    }
  } catch (error) {
    console.log("Eroare la preluarea datelor meteo:", error.message);
  }
}

function mapForecastData(rawData) {
  const forecastList = rawData.list.map((entry) => {
    const { dayName, time } = convertTimeStampToTime(entry.dt);
    return {
      date: `${dayName}`,
      time: `${time}`,
      temperature: Math.round(entry.main.temp),
      description: entry.weather[0].description,
      iconUrl: `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`,
    };
  });
  console.log(forecastList);
  return forecastList;
}

function displayForecastWeather(data) {
  const daysMap = {};

  data.forEach((entry) => {
    if (!daysMap[entry.date]) {
      daysMap[entry.date] = [];
    }
    daysMap[entry.date].push(entry);
  });

  let weatherForecastContainer = document.querySelector(".weather-forecast");
  weatherForecastContainer.innerHTML = "";

  Object.keys(daysMap).forEach((day) => {
    const days = daysMap[day];
    weatherForecastContainer.innerHTML +=
      '<h3 class="text-primary">' + day + "</h3>";

    days.forEach((entry) => {
      const { time, temperature, description, iconUrl } = entry;
      weatherForecastContainer.innerHTML += `
      <div class="weather-forecast-box w-100 d-flex justify-content-between align-items-center border rounded p-3 mb-3">
              <div>${time}</div>
              <div><img src=${iconUrl} alt=""></div>
              <div class="fs-3"><strong>${temperature}°C</strong></div>
              <div>${description}</div>
              <div class="real-feel">Real feel: <strong>${temperature}°C</strong></div>
            </div>`;
    });
  });
}
