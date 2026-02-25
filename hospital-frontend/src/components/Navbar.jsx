import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

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
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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
          <Link
            to="/doctors"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Doctors
          </Link>
          <Link
            to="/patients"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Patients
          </Link>
          <Link
            to="/appointments"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Schedule
          </Link>

          {user ? (
            <button
              onClick={logout}
              className="text-red-500 text-sm font-medium"
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
          <Link to="/doctors" onClick={() => setIsOpen(false)}>
            Doctors
          </Link>
          <Link to="/patients" onClick={() => setIsOpen(false)}>
            Patients
          </Link>
          <Link to="/appointments" onClick={() => setIsOpen(false)}>
            Schedule
          </Link>

          {user ? (
            <button onClick={logout} className="text-left text-red-500">
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
