from app.models.movies.movies import Movies

async def get_movies_list():
    movies: list[Movies] = await Movies.find_all().limit(100).to_list()
    return movies or []


            