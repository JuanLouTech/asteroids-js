class AnimatedSprite {
  frames = [];
  currentFrame = 0;
  loop = false;
  fps = 60;
  timeSinceLastFrame = 0;
  rotation = 0;
  offset = new Vector2(0, 0);
  visible = true;

  isPlaying = false;
  constructor(offsetX, offsetY, rotation, fps, loop, frames, parent) {
    this.parent = parent
      ? parent
      : { position: new Vector2(0, 0), rotation: 0 };
    this.offset = new Vector2(offsetX, offsetY);
    this.rotation = rotation;
    this.fps = fps;
    this.loop = loop;
    this.currentFrame = 0;
    this.timeSinceLastFrame = 0;
    this.frames = frames;
    this.sprite = document.createElement("img");
    this.sprite.src = this.frames[this.currentFrame];
    this.sprite.style.position = "absolute";
    this.sprite.style.left = `${this.parent.position.x + this.offset.x}px`;
    this.sprite.style.top = `${this.parent.position.y + this.offset.y}px`;
    this.sprite.style.transform = `rotate(${this.rotation}deg)`;
    this.sprite.style.alpha = 0;
    document.body.appendChild(this.sprite);
  }

  rescale(scale) {
    this.sprite.style.scale = scale;
  }

  play() {
    this.isPlaying = true;
    this.currentFrame = 0;
  }

  stop() {
    this.isPlaying = false;
    this.currentFrame = 0;
  }

  show() {
    this.sprite.style.alpha = 1;
  }

  hide() {
    this.sprite.style.alpha = 0;
  }

  destroy() {
    document.body.removeChild(this.sprite);
  }

  move() {
    this.sprite.style.left =
      this.parent.position.x +
      this.offset.rotated(this.parent.rotation).x -
      this.sprite.width / 2 +
      "px";
    this.sprite.style.top =
      this.parent.position.y +
      this.offset.rotated(this.parent.rotation).y -
      this.sprite.height / 2 +
      "px";
    this.sprite.style.transform = "rotate(" + this.parent.rotation + "rad)";
  }

  update(deltaTime) {
    this.sprite.style.opacity = this.visible ? 1 : 0;
    if (!this.isPlaying) {
      return;
    }
    this.timeSinceLastFrame += deltaTime;
    if (this.timeSinceLastFrame >= 1000 / this.fps) {
      this.timeSinceLastFrame = 0;
      this.currentFrame++;
      if (this.currentFrame >= this.frames.length) {
        if (this.loop) {
          this.currentFrame = 0;
        } else {
          this.currentFrame = this.frames.length - 1;
        }
      }
      this.sprite.src = this.frames[this.currentFrame];
    }
    this.move();
  }
}
