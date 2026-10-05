const languages = [
  {
    name: "JavaScript",
    img: "assets/javascript.png",
  },
  {
    name: "TypeScript",
    img: "assets/typescript.png",
  },
  {
    name: "Python",
    img: "assets/python.png",
  },
  {
    name: "Java",
    img: "assets/java.png",
  },
  {
    name: "C++",
    img: "assets/cpp.png",
  },
  {
    name: "C#",
    img: "assets/csharp.png",
  },
  {
    name: "Go",
    img: "assets/go.png",
  },
  {
    name: "PHP",
    img: "assets/php.png",
  },
];
// Header
const header = document.createElement("header");
header.classList.add("header");
document.body.appendChild(header);

const headerContainer = document.createElement("div");
headerContainer.classList.add("container");
header.appendChild(headerContainer);

const logo = document.createElement("img");
logo.classList.add("header__logo");
logo.src = "./assets/logo.png";
logo.alt = "Code Memory";
headerContainer.appendChild(logo);

const headerActions = document.createElement("div");
headerActions.classList.add("header__actions");
headerContainer.appendChild(headerActions);

const newGameBtn = document.createElement("button");
newGameBtn.classList.add("new-game");
newGameBtn.textContent = "New Game";
headerActions.appendChild(newGameBtn);

const leaderboardBtn = document.createElement("button");
leaderboardBtn.classList.add("leaderboard");
leaderboardBtn.textContent = "Leaderboard";
headerActions.appendChild(leaderboardBtn);

// Main
const main = document.createElement("main");
main.classList.add("main");
document.body.appendChild(main);

const mainContainer = document.createElement("div");
mainContainer.classList.add("container");
main.appendChild(mainContainer);

const stats = document.createElement("div");
stats.classList.add("stats");
mainContainer.appendChild(stats);

const moves = document.createElement("p");
moves.classList.add("moves");
moves.textContent = "Moves: 0";
stats.appendChild(moves);

const pairs = document.createElement("p");
pairs.classList.add("pairs");
pairs.textContent = "Pairs: 0 / 8";
stats.appendChild(pairs);

const gameBoard = document.createElement("div");
gameBoard.classList.add("game-board");
mainContainer.appendChild(gameBoard);

// Game
const cards = [...languages, ...languages];
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
}
shuffleCards();
let selectedCards = [];
let canClick = true;
let movesScore = 0;
let pairsScore = 0;
let timerRemove;
function renderCards() {
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    gameBoard.appendChild(cardElement);
    const cardImg = document.createElement("img");
    cardImg.classList.add("card__img");
    cardImg.src = card.img;
    cardImg.alt = card.name;
    cardElement.dataset.name = card.name;
    cardElement.appendChild(cardImg);

    cardElement.addEventListener("click", () => {
      if (canClick === false) {
        return;
      }
      if (cardElement.classList.contains("card--open")) {
        return;
      }
      cardElement.classList.add("card--open");
      selectedCards.push(cardElement);
      if (selectedCards.length === 2) {
        movesScore++;
        moves.textContent = `Moves: ${movesScore}`;
        if (selectedCards[0].dataset.name === selectedCards[1].dataset.name) {
          pairsScore++;
          if (pairsScore === 8) {
            showWinModal();
          }
          pairs.textContent = `Pairs: ${pairsScore} / 8`;
          selectedCards = [];
        } else {
          timerRemove = setTimeout(function () {
            selectedCards[0].classList.remove("card--open");
            selectedCards[1].classList.remove("card--open");
            selectedCards = [];
            canClick = true;
          }, 1000);
          canClick = false;
        }
      }
    });
  });
}
renderCards();
// NewGame-BTN---------------------------------
function newGameStart() {
  clearTimeout(timerRemove);
  selectedCards = [];
  shuffleCards();
  canClick = true;

  movesScore = 0;
  moves.textContent = `Moves: ${movesScore}`;

  pairsScore = 0;
  pairs.textContent = `Pairs: ${pairsScore} / 8`;

  gameBoard.replaceChildren();
  renderCards();
}
newGameBtn.addEventListener("click", newGameStart);
// Win-Modal-----------------------------------------
function showWinModal() {
  document.body.style.overflow = "hidden";
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
  const modal = document.createElement("div");
  modal.classList.add("modal");
  document.body.appendChild(modal);

  const title = document.createElement("h2");
  title.classList.add("modal__title");
  title.textContent = "You WIN!!!";
  modal.appendChild(title);

  const scoreMoves = document.createElement("p");
  scoreMoves.classList.add("modal__score-moves");
  scoreMoves.textContent = `You won in ${movesScore} moves!`;
  modal.appendChild(scoreMoves);

  const modalBtns = document.createElement("div");
  modalBtns.classList.add("modal__buttons");
  modal.appendChild(modalBtns);

  const modalNewGameBtn = document.createElement("button");
  modalNewGameBtn.classList.add("modal__newgame-btn");
  modalNewGameBtn.textContent = "New Game";
  modalBtns.appendChild(modalNewGameBtn);

  const modalCloseBtn = document.createElement("button");
  modalCloseBtn.classList.add("modal__close-btn");
  modalCloseBtn.textContent = "Close";
  modalBtns.appendChild(modalCloseBtn);

  function closeModal() {
    modal.remove();
    overlay.remove();
    document.removeEventListener("keydown", handleEscape);
    document.body.style.overflow = "";
  }
  modalCloseBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  function handleEscape(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }
  document.addEventListener("keydown", handleEscape);

  modalNewGameBtn.addEventListener("click", () => {
    newGameStart();
    closeModal();
  });
}
