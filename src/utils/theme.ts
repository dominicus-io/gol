import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
                #root {
                    height: 100vh;
                    width: 100Vw;
                }
            `,
    },
  },
});
