from fastapi import APIRouter , File , UploadFile
from app.services.face_service import face_unlock


router = APIRouter(prefix ="/register" , tags=["Register"])

@router.post("/")
async def register_face(file: UploadFile = File(...)):
    contents = await file.read()
    result = await face_unlock(contents)
    return result


