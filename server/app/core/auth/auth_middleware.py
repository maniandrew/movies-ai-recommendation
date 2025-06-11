from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
from app.core.auth.auth import AuthService

class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, exclude_paths: list = None):
        super().__init__(app)
        self.auth_service = AuthService()
        self.exclude_paths = exclude_paths or []
        
    async def dispatch(self, request, call_next):
        for path in self.exclude_paths:
            if request.url.path.startswith(path):
                return await call_next(request)
            
        auth_header = request.headers.get('Authorization')
        
        if auth_header is None or not auth_header.startswith("Bearer "):
            return JSONResponse(status_code=401, content={"message": "Authorization header missing or invalid"})
        
        token = auth_header.split(" ")[1]
        
        tokenDetails = self.auth_service.decode_token(token)
        
        if tokenDetails.is_expired:
            return JSONResponse(status_code=401, content={"message": "Token is Expired"})
        
        if tokenDetails.is_invalid:
            return JSONResponse(status_code=401, content={"message": "Token is Invalid"})
        
        request.state.user = tokenDetails.payload.get("sub")
        
        response = await call_next(request)
        return response
