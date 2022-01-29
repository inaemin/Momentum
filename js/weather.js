const API_KEY = "29fa091b7e7e837d3eff910937e22844";

function geoFail() {
    alert("위치정보가 없어 날씨를 불러올 수 없습니다.");
    document.querySelector(".PM10").style.backgroundColor = "rgba(255,255,255,0.5)";
    document.querySelector(".PM10").innerText = "미세먼지를 불러올 수 없습니다";
    document.querySelector(".PM2_5").style.backgroundColor = "rgba(255,255,255,0.5)";
    document.querySelector(".PM2_5").innerText = "초미세먼지를 불러올 수 없습니다";
};

function geoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`;
    const air_url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    fetch(url).then(response => response.json()).then((data) => {
        const first = data.daily[0];
        const second = data.daily[1];
        const third = data.daily[2];
        const temp = document.querySelectorAll(".temp");
        temp[0].innerHTML = "<strong>" + `${first.weather[0]["description"]}` + "</strong><br>" + `최고기온  ${first.temp["max"]}℃` + "<br>" + `최저기온  ${first.temp["min"]}℃`;
        temp[1].innerHTML = "<strong>" + `${second.weather[0]["description"]}` + "</strong><br>" + `최고기온  ${second.temp["max"]}℃` + "<br>" + `최저기온  ${second.temp["min"]}℃`;
        temp[2].innerHTML = "<strong>" + `${third.weather[0]["description"]}` + "</strong><br>" + `최고기온  ${third.temp["max"]}℃` + "<br>" + `최저기온  ${third.temp["min"]}℃`;
    });

    fetch(air_url).then(response => response.json()).then((data) => {
        const colors = [ "rgba(225, 36, 64, 0.5)", "rgba(254, 79, 59, 0.5)", "rgba(254, 122, 15, 0.5)", "rgba(248, 204, 97, 0.5)", "rgba(81, 194, 166, 0.5)", "rgba(83, 198, 203, 0.5)", "rgba(76, 202, 225, 0.5)", "rgba(80, 166, 249, 0.5)" ];
        const PM2_5 = data.list[0].components.pm2_5;
        const PM10 = data.list[0].components.pm10;
        document.querySelector(".PM10").innerHTML = "미세먼지(PM10)<br>" + `${PM10}`; //미세먼지
        document.querySelector(".PM2_5").innerHTML = "초미세먼지(PM2.5)<br>" + `${PM2_5}`; //초미세먼지
        if (PM10 < 16) {
            document.querySelector(".PM10").style.backgroundColor = colors[8];    
        } else if (16 <= PM10 < 31) {
            document.querySelector(".PM10").style.backgroundColor = colors[7];
        } else if (31 <= PM10 < 41 ){
            document.querySelector(".PM10").style.backgroundColor = colors[6];
        } else if (41 <= PM10 < 51) {
            document.querySelector(".PM10").style.backgroundColor = colors[5];
        } else if (51 <= PM10 < 76) {
            document.querySelector(".PM10").style.backgroundColor = colors[4];
        } else if (76 <= PM10 < 101) {
            document.querySelector(".PM10").style.backgroundColor = colors[3];
        } else if (101 <= PM10 < 151) {
            document.querySelector(".PM10").style.backgroundColor = colors[2];
        } else if (PM10 >= 151) {
            document.querySelector(".PM10").style.backgroundColor = colors[1];
        };
        
        if (PM2_5 < 9) {
            document.querySelector(".PM2_5").style.backgroundColor = colors[8];
        } else if (9 <= PM2_5 < 16) {
            document.querySelector(".PM2_5").style.backgroundColor = colors[7];
        } else if (16 <= PM2_5 < 21 ){
            document.querySelector(".PM2_5").style.backgroundColor = colors[6];
        } else if (21 <= PM2_5 < 26) {
            document.querySelector(".PM2_5").style.backgroundColor = colors[5];
        } else if (26 <= PM2_5 < 38) {
            document.querySelector(".PM2_5").style.backgroundColor = colors[4];
        } else if (38 <= PM2_5 < 51) {
            document.querySelector(".PM2_5").style.backgroundColor = colors[3];
        } else if (51 <= PM2_5 < 76) {
            document.querySelector(".PM2_5").style.backgroundColor = colors[2];
        } else if (PM2_5 >= 76) {
            document.querySelector(".PM2_5").style.backgroundColor = colors[1];
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
