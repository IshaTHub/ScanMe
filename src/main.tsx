import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      {<App />}
    </HeroUIProvider>
  </StrictMode>
);
