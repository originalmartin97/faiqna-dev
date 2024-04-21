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
  palette: {
    primary: {
      main: "#3F6837",
    },
    secondary: {
      main: "#E8F5E9",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          padding: "1rem",
          margin: ".5rem",
          borderRadius: "2rem",
          color: "white",
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
          margin: "2rem",
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
          margin: ".5rem",
        },
      },
    },
  },
});