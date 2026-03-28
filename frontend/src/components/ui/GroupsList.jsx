// pages/Groups.jsx
import Layout from "../components/layout/Layout";
import GroupCard from "../components/groups/GroupCard";

export default function Groups() {
  const groups = [
    { id: 1, name: "Team Alpha", members: 5, assignments: 3 },
    { id: 2, name: "React Ninjas", members: 8, assignments: 6 },
    { id: 3, name: "Backend Squad", members: 4, assignments: 2 },
    { id: 4, name: "UI/UX Crew", members: 6, assignments: 5 },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-xl font-semibold">Groups</h1>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
          Create Group
        </button>
      </div>

      {/* Grid */}
      <div
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {groups.map((group) => (
          <GroupCard key={group.id} {...group} />
        ))}
      </div>
    </Layout>
  );
}
