import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/source-serif-4/wght-italic.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Landing } from "./Landing";
import "./landing.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
);
