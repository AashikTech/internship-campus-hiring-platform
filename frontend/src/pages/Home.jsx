import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-5">
      <h1 className="display-5 mb-3">Internship & Campus Hiring Platform</h1>
      <p className="lead text-muted">
        Connect students looking for internships with companies that want to hire interns.
      </p>
      <div className="d-flex gap-2 justify-content-center mt-4">
        <Link to="/signup" className="btn btn-primary btn-lg">
          Create account
        </Link>
        <Link to="/login" className="btn btn-outline-primary btn-lg">
          Login
        </Link>
      </div>
    </div>
  );
}
