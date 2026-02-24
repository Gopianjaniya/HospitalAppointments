import { useContext, useEffect, useState } from "react";
import axios from "axios";
import HospitalContext  from "../context/hospitalContext.jsx";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl, navigate } = useContext(HospitalContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/appointment`);
      // Filter based on user role and id
      const filtered = res.data.appointments.filter((app) =>
        user.role === "doctor"
          ? app.doctor?._id === user.id || app.doctor?._id === user._id
          : app.patient?._id === user.id || app.patient?._id === user._id,
      );

      setAppointments(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchAppointments();
  }, [backendUrl]);

  const cancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;
    try {
      await axios.put(`${backendUrl}/api/appointment/cancel/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error(error);
      alert("Cancellation failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen animate-in fade-in duration-500">
      <header className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
            Appointments
          </h1>
          <p className="text-muted text-lg">
            Manage and track your medical schedule
          </p>
        </div>
        {user?.role === "patient" && (
          <button
            onClick={() => navigate("/book")}
            className="bg-primary text-blue-500 px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-sm  hover:shadow-lg hover:shadow-primary/20"
          >
            New Appointment
          </button>
        )}
      </header>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl p-20 text-center shadow-premium">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📅</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">No Appointments Yet</h2>
          <p className="text-muted mb-8 italic">
            Your clinical schedule is currently empty.
          </p>
          {user?.role === "patient" && (
            <button
              onClick={() => navigate("/book")}
              className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
            >
              Book Appointment Now
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map((app) => (
            <div
              key={app._id}
              className="bg-white/80 backdrop-blur-md border border-gray-400 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-premium transition-all border-l-4 border-l-primary hover:shadow-lg  "
            >
              <div className="flex gap-6 items-center">
                <div className="hidden md:flex flex-col items-center justify-center bg-primary/5 rounded-2xl p-4 min-w-24 border border-gray-300">
                  <span className="text-xs font-black text-primary uppercase tracking-widest">
                    {new Date(app.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </span>
                  <span className="text-3xl font-black text-foreground">
                    {new Date(app.date).getDate()}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {user.role === "doctor"
                      ? app.patient?.name
                      : `Dr. ${app.doctor?.name}`}
                  </h3>
                  <div className="flex flex-wrap gap-x-6 text-sm text-muted font-medium">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Medical Center
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {new Date(app.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    app.status === "booked"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : "bg-red-50 text-red-700 border-red-100"
                  }`}
                >
                  {app.status}
                </span>

                {app.status === "booked" && (
                  <button
                    onClick={() => cancel(app._id)}
                    className="text-red-500 hover:bg-red-50 px-6 py-2 rounded-xl transition-all font-bold text-sm border-2 border-transparent hover:border-red-100 uppercase tracking-wide"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments;
