from beanie import Document 
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
    theater_id: int = Field(..., alias='theaterId')
    location: Optional[Location] = None
    screens: Optional[list[Screen]] = []
    
    class Settings:
        name = 'theaters'
        
    class Config:
        allow_population_by_field_name = True