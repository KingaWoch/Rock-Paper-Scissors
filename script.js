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
