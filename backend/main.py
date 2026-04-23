from fastapi import FastAPI
from backend.server import router
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import backend.database as db
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sqlite_file_name = os.path.join(BASE_DIR, "reserv_database.db")
default_sqlite_url = f"sqlite:///{sqlite_file_name}"

DATABASE_URL = os.getenv("DATABASE_URL", default_sqlite_url)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init_db(DATABASE_URL)
    db.create_db(db.engine)
    yield


app = FastAPI(lifespan=lifespan)

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/router")