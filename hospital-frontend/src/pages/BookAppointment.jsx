import { useState, useEffect, useContext } from "react";
import { HospitalContext } from "../context/HospitalContext";
import api from "../utils/api";
import toast from "react-hot-toast";

function BookAppointment() {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const { navigate } = useContext(HospitalContext);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/api/user/doctors");
        setDoctors(res.data.doctors);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!doctorId || !date) return toast.error("Please select a doctor and date");

    setBooking(true);
    try {
      const res = await api.post("/api/appointment/book", {
        doctorId,
        date,
      });

       
      if (res.data.success) {
        toast.success("Appointment Booked Successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Booking Failed");
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-4xl mx-auto px-6 py-16 flex items-center justify-center">
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8 sm:p-10">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Book Appointment
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Schedule your consultation with a specialist
            </p>
          </header>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-6">
              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Doctor Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Specialist
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    required
                  >
                    <option value="">
                      {doctors.length === 0
                        ? "No doctors available"
                        : "Choose a doctor"}
                    </option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        Dr. {doc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Important Note
                </h3>
                <p className="text-sm text-gray-600">
                  Please arrive 15 minutes before your scheduled time. If you
                  need to cancel, inform us at least 24 hours in advance.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={booking}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium transition hover:bg-blue-700 ${
                  booking ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {booking ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
