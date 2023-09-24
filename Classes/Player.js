class Player {
  MAX_SPEED = 8;
  ROTATION_SPEED = 0.02;
  THRUST = 0.08;
  CANNON_COOLDOWN = 600;
  timeSinceLastShot = 300;
  type = "player";
  playerIndex;
  speed = 0;
  acceleration = 0;
  accVector = new Vector2(0, 0);
  velVector = new Vector2(0, 0);
  position = new Vector2(0, 0);
  collisionRadius = 14;
  thruster = null;

  constructor(gameInstance, x, y, rotation, playerIndex = 1) {
    this.playerIndex = playerIndex;
    this.position.x = x;
    this.position.y = y;
    this.rotation = rotation;
    this.createPlayerImage();
    this.gameInstance = gameInstance;
  }

  createPlayerImage() {
    const image = document.createElement("img");
    image.src =
      this.playerIndex === 1
        ? "./Assets/Images/ship-p1.png"
        : "./Assets/Images/ship-p2.png";
    this.sprite = image;
    image.style.position = "absolute";
    image.style.left = this.x + "px";
    image.style.top = this.y + "px";
    image.style.zIndex = 100;
    image.style.scale = 1;
    this.createCannon();
    document.body.appendChild(image);

    this.thruster = new Thruster(0, 13, this.rotation, 20, true, this);
    this.thruster.rescale(2);
    this.thruster.play();
    return image;
  }

  getCannonPosition() {
    const cannonPos = this.position.add(
      new Vector2(0, this.sprite.height).rotate(this.rotation)
    );
  }
  createCannon() {
    this.cannon = document.createElement("img");
    this.cannon.src = "./Assets/Images/ParticleClear.png";
    this.cannon.style.position = "relative";
    this.cannon.style.left = this.sprite.width + "px";
    this.cannon.style.top = "0px";
    this.sprite.appendChild(this.cannon);
  }

  rotate(value) {
    this.rotation += value * this.ROTATION_SPEED;
    this.sprite.style.transform = "rotate(" + this.rotation + "rad)";
  }

  move() {
    this.accVector.angle = this.rotation - Math.PI / 2;
    this.accVector.length = this.acceleration;
    this.velVector.add(this.accVector);
    this.velVector.clampLength(this.MAX_SPEED);
    this.position.add(this.velVector);
    this.position = limitMovement(this.position);
    this.sprite.style.left = this.position.x - this.sprite.width / 2 + "px";
    this.sprite.style.top = this.position.y - this.sprite.height / 2 + "px";
  }

  getInputs() {
    if (Input.pressedKeys[CONTROLS[`${this.playerIndex}`].left]) {
      this.rotate(-2);
    }
    if (Input.pressedKeys[CONTROLS[`${this.playerIndex}`].right]) {
      this.rotate(2);
    }
    if (Input.pressedKeys[CONTROLS[`${this.playerIndex}`].up]) {
      this.acceleration = this.THRUST;
    }
    if (Input.pressedKeys[CONTROLS[`${this.playerIndex}`].fire]) {
      this.fire();
    }
    this.thruster.visible =
      Input.pressedKeys[CONTROLS[`${this.playerIndex}`].up];
  }

  fire() {
    if (this.timeSinceLastShot < this.CANNON_COOLDOWN) return;
    this.timeSinceLastShot = 0;
    const bullet = new Bullet(
      this.gameInstance,
      this.position.x,
      this.position.y,
      this.rotation,
      this.playerIndex
      // this.velVector
    );
    this.gameInstance.gameObjects.push(bullet);
  }

  destroy() {
    new Explosion(this.gameInstance, this.position.x, this.position.y);
    this.thruster.destroy();
    this.gameInstance.removeGameObject(this);
    document.body.removeChild(this.sprite);
  }

  checkCollisions() {
    this.gameInstance.gameObjects.forEach((object) => {
      if (object.type === "asteroid") {
        if (
          this.position.distanceTo(object.position) <
          this.collisionRadius + object.collisionRadius
        ) {
          this.destroy();
          setTimeout(() => {
            if (this.playerIndex === 1) {
              this.gameInstance.createPlayer1();
            } else {
              this.gameInstance.createPlayer2();
            }
          }, 2000);
        }
      }
    });
  }

  update(deltaTime) {
    this.timeSinceLastShot += deltaTime;
    this.checkCollisions();
    this.acceleration = 0;
    this.getInputs();
    this.speed += this.acceleration;
    this.move();
    this.thruster.update(deltaTime);
  }
}
