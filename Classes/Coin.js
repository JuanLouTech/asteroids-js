class Coin {
  collisionRadius = 16;
  type = "coin";
  points = 100;
  position = new Vector2(0, 0);
  constructor(gameInstance, x, y) {
    this.position.x = x;
    this.position.y = y;
    this.gameInstance = gameInstance;
    this.createImage();
  }

  createImage() {
    const image = document.createElement("img");
    image.src = "./Assets/Images/Coin.png";
    this.sprite = image;
    image.style.position = "absolute";
    image.style.left = this.position.x - this.sprite.width / 2 + "px";
    image.style.top = this.position.y - this.sprite.height / 2 + "px";
    image.style.zIndex = 98;
    image.style.scale = this.gameInstance.scale * 2;
    document.body.appendChild(image);
    return image;
  }

  destroy() {
    this.sprite?.parentElement?.removeChild(this.sprite);
    this.gameInstance.removeGameObject(this);
  }

  update(deltaTime) {}
}
