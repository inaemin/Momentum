// 조건
// 로컬 스토리지를 사용한 투두리스트
// 날씨와 위치 (geolocation)

const nameForm = document.querySelector("#login");
const nameInput = document.querySelector("#login input");
const nameBtn = document.querySelector("#login button");
const helloForm = document.querySelector(".login");

function nameSubmit(Event) {
    Event.preventDefault();
    const username = nameInput.value;
    localStorage.setItem("username", username);
    nameForm.classList.add("hidden");
    sayHello(username);
}

function sayHello(username) {
    helloForm.classList.remove("hidden");
    helloForm.innerText = `Good To See You, ${username}`;
}

const savedName = localStorage.getItem("username");
if (savedName === null) {
    nameForm.classList.remove("hidden");
    nameForm.addEventListener("submit", nameSubmit);
} else {
    sayHello(savedName);
}