from fastapi import APIRouter , UploadFile , File

router = APIRouter(prefix="/unlock" , tags=['Unlock'])

@router.post('/')
async def face_unlock(file: UploadFile = File(...)):
    return { "message": "Face Unlocked Successfully"}