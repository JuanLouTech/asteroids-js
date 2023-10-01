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
  inmunneTime = 0;
  inmunne = false;
  inmunneDuration = 3000;
  contactPush = 0.5;

  constructor(gameInstance, x, y, rotation, playerIndex = 1) {
    this.playerIndex = playerIndex;
    this.position.x = x;
    this.position.y = y;
    this.rotation = rotation;
    this.createPlayerImage();
    this.gameInstance = gameInstance;
    this.inmunne = true;
    this.engineSound = new AudioPlayer(
      this.gameInstance,
      "./Assets/Sounds/thruster.wav",
      0.0,
      true
    );
    new AudioPlayer(
      gameInstance,
      "./Assets/Sounds/playerAppear.wav",
      0.1,
      false
    );
  }

  createPlayerImage() {
    const image = document.createElement("img");
    image.src =
      this.playerIndex === 0
        ? "./Assets/Images/ship-p1.png"
        : "./Assets/Images/ship-p2.png";
    this.sprite = image;
    image.style.position = "absolute";
    image.style.left = this.x + "px";
    image.style.top = this.y + "px";
    image.style.zIndex = 100;
    image.style.scale = 1;
    image.style.filter = "none";
    image.style.opacity = 0.7;
    image.style.outline = "none";
    image.style.borderRadius = "50%";
    this.createCannon();
    document.body.appendChild(image);

    this.thruster = new Thruster(0, 13, this.rotation, 20, true, this);
    this.thruster.rescale(2);
    this.thruster.play();
    return image;
  }

  getCannonPosition() {
    const cannonPos = new Vector2(this.position.x, this.position.y).add(
      new Vector2(0, -this.sprite.height / 2).rotate(this.rotation)
    );
    return cannonPos;
  }

  createCannon() {
    // this.cannon = document.createElement("img");
    // this.cannon.src = "./Assets/Images/ParticleClear.png";
    // this.cannon.style.position = "relative";
    // this.cannon.style.left = this.sprite.width + "px";
    // this.cannon.style.top = "0px";
    // this.sprite.appendChild(this.cannon);
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
      this.engineSound.setVolume(0.1);
    } else {
      this.acceleration = 0;
      this.engineSound.setVolume(0.0);
    }
    if (Input.pressedKeys[CONTROLS[`${this.playerIndex}`].fire]) {
      this.fire();
    }
    this.thruster.visible =
      Input.pressedKeys[CONTROLS[`${this.playerIndex}`].up];
  }

  fire() {
    if (this.gameInstance.coinHunting) return;
    if (this.timeSinceLastShot < this.CANNON_COOLDOWN) return;
    this.timeSinceLastShot = 0;
    const cannonPos = this.getCannonPosition();
    const bullet = new Bullet(
      this.gameInstance,
      cannonPos.x,
      cannonPos.y,
      this.rotation,
      this.playerIndex
      // this.velVector
    );
    this.gameInstance.gameObjects.push(bullet);
    new AudioPlayer(this.gameInstance, "./Assets/Sounds/shot.wav", 0.3, false);
  }

  makeInmunne() {
    this.inmunne = true;
    this.inmunneTime = 0;
    this.sprite.style.filter = "blur(2px)";
    this.sprite.style.opacity = 0.7;
    this.sprite.style.outline = "2px solid white";
  }

  destroy() {
    this.thruster.destroy();
    this.engineSound.destroy();
    this.sprite?.parentElement?.removeChild(this.sprite);
    this.gameInstance.removeGameObject(this);
  }

  checkCollisions() {
    this.gameInstance.gameObjects.forEach((object) => {
      if (object.type === "asteroid" && !this.inmunne) {
        if (
          this.position.distanceTo(object.position) <
          this.collisionRadius + object.collisionRadius
        ) {
          this.destroy();
          this.gameInstance.playerDestroyed(this.playerIndex, this.position);
          new Explosion(this.gameInstance, this.position.x, this.position.y);
        }
      }
      if (object.type === "coin") {
        if (
          this.position.distanceTo(object.position) <
          this.collisionRadius + object.collisionRadius
        ) {
          object.destroy(this.playerIndex);
          this.gameInstance.coinCollected(this.playerIndex, object.points);
          new AudioPlayer(this, "./Assets/Sounds/coin.wav", 0.5, false);
        }
      }
      if (object.type === "player" && object.playerIndex !== this.playerIndex) {
        if (
          this.position.distanceTo(object.position) <
          this.collisionRadius + object.collisionRadius
        ) {
          object.velVector.add(
            new Vector2(
              object.position.x - this.position.x,
              object.position.y - this.position.y
            )
              .normalize()
              .multiply(this.contactPush)
          );
        }
      }
    });
  }

  deactivateInmunne() {
    this.inmunne = false;
    this.sprite.style.filter = "none";
    this.sprite.style.opacity = 1;
    this.sprite.style.outline = "none";
  }

  update(deltaTime) {
    if (this.inmunne) {
      this.inmunneTime += deltaTime;
      if (this.inmunneTime > this.inmunneDuration) this.deactivateInmunne();
    }
    this.checkCollisions();
    this.timeSinceLastShot += deltaTime;
    this.acceleration = 0;
    this.getInputs();
    this.speed += this.acceleration;
    this.move();
    this.thruster.update(deltaTime);
  }
}
