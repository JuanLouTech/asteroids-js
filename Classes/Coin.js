class Coin {
  collisionRadius = 16;
  type = "coin";
  points = 100;
  position = new Vector2(0, 0);
  breathingEffectSpeed = 2;
  lifetime = 0;
  scale = 1;

  constructor(gameInstance, x, y) {
    this.position.x = x;
    this.position.y = y;
    this.gameInstance = gameInstance;
    this.scale *= gameInstance.scale;
    this.collisionRadius *= gameInstance.scale;
    this.createImage();
  }

  createImage() {
    const image = document.createElement("img");
    image.src = "./Assets/Images/Coin.png";
    this.sprite = image;
    image.style.position = "absolute";
    image.style.left = this.position.x - this.collisionRadius / 2 + "px";
    image.style.top = this.position.y - this.collisionRadius / 2 + "px";
    image.style.zIndex = 98;
    this.scale = this.gameInstance.scale * 2;
    image.style.scale = this.scale;
    document.body.appendChild(image);
    return image;
  }

  destroy() {
    this.sprite?.parentElement?.removeChild(this.sprite);
    this.gameInstance.removeGameObject(this);
  }

  updateBreathEffect() {
    this.sprite.style.scale =
      (2 * this.scale) / 3 +
      (Math.abs(Math.sin(this.lifetime * this.breathingEffectSpeed)) *
        this.scale) /
        3;
  }

  update(deltaTime) {
    this.lifetime += deltaTime;
    this.updateBreathEffect();
  }
}
