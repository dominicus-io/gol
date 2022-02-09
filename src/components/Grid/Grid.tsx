import { FC, useEffect, useMemo, useRef } from "react";
import { TableContainer } from "@mui/material";

import { Cell, CellProps } from "../Cell";

export type GridProps = {
  alive: number[];
  rows: number;
  cols: number;
  cellSize?: CellProps["size"];
};

const Grid: FC<GridProps> = ({ alive, rows, cols, cellSize }) => {
  const cellsRef = useRef<HTMLElement[]>([]);
  const prevAlive = useRef<HTMLElement[]>([]);
  const GridElements = useMemo(
    () =>
      [...Array.from(Array(rows).keys())].map((i) => (
        <tr key={i}>
          {[...Array.from(Array(cols).keys())].map((j) => (
            <Cell
              key={j}
              ref={(el) => {
                if (el) {
                  cellsRef.current[i * cols + j] = el;
                }
              }}
              size={cellSize}
            />
          ))}
        </tr>
      )),
    [cellSize, cols, rows]
  );

  useEffect(() => {
    if (rows * cols < cellsRef.current.length) {
      cellsRef.current = cellsRef.current.slice(0, rows * cols);
    }
  }, [rows, cols]);

  useEffect(() => {
    prevAlive.current.forEach((el) => {
      el.style.backgroundColor = "";
    });
    prevAlive.current = alive.map((i) => {
      cellsRef.current[i].style.backgroundColor = "black";
      return cellsRef.current[i];
    });
  }, [alive]);

  return (
    <TableContainer
      sx={(theme) => ({
        width: "auto",
        maxHeight: "67vh",
        maxWidth: "100%",
        table: {
          borderCollapse: "collapse",
          borderSpacing: 0,
        },
        td: {
          border: `1px solid ${theme.palette.divider}`,
        },
      })}
    >
      <table>
        <tbody>{GridElements}</tbody>
      </table>
    </TableContainer>
  );
};

export default Grid;
