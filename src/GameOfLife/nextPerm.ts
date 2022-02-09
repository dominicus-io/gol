import { Grid } from "./Grid";
import { getNeighbors } from "./getNeighbors";

import { binarySearch, min } from "../utils";

export function nextPerm(currentState: Grid) {
  const { alive } = currentState;
  const result = new Set<number>();

  //n * (6 * ln(n) + 6 * 6 * ln(n))
  alive.forEach((el) => {
    //6 * ln(n)
    const neighbors = getNeighbors(currentState, el);
    const deadNeighbors = neighbors.filter(
      (neighbor) => binarySearch(alive, neighbor, min) === -1
    );

    const aliveNeighbors = neighbors.length - deadNeighbors.length;
    if (aliveNeighbors > 1 && aliveNeighbors < 4) {
      result.add(el);
    }

    //6 * 6 * ln(n)
    deadNeighbors.forEach((dn) => {
      const aliveNeighbors = getNeighbors(currentState, dn).filter(
        (neighbor) => binarySearch(alive, neighbor, min) !== -1
      );
      if (aliveNeighbors.length === 3) {
        result.add(dn);
      }
    });
  });

  return Array.from(result).sort((a, b) => a - b);
}
