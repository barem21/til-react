import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IndexPage from "./pages/IndexPage";
import Pop from "./components/Pop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IndexPage></IndexPage>
    <Pop></Pop>
  </StrictMode>,
);
