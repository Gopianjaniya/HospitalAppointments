import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const hostContext = createContext();
export default function HospitalContext({ children }) {
  const navigate = useNavigate();
  const backendUrl = "http://localhost:3000";
  const value = {
    backendUrl,
    navigate,
  };
  return (
    <>
      <hostContext.Provider value={value}>{children}</hostContext.Provider>
    </>
  );
}
