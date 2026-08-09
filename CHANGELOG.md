# Changelog

All notable changes to this project are documented in this file.
Format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased] — Week 1

### Added

- Problem_Statement.md finalized (Project #59 — Internship & Campus Hiring Platform)
- Repository scaffold: FastAPI backend skeleton, SQLAlchemy models, CI workflow
- Root files: .gitignore, LICENSE (MIT), .env.example, README.md, COMMIT_TRACKER.md
- docs/db-schema.md: initial 8-table schema with relationships

### Day 11 (Review-I)

- Architecture, ER, and class/module diagrams under docs/diagrams/ (.md + rendered .png)
- Auth flow issuing JWT (login / signup / me endpoints)
- Student, company, and admin API modules wired end-to-end
- Backend test suite (pytest) and CI lint + test pipeline (black, flake8)
- React frontend (Vite + Bootstrap): login, signup, student and company dashboards
- Student flow: browse and apply to internship posts
- Company flow: post and manage internship openings