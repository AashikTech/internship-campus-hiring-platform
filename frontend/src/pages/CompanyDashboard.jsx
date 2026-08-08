import { useEffect, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import TrustedCompanies from "../components/TrustedCompanies.jsx";

const emptyForm = {
  title: "",
  description: "",
  location: "",
  internship_type: "",
  duration: "",
  stipend: "",
  skills: "",
};

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [applicants, setApplicants] = useState({});

  async function loadPosts() {
    const res = await api.get("/companies/posts");
    setPosts(res.data);
  }

  async function loadApplicants(postId) {
    const res = await api.get(`/companies/posts/${postId}/applicants`);
    setApplicants((prev) => ({ ...prev, [postId]: res.data }));
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function createPost(e) {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      await api.post("/companies/posts", payload);
      setForm(emptyForm);
      setMessage("Internship posted successfully.");
      loadPosts();
    } catch (err) {
      setMessage(err.response?.data?.detail || "Could not post the internship.");
    }
  }

  async function updateStatus(applicationId, status) {
    try {
      await api.patch(`/companies/applications/${applicationId}/status`, { status });
      setMessage("Applicant status updated.");
      loadPosts();
    } catch (err) {
      setMessage(err.response?.data?.detail || "Could not update status.");
    }
  }

  return (
    <div>
      <h2>Welcome, {user.full_name}</h2>
      {message && <div className="alert alert-info py-2">{message}</div>}

      <div className="row">
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Post an internship</h5>
              <form onSubmit={createPost}>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Title"
                    value={form.title}
                    onChange={update("title")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Description"
                    value={form.description}
                    onChange={update("description")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Location"
                    value={form.location}
                    onChange={update("location")}
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Type (e.g. Remote, On-site)"
                    value={form.internship_type}
                    onChange={update("internship_type")}
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Duration (e.g. 3 months)"
                    value={form.duration}
                    onChange={update("duration")}
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Stipend (e.g. Rs. 15,000/mo)"
                    value={form.stipend}
                    onChange={update("stipend")}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Skills (comma separated)"
                    value={form.skills}
                    onChange={update("skills")}
                  />
                </div>
                <button className="btn btn-primary w-100">Post internship</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <h5>My internships</h5>
          {posts.length === 0 && <p className="text-muted">No internships posted yet.</p>}
          {posts.map((p) => (
            <div className="card mb-3" key={p.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">
                    {p.title}{" "}
                    <span className={`badge ${p.is_open ? "bg-success" : "bg-secondary"}`}>
                      {p.is_open ? "Open" : "Closed"}
                    </span>
                  </h6>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => loadApplicants(p.id)}>
                    View applicants
                  </button>
                </div>
                <p className="small text-muted mb-2">
                  {p.location} · {p.internship_type} · {p.duration} · {p.stipend}
                </p>
                <p className="small mb-2">{p.description}</p>
                <div className="mb-2">
                  {p.skills.map((s) => (
                    <span className="badge bg-light text-dark me-1" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                {applicants[p.id] && (
                  <ul className="list-group">
                    {applicants[p.id].map((a) => (
                      <li className="list-group-item" key={a.id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{a.student_name}</strong> ({a.email})
                            <div className="text-muted small">{a.cover_note || "No cover note"}</div>
                          </div>
                          <select
                            className="form-select form-select-sm w-auto"
                            defaultValue={a.status}
                            onChange={(e) => updateStatus(a.id, e.target.value)}
                          >
                            <option value="applied">Applied</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interview">Interview</option>
                            <option value="selected">Selected</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TrustedCompanies />
    </div>
  );
}
