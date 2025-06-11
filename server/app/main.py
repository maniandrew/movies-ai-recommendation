from fastapi import FastAPI
from app.api.router import api_router
from fastapi.middleware.cors import CORSMiddleware
from app.core.auth.auth_middleware import AuthMiddleware
from app.core.database.db import db_connection , close_db_connection
from contextlib import asynccontextmanager


app = FastAPI()

excluded_paths = ["/register","/login", "/openapi.json", "/docs", "/redoc"]

# local origin for development
origins = [
    "http://localhost:5173",
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await db_connection()
        yield
    except Exception as e:
        print(f"Startup error: {e}")
        raise e
    finally:
        await close_db_connection()

app = FastAPI(lifespan = lifespan)


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


    

