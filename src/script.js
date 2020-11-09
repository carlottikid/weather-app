window.onload = function () {
  axios
    .get(
      "https://api.openweathermap.org/data/2.5/forecast?q=Philadelphia&appid=3fb0121c59482bb76311376a76043900&units=imperial"
    )
    .then(showAll);
  //.get(`${weatherApi}q=Philadelphia&appid=${apiKey}&units=imperial`)
  //.then(showCityTemp);
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
  axios.get(`${weatherApi}${apiKey}&lat=${lat}&lon=${lon}`).then(showWeather);
}

function showWeather(response) {
  let city = response.data.city.name;
  let location = document.querySelector("#current-city");
  let currentTemp = Math.round(response.data.list[0].main.temp);
  let weatherDesc = response.data.list[0].weather[0].description;
  let pop = response.data.list[0].pop;
  let windSpeed = Math.round(response.data.list[0].wind.speed);
  let weatherDisp = document.querySelector(".current-weather-desc");
  let temp = document.querySelector("#current-temp");
  let precip = document.querySelector("#precip");
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windSpeed}`;
  precip.innerHTML = `${pop}`;
  location.innerHTML = `${city}`;
  weatherDisp.innerHTML = `${weatherDesc}`;
  temp.innerHTML = `${currentTemp}°`;
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
              forecast.weather.icon
            }"></img>
            <p class="card-text future-temp">
              <span>${Math.round(forecast.main.temp)}°</span>
            </p>
          </div>
        </div>
        `;
  }
}

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#input-city");
  let apiInput = searchCity.value.replace(/\s/g, "");
  console.log(apiInput);
  axios.get(`${weatherApi}${apiKey}&q=${apiInput}`).then(showWeather);
}

function toFarenheight() {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = "65°";
}

function toCelcius() {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = "18°";
}

let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

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
currentTime.innerHTML = `${hour}:${minutes}`;

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

let searchForm = document.querySelector("#find-city");
searchForm.addEventListener("submit", search);

let far = document.querySelector("#farenheight");
far.addEventListener("click", toFarenheight);

let cel = document.querySelector("#celcius");
cel.addEventListener("click", toCelcius);

let weatherApi = `https://api.openweathermap.org/data/2.5/forecast?&units=imperial&cnt=6&appid=`;
let apiKey = "3fb0121c59482bb76311376a76043900";

let loc = document.querySelector("#loc-link");
loc.addEventListener("click", getCurrentPosition);
