const API_KEY = "29fa091b7e7e837d3eff910937e22844";

function geoFail() {
    alert("위치정보가 없어 날씨를 불러올 수 없습니다.");
};

function geoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`;
    const air_url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    fetch(url).then(response => response.json()).then((data) => {
        console.log(url)
        const first = data.daily[0];
        const second = data.daily[1];
        const third = data.daily[2];
        const temp = document.querySelectorAll(".temp");
        temp[0].innerHTML = "<strong>" + `${first.weather[0]["description"]}` + "</strong><br>" + `최고기온  ${first.temp["max"]}℃` + "<br>" + `최저기온  ${first.temp["min"]}℃`;
        temp[1].innerHTML = "<strong>" + `${second.weather[0]["description"]}` + "</strong><br>" + `최고기온  ${second.temp["max"]}℃` + "<br>" + `최저기온  ${second.temp["min"]}℃`;
        temp[2].innerHTML = "<strong>" + `${third.weather[0]["description"]}` + "</strong><br>" + `최고기온  ${third.temp["max"]}℃` + "<br>" + `최저기온  ${third.temp["min"]}℃`;
    });

    fetch(air_url).then(response => response.json()).then((data) => {
        const PM2_5 = data.list[0].components.pm2_5;
        const PM10 = data.list[0].components.pm10;
        document.querySelector(".PM10").innerHTML = "미세먼지(PM10)<br>" + `${PM10}`; //미세먼지
        document.querySelector(".PM2_5").innerHTML = "초미세먼지(PM2.5)<br>" + `${PM2_5}`; //초미세먼지
        if (PM10 < 25) {
            document.querySelector(".PM10").style.backgroundColor = "rgba(0, 0, 255, 0.5)";
        } else if (25 <= PM10 < 50) {
            document.querySelector(".PM10").style.backgroundColor = "rgba(0, 128, 0, 0.5)";
        } else if (50 <= PM10 < 90 ){
            document.querySelector(".PM10").style.backgroundColor = "rgba(255, 255, 0, 0.5)";
        } else if (90 <= PM10 < 180) {
            document.querySelector(".PM10").style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        } else {
            document.querySelector(".PM10").style.backgroundColor = "rgba(128, 0, 128, 0.5)";
        };
        
        if (PM2_5 < 15) {
            document.querySelector(".PM2_5").style.backgroundColor = "rgba(0, 0, 255, 0.5)";
        } else if (15 <= PM2_5 < 30) {
            document.querySelector(".PM2_5").style.backgroundColor = "rgba(0, 128, 0, 0.5)";
        } else if (30 <= PM2_5 < 55 ){
            document.querySelector(".PM2_5").style.backgroundColor = "rgba(255, 255, 0, 0.5)";
        } else if (55 <= PM2_5 < 110) {
            document.querySelector(".PM2_5").style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        } else {
            document.querySelector(".PM2_5").style.backgroundColor = "rgba(128, 0, 128, 0.5)";
        };
    });
};

navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);

const today = new Date();
const date = document.querySelectorAll(".date");

date[0].innerText = `${today.getDate()}일`;
let current = new Date(today.getTime() + 24 * 60 * 60 * 1000);
date[1].innerText = `${current.getDate()}일`;
current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
date[2].innerText = `${current.getDate()}일`;
