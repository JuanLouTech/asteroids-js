const limitMovement = (positionVector) => {
  let { x, y } = positionVector;
  if (x < 0) {
    x = window.innerWidth;
  }
  if (x > window.innerWidth) {
    x = 0;
  }
  if (y < 0) {
    y = window.innerHeight;
  }
  if (y > window.innerHeight) {
    y = 0;
  }
  positionVector.x = x;
  positionVector.y = y;
  return positionVector;
};
