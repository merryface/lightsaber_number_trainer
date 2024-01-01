document.addEventListener('DOMContentLoaded', (event) => {
const attack = document.getElementById("attack");
const number = document.getElementById("number");
const startStop = document.getElementById("startStop");
const selectSith = document.getElementById("selectSith");
const selectJedi = document.getElementById("selectJedi");

let intervalId;
let currentSide = "jedi";
let currentId = 0;
let selectedPartEnd = 30;

const stop = () => {
  clearInterval(intervalId);
  startStop.innerText = "Start";
  startStop.removeEventListener('click', stop);
  startStop.addEventListener('click', start);
};

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

const parts = [
  [0, 4, document.getElementById("p1")],
  [5, 8, document.getElementById("p2")],
  [9, 13, document.getElementById("p3")],
  [14, 17, document.getElementById("p4")],
  [18, 23, document.getElementById("p5")],
  [0, 30, document.getElementById("full")]
];

parts.forEach((part, id) => {
  part[2].addEventListener('click', () => {
    currentId = part[0];
    selectedPartEnd = part[1];

    parts.forEach((p, j) => {
      if (j <= id) {
        p[2].classList.add('selected');
      } else {
        p[2].classList.remove('selected');
      }
    });
  });
});

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
      speechSynthesis.cancel();
  }
  let utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

const updateUI = () => {
  const moves = currentSide === "jedi" ? jediSide : sithSide;

  if (currentId <= selectedPartEnd) {
    const num = moves[currentId].number;
    number.innerText = num;

    let attackType = moves[currentId].type === "A" ? "Attack" : "Block";
    attack.innerText = attackType;
    speak(`${attackType}, ${num}`);
    console.log(`${attackType}, ${num}`);
    
    currentId++;
  } else {
    speak(`Set Complete! Well done apprentice.`);
    currentId = 0;
    stop();
    startStop.innerText = "Restart";
    attack.innerText = "Deactivate your saber";
    number.innerText = "# Number";
  }
};

const start = () => {
  startStop.innerText = "STOP";
  startStop.removeEventListener('click', start);
  startStop.addEventListener('click', stop);

  updateUI();
  intervalId = setInterval(updateUI, generateTimeInterval(2));
};

startStop.addEventListener('click', start);
});