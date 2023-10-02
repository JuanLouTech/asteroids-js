class Asteroid {
  MAX_SPEED = 200;
  MIN_SPEED = 80;
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
  scale = 1.5;
  duplicatePosition = new Vector2(0, 0);

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
    this.createDuplicate();
    this.velocity = this.direction.multiply(this.speed);
    // this.assignCollisionRadius();
    this.assignPointsWithSize(size);
  }

  assignPointsWithSize(size) {
    switch (size) {
      case "L":
        this.collisionRadius = 32 * this.scale;
        this.points = 20;
        break;
      case "M":
        this.collisionRadius = 16 * this.scale;
        this.points = 50;
        break;
      case "S":
        this.points = 100;
        this.collisionRadius = 8 * this.scale;
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
        return "./Assets/Images/AsteroidM.png";
      default:
        return "./Assets/Images/AsteroidL.png";
    }
  }

  createImage() {
    const image = document.createElement("img");
    image.src = this.assignImageWithSize(this.size);
    this.sprite = image;
    image.style.position = "absolute";
    image.style.left = this.x + "px";
    image.style.top = this.y + "px";
    image.style.zIndex = 95;
    image.style.scale = this.size === "S" ? this.scale * 0.5 : this.scale; //this.gameInstance.scale;
    document.body.appendChild(image);
    return image;
  }

  createDuplicate() {
    const image = document.createElement("img");
    image.src = this.assignImageWithSize(this.size);
    image.style.position = "absolute";
    image.style.left = this.x + "px";
    image.style.top = this.y + "px";
    image.style.zIndex = 94;
    image.style.scale = this.size === "S" ? this.scale * 0.5 : this.scale; //this.gameInstance.scale;
    document.body.appendChild(image);
    this.duplicate = image;
  }

  rotate() {
    this.rotation += this.rotationSpeed;
    this.sprite.style.transform = "rotate(" + this.rotation + "rad)";
    this.duplicate.style.transform = "rotate(" + this.rotation + "rad)";
  }

  destroy(splitAfterDestroy = true) {
    this.gameInstance.removeGameObject(this);
    if (this.size !== "S" && splitAfterDestroy)
      this.gameInstance.generateAsteroidPair(
        this.size === "L" ? "M" : "S",
        this.position
      );
    this.sprite?.parentElement?.removeChild(this.sprite);
    this.duplicate?.parentElement?.removeChild(this.duplicate);
  }

  move(deltaTime) {
    this.position.add(this.velocity.clone().multiply(deltaTime));
    const positions = getCorrectedPositions(
      this.position,
      this.collisionRadius
    );
    this.position = positions.position;
    // MOVE SPRITE
    this.sprite.style.left = this.position.x - this.sprite.width / 2 + "px";
    this.sprite.style.top = this.position.y - this.sprite.height / 2 + "px";
    // MOVE DUPLICATE
    this.duplicatePosition = positions.duplicatePosition;
    if (
      positions.position.x !== positions.duplicatePosition.x &&
      positions.position.y !== positions.duplicatePosition.y
    ) {
      this.duplicate.style.opacity = 1;
      this.duplicate.style.left =
        this.duplicatePosition.x - this.sprite.width / 2 + "px";
      this.duplicate.style.top =
        this.duplicatePosition.y - this.sprite.height / 2 + "px";
      return;
    }
    this.duplicate.style.opacity = 0;
  }

  update(deltaTime) {
    this.move(deltaTime);
    this.rotate();
  }
}
