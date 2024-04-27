import { createTheme } from "@mui/material";

const flexCenterColumn = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const flexCenterRow = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};

export const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif",
    color: '#F7FAF7'
  },
  palette: {
    primary: {
      main: "#2D6A51",
    },
    secondary: {
      main: "#F7FAF7",
    },
    background: {
      default: "#F7FAF7"
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#ebfce7",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          margin: ".8rem",
          borderRadius: "2rem",
          color: "#F7FAF7",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: `2px 2.5px 4px 1.5px rgba(0, 0, 0, .25)`,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: "1.5rem",
        },
        h1: {
          fontSize: "2rem",
          fontWeight: "bold",
        },
        h2: {
          fontSize: "1.5rem",
          fontWeight: "bold",
        },
        h3: {
          fontSize: "1.17rem",
          fontWeight: "bold",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          backgroundColor: "#e1f6ea",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#e1f6ea",
          overflow: "auto",
        },
      },
    },
  },
});