import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme.css";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { AppStateProvider } from "./store/store";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      {/* <AppStateProvider> */}
        <App />
      {/* </AppStateProvider> */}
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
