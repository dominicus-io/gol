import { nextPerm } from "./nextPerm";

it("should return [11, 19, 27]", () => {
  expect(nextPerm({ alive: [18, 19, 20], n_rows: 4, n_cols: 8 })).toEqual([
    11, 19, 27,
  ]);
});

it("should return [18, 19, 20]", () => {
  expect(nextPerm({ alive: [11, 19, 27], n_rows: 4, n_cols: 8 })).toEqual([
    18, 19, 20,
  ]);
});

it("should return [65, 67, 85, 86, 104]", () => {
  expect(
    nextPerm({ alive: [47, 67, 84, 85, 86], n_rows: 8, n_cols: 19 })
  ).toEqual([65, 67, 85, 86, 104]);
});

it("should return [125, 127, 145, 146]", () => {
  expect(
    nextPerm({ alive: [107, 127, 144, 145, 146], n_rows: 8, n_cols: 19 })
  ).toEqual([125, 127, 145, 146]);
});

it("should return [7, 8, 9, 11, 12, 18, 19]", () => {
  expect(
    nextPerm({ alive: [1, 10, 14, 15, 18, 19, 20], n_rows: 3, n_cols: 7 })
  ).toEqual([7, 8, 9, 11, 12, 18, 19]);
});