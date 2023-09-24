class Explosion extends AnimatedSprite {
  type = "explosion";
  constructor(gameInstance, x, y) {
    super(
      x,
      y,
      0,
      8,
      false,
      [
        "./Assets/Images/Explosion0.png",
        "./Assets/Images/Explosion1.png",
        "./Assets/Images/Explosion2.png",
        "./Assets/Images/Explosion3.png",
        "./Assets/Images/Explosion4.png",
        "./Assets/Images/Explosion5.png",
        "./Assets/Images/Explosion6.png",
        "./Assets/Images/Explosion7.png",
      ],
      (parent = undefined)
    );
    this.gameInstance = gameInstance;
    this.gameInstance.addGameObject(this);
    super.play();
    this.sprite.style.scale = 4;
    this.sprite.style.zIndex = 110;
  }

  destroy() {
    this.gameInstance.removeGameObject(this);
    super.destroy();
  }

  update(deltaTime) {
    if (this.currentFrame === this.frames.length - 1) {
      this.destroy();
    }
    super.update(deltaTime);
  }
}
