window.onload = function () {
  axios
    .get(
      "https://api.openweathermap.org/data/2.5/forecast?q=Philadelphia&appid=3fb0121c59482bb76311376a76043900&units=imperial&cnt=6"
    )
    .then(consoleLog);
  //.get(`${weatherApi}q=Philadelphia&appid=${apiKey}&units=imperial`)
  //.then(showCityTemp);
};
function consoleLog(response) {
  console.log(response.data.list[0].main.temp);
  console.log(response.data.list[0].weather[0].description);
  console.log(response.data.list[0].pop);
  console.log(response.data.city.name);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  axios.get(`${weatherApi}${apiKey}&lat=${lat}&lon=${lon}`).then(showWeather);
}

//function showLocTemp(response) {
//  let localCity = response.data.city.name;
//  let currentCity = document.querySelector("#current-city");
// let temp = Math.round(response.data.list[0].main.temp);
//  let currentTemp = document.querySelector("#current-temp");
//  currentCity.innerHTML = `${localCity}`;
//  currentTemp.innerHTML = `${temp}°`;
//  console.log(temp);
//}

function showWeather(response) {
  let city = response.data.city.name;
  let location = document.querySelector("#current-city");
  let currentTemp = Math.round(response.data.list[0].main.temp);
  let weatherDesc = response.data.list[0].weather[0].description;
  let weatherDisp = document.querySelector(".current-weather-desc");
  let temp = document.querySelector("#current-temp");
  location.innerHTML = `${city}`;
  weatherDisp.innerHTML = `${weatherDesc}`;
  temp.innerHTML = `${currentTemp}°`;
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
