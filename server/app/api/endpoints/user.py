from fastapi import APIRouter
from app.models.users import get_all_users , update_users

router = APIRouter(prefix="/user" , tags=['Users'])

@router.get('/')
async def getUsers():
    users = await get_all_users()
    return users

@router.get('/profiles')
async def getUserProfiles():
    users = await update_users()
    return users