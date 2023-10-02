class GameUI {
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  livesPlayer1 = 3;
  livesPlayer2 = 3;

  highScoreText = null;
  scoreTextP2 = null;
  livesTextP1 = null;
  livesTextP2 = null;

  constructor(gameInstance, playerCount) {
    this.gameInstance = gameInstance;
    this.playerCount = playerCount;
    this.highScore = window.localStorage.getItem("MeteorsHiScore") || 0;
    this.createScoresTexts();
    this.createLivesTexts();
  }

  // createHighScoreTexts() {
  //   this.highScoreText = document.createElement("div");
  //   this.highScoreText.id = "score-text";
  //   this.highScoreText.innerHTML = "Score: 0";
  //   this.highScoreText.style.position = "absolute";
  //   if (this.playerCount === 1) {
  //     this.highScoreText.style.width = "100%";
  //     this.highScoreText.style.textAlign = "center";
  //   } else {
  //     this.highScoreText.style.left = "10px";
  //   }
  //   this.highScoreText.style.top = "10px";
  //   this.highScoreText.style.zIndex = 100;
  //   this.highScoreText.style.color = "yellowgreen";
  //   this.highScoreText.style.fontSize = "30px";
  //   this.highScoreText.style.fontFamily = "monospace";
  //   this.highScoreText.style.fontWeight = "bold";
  //   document.body.appendChild(this.highScoreText);

  createScoresTexts() {
    this.highScoreText = document.createElement("div");
    this.highScoreText.id = "score-text";
    this.highScoreText.innerHTML = "Score: 0";
    this.highScoreText.style.position = "absolute";
    if (this.playerCount === 1) {
      this.highScoreText.style.width = "100%";
      this.highScoreText.style.textAlign = "center";
    } else {
      this.highScoreText.style.left = "10px";
    }
    this.highScoreText.style.top = "10px";
    this.highScoreText.style.zIndex = 100;
    this.highScoreText.style.color = "yellowgreen";
    this.highScoreText.style.fontSize = "30px";
    this.highScoreText.style.fontFamily = "monospace";
    this.highScoreText.style.fontWeight = "bold";
    document.body.appendChild(this.highScoreText);

    if (this.playerCount === 1) return;

    this.scoreTextP2 = document.createElement("div");
    this.scoreTextP2.id = "score-text";
    this.scoreTextP2.innerHTML = "Score: 0";
    this.scoreTextP2.style.position = "absolute";
    this.scoreTextP2.style.right = "10px";
    this.scoreTextP2.style.top = "10px";
    this.scoreTextP2.style.zIndex = 100;
    this.scoreTextP2.style.color = "red";
    this.scoreTextP2.style.fontSize = "30px";
    this.scoreTextP2.style.fontFamily = "monospace";
    this.scoreTextP2.style.fontWeight = "bold";
    document.body.appendChild(this.scoreTextP2);
  }

  createLivesTexts() {
    this.livesTextP1 = document.createElement("div");
    this.livesTextP1.id = "life-text";
    this.livesTextP1.innerHTML = "";
    this.livesTextP1.style.position = "absolute";
    if (this.playerCount === 1) {
      this.livesTextP1.style.width = "100%";
      this.livesTextP1.style.textAlign = "center";
    } else {
      this.livesTextP1.style.left = "10px";
    }
    this.livesTextP1.style.top = "50px";
    this.livesTextP1.style.zIndex = 100;
    this.livesTextP1.style.color = "yellowgreen";
    this.livesTextP1.style.fontSize = "30px";
    this.livesTextP1.style.fontFamily = "monospace";
    this.livesTextP1.style.fontWeight = "bold";
    document.body.appendChild(this.livesTextP1);

    if (this.playerCount === 1) return;

    this.livesTextP2 = document.createElement("div");
    this.livesTextP2.id = "life-text";
    this.livesTextP2.innerHTML = "";
    this.livesTextP2.style.position = "absolute";
    this.livesTextP2.style.right = "10px";
    this.livesTextP2.style.top = "50px";
    this.livesTextP2.style.zIndex = 100;
    this.livesTextP2.style.color = "red";
    this.livesTextP2.style.fontSize = "30px";
    this.livesTextP2.style.fontFamily = "monospace";
    this.livesTextP2.style.fontWeight = "bold";
    document.body.appendChild(this.livesTextP2);
  }

  createLevelTextDiv(level) {
    this.levelText = document.createElement("div");
    this.levelText.id = "level-text";
    this.levelText.innerHTML = `Level ${level}`;
    this.levelText.style.position = "absolute";
    this.levelText.style.left = "0px";
    this.levelText.style.top = "50vh";
    this.levelText.style.width = "100%";
    this.levelText.style.zIndex = 201;
    this.levelText.style.color = "white";
    this.levelText.style.fontSize = "50px";
    this.levelText.style.fontFamily = "monospace";
    this.levelText.style.fontWeight = "bold";
    this.levelText.style.textAlign = "center";
    this.levelText.style.verticalAlign = "middle";
    document.body.appendChild(this.levelText);
  }

  setScore(playerIndex, score) {
    if (playerIndex === 0) {
      this.scorePlayer1 = score;
      this.highScoreText.innerHTML = `Score: ${score}`;
    } else {
      this.scorePlayer2 = score;
      this.scoreTextP2.innerHTML = `Score: ${score}`;
    }
  }

  setLives(playerIndex, lives) {
    if (playerIndex === 0) {
      this.livesPlayer1 = lives;
      this.livesTextP1.innerHTML = "";
      for (let i = 0; i < lives; i++) {
        this.livesTextP1.innerHTML += "❤️";
      }
    } else {
      this.livesPlayer2 = lives;
      this.livesTextP2.innerHTML = "";
      for (let i = 0; i < lives; i++) {
        this.livesTextP2.innerHTML += "❤️";
      }
    }
  }

  setLevel(level) {
    this.createLevelTextDiv(level);
    setTimeout(() => {
      document.body.removeChild(this.levelText);
    }, 1000);
  }

  destroy() {
    document.body.removeChild(this.highScoreText);
    document.body.removeChild(this.livesTextP1);
    if (this.playerCount === 1) return;
    document.body.removeChild(this.scoreTextP2);
    document.body.removeChild(this.livesTextP2);
  }
}
