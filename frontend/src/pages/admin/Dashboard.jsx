import { useState, useEffect } from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import AssignmentCard from "../../components/ui/AssignmentCard";
import axios from "axios";
// ── Avatar URLs ──────────────────────────────────────────────────────────────
const AVATARS = {
  crispr: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBWdLp7t6tZKYyIMwZFJwwcntTa3IUlDFTGBzz9cvGpmcmfPW2wjmPOIUExULHN8lu9OSi0mnQsjYGgfshd7NyNMgL5QQz5ye-NkJQ9vou2Yto-vp_IWRjhex8HXpbs3CPBqlF-cKtAuoDzxEHO613w2Bhmivx3c9_lAImOGlm_UGzkldKlyoMNLeTIwJoZG6PiLkm8s6ayHsaZjX2VWn5NwhpS3h7l2V9uvp_jvGH9nXWrjtkrSH9KqOqO1cJs_O8j1fbJRhRReXbK",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCzlOnuzUmP5V907pm8Xrgq1vORQDmmGxW-PzrFjcSViBMrWbBZeonvrTmCacTd_iwmnRBr1S8OvYTJ6ZeOAQ5V023aLZ3eC9VuwAuh5-wlIGnG3SwlGdGuq-yUxmRNiK1iCYW5fccCMjQ67gmqqzdXJHaZa_v5J_e9hd0oQweo187I0tktiwJMGa2-hHL_4-bv6-XIw_jRyIeNae2UrAgrGNd8L-TowaQekSIZk-duWCXBDJSGYXHOM-sjeeyKRWOjgA4JlHynGQrs",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDi-zkBlJ1LYBqvRfhU0f9mAkP2G4NmxOq6XheJUAI5VaW3uflx1L2UJwtcz_5M--Snki7hzvkaQ1GOx6MWvPZR7rdBlmFENtPzNt25d9I16aiUXskKVupjyDi_bHJglclOQoK-LZs0JeFL0JajxpUVTqvtfLv8JnfGAVjQCV5be6Aalul2c00SHYngXzRaid8ut7GIZPk6FsKmat3O8SDxd3_ZQvAi32Eq7gwANgEoKd1x6scUBab-VHUWkST48EZzRF2PdxFNKzwL",
  ],
};
// reuse same set for other cards
const AV2 = AVATARS.crispr.slice(0, 2);
const AV3 = AVATARS.crispr;

// ── Icon helpers ─────────────────────────────────────────────────────────────
const BellIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);
const AddTaskIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10.01L22 5.18zm-2.21 5.04c.13.57.21 1.17.21 1.78 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44A9.9 9.9 0 0012 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.6-3.4l-1.61 1.62z" />
  </svg>
);

const PROFILE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_Zajs6WPoj5eQ81hSOYLZzaGab_hKAl1u8KXuo0_1w31T4HPagL8yz6P8vGTI4dMeFS9kE9XLK3HBn1XqTJvazzhambm3cawbyXFqr3vYp0AVLJVuz3qXqxsfopB-7GuaHVw1dps_iOqyFN1npu0qCmoptuML25GwCtL--fUg2l4Mmcas7em7cbK5WTIvj17z9tjF8IU-ZM2UuiAVebuHFJck-yeG3nWXEZG2Zl-k8Anl0sRPXvhBjDm4JMWElRmplVZD7xc1yXMA";

// ── Status chip ───────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Submitted: { bg: "#16893a", text: "#fff", dot: "#fff" },
  Pending: { bg: "#dfe3e8", text: "#43474c", dot: "#f59e0b" },
  Overdue: { bg: "#ffdad6", text: "#93000a", dot: "#ba1a1a" },
};
function StatusChip({ status }) {
  const c = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
      style={{ background: c.bg, color: c.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: c.dot }}
      />
      {status}
    </span>
  );
}

// ── Assignment icon map ───────────────────────────────────────────────────────
const AssignIcon = ({ type }) => {
  const cls = "w-5 h-5 fill-current text-[#727785]";
  if (type === "draw")
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path d="M20.71 4.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
      </svg>
    );
  if (type === "voice")
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" />
      </svg>
    );
  if (type === "analytics")
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 24 24">
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );
};

