from fastapi.testclient import TestClient
from backend.main import app
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker
import pytest
from backend.database import get_db,Base,Reservation


# PYTHONPATH=. pytest
# PYTHONPATH=. pytest -s -v

engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)


TestSessionLocal = sessionmaker(bind=engine)

def override_get_db():
    database = TestSessionLocal()
    try:
        yield database
    finally:
        database.close()

app.dependency_overrides[get_db]= override_get_db

@pytest.fixture(autouse=True)
def clear_overrides():
    yield
    app.dependency_overrides.clear()


@pytest.fixture(autouse=True)
def clear_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

client = TestClient(app)

def test_home():
    response = client.get("/router")
    assert response.status_code == 200

def test_create_event():
    data = {
  "event": "Meeting",
  "start": "2026-04-22T10:00:00",
  "end": "2026-04-22T11:00:00",
  "note": "First reservation",
  "msg_enabled": True,
  "color": "#ff0000",
  "location": "Ostrava",
  "client_id": 1
}
    response = client.post("/router/create-event",json=data)
    assert response.status_code == 201
    

    #test if start < end
    data["start"] = "2026-04-23T10:00:00"
    date_control = client.post("/router/create-event",json=data)
    assert date_control.status_code == 400

def test_db_rollback():
    db = TestSessionLocal()

    try:
        before = db.query(Reservation).count()

        db.add(Reservation(event=None))  # error
        db.commit()

    except:
        db.rollback()

    after = db.query(Reservation).count()

    assert before == after


def test_load_events():
    response = client.get("/router/load-events")
    assert response.status_code == 200
   
