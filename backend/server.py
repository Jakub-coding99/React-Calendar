from fastapi import APIRouter,Response,Depends
from pydantic import BaseModel,field_validator,ConfigDict
from backend.database import Reservation,Clients,get_db
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime as dt
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy import select


router = APIRouter()


# source venv/bin/activate



class ReservationModel(BaseModel):
    event: str
    start: str
    end: str
    location:str | None
    color:str
    note: str  | None
    msg_enabled: bool
    client_id: int
    model_config = ConfigDict(from_attributes=True)
   

    
    @field_validator("note", mode="before")
    @classmethod
    def empty_to_none(cls, v):
        if v == "":
            return None
        return v


class ClientsModel(BaseModel):
    id : str
    name : str
    phone: str | None
    email: str | None
    
@router.get("/")
def home():
    return JSONResponse(content={"message":"Hello World"},status_code=200)

@router.get("/load-events")
def load_events(db: Session = Depends(get_db)):
    database = db.scalars(select(Reservation)).all()
    return database
   
@router.post("/create-event")
def create_event(r:ReservationModel,db: Session = Depends(get_db)):
   
    start_date = dt.fromisoformat(r.start)
    end_date = dt.fromisoformat(r.end)
    if end_date <= start_date:
        raise HTTPException(400, "Invalid time range")
    try:
        event_db = Reservation(
            event = r.event,
                        start = start_date,
                        end = end_date,
                        note = r.note,
                        msg_enabled = r.msg_enabled,
                        state = "reserved",
                        color = r.color,
                        location = r.location,
                        client_id = r.client_id

        )
        db.add(event_db)
        db.commit()
        db.refresh(event_db)
        
    
    except Exception:
        db.rollback()
        raise
        
    return JSONResponse(content={"message":"Event successfuly created","data":jsonable_encoder(event_db)},status_code=201)


@router.patch("/update-event/{id}")
def edit_event(id:int,event:ReservationModel,db:Session = Depends(get_db)):
    
    event_update = db.get(Reservation, id)
    if not event_update:
        raise HTTPException(status_code=404, detail="Event with this ID does not exist")
    
    if event.event is not None and len(event.event) > 0:
        event_update.event = event.event
    if event.start is not None and len(event.start) > 0:
        event_update.start = dt.fromisoformat(event.start)
    if event.end is not None and len(event.end) > 0:
        event_update.end = dt.fromisoformat(event.end)
    if event.location is not None:
        event_update.location = event.location
    if event.color is not None:
        event_update.color = event.color
    if event.note is not None:
        event_update.note = event.note
    if event.msg_enabled is not None:
        event_update.msg_enabled = event.msg_enabled
    if event.client_id is not None:
        event_update.client_id = event.client_id

    db.commit()

    return JSONResponse(content={"message": "Event successfuly edited"}, status_code=200)


@router.delete("/delete-event/{id}")
def delete_event(id:int, db : Session = Depends(get_db)):
    delete_event = db.get(Reservation,id)
    if not delete_event:
        raise HTTPException(status_code=404, detail="Event with this ID does not exist")
    db.delete(delete_event)
    db.commit()
    return Response(status_code=204)


@router.get("/get-clients")
def get_clients(db: Session = Depends(get_db)):
    
    clients = db.scalars(select(Clients)).all()
    return clients

@router.get("/get-client/{id}")
def get_single_client(id:int, db:Session = Depends(get_db)):
    
    client = db.get(Clients,id)
    if not client:
            raise HTTPException(status_code=404, detail="Client with this ID does not exist")
    return client
