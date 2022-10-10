import { createTheme } from "@mui/material";
const themeStepLabel = createTheme({
    components: {
      MuiStepLabel: {
        styleOverrides: {
          root: {
            color:'#ff0000',
          },
        },
      },
    },
  });

  export {themeStepLabel}