
const getNormalizedIndex = (i, list) => {
  let res = 0;
  if (i < 0) {
    const newValueMaybe = (list.length - 1) + i;
    if (newValueMaybe > 0) {
      if (newValueMaybe < list.length) {
        res = newValueMaybe;
      } else {
        res = (list.length - 1) - (newValueMaybe % Math.abs(i));
      }
    }
  } else if (i > list.length) {
    res = (i - (list.length - 1) < list.length - 1) ?
      i - list.length :
      getNormalizedIndex(i - list.length, list);
  } else if (list[i]) {
    res = i;
  }
  return res;
};

function lt(x, a, b, c, d) { return (x - a) / (b - c) * (d - c) + c; } // eslint-disable-line

export function calculateNextFrame(
  deltaX,
  deltaY,
  absX,
  absY,
  collection,
  availableWidth,
  visibleFrame,
  lastKnownAbsX,
) {
  const isSwipingLeft = (
    deltaX > 0 && absX > lastKnownAbsX) || (deltaX < 0 && absX < lastKnownAbsX
  );
  const isSwipingRight = (
    deltaX < 0 && absX > lastKnownAbsX) || (deltaX > 0 && absX < lastKnownAbsX
  );


  const expectedIndexDifference = (lastKnownAbsX && Math.round(lastKnownAbsX > absX ?
    (
      lt(lastKnownAbsX, 0, (window.innerWidth / 2), 0, collection.length) -
      lt(absX, 0, (window.innerWidth / 2), 0, collection.length)
    ) :
    (
      lt(absX, 0, (window.innerWidth / 2), 0, collection.length) -
      lt(lastKnownAbsX, 0, (window.innerWidth / 2), 0, collection.length)
    ) *
    1.2)) || 0;

  let expectedIndex;
  if (isSwipingLeft) {
    expectedIndex = getNormalizedIndex(visibleFrame + expectedIndexDifference, collection, false);
  } else if (isSwipingRight) {
    expectedIndex = getNormalizedIndex(visibleFrame - expectedIndexDifference, collection, true);
  } else {
    expectedIndex = visibleFrame;
  }

  return expectedIndex;
}

export default calculateNextFrame;
