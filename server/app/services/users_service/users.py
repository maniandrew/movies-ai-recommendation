from uuid import uuid4
from app.models.user.user import User
from datetime import datetime
from app.interfaces.user.user import UserRole
from typing import Optional
from bson import ObjectId

async def get_all_users() -> list[User]:
   users = await User.find_all().to_list()
   return users

async def create_user(encodings: list , name: str):
    try:
        face_encoding = encodings.tolist()
        # Get today's date in YYYYMMDD format
        date_str = datetime.now().strftime('%Y%m%d')
        email = f"{date_str}_{uuid4().hex[:6]}@gmail.com"
        new_user = User(
            name = name,
            email= email,
            face_encodings = [face_encoding],
            is_active = True,
            is_deleted =  False,
            created_at = datetime.now(),
            role = UserRole.ADMIN
        )
        await new_user.insert()
        return True
    except Exception as e:
        print(e)
        return False
    
async def get_all_user_details() -> list:
    users = await User.find({"face_encodings": {"$exists": True}}).limit(10).to_list()
    return users or []


async def get_user(user_id: str) -> Optional[User]:
    try:
        user = await User.find_one({"_id": ObjectId(user_id)})
        return user
    except:
        return None
    
    

        
    
    