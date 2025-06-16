from bson import ObjectId
from fastapi import Request, HTTPException , status
from app.models.user.user import User
from app.services.users_service.users import get_user , UserRole
from typing import Optional



def convert_object_id(data: dict) -> dict:
    if "_id" in data and isinstance(data["_id"], ObjectId):
        data["_id"] = str(data["_id"])
    return data


async def get_user_config(request: Request) -> User:
    user_id = request.state.user
    if not user_id:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = {"user id not found"}
        )
    user_config = await get_user(user_id)
    if not user_config:
        raise HTTPException(
            status_code = 400,
            detail = {"user details not found"}
        )
    return user_config


def router_activator(roles: list[int]) -> Optional[User]:
    async def dependency(request: Request):
        user: User = await get_user_config(request)
        if user.role not in roles:
            raise HTTPException(
                status_code=403,
                detail={"message": "User does not have permission", "code": 403}
            )
        return user
    return dependency
    
