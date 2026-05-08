# type: ignore
"""
chatbot_core.py — Powered by Groq Cloud API (Llama 3).
Drop-in replacement for Ollama: same function names, same output, same model.
"""

import os
from groq import Groq  # type: ignore

# 🧠 IntelliDesk Nexus System Prompt
SYSTEM_PROMPT = {
    "role": "system",
    "content": (
        "You are IntelliDesk AI, a professional and highly intelligent assistant. "
        "Your responses must be concise, accurate, and visually clean. "
        "CRITICAL: When providing mathematical results, do NOT use exclamation marks (!) at the end of numbers "
        "to avoid confusion with factorials. (Example: '2 + 2 is 4', NOT '4!'). "
        "Maintain a helpful, cinematic, and professional tone at all times."
    )
}


def build_messages_from_history(history: list) -> list:
    """Rebuild the messages list from DB history records."""
    messages = []
    for record in history:
        messages.append({
            "role": record["role"],
            "content": record["message"],
        })
    return messages


def chat_with_ollama(history: list, user_input: str) -> str:
    """
    Core chat function — powered by Groq (Llama 3).
    Function name kept as-is so no other file needs changing.
    """
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        return "Error: GROQ_API_KEY environment variable is not set."

    client = Groq(api_key=api_key)

    messages = [SYSTEM_PROMPT]
    messages.extend(build_messages_from_history(history))
    messages.append({"role": "user", "content": user_input})

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Groq API Error: {e}")
        return "I apologize, but I am currently experiencing connection difficulties. Please try again in a moment."
