import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    common: {
      white: "#fff",
      black: "#000000",
    },
    background: {
      paper: "#F8F0E5",
    },
    primary: {
      main: "#102C57",
      light: "#102C57",
      contrastText: "#fff",
    },
    secondary: {
      main: "#DAC0A3",
      light: "EADBC8",
      contrastText: "#000",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 800,

    allVariants: {
      fontSize: "1.6rem",
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },

    h1: {
      fontSize: "6rem",
      fontWeight: 300,
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "3.75rem",
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "3rem",
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontSize: "2.125rem",
      fontWeight: 400,
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857",
    },
  },
});

let appTheme = createTheme(theme);
appTheme = responsiveFontSizes(appTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
