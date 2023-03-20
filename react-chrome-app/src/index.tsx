import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react'

const rootElement = document.createElement("div");
rootElement.id = "mem-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  right: 10px;
  top: 10px;
  border-radius: 10px;
  width: 20%;
  max-height: 700px;
  background: #F3F3F5;
  z-index: 999999999;
  font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
  }
`;
document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);

const root = ReactDOM.createRoot(rootElement);
root.render(

  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
