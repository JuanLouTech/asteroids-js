class PauseScreen {
  focussedButtonIndex = 0;
  buttons = [];
  buttonBackground = "rgba(1, 0, 1, 0.0)";
  scale = 1;
  constructor(gameInstance) {
    this.gameInstance = gameInstance;
    this.scale *= gameInstance.scale;
    this.createTitleDiv();
    this.createButtons();
    new AudioPlayer(
      this.gameInstance,
      "./Assets/Sounds/gameStart.wav",
      0.6,
      false
    );
  }

  createTitleDiv() {
    this.titleDiv = document.createElement("div");
    this.titleDiv.id = "game-over-text";
    this.titleDiv.innerHTML = "Paused";
    this.titleDiv.style.position = "absolute";
    this.titleDiv.style.left = "0px";
    this.titleDiv.style.top = "0px";
    this.titleDiv.style.width = "100%";
    this.titleDiv.style.height = "100%";
    this.titleDiv.style.zIndex = 200;
    this.titleDiv.style.color = "white";
    this.titleDiv.style.fontSize = `${100 * this.scale}px`;
    this.titleDiv.style.fontFamily = "monospace";
    this.titleDiv.style.fontWeight = "bold";
    this.titleDiv.style.textAlign = "center";
    this.titleDiv.style.lineHeight = "100vh";
    this.titleDiv.style.backgroundColor = `rgba(0, 0, 0, 0.7)`;
    document.body.appendChild(this.titleDiv);
  }

  createButtons() {
    const menuButton = document.createElement("button");
    menuButton.innerHTML = "Main Menu";
    menuButton.style.position = "absolute";
    menuButton.style.left = "35%";
    menuButton.style.top = "70%";
    menuButton.style.width = "10%";
    menuButton.style.height = `${50 * this.scale}px`;
    menuButton.style.zIndex = 201;
    menuButton.style.color = "white";
    menuButton.style.fontSize = `${30 * this.scale}px`;
    menuButton.style.fontFamily = "monospace";
    menuButton.style.fontWeight = "bold";
    menuButton.style.textAlign = "center";
    menuButton.style.borderRadius = `${10 * this.scale}px`;
    menuButton.style.backgroundColor = this.buttonBackground;
    menuButton.style.border = `${2 * this.scale}px solid white`;
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

    const resumeButton = document.createElement("button");
    resumeButton.innerHTML = "Resume";
    resumeButton.style.position = "absolute";
    resumeButton.style.left = "55%";
    resumeButton.style.top = "70%";
    resumeButton.style.width = "10%";
    resumeButton.style.height = `${50 * this.scale}px`;
    resumeButton.style.zIndex = 201;
    resumeButton.style.color = "white";
    resumeButton.style.fontSize = `${30 * this.scale}px`;
    resumeButton.style.fontFamily = "monospace";
    resumeButton.style.fontWeight = "bold";
    resumeButton.style.textAlign = "center";
    resumeButton.style.borderRadius = `${10 * this.scale}px`;
    resumeButton.style.backgroundColor = this.buttonBackground;
    resumeButton.style.border = `${2 * this.scale}px solid white`;
    resumeButton.style.cursor = "pointer";
    resumeButton.addEventListener("mousedown", (e) => {
      this.gameInstance.resume();
      new AudioPlayer(
        this.gameInstance,
        "./Assets/Sounds/click5.ogg",
        1,
        false
      );
    });
    document.body.appendChild(resumeButton);
    this.buttons.push(resumeButton);
  }

  destroy() {
    if (this.titleDiv?.parentElement)
      this.titleDiv.parentElement.removeChild(this.titleDiv);
    this.buttons.forEach((button) => {
      document.body.removeChild(button);
    });
  }
}
