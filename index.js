const attack = document.getElementById("attack");
const number = document.getElementById("number");
const startStop = document.getElementById("startStop");

const randomiseStandardorReverse = () => Math.random() < 0.5 ? "standard" : "reverse";
const randomiseAttackOrDefend = () => Math.random() < 0.5 ? "Attack" : "Block";
const randomOneToNine = () => Math.floor(Math.random() * 9) + 1;
const generateRandomTimeInterval = (lowestTime, highestTime) => {
  const range = highestTime - lowestTime;
  const seconds = Math.floor(Math.random() * (range + 1)) + lowestTime;
  return seconds * 1000; // Convert to milliseconds
};


const speak = (text) => {
  if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Cancel any ongoing speech
  }
  let utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};


let intervalId;

const updateUI = () => {
  const num = randomOneToNine();
  number.innerText = num;

  let attackType = randomiseAttackOrDefend();
  if (attackType === "Block" && randomiseStandardorReverse() === "reverse") {
    attackType = "Reverse block";
  }
  attack.innerText = attackType;
  speak(`${attackType}, ${num}`);
};

const start = () => {
  startStop.innerText = "STOP";
  startStop.removeEventListener('click', start);
  startStop.addEventListener('click', stop);

  updateUI();
  intervalId = setInterval(() => {
    updateUI();
  }, generateRandomTimeInterval(5,10));
};

const stop = () => {
  clearInterval(intervalId);
  startStop.innerText = "START";
  startStop.removeEventListener('click', stop);
  startStop.addEventListener('click', start);
};

startStop.addEventListener('click', start);
