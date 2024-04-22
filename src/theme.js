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
  },
  palette: {
    primary: {
      main: "#2D6A51",
    },
    secondary: {
      main: "#99BDB1",
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
          padding: "1.3rem",
          margin: ".8rem",
          borderRadius: "2rem",
          color: "#F7FAF7",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: `2px 2.5px 4px 1.5px rgba(0, 0, 0, .25)`,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          ...flexCenterColumn,
          height: "100vh",
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          ...flexCenterColumn,
          margin: "2rem",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          ...flexCenterRow,
          margin: ".7rem",
          borderRadius: "2rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
  },
});