import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import HospitalContext from "./context/hospitalContext";
 

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HospitalContext>
      <App />
    </HospitalContext>
  </BrowserRouter>,
);
