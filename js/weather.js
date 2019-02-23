window.onload = function() {
  let ipUrl = "https://ipinfo.io/json";
  let appId = "appid=dfc4ca78e063e3082d3b5a59d36dffc5";
  let location = document.getElementById("location");

  httpReqAsync(ipUrl);

  // ipinfo.io api request for location
  function httpReqAsync(url, callback) {
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
      }
    }
    httpReqIp.send();
  }
}