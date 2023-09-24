const IMAGES = "./Assets/Images/";

class Thruster extends AnimatedSprite {
  constructor(x, y, rotation, fps, loop, parent) {
    super(
      x,
      y,
      rotation,
      fps,
      loop,
      [`${IMAGES}thrust1.png`, `${IMAGES}thrust2.png`],
      parent
    );
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}
