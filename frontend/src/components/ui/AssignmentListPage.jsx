// pages/Assignments.jsx
import Layout from "../components/layout/Layout";
import AssignmentCard from "../components/assignments/AssignmentCard";

export default function Assignments() {
  const data = [
    { title: "Math Assignment", dueDate: "Mar 30", status: "Pending" },
    { title: "Science Project", dueDate: "Apr 2", status: "Completed" },
  ];

  return (
    <Layout>
      <div
        className="grid gap-4 
                      grid-cols-1 
                      sm:grid-cols-2 
                      lg:grid-cols-3 
                      xl:grid-cols-4"
      >
        {data.map((item, i) => (
          <AssignmentCard key={i} {...item} />
        ))}
      </div>
    </Layout>
  );
}
