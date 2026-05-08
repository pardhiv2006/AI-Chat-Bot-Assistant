import sys
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Make sure sibling modules are importable when run from within /backend
sys.path.insert(0, os.path.dirname(__file__))

from flask import Flask
from flask_cors import CORS
from db import init_db
from routes.chat_routes import chat_bp
from routes.auth_routes import auth_bp


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": [
        "http://localhost:5173",
        "https://intellidesk-frontend.onrender.com"
    ]}})

    # Initialize SQLite database
    init_db()

    # Register blueprints
    app.register_blueprint(chat_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    @app.route("/api/health")
    def health():
        return {"status": "ok", "message": "Ollama Chatbot API is running"}

    return app


if __name__ == "__main__":
    app = create_app()
    print("=" * 50)
    print("  🤖  Ollama Chatbot Backend  — Flask")
    print("  Running on http://localhost:5001")
    print("=" * 50)
    app.run(debug=True, host="0.0.0.0", port=5001)
