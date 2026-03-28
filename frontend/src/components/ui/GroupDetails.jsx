// pages/GroupDetails.jsx
import { useParams } from "react-router-dom";

export default function GroupDetails() {
  const { id } = useParams();

  // Dummy data (replace with API later)
  const group = {
    id,
    name: "Team Alpha",
    members: ["Alice", "Bob", "Charlie", "David"],
    assignments: [
      { title: "Math Assignment", status: "Completed" },
      { title: "Science Project", status: "Pending" },
      { title: "React Task", status: "Pending" },
    ],
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">{group.name}</h1>
        <p className="text-sm text-gray-500">Group ID: {group.id}</p>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Members Section */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-4">Members</h2>

          <div className="flex flex-col gap-3">
            {group.members.map((member, i) => (
              <Avatar key={i} name={member} />
            ))}
          </div>
        </div>

        {/* Assignments Section */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-4">Assignments</h2>

          <div className="flex flex-col gap-3">
            {group.assignments.map((a, i) => (
              <GroupAssignmentItem key={i} {...a} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
