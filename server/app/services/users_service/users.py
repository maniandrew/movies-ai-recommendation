from app.core.database.db import db;
from datetime import datetime
from uuid import uuid4


collection = db['users'] # type: ignore

api_url = "https://randomuser.me/api/?results=500"


async def get_all_users():
    cursor = collection.find()
    users: list = []
    async for doc in cursor:
        doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
        users.append(doc)
    return users

async def create_user(encodings: list , name: str):
    try:
        face_encoding = encodings.tolist()
        # Get today's date in YYYYMMDD format
        date_str = datetime.now().strftime('%Y%m%d')
        email = f"{date_str}_{uuid4().hex[:6]}@gmail.com"
        collection.insert_one(
            {
            "email": email,
            "name": name,
            "face_encodings": [face_encoding]
            },
        )
        return True
    except Exception as e:
        return False
    
async def get_user_details() -> list:
    users = await collection.find({'face_encodings': {'$exists': True}}).to_list(length = 10)
    return users or []
    
    

        
    
    