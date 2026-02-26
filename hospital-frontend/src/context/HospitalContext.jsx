import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HospitalContext = createContext();

export default function HospitalContextProvider({ children }) {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null"),
  );

  const login = (newToken, newUser) => {
    console.log(newToken,"-----------");
    
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  const value = {
    backendUrl,
    navigate,
    token,
    user,
    login,
    logout,
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
}
