from enum import IntEnum, Enum
from datetime import datetime
from pydantic import BaseModel
from typing import List


class SeatType(IntEnum):
    PLATINUM = 1
    GOLD = 2
    BRONZE = 3


class Status(str, Enum):
    CONFIRMED = 'Confirmed'
    CANCELLED = 'Cancelled'
    REFUNDED = 'Refunded'


class PaymentMethod(str, Enum):
    CREDIT_CARD = 'Credit Card'
    DEBIT_CARD = 'Debit Card'
    UPI = 'UPI'
    PAYPAL = 'PayPal'


class PaymentStatus(str, Enum):
    PAID = 'Paid'
    PENDING = 'Pending'
    FAILED = 'Failed'


class Seates(BaseModel):
    seat_number: str
    seat_type: SeatType
    price: float


class BookingRequestParams(BaseModel):
    user_id: str
    movie_id: str
    theater_id: str
    screening_id: str
    booking_date: datetime
    seates: List[Seates]
    total_amount: float
    status: Status
    payment_method: PaymentMethod
    payment_status: PaymentStatus
    qrcode: str
