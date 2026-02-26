import { useEffect, useState, useContext } from "react";
import { HospitalContext } from "../context/HospitalContext";
import api from "../utils/api";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.get("/api/user/patient");
        setPatients(res.data.patients);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Patient Registry
          </h1>
        </header>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-0 sm:w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Username
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {patients.map((pat, index) => (
                <tr key={pat._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">#{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {pat.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">@{pat.username}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
