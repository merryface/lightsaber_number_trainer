const attack = document.getElementById("attack");
const number = document.getElementById("number");
const startStop = document.getElementById("startStop");

let lowestTime = 6;
let highestTime = 10; 
let moveCount = 0;
let intervalId;

const randomiseStandardorReverse = () => Math.random() < 0.5 ? "standard" : "reverse";
const randomiseAttackOrDefend = () => Math.random() < 0.5 ? "Attack" : "Block";
const randomOneToNine = () => Math.floor(Math.random() * 9) + 1;
const generateRandomTimeInterval = () => {
  const seconds = Math.floor(Math.random() * (highestTime - lowestTime + 1)) + lowestTime;
  return seconds * 1000;
};


const speak = (text) => {
  if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Cancel any ongoing speech
  }
  let utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

const updateUI = () => {
  const num = randomOneToNine();
  number.innerText = num;

  let attackType = randomiseAttackOrDefend();
  const horizontalBlock = num === 7 || num === 8 || num === 9;
  if (attackType === "Block" && randomiseStandardorReverse() === "reverse" && !horizontalBlock) {
    attackType = "Reverse block";
  }
  attack.innerText = attackType;
  speak(`${attackType}, ${num}`);

  moveCount++;
  if (moveCount % 5 === 0) {
    if (lowestTime > 3) lowestTime--;
    if (highestTime > 3) highestTime--;
  }
};

const start = () => {
  startStop.innerText = "STOP";
  startStop.removeEventListener('click', start);
  startStop.addEventListener('click', stop);

  updateUI(); // Initial update
  intervalId = setInterval(() => {
    updateUI(); // Repeated updates

    // Adjust the interval time
    clearInterval(intervalId);
    intervalId = setInterval(updateUI, generateRandomTimeInterval());
  }, generateRandomTimeInterval());
};


const stop = () => {
  clearInterval(intervalId);
  startStop.innerText = "START";
  startStop.removeEventListener('click', stop);
  startStop.addEventListener('click', start);
};

startStop.addEventListener('click', start);
