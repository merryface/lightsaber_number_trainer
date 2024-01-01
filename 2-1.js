const attack = document.getElementById("attack");
const number = document.getElementById("number");
const startStop = document.getElementById("startStop");
const selectSith = document.getElementById("selectSith");
const selectJedi = document.getElementById("selectJedi");
const part1Btn = document.getElementById("p1");
const part2Btn = document.getElementById("p2");
const part3Btn = document.getElementById("p3");
const part4Btn = document.getElementById("p4");
const part5Btn = document.getElementById("p5");
const part6Btn = document.getElementById("p6");
const fullBtn = document.getElementById("full");

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

let intervalId
let currentSide = "jedi"
let currentId = 0
let selectedPartEnd = 29


const parts = [
  [0,4, part1Btn],
  [5,8, part2Btn],
  [9,13, part3Btn],
  [14,17, part4Btn],
  [18,23, part5Btn],
  [24,29, part6Btn],
  [0,29, fullBtn]
]

// Add event listeners to parts, set currentId and selectedPartEnd
parts.forEach((part, id) => {
  part[2].addEventListener('click', () => {
    currentId = part[0]
    selectedPartEnd = part[1]

    parts.forEach((p, j) => {
      if (j > id) {
        p[2].classList.remove('selected');
      }

      if (j < id) {
        p[2].classList.add('selected');
      }
    })
    
    part[2].classList.add('selected');
  })
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

  if (currentId <= selectedPartEnd) {
    const num = moves[currentId].number;
    number.innerText = num;

    let attackType = moves[currentId].type === "A" ? "Attack" : "Block";

    attack.innerText = attackType;
    speak(`${attackType}, ${num}`);
    
    currentId++; // Increment to the next move
  } else {
    speak(`Set Complete! Well done apprentice.`);
    currentId = 0;
    stop();
    startStop.innerText = "Restart";
    attack.innerText = "Deactivate your saber";
    number.innerText = "# Number";
  }
};


const stop = () => {
  clearInterval(intervalId);
  startStop.innerText = "Start";
  startStop.removeEventListener('click', stop);
  startStop.addEventListener('click', start);
};

startStop.addEventListener('click', start);
