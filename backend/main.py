
from fastapi import FastAPI
from backend.server import router
from backend.database import create_db
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager


#TEST

# uvicorn backend.main:app --reload


@asynccontextmanager
async def lifespan(app:FastAPI):
    create_db()
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
