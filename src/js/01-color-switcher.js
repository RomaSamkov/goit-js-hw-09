const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
    timerId = setInterval(changeColor, 1000);
    refs.startBtn.setAttribute('disabled', '');
};
function onStopBtn() {
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled');
};

function changeColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}