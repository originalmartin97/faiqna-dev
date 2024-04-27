import { createTheme } from "@mui/material";


export const theme = createTheme({
  typography: {
    fontFamily: '"Nunito", sans-serif',
    color: '#F7FAF7'
  },
  palette: {
    primary: {
      main: "#2D6A51",
    },
    secondary: {
      main: "#99bdb1"
    },
    tertiary: {
      default: "#F7FAF7"
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F7FAF7",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        padding: "0.5rem"
      },
      styleOverrides: {
        root: {
          margin: ".8rem",
          borderRadius: "2rem",
          color: "#F7FAF7",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: `2px 2.5px 4px 1.5px rgba(0, 0, 0, .25)`,
          '&:hover': {
            backgroundColor: '#e1f6ea',
            color: 'black'
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
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
          borderRadius: "2rem",
          backgroundColor: "#e1f6ea",
          padding: "1rem",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          overflow: "auto",
        },
        paper: {
          backgroundColor: "#f7faf7",
        },
      },
    },
  },
});