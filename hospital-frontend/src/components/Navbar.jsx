import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border border-gray-300   shadow-lg   px-6 py-3 flex items-center justify-between">

  {/* Logo Section */}
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

  {/* Menu + User Section */}
  <div className="flex items-center gap-8">

    {/* Navigation Links */}
    <div className="hidden md:flex items-center gap-6">
      <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-200">
        Dashboard
      </Link>
      <Link to="/doctors" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-200">
        Doctors
      </Link>
      <Link to="/patients" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-200">
        Patients
      </Link>
      <Link to="/appointments" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-200">
        Schedule
      </Link>
    </div>

    {user ? (
      <div className="flex items-center gap-4 pl-6 border-l border-gray-200">

        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-gray-800 leading-none">
            {user.name}
          </p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">
            {user.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:scale-105 transition duration-200"
          title="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    ) : (
      <Link
        to="/"
        className="bg-blue-600 text-white py-2 px-5 rounded-lg text-sm font-medium hover:bg-blue-700 hover:-translate-y-0.5 transition duration-200 shadow-md"
      >
        Sign In
      </Link>
    )}
  </div>
</nav>
  );
}

export default Navbar;

