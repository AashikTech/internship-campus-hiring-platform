from pydantic import BaseModel, ConfigDict, Field


class CompanyOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    name: str
    industry: str = ""
    website: str = ""
    description: str = ""
    location: str = ""


class CompanyProfileUpdate(BaseModel):
    name: str | None = None
    industry: str | None = None
    website: str | None = None
    description: str | None = None
    location: str | None = None


class PostOut(BaseModel):
    id: int
    company_id: int
    company_name: str = ""
    title: str
    description: str
    location: str = ""
    internship_type: str = ""
    duration: str = ""
    stipend: str = ""
    is_open: bool = True
    posted_at: object | None = None
    skills: list[str] = []


class PostIn(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: str = Field(min_length=1)
    location: str = ""
    internship_type: str = ""
    duration: str = ""
    stipend: str = ""
    skills: list[str] = []


class PostUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    location: str | None = None
    is_open: bool | None = None


class StatusIn(BaseModel):
    status: str = Field(pattern="^(applied|shortlisted|interview|selected|rejected)$")


class ApplicantOut(BaseModel):
    id: int
    student_id: int
    student_name: str = ""
    email: str = ""
    status: str
    cover_note: str = ""
    applied_at: object | None = None
    skills: list[str] = []
