def test_health(client):
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


class TestRegister:
    def test_creates_user(self, client):
        res = client.post("/auth/register", json={"email": "a@example.com", "password": "secret123"})
        assert res.status_code == 201
        body = res.json()
        assert body["message"] == "Account created"
        assert body["user"]["email"] == "a@example.com"
        assert "id" in body["user"]

    def test_duplicate_email_rejected(self, client):
        payload = {"email": "dup@example.com", "password": "secret123"}
        client.post("/auth/register", json=payload)
        res = client.post("/auth/register", json=payload)
        assert res.status_code == 400
        assert "already registered" in res.json()["detail"]

    def test_missing_email_rejected(self, client):
        res = client.post("/auth/register", json={"password": "secret123"})
        assert res.status_code == 422

    def test_missing_password_rejected(self, client):
        res = client.post("/auth/register", json={"email": "b@example.com"})
        assert res.status_code == 422


class TestLogin:
    def test_valid_credentials(self, client):
        client.post("/auth/register", json={"email": "user@example.com", "password": "mypassword"})
        res = client.post("/auth/login", json={"email": "user@example.com", "password": "mypassword"})
        assert res.status_code == 200
        body = res.json()
        assert body["message"] == "Login successful"
        assert body["user"]["email"] == "user@example.com"

    def test_wrong_password_rejected(self, client):
        client.post("/auth/register", json={"email": "user@example.com", "password": "correct"})
        res = client.post("/auth/login", json={"email": "user@example.com", "password": "wrong"})
        assert res.status_code == 401
        assert "Invalid" in res.json()["detail"]

    def test_unknown_email_rejected(self, client):
        res = client.post("/auth/login", json={"email": "ghost@example.com", "password": "any"})
        assert res.status_code == 401

    def test_password_not_returned(self, client):
        client.post("/auth/register", json={"email": "safe@example.com", "password": "secret"})
        res = client.post("/auth/login", json={"email": "safe@example.com", "password": "secret"})
        assert "password" not in res.json()["user"]
        assert "hashed_password" not in res.json()["user"]
