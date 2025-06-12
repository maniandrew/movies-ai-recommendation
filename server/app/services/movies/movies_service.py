from app.models.movies.movies import Movies
from app.models.theaters.theaters import Theaters

async def get_movies_list():
    movies: list[Movies] = await Movies.find_all().limit(100).to_list()
    return movies or []


async def add_screen():
    theaters:list[Theaters] = await Theaters.find_all().limit(100).to_list()
    return theaters or []