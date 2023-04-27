// STATE

const playerWinsLSKey = "playerWins";
const houseWinsLSKey = "houseWins";
const stepOne = document.querySelector(".step-1");
const stepTwo = document.querySelector(".step-2");
const playerColumn = document.querySelector(".player-column");
const resultColumn = document.querySelector(".result-column");
const houseColumn = document.querySelector(".house-column");
const result = document.querySelector(".result");
const playAgainBtn = document.querySelector(".play-again-btn");

const winningWariants = {
  paper: ["rock"],
  rock: ["scissors"],
  scissors: ["paper"],
};

let state = {
  playerWins: Number(localStorage.getItem(playerWinsLSKey)) || 0,
  houseWins: Number(localStorage.getItem(houseWinsLSKey)) || 0,
  playerPick: null,
  housePick: null,
};

const renderScore = () => {
  const scoreNumber = document.querySelector(".score-number");
  scoreNumber.innerText = state.playerWins - state.houseWins;
};

const getPickedButton = () => {
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", (e) => {
      pick(e);
    });
  });
};

const pick = (e) => {
  pickedByPlayer(e.currentTarget.dataset.pick);
  pickedByHouse();
  // console.log(state);
  hideStepOne();
  showStepTwo();
  showResult();
};

const pickedByPlayer = (pickedButton) => {
  state = {
    ...state,
    playerPick: pickedButton,
  };
};

const pickedByHouse = () => {
  const options = ["rock", "paper", "scissors"];
  const housePick = options[Math.floor(Math.random() * options.length)];

  state = {
    ...state,
    housePick,
  };
};

const hideStepOne = () => {
  stepOne.classList.add("hidden");
};

const showStepTwo = () => {
  stepTwo.classList.remove("hidden");
  createElementPickedByPlayer();
  createEmptyHouseElement();
  setTimeout(createElementPickedByHouse, 200);
};

const createElementPickedByPlayer = () => {
  const playerPick = state.playerPick;

  const pickedElement = document.createElement("div");
  pickedElement.classList.add("picked");
  pickedElement.classList.add(`${playerPick}`);

  const pickedElementImgWrapper = document.createElement("div");
  pickedElementImgWrapper.classList.add("picked_image-wrapper");

  const pickedElementImg = document.createElement("img");
  pickedElementImg.src = `images/icon-${playerPick}.svg`;
  pickedElementImg.alt = `${playerPick}`;

  pickedElementImgWrapper.appendChild(pickedElementImg);
  pickedElement.appendChild(pickedElementImgWrapper);

  playerColumn.innerHTML = `<h2>YOU PICKED</h2>`;
  playerColumn.appendChild(pickedElement);
};

const createEmptyHouseElement = () => {
  const pickedElement = document.createElement("div");
  pickedElement.classList.add("picked");
  const pickElementEmpty = document.createElement("div");
  pickElementEmpty.classList.add("house-picked-empty");

  pickedElement.appendChild(pickElementEmpty);

  houseColumn.innerHTML = `<h2>THE HOUSE PICKED</h2>`;
  houseColumn.appendChild(pickedElement);
};

const createElementPickedByHouse = () => {
  const housePick = state.housePick;

  const pickedElement = document.createElement("div");
  pickedElement.classList.add("picked");
  pickedElement.classList.add(`${housePick}`);

  const pickedElementImgWrapper = document.createElement("div");
  pickedElementImgWrapper.classList.add("picked_image-wrapper");

  const pickedElementImg = document.createElement("img");
  pickedElementImg.src = `images/icon-${housePick}.svg`;
  pickedElementImg.alt = `${housePick}`;

  pickedElementImgWrapper.appendChild(pickedElementImg);
  pickedElement.appendChild(pickedElementImgWrapper);

  const houseColumn = document.querySelector(".house-column");
  houseColumn.innerHTML = `<h2>THE HOUSE PICKED</h2>`;
  houseColumn.appendChild(pickedElement);
};

const showResult = () => {
  if (state.playerPick === state.housePick) {
    result.innerText = "DRAW";
  } else if (winningWariants[state.playerPick].includes(state.housePick)) {
    result.innerText = "YOU WIN";
    localStorage.setItem(playerWinsLSKey, state.playerWins + 1);
    state = {
      ...state,
      playerWins: state.playerWins + 1,
    };
    // playerColumn.querySelector(".picked").classList.add("winner");
  } else {
    result.innerText = "YOU LOSE";
    localStorage.setItem(playerWinsLSKey, state.houseWins + 1);
    state = {
      ...state,
      houseWins: state.houseWins + 1,
    };
    // houseColumn.querySelector(".picked").classList.add("winner");
  }

  setTimeout(renderResult, 600);
  setTimeout(displayShadow, 600);
  renderScore();
};

const renderResult = () => {
  resultColumn.classList.remove("result-hidden");
};

const displayShadow = () => {
  if (winningWariants[state.playerPick].includes(state.housePick)) {
    playerColumn.querySelector(".picked").classList.add("winner");
  } else if (state.playerPick === state.housePick) {
    return;
  } else {
    houseColumn.querySelector(".picked").classList.add("winner");
  }
};

const playAgain = () => {
  stepTwo.classList.add("hidden");
  stepOne.classList.remove("hidden");
  resultColumn.classList.add("result-hidden");
};

playAgainBtn.addEventListener("click", playAgain);

const init = () => {
  renderScore();
  getPickedButton();
};

init();

// DISPLAY RULES

const rulesBtn = document.querySelector(".rules-btn");
const rulesModal = document.querySelector(".rules-modal");
const closeModalBtn = document.querySelector(".close-modal");

rulesBtn.addEventListener("click", () => {
  rulesModal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  rulesModal.classList.add("hidden");
});

rulesModal.addEventListener("click", (e) => {
  if (e.target === rulesModal) {
    rulesModal.classList.add("hidden");
  }
});
