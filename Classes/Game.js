class Game {
  gameObjects = [];
  lastUpdate = Date.now();
  deltaTime = 0;
  scale = 1;
  lives = [3, 3];
  scores = [0, 0];
  gameOverScreen = null;
  menuScreen = null;
  level = 0;
  playerCount = 1;
  paused = false;
  pauseScreen = null;
  coinHunting = false;

  constructor() {
    Input.initializeKeyboardInputs();
    this.update();
    this.menuScreen = new MenuScreen(this);
  }

  /*
  ----------------------------------------------------------------------------------------------------
   MENUS AND GAME LOOP 
  ----------------------------------------------------------------------------------------------------
  */
  mainMenu = () => {
    this.paused = false;
    this.coinHunting = false;
    this.removeAllObjects();
    this.removeAllScreens();
    this.menuScreen = new MenuScreen(this);
  };

  toggleGameMode = () => {
    this.coinHunting = !this.coinHunting;
    this.menuScreen.setGameMode(this.coinHunting ? "Coin Hunting" : "Classic");
  };

  startGame = (playerCount) => {
    this.playerCount = playerCount;
    this.removeAllObjects();
    this.removeAllScreens();
    this.removeAllImages();
    this.level = 0;
    this.scores = [0, 0];
    this.lives = [3, 3];
    this.UI = new GameUI(this, playerCount);
    this.createPlayer1();
    if (playerCount === 2) this.createPlayer2();
    this.generateInitialAsteroids("L", 2);
    if (this.coinHunting) this.spawnCoins();
  };

  gameOver = () => {
    this.removeAllScreens();
    this.gameOverScreen = new GameOverScreen(
      this,
      this.scores,
      this.playerCount
    );
  };

  pause() {
    if (this.paused || this.menuScreen || this.gameOverScreen) return;
    this.paused = true;
    this.pauseScreen = new PauseScreen(this);
  }

  resume() {
    if (this.pauseScreen) this.pauseScreen.destroy();
    this.paused = false;
  }

  update = () => {
    Input.update();
    if (
      Input.pressedKeys[KEY_CONTROLS.pause] ||
      Input.pressedButtons[0].pause ||
      Input.pressedButtons[1].pause
    )
      this.pause();
    const now = Date.now();
    this.deltaTime = (now - this.lastUpdate) / 1000;
    if (!this.paused)
      this.gameObjects.forEach((object) => object.update(this.deltaTime));
    window.requestAnimationFrame(this.update);
    this.lastUpdate = now;
  };

  /*
  ----------------------------------------------------------------------------------------------------
   OBJECTS
  ----------------------------------------------------------------------------------------------------
  */

  // PLAYERS CREATION --------------------------------------------------------------------------------
  createPlayer1 = () => {
    this.UI.setLives(0, this.lives[0]);
    const xPosition =
      this.playerCount === 2 ? window.innerWidth / 4 : window.innerWidth / 2;
    setTimeout(() => {
      const player1 = new Player(this, xPosition, window.innerHeight / 2, 0, 0);
      player1.makeInmunne();
      this.gameObjects.push(player1);
    }, 2000);
  };

  createPlayer2 = () => {
    this.UI.setLives(1, this.lives[1]);
    setTimeout(() => {
      const player2 = new Player(
        this,
        (window.innerWidth / 4) * 3,
        window.innerHeight / 2,
        0,
        1
      );
      player2.makeInmunne();
      this.gameObjects.push(player2);
    }, 2000);
  };

  // ASTEROIDS CREATION ------------------------------------------------------------------------------
  generateAsteroidPair = (size, position) => {
    for (let i = 0; i < 2; i++) {
      const asteroid = new Asteroid(this, position.x, position.y, size);
      this.gameObjects.push(asteroid);
    }
  };

  generateInitialAsteroids = (size, num, splitAfterDestroy = true) => {
    this.gameObjects.forEach((object) => {
      if (object.type === "asteroid") object.destroy(splitAfterDestroy);
    });
    new AudioPlayer(this, "./Assets/Sounds/levelUp.wav", 0.5, false);
    this.level += 1;
    this.UI.setLevel(this.level);
    for (let i = 0; i < num; i++) {
      const asteroid = new Asteroid(
        this,
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        size
      );
      this.gameObjects.push(asteroid);
    }
    this.gameObjects.forEach((object) => {
      if (object.type === "player") object.makeInmunne();
    });
  };

  // COIN CREATION -----------------------------------------------------------------------------------
  spawnCoins = () => {
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const coin = new Coin(this, x, y);
      this.gameObjects.push(coin);
    }
  };

  // EXPLOSIONS AND PARTICLE CREATION ----------------------------------------------------------------
  createSmokeParticles(position) {
    const particles = new Particles(
      this,
      position.x,
      position.y,
      3,
      20,
      true,
      null,
      360,
      65,
      0.001,
      "./Assets/Images/ParticleClear.png",
      0.5
    );

    this.addGameObject(particles);
  }

  createShipExplotion(position) {
    this.createSmokeParticles(position);
  }

  // OBJECT INTERACTIONS -----------------------------------------------------------------------------
  asteroidDestroyed(points, destructorPlayerIndex, position) {
    this.scores[destructorPlayerIndex] += points;
    this.UI.setScore(destructorPlayerIndex, this.scores[destructorPlayerIndex]);
    this.createSmokeParticles(position);
    if (!this.gameObjects.find((object) => object.type === "asteroid"))
      this.generateInitialAsteroids("L", this.level * 2);
  }

  coinCollected = (playerIndex, points) => {
    this.scores[playerIndex] += points;
    this.UI.setScore(playerIndex, this.scores[playerIndex]);
    if (!this.gameObjects.find((object) => object.type === "coin")) {
      this.spawnCoins();
      const size = this.level < 3 ? "L" : "M";
      this.generateInitialAsteroids(size, this.level * 3, false);
    }
  };

  addGameObject = (gameObject) => {
    this.gameObjects.push(gameObject);
  };

  playerDestroyed(playerIndex, position) {
    this.lives[playerIndex]--;
    if (
      (this.playerCount === 1 && this.lives[0] === -1) ||
      (this.playerCount === 2 && (this.lives[0] === -1 || this.lives[1] === -1))
    ) {
      this.gameOver();
      this.createShipExplotion(position);
      return;
    }
    if (this.lives[playerIndex] > -1) {
      if (playerIndex === 0) this.createPlayer1();
      else this.createPlayer2();
    }
    this.createShipExplotion(position);
  }

  /*
  ----------------------------------------------------------------------------------------------------
    ELEMENTS AND OBJECTS CLEANUP
  ----------------------------------------------------------------------------------------------------
  */
  removeGameObject = (gameObject) => {
    this.gameObjects = this.gameObjects.filter(
      (object) => object !== gameObject
    );
  };

  removeAllScreens() {
    if (this.pauseScreen) {
      this.pauseScreen.destroy();
      this.pauseScreen = null;
      this.paused = false;
    }
    if (this.menuScreen) {
      this.menuScreen.destroy();
      this.menuScreen = null;
    }
    if (this.gameOverScreen) {
      this.gameOverScreen.destroy();
      this.gameOverScreen = null;
    }
    if (this.UI) {
      this.UI.destroy();
      this.UI = null;
    }
  }

  removeAllObjects() {
    this.gameObjects.forEach((object) => object.destroy());
    this.gameObjects = [];
  }

  removeAllImages() {
    const images = document.querySelectorAll("img");
    images.forEach((image) => image.parentElement.removeChild(image));
  }
}
