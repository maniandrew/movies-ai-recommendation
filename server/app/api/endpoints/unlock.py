from fastapi import APIRouter , UploadFile , File , Form 
from fastapi.responses import JSONResponse
from app.services.face_service import face_lock_validation

router = APIRouter(prefix="/login" , tags=['Unlock'])

@router.post('/')
async def face_unlock(file: UploadFile = File(...)):
    contents = await file.read()
    result = await face_lock_validation(contents)
    if result['status_code'] != 200:
        return JSONResponse(content={"message": result["message"]}, status_code=result["status_code"])

    return {
        "message": result["message"],
        "user": result["user"],
        "status_code": result["status_code"],
        "token": result["token"]
    }