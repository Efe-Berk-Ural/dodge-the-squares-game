const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");

let score = 0;
let gameInterval;
let enemyInterval;
let isGameOver = false;

// Oyuncu hareketi
document.addEventListener("keydown", (e) => {
  if (isGameOver) return;
  const left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
  if (e.key === "ArrowLeft" && left > 0) {
    player.style.left = left - 20 + "px";
  }
  if (e.key === "ArrowRight" && left < 360) {
    player.style.left = left + 20 + "px";
  }
});

// Kare üretme
function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = Math.floor(Math.random() * 10) * 40 + "px";
  game.appendChild(enemy);

  let enemyFall = setInterval(() => {
    const top = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));
    if (top >= 560) {
      clearInterval(enemyFall);
      game.removeChild(enemy);
      score++;
      scoreDisplay.innerText = "Score: " + score;
    } else {
      enemy.style.top = top + 5 + "px";
    }

    // Çarpışma kontrol
    const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    const enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
    if (
      top > 520 &&
      enemyLeft === playerLeft
    ) {
      clearInterval(enemyFall);
      endGame();
    }
  }, 30);
}

// Oyun bitirme
function endGame() {
  isGameOver = true;
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  gameOverText.classList.remove("hidden");
}

// Başlat
enemyInterval = setInterval(createEnemy, 1000);
