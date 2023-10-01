const getCorrectedPositions = (positionVector, objectRadius) => {
  let duplicatePosition = getDuplicateCorrectPosition(
    new Vector2(positionVector.x, positionVector.y),
    objectRadius
  );
  let { x, y } = positionVector;

  x = x < 0 ? window.innerWidth : x > window.innerWidth ? 0 : x;
  y = y < 0 ? window.innerHeight : y > window.innerHeight ? 0 : y;

  return { position: new Vector2(x, y), duplicatePosition: duplicatePosition };
};

const getDuplicateCorrectPosition = (positionVector, objectRadius) => {
  let { x, y } = positionVector;
  x =
    x < objectRadius
      ? window.innerWidth + x
      : x > window.innerWidth - objectRadius
      ? x - window.innerWidth
      : x;

  y =
    y < objectRadius
      ? window.innerHeight + y
      : y > window.innerHeight - objectRadius
      ? y - window.innerHeight
      : y;

  return new Vector2(x, y);
};
