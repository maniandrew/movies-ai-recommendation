from pydantic import BaseModel
from typing import Optional

class ScreeningRequestParams(BaseModel):
    movie_id: Optional[str] = None
    theater_id: Optional[str] = None