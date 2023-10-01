class Bullet {
  SPEED = 8;
  LIFE_SPAN = 1500;
  ownerIndex = 0;
  position = new Vector2(0, 0);
  velocity = new Vector2(0, 0);
  collisionRadius = 5;
  type = "bullet";
  gameInstance = null;
  lifeTime = 0;
  initialSpeed = Vector2.ZERO();

  // Direction is a Vector2
  constructor(gameInstance, x, y, angle, playerIndex, initialSpeed) {
    this.ownerIndex = playerIndex;
    this.position.x = x;
    this.position.y = y;
    this.createImage();
    this.velocity = new Vector2(0, -1).rotate(angle).multiply(this.SPEED);
    this.gameInstance = gameInstance;
    this.velocity.add(initialSpeed || Vector2.ZERO());
    // this.assignCollisionRadius();
  }

  //   assignCollisionRadius() {
  //     const smallestSide = Math.max(this.sprite.width, this.sprite.height);
  //     console.log("sprite width: ", this.sprite.clientWidth);
  //     this.collisionRadius = smallestSide / 2;
  //   }

  createImage() {
    const image = document.createElement("img");
    image.src = "./Assets/Images/Bullet.png";
    this.sprite = image;
    image.style.position = "absolute";
    image.style.left = this.x + "px";
    image.style.top = this.y + "px";
    image.style.zIndex = 90;
    if (this.ownerIndex === 1) image.style.filter = "invert(100%)";
    image.style.scale = 1;
    document.body.appendChild(image);
    return image;
  }

  rotate() {
    this.rotation += this.rotationSpeed;
    this.sprite.style.transform = "rotate(" + this.rotation + "rad)";
  }

  move() {
    this.position.add(this.velocity);
    this.position = limitMovement(this.position);
    this.sprite.style.left = this.position.x - this.sprite.width / 2 + "px";
    this.sprite.style.top = this.position.y - this.sprite.height / 2 + "px";
  }

  destroy() {
    this.sprite?.parentElement?.removeChild(this.sprite);
    this.gameInstance.removeGameObject(this);
  }

  checkCollisions() {
    this.gameInstance.gameObjects.forEach((object) => {
      if (object.type === "asteroid") {
        if (
          this.position.distanceTo(object.position) <
          this.collisionRadius + object.collisionRadius
        ) {
          new AudioPlayer(
            this.gameInstance,
            "./Assets/Sounds/explosion.wav",
            0.8,
            false
          );
          object.destroy();
          this.gameInstance.asteroidDestroyed(
            object.points,
            this.ownerIndex,
            object.position
          );
          this.destroy();
        }
      }
    });
  }

  update(deltaTime) {
    this.lifeTime += deltaTime;
    if (this.lifeTime > this.LIFE_SPAN) {
      this.destroy();
    }
    this.move();
    this.checkCollisions();
    this.rotate();
  }
}
