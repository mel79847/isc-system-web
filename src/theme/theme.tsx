import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#191D88",
    },
    secondary: {
      main: "#1450A3",
    },
  },
  components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#2F2F2F",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: "normal",
            borderRadius: "4px",
            padding: "2px 6px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
            fontFamily: "Roboto, Arial, sans-serif",
          },
          arrow: {
            color: "#2F2F2F",
          },
        },
      },
    },
});
