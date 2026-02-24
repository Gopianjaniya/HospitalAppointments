import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const HospitalContext = createContext();
export default function HospitalContextProvider({ children }) {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    backendUrl,
    navigate,
  };
  return (
    <>
      <HospitalContext.Provider value={value}>{children}</HospitalContext.Provider>
    </>
  );
}
