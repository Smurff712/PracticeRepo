const colors = [
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "pink",
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "pink",
];
let cards = shuffle(colors.concat(colors));  // Duplicate colors for pairs
let selectedCards = [];  // Currently selected cards
let score = 0;
let timeLeft = 30;
let gameInterval;  // Timer interval

const startbtn = document.getElementById("startbtn");
const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

startbtn.addEventListener("click", startGame);

function generateCards() {
  for (const color of cards) {
    const card = document.createElement("div");
    card.classList.add("card");  // Add card class for styling
    card.dataset.color = color;  // Store color in data attribute
    card.textContent = "?";  // Hide color initially
    gameContainer.appendChild(card);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  
    const j = Math.floor(Math.random() * (i + 1));  // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  }
  return array;  // Return shuffled array
}

function handleCardClick(event) {  
  const card = event.target;  // Get clicked card
  if (!card.classList.contains("card") || card.classList.contains("matched")) {  // Ignore clicks on non-cards or matched cards
    return;  // Exit function
  }
  card.textContent = card.dataset.color;  // Reveal color
  card.style.backgroundColor = card.dataset.color;  // Set background color
  selectedCards.push(card);  // Add to selected cards
  if (selectedCards.length === 2) {  // Check for match when two cards are selected
    setTimeout(checkMatch, 500);  // Delay to allow player to see second card
  }
}

function checkMatch() {  
  const [card1, card2] = selectedCards;
  if (card1.dataset.color === card2.dataset.color) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    score += 2;
    scoreElement.textContent = `Score: ${score}`;
  } else {
    card1.textContent = "?";
    card2.textContent = "?";
    card1.style.backgroundColor = "#ddd";
    card2.style.backgroundColor = "#ddd";
  }
  selectedCards = [];
}

function startGame() {
  clearInterval(gameInterval); // stop any old timer
  timeLeft = 30;
  startbtn.disabled = true;  // Disable start button during game
  score = 0; // Reset score to zero
  scoreElement.textContent = `Score: ${score}`;
  startGameTimer();  // Start the game timer
  cards = shuffle(colors.concat(colors));  // Reshuffle cards
  selectedCards = [];  // Clear selected cards
  gameContainer.innerHTML = "";  // Clear previous cards
  generateCards();  // Generate new cards
  gameContainer.addEventListener("click", handleCardClick);  
}

function startGameTimer() {
  timerElement.textContent = `Time Left: ${timeLeft}`;
  gameInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(gameInterval);
      alert("Game Over!");
      startbtn.disabled = false;  // Re-enable start button
    }
  }, 1000);
}
