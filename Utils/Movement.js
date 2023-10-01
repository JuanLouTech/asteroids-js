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

// FINISH THIS PART (THIS IS FOR MAKING THE OBJECTS APPEAR ON THE OTHER SIDE OF THE SCREEN WHILE EXITING THE SCREEN)
const limitMovementWithDuplicate = (positionVector, objectRadius) => {
  let duplicatePosition = new Vector2(positionVector.x, positionVector.y);
  if (positionVector.x < -objectRadius) {
    positionVector.x = window.innerWidth + objectRadius;
  }
  if (positionVector.x > window.innerWidth + objectRadius) {
    positionVector.x = -objectRadius;
  }
  if (positionVector.y < -objectRadius) {
    positionVector.y = window.innerHeight + objectRadius;
  }
  if (positionVector.y > window.innerHeight + objectRadius) {
    positionVector.y = -objectRadius;
  }

  return { position: positionVector, duplicatePosition: duplicatePosition };
};
