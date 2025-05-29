import face_recognition
import numpy as np
from PIL import Image
import io
from fastapi import HTTPException
from app.core.config import db

collection = db['users']

def read_image_from_bytes(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    return np.array(image)

async def face_unlock(img_bytes):
    try:
        img_array = read_image_from_bytes(img_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image data: {str(e)}")

    unknown_encodings = face_recognition.face_encodings(img_array)
    if not unknown_encodings:
        raise HTTPException(400, detail="No Face Detected")

    unknown_encoding = unknown_encodings[0]

    all_users = await collection.find({'face_encodings': {'$exists': True}}).to_list(length=500)

    for user in all_users:
        known_encoding = np.array(user['face_encodings'])
        matches = face_recognition.compare_faces([known_encoding], unknown_encoding)
        if np.any(matches):
            user['_id'] = str(user['_id'])
            return {'message': "Successfully Authenticated", 'user': user}

    raise HTTPException(status_code=404, detail="No matching face found.")
