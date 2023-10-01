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

// TODO: REFACTOR THIS, IT IS VERY UGLY
const limitMovementWithDuplicate = (positionVector, objectRadius) => {
  let duplicatePosition = limitDuplicateMovement(
    new Vector2(positionVector.x, positionVector.y),
    objectRadius
  );
  if (positionVector.x < 0) {
    positionVector.x = window.innerWidth;
  }
  if (positionVector.x > window.innerWidth) {
    positionVector.x = 0;
  }
  if (positionVector.y < 0) {
    positionVector.y = window.innerHeight;
  }
  if (positionVector.y > window.innerHeight) {
    positionVector.y = 0;
  }
  return { position: positionVector, duplicatePosition: duplicatePosition };
};

const limitDuplicateMovement = (positionVector, objectRadius) => {
  const newPosition = new Vector2(positionVector.x, positionVector.y);
  if (positionVector.x < objectRadius) {
    newPosition.x = window.innerWidth + positionVector.x;
  }
  if (positionVector.x > window.innerWidth - objectRadius) {
    newPosition.x = positionVector.x - window.innerWidth;
  }
  if (positionVector.y < objectRadius) {
    newPosition.y = window.innerHeight + positionVector.y;
  }
  if (positionVector.y > window.innerHeight - objectRadius) {
    newPosition.y = positionVector.y - window.innerHeight;
  }
  return newPosition;
};
