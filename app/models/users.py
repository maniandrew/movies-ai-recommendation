from app.core.config import db;
import requests
from io import BytesIO
from PIL import Image
import numpy as np
import face_recognition



collection = db['users']

api_url = "https://randomuser.me/api/?results=500"


async def get_all_users():
    cursor = collection.find()
    users: list = []
    async for doc in cursor:
        doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
        users.append(doc)
    return users


async def update_users():
    response =  requests.get(api_url)
    data =  response.json()
    
    for user_info in data['results']:
      name = f"{user_info['name']['first']} {user_info['name']['last']}"
      email = user_info['email']
      image_url = user_info['picture']['large']
      img_response = requests.get(image_url)
      img_bytes = BytesIO(img_response.content)
      pil_image = Image.open(img_bytes).convert('RGB')
      img_np = np.array(pil_image)
      encodings = face_recognition.face_encodings(img_np)
      if len(encodings) == 0:
       print(f"No face found for user {name}, skipping...")
       continue
      face_encoding = encodings[0].tolist()
      collection.update_one(
        {"email": email},
        {
            "$set": {
                "name": name,
                "email": email,
                "face_encodings": [face_encoding]
            }
        },
        upsert=True
    )
    return data['results']

        
    
    