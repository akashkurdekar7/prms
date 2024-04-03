import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Practise from "./Practise.js";

const App = () => {
  const theme = {
    colors: {
      first: "#22c55e",
      firstLight: "#A9FFC9",
      title: " #000",
      bodyColor: "#fff",
      black: "#1E1E1E",
      blackLight: "hsl(0, 0%, 40%)",
      white: "hsl(0, 0%, 95%)",
      text: "hsl(0, 0%, 35%)",
      textLight: "hsl(0, 0%, 64%)",
      container: "hsl(0, 0%, 90%)",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "#22c55e",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    font: {
      fontFamily: "'Oswald', sans-serif",
      h1: "1.75rem",
      h2: "1.25rem",
      h3: "1.125rem",
      normal: "0.938rem",
      small: "0.813rem",
      smaller: "0.75rem",
      biggest: "2.5rem",
    },

    fontWeight: {
      Regular: "400",
      Medium: "500",
      SemiBold: "600",
      Bold: "700",
    },

    zIndex: {
      zTooltip: "10",
      zFixed: "100",
    },

    shadow: {
      boxShadow: "0 2rem 2rem 0 rgb(132 144 255 / 30%)",
    },

    media: {
      tab: "790px",
      mobile: "390px",
      // tab: "998px",
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/ass" element={<Practise />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
