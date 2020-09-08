//Speech Recognition API
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

const messageEl = document.querySelector("#message");

const randomNumber = getRandomNumber();

console.log(randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

let speechRecog = new window.SpeechRecognition();

//start recognition and game
speechRecog.start();

//capture uses spoken guess
function onSpeak(e) {
// console.log(e);
const message = e.results[0][0].transcript;

// console.log(message);
writeMessage(message);
checkNumber(message);
}

//generate random number between 1 and 100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//speak result
speechRecog.addEventListener("result", onSpeak)