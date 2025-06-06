from app.models.users import (
    create_user,
    get_user_details
)
from app.utils.face_utils import (
    extract_face_encoding ,
    authenticate_by_users_face , 
)

async def face_unlock_register(img_bytes: bytes, name: str) -> dict:
    if not name:
        return {'message': 'User Name is Required', 'status_code': 400}

    encoding = extract_face_encoding(img_bytes)
    if encoding is None:
        return {'message': 'We are not able to recognize your face', 'status_code': 400}

    isUserCreated = await create_user(encoding, name)
    if not isUserCreated:
        return {'message': 'User creation failed', 'status_code': 400}

    return {'message': 'User successfully registered', 'status_code': 200}


async def face_lock_validation(img_bytes: bytes) -> dict:
    all_users = await get_user_details()
    if not all_users:
        return {'message': 'Unauthenticated. Please register your face.', 'status_code': 400}
    encoding = extract_face_encoding(img_bytes)
    if encoding is None:
        return {'message': 'We are not able to recognize your face', 'status_code': 400}
    auth_user =  authenticate_by_users_face(all_users , encoding)
    if not auth_user:
        return {'message': 'Unauthenticated. Please register your face.', 'status_code': 400}
    print(auth_user)
    return {'message': 'Successfully Authenticated', 'status_code': 200 , 'user': auth_user }
