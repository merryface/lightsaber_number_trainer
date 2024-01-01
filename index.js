const attack = document.getElementById("attack");
const number = document.getElementById("number");
const startStop = document.getElementById("startStop");
const countViewer = document.getElementById("countViewer");
const infinity = document.getElementById("infinity");
const zeroCount = document.getElementById("zeroCount");
const plusFive = document.getElementById("plusFive");
const minusFive = document.getElementById("minusFive");

let lowestTime = 5;
let highestTime = 8; 
let moveCount = 0;
let countLimit = Infinity;
let lastNum;
let intervalId;

infinity.addEventListener('click', () => {
  countLimit = Infinity
  countViewer.innerText = "∞";
});

zeroCount.addEventListener('click', () => {
  countLimit = 0
  countViewer.innerText = "0";
});

plusFive.addEventListener('click', () => {
  if (countLimit === Infinity) {
    countLimit = 0
  }
  countLimit += 5
  countViewer.innerText = countLimit;
});

minusFive.addEventListener('click', () => {
  if (countLimit === Infinity) {
    countLimit = 0
  }

  if (countLimit > 0) {
    countLimit -= 5
    countViewer.innerText = countLimit;
  }
});

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
  if (moveCount !== Infinity) {
    if (moveCount > countLimit) {
      stop();
      speak(`Set Complete! Well done apprentice.`);
      return;
    }
  }
  const num = randomOneToNine();
  while (num === lastNum) num = randomOneToNine(); // Prevent the same number twice in a row
  number.innerText = num;

  let attackType = randomiseAttackOrDefend();
  const nonReverseBlocks = num === 7 || num === 8 || num === 9 || num === 4 || num === 3;
  if (attackType === "Block" && randomiseStandardorReverse() === "reverse" && !nonReverseBlocks) {
    attackType = "Reverse block";
  }
  attack.innerText = attackType;
  speak(`${attackType}, ${num}`);

  moveCount++;
  if (moveCount % 4 === 0) {
    if (lowestTime > 2) lowestTime--;
    if (highestTime > 2) highestTime--;
  }
};

const start = () => {
  if (countLimit === 0) alert("Please select a number of moves");

  if (countLimit !== 0) {
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
  }
};


const stop = () => {
  clearInterval(intervalId);
  startStop.innerText = "START";
  startStop.removeEventListener('click', stop);
  startStop.addEventListener('click', start);
  moveCount = 0;
};

startStop.addEventListener('click', start);
