import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "styled-components";
import themes from "./shared/ui/themes/index.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={themes}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
