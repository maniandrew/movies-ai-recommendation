from app.interfaces.screenings.screenings import ScreeningRequestParams , ScreeningStatus
from fastapi import HTTPException, status
from app.models.screenings.screenings import Screenings
from app.models.movies.movies import Movies
from app.models.theaters.theaters import Theaters
from app.models.user.user import User
from typing import Optional
from bson import ObjectId
import logging
from datetime import datetime , timedelta

logger = logging.getLogger(__name__)
async def add_screenings():
    try:
        True
    except:
        False
    
    
from fastapi import HTTPException, status
import logging

logger = logging.getLogger(__name__)

async def validate_screening_request(data: ScreeningRequestParams) -> None:
    if not data.movie_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "movie_id or screen_id not found", "code": 400}
        )
    if not data.theater_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "theater_id not found", "code": 400}
        )
    if not data.screen_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "screen_id not found", "code": 400}
        )

    try:
        movie_details = await is_movie_id_valid(data.movie_id)
        if not movie_details:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"message": "movie_id is invalid", "code": 400}
            )

        theater_details = await is_theater_id_valid(data.theater_id, data.screen_id)
        if not theater_details:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"message": "theater_id or screen_id is invalid", "code": 400}
            )

    except HTTPException as http_exc:
        # Let FastAPI handle HTTP exceptions properly
        raise http_exc

    except Exception as e:
        logger.exception("Unexpected error during validation")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": "Internal server error during validation", "code": 500}
        )

    

async def is_movie_id_valid(movie_id: str) -> Optional[Movies]:
    try:
        movie_details = await Movies.find_one({
            "_id": ObjectId(movie_id)
        })
        return movie_details
    except:
        return None
    
async def is_theater_id_valid(theater_id: int, screen_id: str) -> Optional[Theaters]:
    try:
        theater_details = await Theaters.find_one({
            "_id": ObjectId(theater_id) , 
            "screens.screen_id": screen_id
        })
        return theater_details
    except Exception as e:
        return None
         
async def create_screenings(data: ScreeningRequestParams, user: User) -> None:
    try:
        start_time = datetime.now()
        movie_end_time = start_time + timedelta(hours=2, minutes=30)
        new_screenings = Screenings(
            movie_id = ObjectId(data.movie_id),
            theater_id = ObjectId(data.theater_id),
            screen_id = data.screen_id ,
            start_time = start_time,
            end_time = movie_end_time,
            ticket_price = 160,
            total_seats = 200,
            available_seats = 200,
            status = ScreeningStatus.ACTIVE,
            created_by = str(user.id),
            is_deleted = False,
            last_updated = start_time
        )
        await new_screenings.insert()
        if not new_screenings.id:
            return {"message": "Screenings Creation Failed" , "code": 500}
        return {"message": "Screenings Creation Successfully" , "code": 200}
    except Exception as e:
        return {"message": "Unexpected error occurs while scree creation" , "code": 500}
    
    
async def get_screenings() -> Optional[Screenings]:
    try:
        screenings = await Screenings.find_all().to_list()
        if not screenings:
            return {"message": "Screenings not found" , "code" : 200}
        return {"message":"Screenings fetched Successfully" ,"data": screenings , "code": 200}
    except Exception as e:
        raise HTTPException(
            status_code = 500,
            detail = {"message": "Unexpected error occurs while fetching the screen details"}
        )

