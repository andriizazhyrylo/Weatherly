const apiKey = "b89be5013f6f526aaaaf3dbbd828e300";

const searchBtn = document.getElementById("search-btn");
const input = document.getElementById("city-input");
const weatherBox = document.getElementById("weather-box");
const notFoundBox = document.getElementById("not-found");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const wind = document.getElementById("wind");

searchBtn.addEventListener("click", getWeather);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const city = input.value.trim();
  if (!city) return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ua&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404" || data.cod === 404) {
        weatherBox.style.display = "none";
        notFoundBox.style.display = "block";
        return;
      }

      weatherBox.style.display = "block";
      notFoundBox.style.display = "none";

      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      description.textContent = data.weather[0].description;
      wind.textContent = `Вітер: ${data.wind.speed} м/с`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    })
    .catch(error => {
      console.error("Помилка:", error);
      weatherBox.style.display = "none";
      notFoundBox.style.display = "block";
    });
}
