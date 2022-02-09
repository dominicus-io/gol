export type Grid = {
  alive: Array<number>;
  n_rows: number;
  n_cols: number;
};

export function makeGrid(alive: Array<number>, n_rows: number, n_cols: number) {
  return {
    alive,
    n_rows,
    n_cols,
  };
}

export function makeGridFromBooleanMatrix(
  booleanMatrix: Array<Array<boolean>>
) {
  return {
    alive: booleanMatrix.flat().reduce((acc, cur, i) => {
      cur && acc.push(i);
      return acc;
    }, [] as Array<number>),
    n_rows: booleanMatrix.length,
    n_cols: booleanMatrix[0].length
  };
}
