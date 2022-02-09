import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  SxProps,
} from "@mui/material";

export type AppBarProps = {
  sx?: SxProps;
};

const AppBar = ({ sx }: AppBarProps) => {
  return (
    <MuiAppBar sx={sx} position="static">
      <Toolbar>
        <Typography component="h1" variant="h2" fontWeight="bold">
          Game of Life
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
