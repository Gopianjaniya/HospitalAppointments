import { useContext, useState, useEffect } from "react";
import { HospitalContext } from "../context/HospitalContext";
import toast from "react-hot-toast";

import api from "../utils/api";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { navigate, login, token } = useContext(HospitalContext);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/user/login", {
        
        username,
        password,
      });

      login(res.data.token, res.data.user);
      toast.success("Welcome back! Login successful.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 px-8 py-10 ">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition"
            />
          </div>

          {/* Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 text-white text-sm font-medium rounded-lg 
                     hover:bg-blue-700 transition 
                     disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center justify-center"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
