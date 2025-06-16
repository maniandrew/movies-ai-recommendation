from app.services.screenings.screenings import (
    validate_screening_request , create_screenings ,
    get_screenings
)
from fastapi import APIRouter , Depends , Request
from app.interfaces.screenings.screenings import ScreeningRequestParams
from app.utils.common_utils import get_user_config
from app.utils.common_utils import router_activator
from app.interfaces.user.user import UserRole


router = APIRouter(prefix="/screen" , tags=['Screens'])



@router.get('/')
async def get_all_screenings(user = Depends(router_activator([UserRole.ADMIN]))):
    screenings = await get_screenings()
    return screenings



@router.post('/')
async def create_screens(data: ScreeningRequestParams ,user = Depends(router_activator([UserRole.ADMIN]))):
    await validate_screening_request(data)
    result = await create_screenings(
        data = data,
        user = user
    )
    return result