// STATE

const playerWinsLSKey = "playerWins";
const houseWinsLSKey = "houseWins";
const stepOne = document.querySelector(".step-1");
const stepTwo = document.querySelector(".step-2");
const playAgainBtn = document.querySelector(".play-again-btn");

let state = {
  playerWins: localStorage.getItem(playerWinsLSKey) || 0,
  houseWins: localStorage.getItem(houseWinsLSKey) || 0,
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
  console.log(state);
  hideStepOne();
  showStepTwo();
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
  createElementPickedByHouse();
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

  const playerColumn = document.querySelector(".player-column");
  playerColumn.innerHTML = `<h2>YOU PICKED</h2>`;
  playerColumn.appendChild(pickedElement);
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

const playAgain = () => {
  stepTwo.classList.add("hidden");
  stepOne.classList.remove("hidden");
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
