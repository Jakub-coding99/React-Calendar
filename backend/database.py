from sqlalchemy import create_engine,MetaData,select,engine,Integer,String,Boolean,DateTime
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column,Session,session
from datetime import datetime as dt

class Base(DeclarativeBase):
    pass


class Reservation(Base):
    __tablename__ = "reservation"
    id : Mapped[int] = mapped_column(primary_key= True)
    event: Mapped[str] = mapped_column(String(30))
    start: Mapped[dt] = mapped_column(DateTime)
    end: Mapped[dt] = mapped_column(DateTime)
    note : Mapped[str | None]  = mapped_column(String(100))
    msg_sent : Mapped[bool] = mapped_column(Boolean,default=False)
    msg_enabled : Mapped[bool] = mapped_column(Boolean,default=True)
    state: Mapped[str] = mapped_column(String(50))
    location: Mapped[str | None] = mapped_column(String(50))
    color:  Mapped[str] = mapped_column(String(50))
    client_id:  Mapped[str] = mapped_column(String(50))

class Clients(Base):
    __tablename__ = "clients"
    id : Mapped[int] = mapped_column(primary_key= True)
    name: Mapped[str] = mapped_column(String(100))
    phone: Mapped[str | None] = mapped_column(String(30))
    email: Mapped[str | None] = mapped_column(String(30))
    

   
fake_data = [ {
    "id": 1,
    "event": "Meeting with client",
    "phone": "123456789",
    "start": dt(2026, 3, 10, 9, 0),
    "end": dt(2026, 3, 10, 10, 0),
    "note": "Discuss project requirements",
    "msg_sent": False,
    "msg_enabled": True,
    "state": "reserved",
    "location": "Office 101",
    "color": "blue"
},
 {
    "id": 2,
    "event": "Team Lunch",
    "phone": None,
    "start": dt(2026, 3, 10, 12, 0),
    "end": dt(2026, 3, 10, 13, 0),
    "note": None,
    "msg_sent": False,
    "msg_enabled": True,
    "state": "confirmed",
    "location": "Cafeteria",
    "color": "green"
}]

fake_clients_data = [{
    "id":1,
    "name" : "Jakub",
    "email": "email@email.com",
    "phone": "987654321"
},{
    "id":2,
    "name" : "Markéta",
    "email": "marki@email.com",
    "phone": "123456789"
},
{
    "id":3,
    "name" : "Honza",
    "email": "jan@email.com",
    "phone": "123456789"
}
]

def populate_db():
    with Session(engine) as session:
        for item in fake_data:
            reservation = Reservation(
                id=item["id"],
                event=item["event"],
                phone=item["phone"],
                start=item["start"],
                end=item["end"],
                note=item["note"],
                msg_sent=item["msg_sent"],
                msg_enabled=item["msg_enabled"],
                state=item["state"],
                location=item["location"],
                color=item["color"]
            )
            session.add(reservation)
        session.commit()

def fake_clients():
    with Session(engine) as session:
        for client in fake_clients_data:
            clients = Clients(
                id = client["id"],
                name = client["name"],
                phone = client["phone"],
                email = client["email"]
            )
            session.add(clients)
        session.commit()



sqlite_file_name = "reserv_database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url, echo=True)

def create_db():
    
    Base.metadata.create_all(engine)
    # populate_db()
    # fake_clients()