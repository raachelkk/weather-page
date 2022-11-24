function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let condition = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let name = response.data.name;

  let tempDisplay = document.querySelector("#current-temp");
  let conditionDisplay = document.querySelector("#weather-description");
  let humidityDisplay = document.querySelector("#humidity");
  let windDisplay = document.querySelector("#wind");
  let nameDisplay = document.querySelector("h1");

  tempDisplay.innerHTML = `${temp}`;
  conditionDisplay.innerHTML = `${condition}`;
  humidityDisplay.innerHTML = `Humidity ${humidity}%`;
  windDisplay.innerHTML = `Wind ${wind}km/h`;
  nameDisplay.innerHTML = `${name}`;
}

function sendCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCoords(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function sendCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoords);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let search = document.querySelector("#search-button");
search.addEventListener("click", sendCity);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", sendCurrentCity);
