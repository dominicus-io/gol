import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

import { theme } from "./utils";

import { GameOfLife } from "./pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={3000}>
        <CssBaseline />
        <GameOfLife />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
