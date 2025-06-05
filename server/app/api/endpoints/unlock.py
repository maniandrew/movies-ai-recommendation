from fastapi import APIRouter , UploadFile , File , Form 
from fastapi.responses import JSONResponse
from app.services.face_service import face_lock_validation

router = APIRouter(prefix="/login" , tags=['Unlock'])

@router.post('/')
async def face_unlock(file: UploadFile = File(...) , name: str = Form(...)):
    contents = await file.read()
    result = await face_lock_validation(contents , name)
    return JSONResponse(
        content={
            'message': result['message'],
            'status_code': result['status_code']
        },
        status_code = result['status_code']
    )