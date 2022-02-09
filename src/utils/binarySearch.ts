export function binarySearch<T>(
  sortedArray: Array<T>,
  seekElement: T,
  comparatorCallback: (a: T, b: T) => boolean
) {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    if (
      !comparatorCallback(sortedArray[middleIndex], seekElement) &&
      !comparatorCallback(seekElement, sortedArray[middleIndex])
    ) {
      return middleIndex;
    }

    if (comparatorCallback(sortedArray[middleIndex], seekElement)) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return -1;
}
