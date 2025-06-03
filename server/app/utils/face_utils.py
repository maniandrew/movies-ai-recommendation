import face_recognition;
from PIL import Image;
import numpy as np;
import io;

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


def authenticate_by_users_face(all_users: list, encoding: list) -> bool:
    encoding = np.array(encoding)  # Ensure encoding is a NumPy array

    for user in all_users:
        known_encoding = np.array(user['face_encodings'])
        print(known_encoding)
        # If user['face_encodings'] is a list of multiple encodings
        if len(known_encoding.shape) == 2:
            matches = face_recognition.compare_faces(known_encoding, encoding)
        else:
            matches = face_recognition.compare_faces([known_encoding], encoding)
        if np.any(matches):
            return True
    return False