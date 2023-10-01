class Particles {
  isDead = false;
  constructor(
    gameInstance,
    x,
    y,
    scale,
    amount,
    explosive,
    direction,
    spreadAngle,
    initialSpeed,
    damping,
    texture,
    lifeSpan,
    parentObject = { position: Vector2.ZERO(), rotation: 0 }
  ) {
    this.gameInstance = gameInstance;
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.amount = amount;
    this.explsoive = explosive;
    this.direction = direction;
    this.initialSpeed = initialSpeed;
    this.damping = damping;
    this.spreadAngle = spreadAngle;
    this.parentObject = parentObject;
    this.particles = [];
    this.texture = texture;
    this.rotation = this.parentObject.rotation;
    this.lifeSpan = lifeSpan;
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.amount; i++) {
      const particle = new Particle(
        this.x,
        this.y,
        this.texture,
        this.initialSpeed,
        this.damping,
        Vector2.RandomDirection(),
        this.scale,
        this.lifeSpan,
        this,
        this.parentObject
      );

      this.particles.push(particle);
    }
  }

  removeParticle(particle) {
    this.particles = this.particles.filter((p) => p !== particle);
  }

  destroy() {
    this.particles.forEach((particle) => {
      particle.destroy();
    });
    this.gameInstance.removeGameObject(this);
  }

  update(deltaTime) {
    if (this.isDead) return;
    if (!this.particles.length) {
      this.isDead = true;
      this.destroy();
    }
    this.particles.forEach((particle) => {
      particle.update(deltaTime);
    });
  }
}
