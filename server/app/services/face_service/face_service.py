from app.services.users_service.users import (
    create_user,
    get_user_details
)
from app.utils.face_utils import (
    extract_face_encoding ,
    authenticate_by_users_face , 
)

from app.core.auth.auth import AuthService

authService = AuthService()


async def face_unlock_register(img_bytes: bytes, name: str) -> dict:
    if not name:
        return {'message': 'User Name is Required', 'status_code': 400}

    encoding = extract_face_encoding(img_bytes)
    
    if encoding is None:
        return {'message': 'We are not able to recognize your face', 'status_code': 400}
    
    users = await get_user_details()
    
    if users is None:
        users = []
    
    is_duplicated = authenticate_by_users_face(users , encoding)
    
    if is_duplicated is not None:
        return {'message': 'User already exists', 'status_code': 400}
        
    user_creation = await create_user(encoding , name)
    
    if not user_creation:
        return {'message': 'User creation failed', 'status_code': 400}

    return {'message': 'User successfully registered', 'status_code': 200}


async def face_lock_validation(img_bytes: bytes) -> dict:
    all_users = await get_user_details()
    if not all_users:
        return {
            'message': 'Unauthenticated. No users found. Please register first.',
            'status_code': 400
        }
    # 2. Extract encoding from uploaded image
    encoding = extract_face_encoding(img_bytes)
    if encoding is None:
        return {
            'message': 'We are not able to recognize your face. Please try again.',
            'status_code': 400
        }
    # 3. Match face with stored users
    matched_user = authenticate_by_users_face(all_users, encoding)
    if not matched_user:
        return {
            'message': 'Unauthenticated. Face not matched.',
            'status_code': 401
        }
    # 4. Generate JWT token
    username = matched_user.get("name")
    if not username:
        return {
            'message': 'User record invalid. Username missing.',
            'status_code': 500
        }
    
    token = authService.create_token(username)

    return {
        'message': 'Successfully Authenticated',
        'status_code': 200,
        'user': username,
        'token': token
    }
