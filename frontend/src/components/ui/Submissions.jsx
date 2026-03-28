// components/submissions/SubmissionTable.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/submissions/",
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );
        setSubmissions(response.data || []);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError("Unable to load submissions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Submissions</h2>
      {loading ? (
        <p className="text-sm text-gray-600">Loading submissions...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : submissions.length === 0 ? (
        <p className="text-sm text-gray-600">No submissions found.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Student Name</th>
              <th className="py-2">Group Name</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, i) => (
              <tr key={sub.id || i} className="border-b">
                <td className="py-2">{sub.studentName || "Unknown"}</td>
                <td className="py-2">{sub.groupName || "Unknown"}</td>
                <td className="py-2">{sub.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
