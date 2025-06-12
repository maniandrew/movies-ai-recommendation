from fastapi import APIRouter
from app.services.movies.movies_service import get_movies_list , add_screen

router = APIRouter(prefix="/movies" , tags=['Movies'])

@router.get('/')
async def get_movies_details_list():
    movies = await get_movies_list()
    return movies

@router.get('/screens')
async def add_screens_to_theaters():
    return await add_screen()
