import os
os.environ["TESTING"] = "1"

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import backend.database as db
from backend.main import app
from backend.database import get_db, Base, Reservation


FAKE_ID = 9999999


# in-memory DB
engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

TestSessionLocal = sessionmaker(bind=engine)

# override DB v aplikaci
db.engine = engine
db.SessionLocal = TestSessionLocal


def override_get_db():
    db_ = TestSessionLocal()
    try:
        yield db_
    finally:
        db_.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client():
    with TestClient(app, raise_server_exceptions=True) as c:
        yield c


def test_home(client):
    response = client.get("/router")
    assert response.status_code == 200


def test_create_event(client):
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

    response = client.post("/router/create-event", json=data)
    assert response.status_code == 201

    # invalid date
    data["start"] = "2026-04-23T10:00:00"
    response = client.post("/router/create-event", json=data)
    assert response.status_code == 400


def test_db_rollback():
    db_ = TestSessionLocal()

    before = db_.query(Reservation).count()

    try:
        db_.add(Reservation(event=None))  # should fail
        db_.commit()
    except:
        db_.rollback()

    after = db_.query(Reservation).count()

    assert before == after


def test_load_events(client):
    response = client.get("/router/load-events")
    assert response.status_code == 200


def test_edit_event(client):
    data = {
        "id": "1",
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
    event_id = response.json()["data"]["id"]
    
    assert response.status_code == 201


    response = client.patch(f"/router/update-event/{FAKE_ID}", json=data)
    assert response.status_code == 404

    data["event"] = "Lunch"
    response = client.patch(f"/router/update-event/{event_id}", json=data)
    assert response.status_code == 200

    data["event"] = None
    response = client.patch(f"/router/update-event/{event_id}", json=data)
    assert response.status_code == 422

def test_delete_event(client):
    data = {
        "id": "1",
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
    event_id = response.json()["data"]["id"]
    assert response.status_code == 201

    delete_response = client.delete(f"/router/delete-event/{FAKE_ID}")
    assert delete_response.status_code == 404

    delete_response = client.delete(f"/router/delete-event/{event_id}")
    assert delete_response.status_code == 204
