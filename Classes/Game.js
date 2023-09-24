class Game {
  gameObjects = [];
  lastUpdate = Date.now();
  deltaTime = 0;
  scale = 1;

  constructor() {
    Input.initializeKeyboardInputs();
    this.createPlayer1();
    this.createPlayer2();
    this.generateInitialAsteroids("L", 5);
    this.update();
  }

  createPlayer1 = () => {
    const player = new Player(
      this,
      window.innerWidth / 4,
      window.innerHeight / 2,
      0,
      1
    );
    this.gameObjects.push(player);
  };

  createPlayer2 = () => {
    const player2 = new Player(
      this,
      (window.innerWidth / 4) * 3,
      window.innerHeight / 2,
      0,
      2
    );
    this.gameObjects.push(player2);
  };

  generateAsteroidPair = (size, position) => {
    for (let i = 0; i < 2; i++) {
      const asteroid = new Asteroid(this, position.x, position.y, size);
      this.gameObjects.push(asteroid);
    }
  };

  generateInitialAsteroids = (size, num) => {
    for (let i = 0; i < num; i++) {
      const asteroid = new Asteroid(
        this,
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        size
      );
      this.gameObjects.push(asteroid);
    }
  };

  removeGameObject = (gameObject) => {
    this.gameObjects = this.gameObjects.filter(
      (object) => object !== gameObject
    );
  };

  addGameObject = (gameObject) => {
    this.gameObjects.push(gameObject);
  };

  update = () => {
    const now = Date.now();
    this.deltaTime = now - this.lastUpdate;
    this.gameObjects.forEach((object) => object.update(this.deltaTime));
    window.requestAnimationFrame(this.update);
    this.lastUpdate = now;
  };
}
