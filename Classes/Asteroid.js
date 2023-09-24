class Asteroid {
  MAX_SPEED = 2;
  MIN_SPEED = 0.8;
  rotationSpeed = 0.02;
  speed = 0;
  rotation = 0;
  direction = new Vector2(0, 0);
  position = new Vector2(0, 0);
  velocity = new Vector2(0, 0);
  points = 0;
  collisionRadius = 0;
  type = "asteroid";
  gameInstance = null;

  // SIZE MUST BE "L", "M" or "S"
  constructor(gameInstance, x, y, size) {
    this.gameInstance = gameInstance;
    this.size = size;
    this.direction = Vector2.RandomDirection();
    this.position.x = x;
    this.position.y = y;
    this.rotation = Math.random() * 2 * Math.PI - Math.PI;
    this.rotationSpeed = Math.random() * 0.05 - 0.025;
    this.speed =
      Math.random() * (this.MAX_SPEED - this.MIN_SPEED) + this.MIN_SPEED;
    this.createImage();
    this.velocity = this.direction.multiply(this.speed);
    // this.assignCollisionRadius();
    this.assignPointsWithSize(size);
  }

  assignPointsWithSize(size) {
    switch (size) {
      case "L":
        this.collisionRadius = 30 * this.gameInstance.scale;
        this.points = 20;
        break;
      case "M":
        this.collisionRadius = 14 * this.gameInstance.scale;
        this.points = 50;
        break;
      case "S":
        this.points = 100;
        this.collisionRadius = 4 * this.gameInstance.scale;
        break;
      default:
        this.points = 0;
        break;
    }
  }

  assignImageWithSize(size) {
    switch (size) {
      case "L":
        return "./Assets/Images/AsteroidL.png";
      case "M":
        return "./Assets/Images/AsteroidM.png";
      case "S":
        return "./Assets/Images/AsteroidS.png";
      default:
        return "./Assets/Images/AsteroidL.png";
    }
  }

  //   assignCollisionRadius() {
  //     const smallestSide = Math.max(this.sprite.width, this.sprite.height);
  //     this.collisionRadius = smallestSide / 2;
  //   }

  createImage() {
    const image = document.createElement("img");
    image.src = this.assignImageWithSize(this.size);
    this.sprite = image;
    image.style.position = "absolute";
    image.style.left = this.x + "px";
    image.style.top = this.y + "px";
    image.style.zIndex = 95;
    image.style.scale = this.gameInstance.scale;
    document.body.appendChild(image);
    return image;
  }

  rotate() {
    this.rotation += this.rotationSpeed;
    this.sprite.style.transform = "rotate(" + this.rotation + "rad)";
  }

  destroy() {
    if (this.size !== "S")
      this.gameInstance.generateAsteroidPair(
        this.size === "L" ? "M" : "S",
        this.position
      );
    document.body.removeChild(this.sprite);
    this.gameInstance.removeGameObject(this);
    if (this.size !== "S") return;
  }

  move() {
    this.position.add(this.velocity);
    this.position = limitMovement(this.position);
    this.sprite.style.left = this.position.x - this.sprite.width / 2 + "px";
    this.sprite.style.top = this.position.y - this.sprite.height / 2 + "px";
  }

  update(deltaTime) {
    this.move();
    this.rotate();
  }
}
