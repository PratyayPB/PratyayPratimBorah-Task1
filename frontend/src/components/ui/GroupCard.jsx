// components/groups/GroupCard.jsx
import { Link } from "react-router-dom";

export default function GroupCard({ id, name, members, assignments }) {
  return (
    <Link to={`/groups/${id}`}>
      <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{name}</h2>

        <div className="text-sm text-gray-500">{members} Members</div>

        <div className="text-sm text-gray-500">{assignments} Assignments</div>

        <div className="flex flex-wrap gap-2 mt-2">
          {Array.from({ length: Math.min(members, 4) }).map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gray-300" />
          ))}
        </div>
      </div>
    </Link>
  );
}
