from fastapi import FastAPI,APIRouter,Response

from pydantic import BaseModel,field_validator
from database import create_db,select,Session,engine,Reservation
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime as dt
router = APIRouter()

# source venv/bin/activate



create_db()

@field_validator("phone","work_type","note")
def check(cls,v):
    if v == "":
        return None
    return v


class ReservationModel(BaseModel):
    event: str
    phone: str  | None
    start: str
    end: str
    location:str | None
    color:str
    note: str  | None
    msg_enabled: bool
    # work_type: str | None
    
    
    @field_validator("phone","note")
    @classmethod
    def check(cls,v):
        if v == "":
            return None
        return v


    class Config:
        from_attributes = True  


@router.get("/load-events")
def load_events():
    with Session(engine) as session:
        db = session.scalars(select(Reservation)).all()
        print(db)
        return db
   
@router.post("/create-event")
def create_event(r:ReservationModel):
    with Session(engine) as session:
        start_date = dt.fromisoformat(r.start)
        end_date = dt.fromisoformat(r.end)
        if end_date <= start_date:
            raise HTTPException(400, "Invalid time range")
        try:
            db = Reservation(event = r.event,
                            phone = r.phone,
                            start = start_date,
                            end = end_date,
                            note = r.note,
                            # work_type  = r.work_type,
                            msg_enabled = r.msg_enabled,
                            state = "reserved",
                            color = r.color,
                            location = r.location

                            )
            session.add(db)
            session.commit()
  
        except Exception:
            
            session.rollback()
            raise
            
    return JSONResponse(content={"message":"Event successfuly created"},status_code=201)
    
##pridat vsechny moznosti
@router.patch("/update-event/{id}")
def edit_event(id:int,event:ReservationModel):
    with Session(engine) as session:
        db = session.get(Reservation,id)
        if not db:
            raise HTTPException(status_code=404, detail="Event with this ID does not exist")
        
        if len(event.event) > 0:
            db.event = event.event
        session.commit()

    return JSONResponse(content={"message":"Event successfuly edited"},status_code=200)


@router.delete("/delete-event/{id}")
def delete_event(id:int):
    with Session(engine) as session:
        db = session.get(Reservation,id)
        if not db:
            raise HTTPException(status_code=404, detail="Event with this ID does not exist")
        session.delete(db)
        session.commit()
    return Response(status_code=204)

