import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(HospitalContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border border-gray-300 shadow-lg px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
            H
          </div>

          <Link
            to="/dashboard"
            className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            CareSync
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Dashboard
          </Link>

          {/* Doctors visible to patient */}
          {user?.role === "patient" && (
            <Link
              to="/doctors"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Doctors
            </Link>
          )}

          {/* Patients visible to doctor */}
          {user?.role === "doctor" && (
            <Link
              to="/patients"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Patients
            </Link>
          )}

          <Link
            to="/appointments"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Schedule
          </Link>

          {/* Profile Section */}
          {user && (
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-xl">
              <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          )}

          {user ? (
            <button
              onClick={logout}
              className="text-red-500 text-sm font-medium border rounded-xl px-4 py-1 hover:bg-red-100"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 border-t pt-4">
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>

          {user?.role === "patient" && (
            <Link to="/doctors" onClick={() => setIsOpen(false)}>
              Doctors
            </Link>
          )}

          {user?.role === "doctor" && (
            <Link to="/patients" onClick={() => setIsOpen(false)}>
              Patients
            </Link>
          )}

          <Link to="/appointments" onClick={() => setIsOpen(false)}>
            Schedule
          </Link>

          {/* Mobile Profile */}
          {user && (
            <div className="flex items-center gap-3 mt-2">
              <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">
                  {user.role}
                </div>
              </div>
            </div>
          )}

          {user ? (
            <button onClick={logout} className="text-left text-red-500 mt-2">
              Logout
            </button>
          ) : (
            <Link to="/" onClick={() => setIsOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
