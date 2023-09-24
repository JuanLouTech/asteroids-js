class Particles {
  constructor(
    x,
    y,
    amount,
    explosive,
    isStream,
    continious,
    texture,
    parentObject = { position: Vector2.ZERO() }
  ) {
    this.x = x;
    this.y = y;
    this.amount = amount;
    this.explosive = explosive;
    this.isStream = isStream;
    this.continious = continious;
    this.parentObject = parentObject;
    this.particles = [];
  }
}
