from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.models import Company, StudentProfile, User


def register_user(
    db: Session, email: str, password: str, full_name: str, role: str
) -> User:
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    user = User(
        email=email,
        password_hash=hash_password(password),
        full_name=full_name,
        role=role,
    )
    db.add(user)
    db.flush()

    if role == "student":
        db.add(StudentProfile(user_id=user.id))
    elif role == "company":
        db.add(Company(user_id=user.id, name=full_name))

    db.commit()
    db.refresh(user)
    return user


def authenticate(db: Session, email: str, password: str) -> str:
    user = db.query(User).filter(User.email == email).first()
    if user is None or not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )
    return create_access_token(subject=str(user.id))
