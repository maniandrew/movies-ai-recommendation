import face_recognition;
from PIL import Image;
import numpy as np;
import io;
from app.utils.common_utils import convert_object_id
from app.models.user.user import User

def extract_face_encoding(img_bytes: bytes):
    try:
        img_array = read_image_from_bytes(img_bytes)
        unknown_encodings = face_recognition.face_encodings(img_array)
        if not unknown_encodings:
            return None
        return unknown_encodings[0]
    except Exception:
        return None


def read_image_from_bytes(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    return np.array(image)


def authenticate_by_users_face(
    all_users: list[User], input_encoding: list, threshold: float = 0.5
) -> list:
    input_encoding = np.array(input_encoding)
    
    best_match = None
    lower_distance = float('inf')
    
    for user in all_users:
        user_encodings = np.array(user.face_encodings or [])
        
        if user_encodings.ndim == 1:
            user_encodings = np.array([user_encodings])
        
        distances = face_recognition.face_distance(user_encodings , input_encoding)
        
        if len(distances) == 0:
            continue
        
        min_distance = np.min(distances)
        
        if min_distance < threshold and min_distance < lower_distance:
            lower_distance = min_distance
            best_match = user
    if best_match:
        return convert_object_id(best_match)
    return None