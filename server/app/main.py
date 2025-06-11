from fastapi import FastAPI
from app.api.router import api_router
from fastapi.middleware.cors import CORSMiddleware
from app.core.auth.auth_middleware import AuthMiddleware


app = FastAPI()

excluded_paths = ["/register","/login", "/openapi.json", "/docs", "/redoc"]

# local origin for development
origins = [
    "http://localhost:5173",
]

# allowed the specific local origin for corsMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# custom middleware for request validations
app.add_middleware(
    AuthMiddleware,
    excluded_paths
)


app.include_router(api_router)

