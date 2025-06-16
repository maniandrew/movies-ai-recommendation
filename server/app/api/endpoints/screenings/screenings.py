from fastapi import APIRouter , Depends
from app.interfaces.screenings.screenings import ScreeningRequestParams
from app.services.screenings.screenings import validate_screening_request , create_screenings
from app.utils.common_utils import get_user_config


router = APIRouter(prefix="/screen" , tags=['Screens'])


@router.post('/')
async def create_screens(data: ScreeningRequestParams ,user = Depends(get_user_config)):
    await validate_screening_request(data)
    result = await create_screenings(
        data = data,
        user = await user
    )
    return result