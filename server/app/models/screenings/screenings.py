from beanie import Document , Indexed , Link
from app.models.movies.movies import Movies
from app.models.theaters.theaters import Theaters
from datetime import datetime
from app.interfaces.screenings.screenings import ScreeningStatus


class Screenings(Document):
    movie_id: Link[Movies]  = Indexed()
    theater_id: Link[Theaters] = Indexed()
    screen_id: str
    start_time: datetime
    end_time: datetime
    ticket_price: float
    total_seats: int
    available_seats: int
    status: ScreeningStatus
    created_by: str
    last_updated:datetime = datetime.now()
    is_deleted: bool
    
    class Settings:
        name = 'screenings'

