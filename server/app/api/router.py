from fastapi import APIRouter;
from app.api.endpoints.auth import login , register
from app.api.endpoints.user import user
from app.api.endpoints.movies import movies


api_router = APIRouter()

api_router.include_router(register.router)
api_router.include_router(login.router)
api_router.include_router(user.router)
api_router.include_router(movies.router)