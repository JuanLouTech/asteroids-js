class MenuScreen {
  focussedButtonIndex = 0;
  buttons = [];
  buttonBackground = "rgba(1, 0, 1, 0.0)";
  constructor(gameInstance) {
    this.gameInstance = gameInstance;
    this.createTitleDiv();
    this.createGameModeTextDiv();
    this.createSubDescriptionTextDiv();
    this.createButtons();
  }

  createTitleDiv() {
    this.titleDiv = document.createElement("div");
    this.titleDiv.id = "game-over-text";
    this.titleDiv.innerHTML = "METEORS";
    this.titleDiv.style.position = "absolute";
    this.titleDiv.style.left = "0px";
    this.titleDiv.style.top = "0px";
    this.titleDiv.style.width = "100%";
    this.titleDiv.style.height = "100%";
    this.titleDiv.style.zIndex = 200;
    this.titleDiv.style.color = "white";
    this.titleDiv.style.fontSize = "100px";
    this.titleDiv.style.fontFamily = "monospace";
    this.titleDiv.style.fontWeight = "bold";
    this.titleDiv.style.textAlign = "center";
    this.titleDiv.style.lineHeight = "90vh";
    this.titleDiv.style.backgroundColor = `rgba(0, 0, 0, 0.7)`;
    document.body.appendChild(this.titleDiv);
  }

  createButtons() {
    const start1PButton = document.createElement("button");
    start1PButton.innerHTML = "1 Player";
    start1PButton.style.position = "absolute";
    start1PButton.style.left = "35%";
    start1PButton.style.top = "70%";
    start1PButton.style.width = "10%";
    start1PButton.style.height = "50px";
    start1PButton.style.zIndex = 201;
    start1PButton.style.color = "white";
    start1PButton.style.fontSize = "30px";
    start1PButton.style.fontFamily = "monospace";
    start1PButton.style.fontWeight = "bold";
    start1PButton.style.textAlign = "center";
    start1PButton.style.borderRadius = "10px";
    start1PButton.style.backgroundColor = this.buttonBackground;
    start1PButton.style.border = "2px solid white";
    start1PButton.style.cursor = "pointer";
    start1PButton.addEventListener("mousedown", (e) => {
      this.gameInstance.startGame(1);
      new AudioPlayer(
        this.gameInstance,
        "./Assets/Sounds/click5.ogg",
        1,
        false
      );
    });
    document.body.appendChild(start1PButton);
    this.buttons.push(start1PButton);

    const gameModeButton = document.createElement("button");
    gameModeButton.innerHTML = "Game Mode";
    gameModeButton.style.position = "absolute";
    gameModeButton.style.left = "45%";
    gameModeButton.style.top = "60%";
    gameModeButton.style.width = "10%";
    gameModeButton.style.height = "50px";
    gameModeButton.style.zIndex = 201;
    gameModeButton.style.color = "white";
    gameModeButton.style.fontSize = "30px";
    gameModeButton.style.fontFamily = "monospace";
    gameModeButton.style.fontWeight = "bold";
    gameModeButton.style.textAlign = "center";
    gameModeButton.style.borderRadius = "10px";
    gameModeButton.style.backgroundColor = this.buttonBackground;
    gameModeButton.style.border = "2px solid white";
    gameModeButton.style.cursor = "pointer";
    gameModeButton.addEventListener("mousedown", (e) => {
      this.gameInstance.toggleGameMode();
      new AudioPlayer(
        this.gameInstance,
        "./Assets/Sounds/click5.ogg",
        1,
        false
      );
    });
    document.body.appendChild(gameModeButton);
    this.buttons.push(gameModeButton);

    const start2PButton = document.createElement("button");
    start2PButton.innerHTML = "2 Players";
    start2PButton.style.position = "absolute";
    start2PButton.style.left = "55%";
    start2PButton.style.top = "70%";
    start2PButton.style.width = "10%";
    start2PButton.style.height = "50px";
    start2PButton.style.zIndex = 201;
    start2PButton.style.color = "white";
    start2PButton.style.fontSize = "30px";
    start2PButton.style.fontFamily = "monospace";
    start2PButton.style.fontWeight = "bold";
    start2PButton.style.textAlign = "center";
    start2PButton.style.borderRadius = "10px";
    start2PButton.style.backgroundColor = this.buttonBackground;
    start2PButton.style.border = "2px solid white";
    start2PButton.style.cursor = "pointer";
    start2PButton.addEventListener("mousedown", (e) => {
      this.gameInstance.startGame(2);
      new AudioPlayer(
        this.gameInstance,
        "./Assets/Sounds/click5.ogg",
        1,
        false
      );
    });
    document.body.appendChild(start2PButton);
    this.buttons.push(start2PButton);
  }

  createGameModeTextDiv() {
    this.gameModeDiv = document.createElement("div");
    this.gameModeDiv.id = "results-text";
    this.gameModeDiv.innerHTML = "A new take on a classic";
    this.gameModeDiv.style.position = "absolute";
    this.gameModeDiv.style.left = "0px";
    this.gameModeDiv.style.top = "50vh";
    this.gameModeDiv.style.width = "100%";
    this.gameModeDiv.style.zIndex = 201;
    this.gameModeDiv.style.color = "white";
    this.gameModeDiv.style.fontSize = "50px";
    this.gameModeDiv.style.fontFamily = "monospace";
    this.gameModeDiv.style.fontWeight = "bold";
    this.gameModeDiv.style.textAlign = "center";
    this.gameModeDiv.style.verticalAlign = "middle";
    document.body.appendChild(this.gameModeDiv);
  }

  createSubDescriptionTextDiv(scores) {
    const text = "";
    this.winnerText = document.createElement("div");
    this.winnerText.id = "winner-text";
    this.winnerText.innerHTML = text;
    this.winnerText.style.position = "absolute";
    this.winnerText.style.left = "0px";
    this.winnerText.style.top = "60vh";
    this.winnerText.style.width = "100%";
    this.winnerText.style.zIndex = 201;
    this.winnerText.style.color = "white";
    this.winnerText.style.fontSize = "50px";
    this.winnerText.style.fontFamily = "monospace";
    this.winnerText.style.fontWeight = "bold";
    this.winnerText.style.textAlign = "center";
    this.winnerText.style.verticalAlign = "middle";
    document.body.appendChild(this.winnerText);
  }

  setGameMode(gameMode) {
    this.gameModeDiv.innerHTML = gameMode;
  }

  destroy() {
    if (this.titleDiv) this.titleDiv.parentElement.removeChild(this.titleDiv);
    if (this.gameModeDiv)
      this.gameModeDiv.parentElement.removeChild(this.gameModeDiv);
    if (this.winnerText)
      this.winnerText.parentElement.removeChild(this.winnerText);
    this.buttons.forEach((button) => {
      button.parentElement.removeChild(button);
    });
  }
}
