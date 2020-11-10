window.onload = function () {
  axios
    .get(
      "https://api.openweathermap.org/data/2.5/forecast?q=Philadelphia&appid=3fb0121c59482bb76311376a76043900&units=imperial"
    )
    .then(showAll);
};

function showAll(response) {
  showWeather(response);
  showForecast(response);
}

function consoleLog(response) {
  let forecast = response.data.list;
  console.log(formatHours(forecast[0].dt_txt));
  console.log(response.data.list[0].main.temp);
  console.log(response.data.list[0].weather[0].description);
  console.log(response.data.list[0].pop);
  console.log(response.data.city.name);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours > 12) {
    hours = hours - 12;
    return `${hours}:${minutes} PM`;
  } else {
    if (hours < 1) {
      return `12:${minutes} AM`;
    } else {
      return `${hours}:${minutes} AM`;
    }
  }
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  axios.get(`${weatherApi}${apiKey}&lat=${lat}&lon=${lon}`).then(showAll);
}

function showWeather(response) {
  let weatherElement = document.querySelector("#current-weather");
  let currentWeather = response.data.list[0];
  let city = response.data.city.name;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${city}`;

  weatherElement.innerHTML = `<div class="row">
        <div class="col-sm-12">
          <h5 class="current-weather-desc">${
            currentWeather.weather[0].description
          }</h5>
        </div>
      </div>
      <div class="d-flex flex-sm-row flex-wrap align-items-center">
        <div class="flex-shrink-1">
          <img id = "current-icon" src = "https://openweathermap.org/img/wn/${
            currentWeather.weather[0].icon
          }@2x.png"></img>
        </div>
        <div class="current-temp align-items-center">
          <span id="current-temp">${Math.round(
            currentWeather.main.temp
          )}°</span>
          <span class="temp-unit">F</span>
        </div>
        <div
          class="d-flex"
          style="flex-direction: column"
        >
          <div class="d-flex">
            Precipitation:
            <span class="secondary-metric" id="precip">${
              currentWeather.pop
            }</span>
            %
          </div>
          <div class="d-flex">
            Wind:
            <span class="secondary-metric" id="wind">${Math.round(
              currentWeather.wind.speed
            )}</span>
            mph
          </div>
        </div>`;
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="card text-center border-0" style="width: 18%">
          <div class="card-body">
            <h6 class="card-title future-temp day">${formatHours(
              forecast.dt_txt
            )}</h6>
            <img src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"></img>
            <p class="card-text future-temp">
              <span>${Math.round(forecast.main.temp)}°</span>
              <span class="temp-unit">F</span>
            </p>
          </div>
        </div>
        `;
  }
}

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#input-city");
  let apiInput = searchCity.value.replace(/\s/g, " ");
  console.log(apiInput);
  axios.get(`${weatherApi}${apiKey}&q=${apiInput}`).then(showAll);
}

let now = new Date();
let date = now.getDate();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatHours(`${now}`);

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

let searchForm = document.querySelector("#find-city");
searchForm.addEventListener("submit", search);

let weatherApi = `https://api.openweathermap.org/data/2.5/forecast?&units=imperial&cnt=6&appid=`;
let apiKey = "3fb0121c59482bb76311376a76043900";

let loc = document.querySelector("#loc-link");
loc.addEventListener("click", getCurrentPosition);
