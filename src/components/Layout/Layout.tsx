import { FC } from "react";
import { Box } from "@mui/material";

import { AppBar } from "../AppBar";

const Layout: FC = ({ children }) => {
  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column">
      <AppBar
        sx={{
          flex: "0 1 auto",
        }}
      />
      {children}
    </Box>
  );
};

export default Layout;
