//Speech Recognition API
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

const messageEl = document.querySelector("#message");

const randomNumber = getRandomNumber();

console.log(randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

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

//write what user speaks
function writeMessage(msg) {
  messageEl.innerHTML = `
<div>Your guess: </div>
<span class="box">${msg}</span>
`;
}

// check msg against number
function checkNumber(msg) {
  const num = +msg;

  //check if msg is a number
  if (Number.isNaN(num)) {
    messageEl.innerHTML += `
<div>That is not a valid number</div>
`;
    return;
  }

  //check for range between 1 and 100
  if (num > 100 || num < 1) {
      messageEl.innerHTML = `
      <div>Number MUST be between 1 and 100!
      </div>`;
      return;
  }

  //check if it is random num
  if(num === randomNumber) {
      document.body.innerHTML = `
      <h2>Congratulations!!</h2>
      <br>
      <br>
      <h3>The correct number was ${num}</h3>
      <button class="play-again" id="play-again">Play Again?</button>
      `
  } else if (num > randomNumber) {
      messageEl.innerHTML += `
      <div>WRONG!</div> <br> <div>Guess was too high; </div> <br> <div>Guess a lower number next time.</div>
      `
  } else {
      messageEl.innerHTML += `
      <div>WRONG!</div> <br> <div>Guess was too low; </div> <br> <div>Guess a higher number next time.</div>
      `
  }
}

//generate random number between 1 and 100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//speak result
speechRecog.addEventListener("result", onSpeak);

//end speech recog service
speechRecog.addEventListener("end", () => speechRecog.start());

document.body.addEventListener("click", (e) => {
    if (e.target.id == "play-again") {
        window.location.reload();
    }
});
