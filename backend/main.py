
from fastapi import FastAPI
from backend.server import router
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import backend.database as db


# uvicorn backend.main:app --reload


@asynccontextmanager
async def lifespan(app:FastAPI):
    db.create_db(db.engine)
    yield
    
    

app = FastAPI(lifespan=lifespan)
origins = ["http://localhost:5173"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"]
)



app.include_router(router, prefix="/router") 
