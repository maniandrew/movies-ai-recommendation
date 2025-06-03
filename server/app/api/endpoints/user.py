from fastapi import APIRouter
from app.models.users import get_all_users 

router = APIRouter(prefix="/user" , tags=['Users'])

@router.get('/')
async def getUsers():
    users = await get_all_users()
    return users

