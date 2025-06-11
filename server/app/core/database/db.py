import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient # type: ignore
import certifi
from beanie import init_beanie
from app.models.user.user import User
from app.models.movies.movies import Movies
from app.models.theaters.theaters import Theaters
from pymongo.errors import PyMongoError

load_dotenv()

# Now you can access them like this:
MONGO_URL = os.getenv("MONGO_URL")

DB_NAME = os.getenv("DB_NAME")

client = AsyncIOMotorClient(MONGO_URL, tlsCAFile=certifi.where())
        
db = client[DB_NAME]

models: list[type] = [User , Movies , Theaters]

async def db_connection():
    try:
        await init_beanie(database=db, document_models = models)
        print("MongoDB connection established and Beanie initialized.")
    except PyMongoError as e:
        print(f"MongoDB connection error: {e}")
    except Exception as e:
        print(f"Unexpected error during DB connection: {e}")


async def close_db_connection():
    if client:
        client.close()
        print('db connection closed')
    


