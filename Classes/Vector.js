class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  divide(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  rotated(angle) {
    return new Vector2(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle)
    );
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set length(value) {
    const angle = this.angle;
    this.x = Math.cos(angle) * value;
    this.y = Math.sin(angle) * value;
  }

  set x(value) {
    this._x = value;
  }

  get x() {
    return this._x;
  }

  set y(value) {
    this._y = value;
  }

  get y() {
    return this._y;
  }

  clampLength(maxLength) {
    const length = this.length;
    if (length > maxLength) {
      this.divide(length / maxLength);
    }
  }

  get angle() {
    return Math.atan2(this.y, this.x);
  }

  set angle(value) {
    const length = this.length;
    this.x = Math.cos(value) * length;
    this.y = Math.sin(value) * length;
  }

  rotate(angle) {
    this.angle += angle;
    return this;
  }

  distanceTo(vector) {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  normalize() {
    return new Vector2(this.x / this.length, this.y / this.length);
  }

  static ZERO() {
    return new Vector2(0, 0);
  }

  static RandomDirection() {
    return new Vector2(2 * Math.random() - 1, 2 * Math.random() - 1);
  }
}
