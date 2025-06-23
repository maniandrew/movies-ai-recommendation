from fastapi import APIRouter
from app.interfaces.bookings.bookings import BookingRequestParams
from app.services.bookings.bookings import validate_bookings_request

router = APIRouter(prefix="/bookings" , tags=['Bookings'])

@router.post('/add')
async def create_bookings(request: BookingRequestParams):
    bookings =  validate_bookings_request(request)
    return bookings