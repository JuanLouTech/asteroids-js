class Particle {
  velocity = Vector2.ZERO();
  constructor(
    x,
    y,
    texture,
    initialSpeed,
    damping,
    direction,
    scale,
    lifeSpan,
    particleGenerator,
    parentObject = { position: Vector2.ZERO(), rotation: 0 }
  ) {
    this.position = new Vector2(x, y);
    this.parentObject = parentObject;
    this.acceleration = Vector2.ZERO();
    this.rotation = 0;
    this.rotationSpeed = Math.random() * 0.3 - 0.05;
    this.scale = scale;
    this.scaleSpeed = 0;
    this.speed = initialSpeed;
    this.alpha = 1;
    this.alphaSpeed = 0;
    this.lifeSpan = 0; // Life in seconds
    this.maxLifeSpan = lifeSpan; // When should it die?
    this.isDead = false;
    this.isFading = false;
    this.sprite = null;
    this.direction = direction || Vector2.RandomDirection();
    this.damping = damping;
    this.particleGenerator = particleGenerator;
    this.createImage(texture);
  }

  createImage(texture) {
    this.sprite = new Image();
    this.sprite.src = texture;
    this.sprite.style.position = "absolute";
    this.sprite.style.left = this.position.x + "px";
    this.sprite.style.top = this.position.y + "px";
    this.sprite.style.zIndex = 100;
    this.sprite.style.scale = this.scale;
    document.body.appendChild(this.sprite);
  }

  rotate() {
    this.rotation += this.rotationSpeed;
    this.sprite.style.transform = "rotate(" + this.rotation + "rad)";
  }

  move(deltaTime) {
    if (this.speed > 0) this.speed -= this.speed * this.damping;
    this.speed = this.speed <= 0 ? 0 : this.speed;
    this.direction = this.direction.normalize();
    this.position = this.position.add(
      this.direction.multiply((this.speed * deltaTime) / 1000)
    );
    this.sprite.style.left = this.position.x - this.sprite.width / 2 + "px";
    this.sprite.style.top = this.position.y - this.sprite.height / 2 + "px";
  }

  updateAlpha() {
    this.alpha = 1 - this.lifeSpan / this.maxLifeSpan;
    this.sprite.style.opacity = this.alpha;
  }

  destroy() {
    this.sprite?.parentElement?.removeChild(this.sprite);
    this.particleGenerator.removeParticle(this);
  }

  update(deltaTime) {
    if (this.isDead) return;
    this.move(deltaTime);
    this.rotate();
    this.updateAlpha();
    this.lifeSpan = this.lifeSpan + deltaTime;
    if (this.lifeSpan >= this.maxLifeSpan) {
      this.isDead = true;
      this.destroy();
    }
  }
}
