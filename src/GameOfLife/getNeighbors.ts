import { Grid } from "./Grid";

const areOnSameRow = (n_cols: number) => (row: number) => (el: number) =>
  Math.floor(el / n_cols) === row;

export function getNeighbors({ alive, n_cols, n_rows }: Grid, el: number) {
  const row = Math.floor(el / n_cols);
  const _areOnSameRow = areOnSameRow(n_cols);

  const result = [el - 1, el + 1].filter(_areOnSameRow(row));

  if (row > 0) {
    const upRow = Math.floor((el - n_cols) / n_cols);
    result.push(
      ...[el - n_cols - 1, el - n_cols, el - n_cols + 1].filter(
        _areOnSameRow(upRow)
      )
    );
  }

  if (row + 1 < n_rows) {
    const downRow = Math.floor((el + n_cols) / n_cols);
    result.push(
      ...[el + n_cols - 1, el + n_cols, el + n_cols + 1].filter(
        _areOnSameRow(downRow)
      )
    );
  }

  return result;
}
