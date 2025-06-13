from fastapi import APIRouter
from app.interfaces.screenings.screenings import ScreeningRequestParams
from app.services.screenings.screenings import validate_screening_request


router = APIRouter(prefix="/screen" , tags=['Screens'])


@router.post('/')
async def create_screens(data: ScreeningRequestParams):
    validate_screening_request(data)
    return {"message": data , "code": 200}