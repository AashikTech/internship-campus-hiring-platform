import { useEffect, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import TrustedCompanies from "../components/TrustedCompanies.jsx";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  async function loadPosts() {
    const res = await api.get("/students/posts", { params: { query } });
    setPosts(res.data);
  }

  async function loadApplications() {
    const res = await api.get("/students/applications");
    setApplications(res.data);
  }

  useEffect(() => {
    loadPosts();
    loadApplications();
  }, []);

  async function apply(postId) {
    try {
      await api.post("/students/applications", { post_id: postId });
      setMessage("Application submitted.");
      loadApplications();
    } catch (err) {
      setMessage(err.response?.data?.detail || "Could not apply.");
    }
  }

  return (
    <div>
      <h2>Welcome, {user.full_name}</h2>
      <p className="text-muted">Browse internships and apply.</p>
      {message && <div className="alert alert-info py-2">{message}</div>}

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadPosts()}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-outline-primary w-100" onClick={loadPosts}>
            Search
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-7">
          <h5>Open internships</h5>
          {posts.length === 0 && <p className="text-muted">No internships found.</p>}
          {posts.map((p) => (
            <div className="card mb-3" key={p.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-1">{p.title}</h6>
                  <button className="btn btn-sm btn-primary" onClick={() => apply(p.id)}>
                    Apply
                  </button>
                </div>
                <div className="text-muted small mb-2">
                  {p.company_name} · {p.location} · {p.internship_type} · {p.duration} · {p.stipend}
                </div>
                <p className="small mb-2">{p.description}</p>
                <div>
                  {p.skills.map((s) => (
                    <span className="badge bg-light text-dark me-1" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-5">
          <h5>My applications</h5>
          {applications.length === 0 && <p className="text-muted">No applications yet.</p>}
          <ul className="list-group">
            {applications.map((a) => (
              <li className="list-group-item d-flex justify-content-between" key={a.id}>
                <div>
                  <strong>{a.post_title}</strong> — {a.company_name}
                </div>
                <span
                  className={`badge ${a.status === "rejected" ? "bg-danger" : "bg-success"} align-self-center`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <TrustedCompanies />
    </div>
  );
}
