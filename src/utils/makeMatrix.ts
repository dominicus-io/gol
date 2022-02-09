export function makeMatrix<T>(
  n: number,
  m: number,
  defaultValue: T
): Array<Array<T>> {
  const result = new Array<Array<T>>(n);

  for (let i = 0; i < n; ++i) {
    result[i] = new Array(m);
    for (let j = 0; j < m; ++j) {
      result[i][j] = defaultValue;
    }
  }

  return result;
}
