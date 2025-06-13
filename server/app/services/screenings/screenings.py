from app.interfaces.screenings.screenings import ScreeningRequestParams
from fastapi import HTTPException, status

async def add_screenings():
    try:
        True
    except:
        False
    
    
def validate_screening_request(data: ScreeningRequestParams) -> None:
    if not data.movie_id:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "movie_id not found" , "code": 400}
        )
    if not data.theater_id:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "theater_id not found" , "code": 400}
        )


