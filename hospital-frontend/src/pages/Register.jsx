import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { HospitalContext } from "../context/HospitalContext";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { navigate, backendUrl, token } = useContext(HospitalContext);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/register`,
        {
          name,
          username,
          password,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Account created successfully! Please login.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Registration failed. Try a different username.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-14">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-sm text-gray-500">Join our medical community</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Dr. John Doe / Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition"
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="johndoe123"
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

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">I am a</label>

            <div className="grid grid-cols-2 gap-4">
              <label
                className={`h-12 flex items-center justify-center rounded-lg border text-sm font-medium cursor-pointer transition
              ${
                role === "patient"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={role === "patient"}
                  onChange={() => setRole("patient")}
                  className="hidden"
                />
                Patient
              </label>

              <label
                className={`h-12 flex items-center justify-center rounded-lg border text-sm font-medium cursor-pointer transition
              ${
                role === "doctor"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={() => setRole("doctor")}
                  className="hidden"
                />
                Doctor
              </label>
            </div>
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
