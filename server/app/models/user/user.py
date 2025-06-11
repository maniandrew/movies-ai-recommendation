from pydantic import EmailStr
from beanie import Document , Indexed
from app.interfaces.user.user import UserRole
from datetime import datetime


class User(Document):
    name: str = Indexed()
    email: EmailStr
    is_active: bool = Indexed()
    is_deleted: bool
    face_encodings: list[list[float]] = Indexed() 
    role: UserRole
    created_at: datetime
    
    class Settings:
        name = 'users'
   