window.onload = function() {
  let ipUrl = "https://ipinfo.io/json";
  let appId = "appid=dfc4ca78e063e3082d3b5a59d36dffc5";
  let location = document.getElementById("location");

  httpReqIpAsync(ipUrl);

  // ipinfo.io api request for location
  function httpReqIpAsync(url, callback) {
    let httpReqIp = new XMLHttpRequest();
    httpReqIp.open("GET", url, true);
    httpReqIp.onreadystatechange = function() {
      if(httpReqIp.readyState == 4 && httpReqIp.status == 200) {
        let jsonIp = JSON.parse(httpReqIp.responseText);
        console.log(jsonIp);
        let city = jsonIp.city;
        let region = jsonIp.region;
        location.innerHTML = `${city}, ${region}`;
        let lat = jsonIp.loc.split(",")[0];
        let lon = jsonIp.loc.split(",")[1];
        console.log(lat+" "+lon);
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${appId}`;
        httpReqWeatherAsync(weatherUrl);
      }
    }
    httpReqIp.send();
  }

  // OpenWeatherMap.org API request
  function httpReqWeatherAsync(url, callback) {
		let httpReqWeather = new XMLHttpRequest();
		httpReqWeather.open("GET", url, true);
		httpReqWeather.onreadystatechange = function() {
      if(httpReqWeather.readyState == 4 && httpReqWeather.status == 200) {
        let jsonWeather = JSON.parse(httpReqWeather.responseText);
        console.log(jsonWeather);
        let description = jsonWeather.weather[0].description;
        let id = jsonWeather.weather[0].id;
        // let icon = `<i class="wi wi-owm-${id}"></i>`
        let temperature = jsonWeather.main.temp;
        let tempFaren = Math.round(1.8 * (temperature - 273) + 32);
        let humidity = jsonWeather.main.humidity;
        let windSpeed = jsonWeather.wind.speed;
        let visibility = Math.round(jsonWeather.visibility / 1000);
        // console.log("weather description "+description);
        console.log(id+" "+tempFaren+" "+humidity+" "+windSpeed+" "+visibility," ");
        let desc = document.getElementById("description");
        desc.innerHTML = `<i id="icon-desc" class="wi wi-owm-${id}"></i><p id="desc">${description}</p>`;
        let temp = document.getElementById("temperature");
        temp.innerHTML = `${tempFaren}<i id="icon-thermometer" class="wi wi-thermometer"></i>`;
        let humidityElem = document.getElementById("humidity");
        humidityElem.innerHTML = `${humidity}%`;
        let windElem = document.getElementById("wind");
        windElem.innerHTML = `${windSpeed} m/h`;
        let visibilityElem = document.getElementById("visibility");
        visibilityElem.innerHTML = `${visibility} miles`;
      }
    }
    httpReqWeather.send();
  }

}