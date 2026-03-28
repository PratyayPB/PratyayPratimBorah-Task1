// pages/Groups.jsx

import { useState, useEffect } from "react";
import axios from "axios";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view groups.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/groups/", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        setGroups(response.data || []);
      } catch (err) {
        console.error("Error fetching groups:", err);
        setError("Unable to load groups. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-xl font-semibold">Groups</h1>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
          Create Group
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-sm text-gray-600">Loading groups...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : groups.length === 0 ? (
        <p className="text-sm text-gray-600">No groups found.</p>
      ) : (
        <div className="space-y-2">
          {groups.map((group) => (
            <div
              key={group.id || group.name}
              className="p-4 bg-white rounded-lg shadow"
            >
              <h2 className="text-lg font-medium">
                {group.name || group.title || "Unnamed Group"}
              </h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
