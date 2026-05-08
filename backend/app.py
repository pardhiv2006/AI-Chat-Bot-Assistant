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
    # Point static folder to the frontend build directory
    app = Flask(__name__, 
                static_folder='../frontend/dist', 
                static_url_path='/')
    
    CORS(app)

    # Initialize SQLite database
    init_db()

    # Register blueprints
    app.register_blueprint(chat_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    @app.route("/api/health")
    def health():
        return {"status": "ok", "message": "IntelliDesk API is running"}

    # Catch-all route to serve the React app
    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    return app


if __name__ == "__main__":
    app = create_app()
    print("=" * 50)
    print("  🤖  Ollama Chatbot Backend  — Flask")
    print("  Running on http://localhost:5001")
    print("=" * 50)
    app.run(debug=True, host="0.0.0.0", port=5001)
