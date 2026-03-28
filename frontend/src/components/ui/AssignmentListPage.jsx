// pages/Assignments.jsx

import { useState, useEffect } from "react";
import axios from "axios";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view assignments.");
          setLoading(false);
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/api/assignments/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("Fetched assignments:", response.data);
        setAssignments(response.data || []);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Unable to load assignments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        <p className="text-sm text-gray-600">Loading assignments...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : assignments.length === 0 ? (
        <p className="text-sm text-gray-600">No assignments found.</p>
      ) : (
        assignments.map((assignment, i) => (
          <div
            key={assignment.id || i}
            className="p-4 bg-white rounded-lg shadow"
          >
            <h3 className="text-lg font-medium">
              {assignment.title || "Untitled"}
            </h3>
            <p className="text-sm text-gray-600">
              Due Date: {assignment.dueDate || assignment.date || "TBD"}
            </p>
            <p className="text-sm text-gray-600">
              Creator: {assignment.creator || "Unknown"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
