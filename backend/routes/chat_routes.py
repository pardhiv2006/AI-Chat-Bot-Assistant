# type: ignore
import os
import sys

# Add parent directory to sys.path to resolve imports from the parent directory
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from flask import Blueprint, request, jsonify  # type: ignore
from models import (  # type: ignore
    create_session,
    save_message,
    get_messages,
    update_session_name,
    get_user_sessions,
    delete_session_messages,
    delete_session,
)
from chatbot_core import chat_with_ollama  # type: ignore

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    session_id = data.get("session_id", "").strip()
    user_id = data.get("user_id")
    user_input = data.get("message", "").strip()

    if not session_id or not user_input or not user_id:
        return jsonify({"error": "session_id, user_id and message are required"}), 400

    # Ensure session record exists
    history = get_messages(session_id)
    if not history and user_input:
        create_session(user_id, session_id)

    # Save user message to DB
    save_message(session_id, "user", user_input)

    # Load full history from DB and rebuild messages list
    history = get_messages(session_id)

    # Remove last entry (the one we just saved) before passing to Ollama
    history_without_last = history[:-1]

    try:
        bot_reply = chat_with_ollama(history_without_last, user_input)
    except Exception as e:
        return jsonify({"error": f"Ollama error: {str(e)}"}), 500

    # Save assistant response to DB
    save_message(session_id, "assistant", bot_reply)

    return jsonify({
        "session_id": session_id,
        "reply": bot_reply,
    })


@chat_bp.route("/history", methods=["GET"])
def history():
    session_id = request.args.get("session_id", "").strip()
    if not session_id:
        return jsonify({"error": "session_id is required"}), 400

    messages = get_messages(session_id)

    return jsonify({
        "session_id": session_id,
        "messages": messages,
    })


@chat_bp.route("/set-name", methods=["POST"])
def set_name():
    data = request.get_json() or {}
    session_id = data.get("session_id", "").strip()
    name = data.get("name", "").strip()

    if not session_id or not name:
        return jsonify({"error": "session_id and name are required"}), 400

    update_session_name(session_id, name)

    return jsonify({"session_id": session_id, "name": name, "status": "updated"})


@chat_bp.route("/sessions", methods=["GET"])
def sessions():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    all_sessions = get_user_sessions(user_id)
    return jsonify({"sessions": all_sessions})


@chat_bp.route("/clear", methods=["DELETE"])
def clear():
    session_id = request.args.get("session_id", "").strip()
    if not session_id:
        return jsonify({"error": "session_id is required"}), 400

    delete_session_messages(session_id)
    return jsonify({"session_id": session_id, "status": "cleared"})


@chat_bp.route("/delete-session", methods=["DELETE"])
def delete_sess():
    session_id = request.args.get("session_id", "").strip()
    if not session_id:
        return jsonify({"error": "session_id is required"}), 400

    success = delete_session(session_id)
    if success:
        return jsonify({"session_id": session_id, "status": "deleted"})
    else:
        return jsonify({"error": "Failed to delete session"}), 500
