import os
from dotenv import load_dotenv
from datetime import datetime, timedelta , timezone
from jose import jwt, JWTError , ExpiredSignatureError
from fastapi.responses import JSONResponse

load_dotenv()

class Token:
    def __init__(self , payload = None , is_expired  = False , is_invalid = False):
        self.payload = payload
        self.is_expired = is_expired
        self.is_invalid = is_invalid
        

class AuthService:
    def __init__(self):
        self.secret_key = os.getenv("SECRET_KEY")
        self.algorithm = 'HS256'
        self.token_expiry_time = 30
        if not self.secret_key:
            raise ValueError("SECRET_KEY is missing. Please set it in your environment or .env file.")
       
    
    def create_token(self , username: str) -> str:
        issued_at = datetime.now(timezone.utc)
        expire = issued_at + timedelta(seconds=self.token_expiry_time)
        payload = {"sub": username, "iat": issued_at , "exp": expire}
        return jwt.encode(payload,self.secret_key,self.algorithm)
    
    def decode_token(self , token: str) -> Token:
        try:
            payload = jwt.decode(token,self.secret_key, algorithms=self.algorithm)
            return Token(payload=payload)
        except ExpiredSignatureError:
            return Token(is_expired = True)
        except JWTError:
            return Token(is_invalid = True)
            
            