/***
    Data: 12-05-2023
    Author: Siyamur Rahman Meraj (Developermeraj)
    Description: Weather Application with real-time data from visualcrossing WeatherMap API and advanced DOM functionalities
*/ 
let currentCity, hourlyorWeek = "week"; const temp = document.getElementById("temp"), feelslike = document.getElementById("feelslike"), date = document.getElementById("date-time"), condition = document.getElementById("condition"), rain = document.getElementById("rain"), mainIcon = document.getElementById("icon"), currentLocation = document.getElementById("location"), uvIndex = document.querySelector(".uv-index"), uvText = document.querySelector(".uv-text"), windSpeed = document.querySelector(".wind-speed"), sunRise = document.querySelector(".sun-rise"), sunSet = document.querySelector(".sun-set"), humidity = document.querySelector(".humidity"), visibilty = document.querySelector(".visibilty"), humidityStatus = document.querySelector(".humidity-status"), airQuality = document.querySelector(".air-quality"), airQualityStatus = document.querySelector(".air-quality-status"), visibilityStatus = document.querySelector(".visibilty-status"), searchForm = document.querySelector("#search"), search = document.querySelector("#query"), celciusBtn = document.querySelector(".celcius"), fahrenheitBtn = document.querySelector(".fahrenheit"), tempUnit = document.querySelectorAll(".temp-unit"), hourlyBtn = document.querySelector(".hourly"), weekBtn = document.querySelector(".week"), weatherCards = document.querySelector("#weather-cards"), loadWeatherData = async (e, t) => { try { let i = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${e}?unitGroup=metric&key=2U5TA6XKA3HEP3JQK6ZLHCFKY&contenthourlyorWeek=json`, n = await fetch(i), r = await n.json(); getWeathersData(r, t) } catch (e) { alert("City not found in our database") } }; let getWeathersData = (e, t) => { console.log(e); let i = e.currentConditions; currentLocation.innerText = e.resolvedAddress, changeBackground(i.icon), temp.innerText = i.temp, condition.innerText = i.conditions, rain.innerText = "perc - " + i.precip + "%", visibilty.innerText = i.visibility, visibilityStatus.innerText = getVisibilityStatus(i.visibility), airQuality.innerText = i.winddir, airQualityStatus.innerText = getAirQualityStatus(i.winddir), windSpeed.innerText = i.windspeed, uvIndex.innerText = i.uvindex, uvText.innerText = MeasureUvIndex(i.uvindex), humidity.innerText = i.humidity + " %", humidityStatus.innerText = getHumidityStatus(i.humidity), feelslike.innerText = i.feelslike, mainIcon.src = getIcon(i.icon), sunRise.innerText = getHourFormApi(i.sunrise), sunSet.innerText = getHourFormApi(i.sunset), "hourly" === t ? getForecastWeathers(e.days[0].hours, "day") : getForecastWeathers(e.days, "week") }; const MeasureUvIndex = e => e <= 2 ? "Low" : e <= 5 ? "Moderate" : e <= 7 ? "High" : e <= 10 ? "Very High 😰" : "Extreme 🥵", getAirQualityStatus = e => { let t = ""; return t = e >= 0 && e <= 50 ? "Good" : e >= 51 && e <= 100 ? "Moderate" : e >= 101 && e <= 150 ? "Unhealthy for Sensitive Groups " : e >= 151 && e <= 200 ? "Unhealthy " : e >= 201 && e <= 300 ? "Very Unhealthy " : e >= 301 ? "Hazardous " : "Invalid AQI value.", t }, getHumidityStatus = e => e <= 30 ? "Low" : e <= 60 ? "Moderate" : "High", getVisibilityStatus = e => e <= .03 ? "Dense Fog" : e <= .16 ? "Moderate Fog" : e <= .35 ? "Light Fog" : e <= 1.13 ? "Very Light Fog" : e <= 2.16 ? "Light Mist" : e <= 5.4 ? "Very Light Mist" : e <= 10.8 ? "Clear Air" : "Very Clear Air", getCurrentLocation = async () => { let e = await fetch("https://geolocation-db.com/json/", { method: "GET", headers: {} }), t = await e.json(); currentCity = t.city, loadWeatherData(t.city, hourlyorWeek) }; getCurrentLocation(); const getDateTime = () => { const e = new Date, t = e.toLocaleString("en-US", { hour: "numeric", hour12: !0, hourCycle: "h12" }), i = e.toLocaleString("en-US", { minute: "numeric", hour12: !1 }), n = e.toLocaleString("en-US", { weekday: "long" }), r = t.slice(-2); return `${n}, ${t.slice(0, -2) + ": " + i} ${r}` }, getHourFormApi = e => { let t = e.split(":")[0], i = e.split(":")[1], n = ""; return n = t >= 12 ? "PM" : "AM", t %= 12, t = t < 10 ? "0" + t : t, i = i < 10 ? "0" + i : i, `${t}:${i} ${n}` }, getDayFormApi = e => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(e).getDay()]; date.innerText = getDateTime(), setInterval((() => { date.innerText = getDateTime() }), 1e3); let getForecastWeathers = (e, t) => { weatherCards.innerHTML = ""; let i = "", n = 0; n = "day" === t ? 24 : 7; for (let r = 0; r < n; r++) { let n = getIcon(e[r].icon); console.log(n), i = getHourFormApi(e[r].datetime), "week" === t && (i = i = getDayFormApi(e[r].datetime)); let a = document.createElement("div"); a.classList.add("card", "fade-in"), a.innerHTML = `\n                <h2 class="day-name">${i}</h2>\n                <div class="card-icon">\n                    <img src="${n}" class="day-icon" alt="" />\n                </div>\n                <div class="day-temp">\n                    <h2 class="temp">${e[r].temp}</h2>\n                    <span class="temp-unit">°C</span>\n                </div>\n        `, setTimeout((() => { weatherCards.appendChild(a) }), 200 * r) } }; const getIcon = e => { switch (e) { case "partly-cloudy-day": return "https://i.ibb.co/PZQXH8V/27.png"; case "partly-cloudy-night": return "https://i.ibb.co/Kzkk59k/15.png"; case "rain": return "https://i.ibb.co/kBd2NTS/39.png"; case "clear-day": default: return "https://i.ibb.co/rb4rrJL/26.png"; case "clear-night": return "https://i.ibb.co/1nxNGHL/10.png" } }; function changeBackground(e) { let t = ""; t = "partly-cloudy-day" === e ? "https://i.ibb.co/qNv7NxZ/pc.webp" : "partly-cloudy-night" === e ? "https://i.ibb.co/RDfPqXz/pcn.jpg" : "rain" === e ? "https://i.ibb.co/h2p6Yhd/rain.webp" : "clear-day" === e ? "https://i.ibb.co/WGry01m/cd.jpg" : "clear-night" === e ? "https://i.ibb.co/kqtZ1Gx/cn.jpg" : "https://i.ibb.co/qNv7NxZ/pc.webp", document.querySelector("body").style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${t})` } function changeTimeSpan(e) { hourlyorWeek !== e && (hourlyorWeek = e, "hourly" === e ? (hourlyBtn.classList.add("active"), weekBtn.classList.remove("active")) : (hourlyBtn.classList.remove("active"), weekBtn.classList.add("active")), loadWeatherData(currentCity, hourlyorWeek), console.log(currentCity)) } hourlyBtn.addEventListener("click", (() => { changeTimeSpan("hourly") })), weekBtn.addEventListener("click", (() => { changeTimeSpan("week") })), searchForm.addEventListener("submit", (e => { e.preventDefault(), currentCity = search.value, currentCity && (loadWeatherData(search.value, hourlyorWeek), search.value = "") }));