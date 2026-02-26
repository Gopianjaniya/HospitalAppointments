import { useEffect, useState, useContext } from "react";
import { HospitalContext } from "../context/HospitalContext";
import api from "../utils/api";

function Dashboard() {
  const { navigate, user, logout } = useContext(HospitalContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAppointments(user);
    }
  }, [user]);

  const fetchAppointments = async (currentUser) => {
    try {
      const res = await api.get("/api/appointment");
       
      const filtered = res.data.appointments.filter((app) =>
        currentUser.role === "doctor"
      ? app.doctor?._id === (currentUser.id || currentUser._id)
      : app.patient?._id === (currentUser.id || currentUser._id),
    );

      setAppointments(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back,{" "}
              <span className="font-medium text-gray-700">{user.name}</span> (
              {user.role})
            </p>
          </div>

          <button
            onClick={logout}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Appointments
              </h2>
              <span className="text-sm text-gray-500">
                {appointments.length} total
              </span>
            </div>

            {appointments.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
                <p className="text-gray-500 mb-4">No appointments found.</p>

                {user.role === "patient" && (
                  <button
                    onClick={() => navigate("/book")}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:shadow-md transition"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.role === "doctor"
                          ? app.patient.name
                          : `Dr. ${app.doctor.name}`}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(app.date).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        app.status === "booked"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
              {user.role === "patient" && (
                <button
                  onClick={() => navigate("/book")}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Book New Appointment
                </button>
              )}

              <button
                onClick={() => navigate("/doctors")}
                className="w-full border border-gray-300 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                View Doctors
              </button>

              <button
                onClick={() => navigate("/appointments")}
                className="w-full border border-gray-300 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Appointment History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
