function changeImg() {
    const leng = 10;
    const a = Math.floor(Math.random() * leng) + 1
    document.body.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(\"image/img"+ String(a).padStart(2, "0") +".jpg\")";
};

window.addEventListener('load', changeImg);