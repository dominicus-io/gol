import { useCallback, ChangeEvent, useState } from "react";
import * as E from "fp-ts/Either";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import { pipe, flow } from "fp-ts/function";

import { makeMatrix } from "../../utils";
import { makeGridFromBooleanMatrix, Grid } from "../../GameOfLife";

interface Error<T extends string, C extends number> {
  _tag: T;
  code: C;
  msg: string;
}

type NotSameLengthError = Error<"NotSameLength", 1>;

function makeNotSameLengthError(): NotSameLengthError {
  return {
    _tag: "NotSameLength",
    code: 1,
    msg: "Rows aren't all the same length",
  };
}

type InvalidCharError = Error<"InvalidChar", 2>;

function makeInvalidCharError(msg: string): InvalidCharError {
  return {
    _tag: "InvalidChar",
    code: 2,
    msg: msg,
  };
}

function haveRowsSameLength(rows: string[]) {
  return rows.reduce((acc, cur, i, a) => {
    return acc && i === 0 ? true : cur.length === a[i - 1].length;
  }, true);
}

function text(file: File): T.Task<string> {
  return () => file.text();
}

function makeGameOfLifeGrid(rows: string[]) {
  const grid = makeMatrix(rows.length, rows[0].length, false);

  for (let i = 0; i < rows.length; ++i) {
    for (let j = 0; j < rows[0].length; ++j) {
      if (rows[i][j] !== "*" && rows[i][j] !== ".") {
        debugger;
        return E.left(
          makeInvalidCharError(
            `Invalid character at position (${i}, ${j}): ${rows[i][j]}`
          )
        );
      }
      grid[i][j] = "*" === rows[i][j];
    }
  }

  return E.right(grid);
}

const makeGameOfLifeFromFile = flow(
  text,
  T.map((text) => text.split(/\r?\n/)),
  T.map(E.fromPredicate(haveRowsSameLength, makeNotSameLengthError)),
  TE.chainW((rows: string[]) => T.of(makeGameOfLifeGrid(rows)))
);

export function useLoadGameOfLifeFile() {
  const [grid, setGrid] = useState<Grid>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NotSameLengthError | InvalidCharError>();

  const handleChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);
    if (file) {
      setLoading(true);
      makeGameOfLifeFromFile(file)().then((r) => {
        setLoading(false);
        pipe(
          r,
          E.fold(
            setError,
            flow(makeGridFromBooleanMatrix, (grid) => {
              setGrid(grid);
              setError(undefined);
            })
          )
        );
      });
    }
  }, []);

  return {
    handleChange,
    grid,
    loading,
    error,
  };
}
