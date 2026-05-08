import os
import sys

# Add parent directory to sys.path to resolve imports from the parent directory
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from flask import Blueprint, request, jsonify
import re
from models import create_user, get_user_by_email  # type: ignore

auth_bp = Blueprint("auth", __name__)

def is_valid_email(email):
    # Regex for valid email format ending with .com, .in, etc.
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|co|io)$'
    return re.match(pattern, email) is not None

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format (use .com, .in, etc.)"}), 400

    if get_user_by_email(email):
        return jsonify({"error": "Email already exists"}), 400

    success = create_user(username, email, password)
    if success:
        return jsonify({"message": "Account created successfully"}), 201
    else:
        return jsonify({"error": "Registration failed"}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    user = get_user_by_email(email)
    if user and user["password"] == password:
        # For simplicity, returning user info without JWT for now
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"]
            }
        }), 200
    
    return jsonify({"error": "Invalid email or password"}), 401
