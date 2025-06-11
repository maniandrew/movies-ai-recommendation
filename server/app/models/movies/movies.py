from typing import Optional, List
from datetime import datetime
from beanie import Document , Indexed
from pydantic import HttpUrl , BaseModel


class IMDbInfo(BaseModel):
    rating: Optional[float]
    votes: Optional[int]
    id: Optional[int]

class Awards(BaseModel):
    wins: Optional[int]
    nominations: Optional[int]
    text: Optional[str]

class TomatoesViewer(BaseModel):
    rating: Optional[float] = None
    numReviews: Optional[int] = None
    meter: Optional[int] = None

class TomatoesCritic(BaseModel):
    rating: Optional[float] = None
    numReviews: Optional[int] = None
    meter: Optional[int] = None

class Tomatoes(BaseModel):
    viewer: Optional[TomatoesViewer] = None
    critic: Optional[TomatoesCritic] = None
    fresh: Optional[int] = None
    rotten: Optional[int] = None
    lastUpdated: Optional[datetime] = None


class Movies(Document):
    title: str = Indexed()
    year: Optional[int] = None
    runtime: Optional[int] = None
    released: datetime = Indexed()
    plot: Optional[str] = None
    fullplot: Optional[str] = None
    cast: Optional[List[str]] = None
    directors: Optional[List[str]] = None
    countries: List[str] = Indexed()
    genres: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    poster: Optional[HttpUrl] = None
    rated: Optional[str] = None
    type: Optional[str] = None
    lastupdated: Optional[str]
    imdb: Optional[IMDbInfo] = None
    awards: Optional[Awards] = None
    tomatoes: Optional[Tomatoes] = None
    num_mflix_comments: Optional[int] = None

    class Settings:
        name = 'movies'  
