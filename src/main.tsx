import { NextUIProvider } from "@nextui-org/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <NextUIProvider locale="fa-IR">
        <App />
      </NextUIProvider>
    </RecoilRoot>
  </StrictMode>
);
