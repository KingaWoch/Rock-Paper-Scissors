// STATE

const playerWinsLSKey = "playerWins";
const houseWinsLSKey = "houseWins";

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
      pickedByPlayer(e.currentTarget.dataset.pick);
      pickedByHouse();
      console.log(state);
    });
  });
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
