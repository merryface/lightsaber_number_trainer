const attack = document.getElementById("attack");
const number = document.getElementById("number");
const startStop = document.getElementById("startStop");
const selectSith = document.getElementById("selectSith");
const selectJedi = document.getElementById("selectJedi");

selectSith.addEventListener('click', () => {
  currentSide = "sith";
  currentId = 0;
  stop();
  selectSith.classList.add('selected');
  selectJedi.classList.remove('selected');
});

selectJedi.addEventListener('click', () => {
  currentSide = "jedi";
  currentId = 0;
  stop();
  selectSith.classList.remove('selected');
  selectJedi.classList.add('selected');
});

let intervalId;
let currentSide = "jedi";
let currentId = 0

const sithSide = [
  { number: 8, type: "A" },
  { number: 7, type: "A" },
  { number: 8, type: "A" },
  { number: 3, type: "A" },
  { number: 4, type: "A" },
  { number: 1, type: "B" },
  { number: 2, type: "B" },
  { number: 3, type: "B" },
  { number: 4, type: "B" },
  { number: 5, type: "A" },
  { number: 4, type: "A" },
  { number: 2, type: "A" },
  { number: 1, type: "A" },
  { number: 6, type: "A" },
  { number: 4, type: "B" },
  { number: 2, type: "B" },
  { number: 3, type: "B" },
  { number: 1, type: "B" },
  { number: 4, type: "A" },
  { number: 2, type: "A" },
  { number: 4, type: "A" },
  { number: 3, type: "A" },
  { number: 1, type: "A" },
  { number: 6, type: "A" },
  { number: 1, type: "B" },
  { number: 2, type: "B" },
  { number: 3, type: "B" },
  { number: 1, type: "B" },
  { number: 2, type: "B" },
  { number: 3, type: "B" },
  { number: 6, type: "B" }
];

const jediSide = [
  { number: 8, type: "B" },
  { number: 7, type: "B" },
  { number: 8, type: "B" },
  { number: 4, type: "B" },
  { number: 3, type: "B" },
  { number: 2, type: "A" },
  { number: 1, type: "A" },
  { number: 4, type: "A" },
  { number: 3, type: "A" },
  { number: 6, type: "B" },
  { number: 3, type: "B" },
  { number: 1, type: "B" },
  { number: 2, type: "B" },
  { number: 5, type: "B" },
  { number: 3, type: "A" },
  { number: 1, type: "A" },
  { number: 3, type: "A" },
  { number: 2, type: "A" },
  { number: 3, type: "B" },
  { number: 1, type: "B" },
  { number: 3, type: "B" },
  { number: 4, type: "B" },
  { number: 2, type: "B" },
  { number: 5, type: "B" },
  { number: 2, type: "A" },
  { number: 1, type: "A" },
  { number: 4, type: "A" },
  { number: 2, type: "A" },
  { number: 1, type: "A" },
  { number: 4, type: "A" },
  { number: 5, type: "A" }
];


const generateTimeInterval = (sec) => sec * 1000;



const speak = (text) => {
  if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Cancel any ongoing speech
  }
  let utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

const start = () => {
  startStop.innerText = "STOP";
  startStop.removeEventListener('click', start);
  startStop.addEventListener('click', stop);

  updateUI(); // Initial update
  intervalId = setInterval(updateUI, generateTimeInterval(2)); // Set interval for repeated updates
};

const updateUI = () => {
  const moves = currentSide === "jedi" ? jediSide : sithSide;

  if (currentId < moves.length) {
    const num = moves[currentId].number;
    number.innerText = num;

    let attackType = moves[currentId].type === "A" ? "Attack" : "Block";

    attack.innerText = attackType;
    speak(`${attackType}, ${num}`);
    
    currentId++; // Increment to the next move
  } else {
    speak(`Set Complete!`);
    currentId = 0;
    stop();
  }
};


const stop = () => {
  clearInterval(intervalId);
  startStop.innerText = "Start";
  startStop.removeEventListener('click', stop);
  startStop.addEventListener('click', start);
};

startStop.addEventListener('click', start);
