import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import HospitalContextProvider from "./context/HospitalContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HospitalContextProvider>
      <App />
    </HospitalContextProvider>
  </BrowserRouter>,
);
