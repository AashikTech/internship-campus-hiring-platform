from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import require_roles
from app.db.base import get_db
from app.models import InternshipPost, User

router = APIRouter(prefix="/admin", tags=["admin"])
admin_guard = require_roles("admin")


@router.get("/users")
def list_users(db: Session = Depends(get_db), user: User = Depends(admin_guard)):
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [
        {
            "id": u.id,
            "email": u.email,
            "full_name": u.full_name,
            "role": u.role,
            "created_at": u.created_at,
        }
        for u in users
    ]


@router.get("/posts")
def list_all_posts(db: Session = Depends(get_db), user: User = Depends(admin_guard)):
    posts = db.query(InternshipPost).order_by(InternshipPost.posted_at.desc()).all()
    return [
        {
            "id": p.id,
            "company_id": p.company_id,
            "title": p.title,
            "is_open": p.is_open,
            "posted_at": p.posted_at,
        }
        for p in posts
    ]
