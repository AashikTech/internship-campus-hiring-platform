# Internship & Campus Hiring Platform

A full-stack platform that connects students looking for internships with companies that want to hire interns.

## Overview

Students create profiles with skills, search internship posts, apply, and track application status (Applied → Shortlisted → Interview → Selected). Companies register, post internships with required skills, and manage applicants. An admin oversees users, posts, and applications.

## Tech Stack

| Layer   | Technology                                   |
| ------- | -------------------------------------------- |
| Backend | Python 3.12, FastAPI, SQLAlchemy, JWT, bcrypt |
| Frontend| React.js + Bootstrap + Axios (Vite)          |
| Database| PostgreSQL (SQLite fallback for local dev)    |
| CI/CD   | GitHub Actions                               |
| Hosting | Render/Railway (backend), Vercel/Netlify (front) — later phases |

## Features

- Student: register, profile, skills, browse/search internships, apply, status board
- Company: register, profile, post internships, view applicants, update status
- Admin: manage students, companies, posts, applications
- Skills matching between post requirements and student skills

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+ (for the frontend)
- Git

### Setup

```bash
git clone https://github.com/AashikTech/internship-campus-hiring-platform.git
cd internship-campus-hiring-platform
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS / Linux
pip install -r requirements.txt
```

### Environment

```bash
copy .env.example .env        # Windows
# cp .env.example .env        # macOS / Linux
# edit .env: set SECRET_KEY and DATABASE_URL
```

### Run the backend

```bash
uvicorn app.main:app --reload
```

- Interactive API docs (Swagger): http://localhost:8000/docs
- Health check: http://localhost:8000/api/v1/health

### Run the frontend

Open a second terminal (keep the backend running):

```bash
cd frontend
npm install
npm run dev
```

- App: http://localhost:5173
- The frontend calls the backend on `http://localhost:8000` (Vite proxy) and is already allowed by the backend CORS config.

### Run the tests

```bash
pytest -v
```

### Lint

```bash
black --check app tests
flake8 app tests
```

## Environment Variables

| Variable                 | Description                     | Required |
| ------------------------ | ------------------------------- | -------- |
| SECRET_KEY               | JWT signing key                 | Yes      |
| DATABASE_URL             | DB connection string            | No*      |
| JWT_ALGORITHM            | HS256                           | No       |
| ACCESS_TOKEN_EXPIRE_MINUTES | Token lifetime               | No       |
| BACKEND_CORS_ORIGINS     | Allowed frontend origins        | No       |
| SMTP_HOST / SMTP_USER / SMTP_PASSWORD / SMTP_FROM | Email integration | No (later phase) |

\* Falls back to local SQLite if empty.

## API Endpoints

All endpoints live under `/api/v1`. Every response uses a consistent JSON shape where applicable and the correct HTTP status codes.

### Auth (`/auth`)

| Method | Path      | Description                              | Auth   |
| ------ | --------- | ---------------------------------------- | ------ |
| POST   | /register | Register as student or company (201)     | Public |
| POST   | /login    | Get JWT access token                     | Public |
| GET    | /me       | Current user profile                     | Bearer |

### Student (`/students`)

| Method | Path                | Description                         | Auth           |
| ------ | ------------------- | ----------------------------------- | -------------- |
| GET    | /profile            | Own student profile                 | student        |
| PATCH  | /profile            | Update bio/education/resume_url/phone | student      |
| GET    | /skills             | List own skills                     | student        |
| POST   | /skills             | Add a skill (201)                   | student        |
| GET    | /posts              | Browse open posts (query/location/skill filters) | student |
| POST   | /applications       | Apply to a post (201)               | student        |
| GET    | /applications       | Application status board            | student        |

### Company (`/companies`)

| Method | Path                              | Description                | Auth           |
| ------ | --------------------------------- | -------------------------- | -------------- |
| GET    | /profile                          | Own company profile        | company        |
| PATCH  | /profile                          | Update company details     | company        |
| POST   | /posts                            | Post an internship (201)   | company        |
| GET    | /posts                            | List own posts             | company        |
| PATCH  | /posts/{post_id}                  | Update / close a post      | company        |
| GET    | /posts/{post_id}/applicants       | View applicants            | company        |
| PATCH  | /applications/{application_id}/status | Advance/reject applicant | company    |

### Admin (`/admin`)

| Method | Path    | Description        | Auth  |
| ------ | ------- | ------------------ | ----- |
| GET    | /users  | List all users     | admin |
| GET    | /posts  | List all posts     | admin |

Swagger UI is auto-generated by FastAPI at `/docs` (needs no extra setup).

## Diagrams

Architecture, ER, and module diagrams are in [`docs/diagrams/`](docs/diagrams/).

## Folder Structure

```
.
├── app/
│   ├── api/          # routers
│   ├── core/         # config, security
│   ├── db/           # engine + session
│   └── models/       # SQLAlchemy models
├── frontend/
│   └── src/          # React app (Vite)
├── docs/
│   ├── db-schema.md
│   ├── domain-study.md
│   └── diagrams/     # architecture, ER, module (.md + .drawio)
├── tests/
├── .github/workflows/
├── Problem_Statement.md
├── requirements.txt
└── README.md
```

## Deployment / CI/CD

GitHub Actions workflow (`.github/workflows/backend.yml`) runs lint + tests on every push/PR to `main`. Cloud deployment (Render/Railway + Vercel) lands in the Week 6 phase.

## Future Enhancements

- AI resume / skill-matching scoring (Day 42–59 enhancement)
- Email notifications on status change
- Company review/approval flow for company accounts

## License

MIT — see [LICENSE](LICENSE).

## Author

Aashik Ahmed (aashikahamed029@gmail.com)