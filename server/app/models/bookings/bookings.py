from beanie import Document , Link 
from app.models.user.user import User
from app.models.movies.movies import Movies
from app.models.theaters.theaters import Theaters
from app.models.screenings.screenings import Screenings
from datetime import datetime
from pydantic import BaseModel , Field
from app.interfaces.bookings.bookings import (
    SeatType , PaymentStatus , Status, PaymentMethod
)



class Seates(BaseModel):
    seat_number: str
    seat_type: SeatType
    price: float

class Bookings(Document):
    user_id: Link[User]
    movie_id: Link[Movies]
    theater_id: Link[Theaters]
    screening_id: Link[Screenings]
    booking_date: datetime
    seates: list[Seates]
    total_amount: float
    status: Status
    payment_method: PaymentMethod
    payment_status: PaymentStatus
    qrcode: str = Field(..., description = "Base64-encoded QR code string")
    created_at: datetime
    updated_at: datetime