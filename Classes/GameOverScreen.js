class GameOverScreen {
  focussedButtonIndex = 0;
  buttons = [];
  buttonBackground = "rgba(1, 0, 1, 0.0)";
  constructor(gameInstance, scores, playerCount) {
    this.playerCount = playerCount;
    this.gameInstance = gameInstance;
    const isHighScore = this.getIsHighScore(scores);
    this.createGameOverTextDiv();
    this.createResultsTextDiv(scores, isHighScore);
    this.createWinnerTextDiv(scores);
    this.createButtons();
  }

  getIsHighScore(scores) {
    const mode = this.gameInstance.coinHunting ? "-Hunting" : "-Classic";
    const hiScore = localStorage.getItem(`hiScore${mode}`) || 0;
    if (scores[0] > hiScore) {
      localStorage.setItem(`hiScore${mode}`, scores[0]);
      return true;
    }
    return false;
  }

  createGameOverTextDiv() {
    this.gameOverText = document.createElement("div");
    this.gameOverText.id = "game-over-text";
    this.gameOverText.innerHTML = "GAME OVER";
    this.gameOverText.style.position = "absolute";
    this.gameOverText.style.left = "0px";
    this.gameOverText.style.top = "0px";
    this.gameOverText.style.width = "100%";
    this.gameOverText.style.height = "100%";
    this.gameOverText.style.zIndex = 200;
    this.gameOverText.style.color = "white";
    this.gameOverText.style.fontSize = "50px";
    this.gameOverText.style.fontFamily = "monospace";
    this.gameOverText.style.fontWeight = "bold";
    this.gameOverText.style.textAlign = "center";
    this.gameOverText.style.lineHeight = "90vh";
    this.gameOverText.style.backgroundColor = `rgba(0, 0, 0, 0.7)`;
    document.body.appendChild(this.gameOverText);
  }

  createButtons() {
    const menuButton = document.createElement("button");
    menuButton.innerHTML = "Menu";
    menuButton.style.position = "absolute";
    menuButton.style.left = "35%";
    menuButton.style.top = "70%";
    menuButton.style.width = "10%";
    menuButton.style.height = "50px";
    menuButton.style.zIndex = 201;
    menuButton.style.color = "white";
    menuButton.style.fontSize = "30px";
    menuButton.style.fontFamily = "monospace";
    menuButton.style.fontWeight = "bold";
    menuButton.style.textAlign = "center";
    menuButton.style.borderRadius = "10px";
    menuButton.style.backgroundColor = this.buttonBackground;
    menuButton.style.border = "2px solid white";
    menuButton.style.cursor = "pointer";
    menuButton.addEventListener("mousedown", (e) => {
      this.gameInstance.mainMenu();
      new AudioPlayer(
        this.gameInstance,
        "./Assets/Sounds/click5.ogg",
        1,
        false
      );
    });
    document.body.appendChild(menuButton);
    this.buttons.push(menuButton);

    const replayButton = document.createElement("button");
    replayButton.innerHTML = "Retry";
    replayButton.style.position = "absolute";
    replayButton.style.left = "55%";
    replayButton.style.top = "70%";
    replayButton.style.width = "10%";
    replayButton.style.height = "50px";
    replayButton.style.zIndex = 201;
    replayButton.style.color = "white";
    replayButton.style.fontSize = "30px";
    replayButton.style.fontFamily = "monospace";
    replayButton.style.fontWeight = "bold";
    replayButton.style.textAlign = "center";
    replayButton.style.borderRadius = "10px";
    replayButton.style.backgroundColor = this.buttonBackground;
    replayButton.style.border = "2px solid white";
    replayButton.style.cursor = "pointer";
    replayButton.addEventListener("mousedown", (e) => {
      this.gameInstance.startGame(this.playerCount);
      new AudioPlayer(
        this.gameInstance,
        "./Assets/Sounds/click5.ogg",
        1,
        false
      );
    });
    document.body.appendChild(replayButton);
    this.buttons.push(replayButton);
  }

  createResultsTextDiv(scores, isHighScore) {
    const resultsText =
      this.playerCount == 2 ? scores[0] + " - " + scores[1] : scores[0];
    this.resultsText = document.createElement("div");
    this.resultsText.id = "results-text";
    this.resultsText.innerHTML =
      resultsText +
      (this.playerCount === 1 && isHighScore ? " NEW HIGH SCORE!" : "");
    this.resultsText.style.position = "absolute";
    this.resultsText.style.left = "0px";
    this.resultsText.style.top = "50vh";
    this.resultsText.style.width = "100%";
    this.resultsText.style.zIndex = 201;
    this.resultsText.style.color = isHighScore ? "yellowGreen" : "white";
    this.resultsText.style.fontSize = "50px";
    this.resultsText.style.fontFamily = "monospace";
    this.resultsText.style.fontWeight = "bold";
    this.resultsText.style.textAlign = "center";
    this.resultsText.style.verticalAlign = "middle";
    document.body.appendChild(this.resultsText);
  }

  createWinnerTextDiv(scores) {
    const text = this.playerCount === 2 ? this.winnerText(scores) : "";
    this.winnerText = document.createElement("div");
    this.winnerText.id = "winner-text";
    this.winnerText.innerHTML = text;
    this.winnerText.style.position = "absolute";
    this.winnerText.style.left = "0px";
    this.winnerText.style.top = "60vh";
    this.winnerText.style.width = "100%";
    this.winnerText.style.zIndex = 201;
    this.winnerText.style.color =
      scores[0] === scores[1]
        ? "yellow"
        : scores[0] > scores[1]
        ? "yellowGreen"
        : "red";
    this.winnerText.style.fontSize = "50px";
    this.winnerText.style.fontFamily = "monospace";
    this.winnerText.style.fontWeight = "bold";
    this.winnerText.style.textAlign = "center";
    this.winnerText.style.verticalAlign = "middle";
    document.body.appendChild(this.winnerText);
  }

  winnerText(scores) {
    const p1Score = scores[0];
    const p2Score = scores[1];
    if (p1Score > p2Score) {
      return "Green wins!";
    } else if (p1Score < p2Score) {
      return "Red wins!";
    } else {
      return "It's a tie!";
    }
  }

  destroy() {
    if (this.gameOverText)
      this.gameOverText.parentElement.removeChild(this.gameOverText);
    if (this.resultsText)
      this.resultsText.parentElement.removeChild(this.resultsText);
    if (this.winnerText)
      this.winnerText.parentElement.removeChild(this.winnerText);
    this.buttons.forEach((button) => {
      button.parentElement.removeChild(button);
    });
  }
}
