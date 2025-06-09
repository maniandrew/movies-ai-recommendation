import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient # type: ignore
import certifi

load_dotenv()

# Now you can access them like this:
MONGO_URL = os.getenv("MONGO_URL")

DB_NAME = os.getenv("DB_NAME")

client = AsyncIOMotorClient(MONGO_URL, tlsCAFile=certifi.where())

db = client[DB_NAME]


