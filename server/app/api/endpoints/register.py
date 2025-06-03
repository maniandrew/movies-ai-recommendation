from fastapi import APIRouter , File , UploadFile, Form
from fastapi.responses import JSONResponse
from app.services.face_service import face_unlock_register


router = APIRouter(prefix ="/register" , tags=["Register"])

@router.post("/")
async def register_face(file: UploadFile = File(...) , name: str = Form(...)):
    contents = await file.read()
    result = await face_unlock_register(contents , name)
    return JSONResponse(
        content={
            'message': result['message'],
            'status_code': result['status_code']
        },
        status_code = result['status_code']
    )


