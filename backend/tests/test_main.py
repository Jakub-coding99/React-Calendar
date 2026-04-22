from fastapi.testclient import  TestClient
from backend.main import app

client = TestClient(app)

def tes():
    response = client.get("/")
    assert response.status_code == 200