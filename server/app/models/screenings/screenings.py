from beanie import Document , Indexed , Link
from app.models.movies.movies import Movies
from app.models.theaters.theaters import Theaters
from datetime import datetime


class Screenings(Document):
    movie_id: Link[Movies]  = Indexed()
    theater_id: Link[Theaters] = Indexed()
    screen_id: str
    start_time: datetime
    end_time: datetime
    ticket_price: float
    total_seats: int
    available_seats: int
    status: bool
    created_by: str
    last_updated:datetime = datetime.now()
    is_deleted: bool
    
    class Settings:
        name = 'screenings'
        use_state_management = True
        
        
        
        
        
        
# {
#   "_id": "screening123",
#   "movie_id": "573a1390f29313caabcd50e5",
#   "theater_id": "59a47286cfa9a3a73e51e72c",
#   "screen_id": "I1",
#   "start_time": "2025-06-15T19:30:00Z",
#   "end_time": "2025-06-15T21:18:00Z",
#   "ticket_price": 12.50,
#   "total_seats": 159,
#   "remaining_seats": 157,
#   "format": "2D",
#   "status": "active",
#   "language": "English",
#   "subtitles": ["Spanish"],
#   "created_by": "admin123",
#   "last_updated": "2025-06-12T22:05:00Z"
# }
