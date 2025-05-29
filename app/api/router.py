from fastapi import APIRouter;
from app.api.endpoints import register , unlock , user


api_router = APIRouter()

api_router.include_router(register.router)
api_router.include_router(unlock.router)
api_router.include_router(user.router)