from beanie import Document , Indexed
from pydantic import BaseModel , Field
from typing import Optional

class Address(BaseModel):
    street1: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zipcode: Optional[str] = None

class GeoLocation(BaseModel):
    type: Optional[str] = None
    coordinates: Optional[list[float]] = []
    

class Location(BaseModel):
    address: Optional[Address] = None
    geo: Optional[GeoLocation] = None
    

class Screen(BaseModel):
    screen_id: str
    total_seats: int

class Theaters(Document):
    theater_id: int = Indexed()
    location: Optional[Location] = None
    screens: Optional[list[Screen]] = []
    is_active: bool = Indexed(default=True)
    is_deleted: bool = Indexed(default=False)
    
    class Settings:
        name = 'theaters'
        
    class Config:
        validate_by_name = True