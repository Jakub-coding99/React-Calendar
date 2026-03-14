
from fastapi import FastAPI
from server import router
from database import create_db
from fastapi.middleware.cors import CORSMiddleware


#TEST

app = FastAPI()
origins = ["http://localhost:5173"]



app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"]
)



create_db()
app.include_router(router, prefix="/router") 
