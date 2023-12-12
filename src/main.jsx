import React from "react";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/poppins/500.css";
import "@fontsource/redressed";

const theme = extendTheme({
  fonts: {
    navBarHeading: `'Redressed', cursive`,
    body: `'poppins', sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
