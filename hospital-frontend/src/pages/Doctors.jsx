import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {HospitalContext} from "../context/HospitalContext";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl, navigate } = useContext(HospitalContext);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/doctors`);
        setDoctors(res.data.doctors);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [backendUrl]);

  return (
   <div className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto px-6 py-10">

    <header className="mb-10">
      <h1 className="text-2xl font-semibold text-gray-900">
        Our Specialists
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Consult with our medical professionals
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doc) => (
        <div
          key={doc._id}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-semibold mb-4">
            {doc.name.charAt(0)}
          </div>

          <h3 className="text-lg font-medium text-gray-900">
            Dr. {doc.name}
          </h3>

          <p className="text-sm text-gray-500 mt-1 mb-4">
            Medical Specialist
          </p>

          <button
            onClick={() => navigate("/book")}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}

