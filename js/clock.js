
const clockTitle = document.querySelector(".clock");
const dayTitle = document.querySelector(".day");

function Clock() {
    const today = new Date();
    const hour = String(today.getHours()).padStart(2, "0")
    const minute = String(today.getMinutes()).padStart(2, "0")
    const second = String(today.getSeconds()).padStart(2, "0")
    clockTitle.innerText = `${hour}:${minute}:${second}`
};

function Day() {
    const today = new Date();
    const year = String(today.getFullYear());
    const month = String(today.getMonth()+1);
    const date = String(today.getDate());
    dayTitle.innerText = `${year}년 ${month}월 ${date}일`;
};


Clock();
Day();

setInterval(Clock, 1000);
setInterval(Day, 1000);
