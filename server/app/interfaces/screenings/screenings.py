from pydantic import BaseModel
from typing import Optional
from enum import Enum

class ScreeningStatus(str , Enum):
    ACTIVE = "active"
    CANCELLED = "cancelled"
    COMPLETED = "completed"
    SOLD = "sold"
    UPCOMING = "upcoming"
    inactive = "inactive"

class ScreeningRequestParams(BaseModel):
    movie_id: Optional[str] = None
    theater_id: Optional[str] = None
    screen_id: Optional[str] = None
    ticket_price: Optional[float] = None
    total_seats: Optional[float] = None
    status: Optional[ScreeningStatus] = None


    