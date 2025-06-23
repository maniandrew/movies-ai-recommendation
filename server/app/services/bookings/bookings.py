from app.interfaces.bookings.bookings import BookingRequestParams

def validate_bookings_request(request: BookingRequestParams) -> None:
    print(request)
    return True
    