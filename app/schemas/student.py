from pydantic import BaseModel, ConfigDict, Field


class ProfileOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    bio: str = ""
    education: str = ""
    resume_url: str = ""
    phone: str = ""


class StudentProfileUpdate(BaseModel):
    bio: str | None = None
    education: str | None = None
    resume_url: str | None = None
    phone: str | None = None


class SkillOut(BaseModel):
    id: int
    name: str


class SkillIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class ApplicationIn(BaseModel):
    post_id: int
    cover_note: str = ""


class ApplicationOut(BaseModel):
    id: int
    student_id: int
    post_id: int
    post_title: str = ""
    company_name: str = ""
    status: str
    cover_note: str = ""
    applied_at: object | None = None
    updated_at: object | None = None
