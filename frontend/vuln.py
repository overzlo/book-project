python
from flask import Flask, request, jsonify
import jwt

app = Flask(__name__)
SECRET_KEY = "weakkey"

users = {"admin": "admin123", "user": "password"}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username in users and users[username] == password:
        token = jwt.encode({"user": username}, SECRET_KEY, algorithm="HS256")
        return jsonify({"token": token})
    return "Unauthorized", 401

@app.route('/profile')
def profile():
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    user = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])["user"]
    return f"Welcome {user}"
