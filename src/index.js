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

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#input-city");
  let apiInput = searchCity.value.replace(/\s/g, "");
  console.log(apiInput);
  axios
    .get(`${weatherApi}q=${apiInput}&appid=${apiKey}&units=imperial`)
    .then(showCityTemp);
}
let searchForm = document.querySelector("#find-city");
searchForm.addEventListener("submit", search);

function toFarenheight() {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = "65°";
}

function toCelcius() {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = "18°";
}

let far = document.querySelector("#farenheight");
far.addEventListener("click", toFarenheight);

let cel = document.querySelector("#celcius");
cel.addEventListener("click", toCelcius);

let weatherApi = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "3fb0121c59482bb76311376a76043900";

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  axios
    .get(`${weatherApi}&lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(showLocTemp);
}

//function test(response) {
// console.log(response);
//}

function showLocTemp(response) {
  let localCity = response.data.name;
  let currentCity = document.querySelector("#current-city");
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentCity.innerHTML = `${localCity}`;
  currentTemp.innerHTML = `${temp}°`;
  console.log(temp);
}

function showCityTemp(response) {
  let searchCity = response.data.name;
  let location = document.querySelector("#current-city");
  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  location.innerHTML = `${searchCity}`;
  currentTemp.innerHTML = `${cityTemp}°`;
  console.log(cityTemp);
}

let location = document.querySelector("#loc-link");
location.addEventListener("click", getCurrentPosition);
