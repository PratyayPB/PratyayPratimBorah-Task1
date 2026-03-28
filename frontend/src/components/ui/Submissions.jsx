// components/submissions/SubmissionTable.jsx
export default function Submissions({ submissions }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Status</th>
            <th className="p-3">Submitted At</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((s, i) => (
            <tr key={i} className="border-t text-sm">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.status}</td>
              <td className="p-3">{s.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/*Student name ,group name*/
