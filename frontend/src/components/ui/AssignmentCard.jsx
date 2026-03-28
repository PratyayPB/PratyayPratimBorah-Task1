// components/assignments/AssignmentCard.jsx
export default function AssignmentCard({
  title,
  description,
  dueDate,
  status,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-md transition">
      <h2 className="text-md font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="text-sm text-gray-500">Due: {dueDate}</p>

      <span
        className={`text-xs px-2 py-1 rounded w-fit ${
          status === "Completed"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