export default function AdminDashboard() {
  const [notifCount] = useState(3);
  const [submissions, setSubmissions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const getUserFromToken = () => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) return null;
    try {
      const payload = jwtToken.split(".")[1];
      if (!payload) return null;
      const decoded = JSON.parse(atob(payload));
      return {
        id: decoded?.id || decoded?._id || decoded?.userId || null,
        name: decoded?.name || null,
      };
    } catch (err) {
      console.error("Failed to decode token", err);
      return null;
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (
      !assignmentData.title.trim() ||
      !assignmentData.description.trim() ||
      !assignmentData.dueDate
    )
      return;

    const user = getUserFromToken();
    if (!user || !user.id) {
      alert("User not authenticated");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/assignments/",
        {
          title: assignmentData.title,
          description: assignmentData.description,
          dueDate: assignmentData.dueDate,
          createdBy: user.id,
          username: user.name || "Unknown",
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );

      // Refetch assignments
      const assignmentsRes = await axios.get(
        "http://localhost:5000/api/assignments",
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );
      setAssignments(assignmentsRes.data || []);

      setIsModalOpen(false);
      setAssignmentData({ title: "", description: "", dueDate: "" });
    } catch (err) {
      console.error("Error creating assignment:", err);
      alert("Failed to create assignment");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found in local storage");
          return;
        }

        const [submissionsRes, assignmentsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/submissions/", {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }),
          axios.get("http://localhost:5000/api/assignments/", {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }),
        ]);

        setSubmissions(submissionsRes.data || []);
        setAssignments(assignmentsRes.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Unable to load dashboard data. Please try again later.");
      }
    };

    const fetchUser = async () => {
      const userData = getUserFromToken();
      if (!userData || !userData.id) {
        console.warn("No user data found in token");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        console.log("Fetching user data for userId:", userData.id);
        const userRes = await axios.get(
          `http://localhost:5000/api/users/${userData.id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );
        setUser(userRes.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    const runAll = async () => {
      await Promise.all([fetchData(), fetchUser()]);
      setLoading(false);
    };

    runAll();
  }, []);

  return (
    <div style={{ background: "#f8f9fa" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-30 flex justify-between items-center px-8 lg:px-10 py-5"
        style={{
          background: "rgba(248,249,250,0.88)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div>
          <h1
            className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#191c1d]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Hello, {user?.name || "Jane Doe"}!
          </h1>
          <p
            className="text-sm text-[#5f6368] mt-0.5"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Here is what is happening with your scholarly projects today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="relative p-2 rounded-full transition-colors text-[#414754]"
            style={{ background: "#e7e8e9" }}
          >
            <BellIcon />
            {notifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#005bbf] text-white text-[9px] font-bold flex items-center justify-center">
                {notifCount}
              </span>
            )}
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#005bbf]/15">
            <img
              src={PROFILE}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <div className="px-8 lg:px-10 space-y-12">
        {/* Submissions section */}
        <section>
          <div className="mb-6">
            <h2
              className="text-2xl font-bold text-[#191c1d]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Submissions
            </h2>
            <p
              className="text-sm text-[#5f6368] mt-0.5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Recent submissions from students.
            </p>
          </div>
          {loading ? (
            <p className="text-sm text-[#414754]">Loading submissions...</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : submissions.length === 0 ? (
            <p className="text-sm text-[#414754]">No submissions found.</p>
          ) : (
            <div className="bg-white rounded-xl shadow p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Student Name</th>
                    <th className="py-2">Group Name</th>
                    <th className="py-2">Assignment</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, i) => (
                    <tr key={sub.id || i} className="border-b">
                      <td className="py-2">{sub.studentName || "Unknown"}</td>
                      <td className="py-2">{sub.groupName || "Unknown"}</td>
                      <td className="py-2">
                        {sub.assignmentTitle || "Unknown"}
                      </td>
                      <td className="py-2">{sub.status || "Pending"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Assignments section */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2
                className="text-2xl font-bold text-[#191c1d]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Assignments
              </h2>
              <p
                className="text-sm text-[#5f6368] mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Upcoming deadlines and submission status.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
              style={{
                fontFamily: "Inter, sans-serif",
                background: "linear-gradient(180deg,#005bbf,#1a73e8)",
                boxShadow: "0 8px 24px -4px rgba(0,91,191,0.2)",
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Create Assignment
            </button>
          </div>
          <div className="p-4 md:p-6">
            {loading ? (
              <p className="text-sm text-[#414754]">Loading assignments...</p>
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : assignments.length === 0 ? (
              <p className="text-sm text-[#414754]">No assignments found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {assignments.map((a, i) => (
                  <AssignmentCard
                    key={a.id || i}
                    title={a.title || "Untitled"}
                    description={a.description || a.sub || "No description"}
                    dueDate={a.dueDate || a.date || "TBD"}
                    status={a.status || "Pending"}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* FAB */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg,#005bbf,#1a73e8)",
          boxShadow: "0 12px 32px -4px rgba(0,91,191,0.35)",
        }}
      >
        <AddTaskIcon />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Create New Assignment
            </h3>
            <form onSubmit={handleCreateAssignment}>
              <input
                type="text"
                value={assignmentData.title}
                onChange={(e) =>
                  setAssignmentData({
                    ...assignmentData,
                    title: e.target.value,
                  })
                }
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <textarea
                value={assignmentData.description}
                onChange={(e) =>
                  setAssignmentData({
                    ...assignmentData,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <input
                type="date"
                value={assignmentData.dueDate}
                onChange={(e) =>
                  setAssignmentData({
                    ...assignmentData,
                    dueDate: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
