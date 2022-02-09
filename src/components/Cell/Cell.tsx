import { styled } from "@mui/material";

export type CellProps = {
  active?: boolean;
  size?: number;
};

const Cell = styled("td", {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "size",
})<CellProps>(({ active, size = 10 }) => ({
  backgroundColor: active ? "black" : undefined,
  minWidth: size,
  height: size,
}));

export default Cell;
