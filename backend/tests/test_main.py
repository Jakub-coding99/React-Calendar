from fastapi.testclient import TestClient
from backend.main import app
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker
import pytest
from backend.database import get_db,Base

# PYTHONPATH=. pytest

sqlite_file_name = "test_database.db"
sqlite_url = "sqlite:///:memory:"
engine = create_engine(sqlite_url,connect_args={"check_same_thread":False}, echo=True, poolclass=StaticPool)
TestSessionLocal = sessionmaker(autoflush=False,autocommit = False, bind=engine)

Base.metadata.create_all(bind=engine)


@pytest.fixture
def override_get_db():
    database = TestSessionLocal()
    try:
        yield database
    finally:
        database.close()

app.dependency_overrides[get_db]= override_get_db

client = TestClient(app)

def test_home():
    response = client.get("/router")
    assert response.status_code == 200
    assert response.json() == {"message":"Hello World"} 
    
