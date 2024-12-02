import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import EventSample3 from "./event-sample/EventSample3";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EventSample3 />
  </StrictMode>,
);
