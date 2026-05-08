"""
chatbot_core.py — Wraps the original Ollama chatbot logic with enhanced system instructions.
"""

import ollama

# 🧠 IntelliDesk Nexus System Prompt
# Instructions for clean, unambiguous, and professional output.
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
    """
    Rebuild the messages list from DB history records.
    """
    messages = []
    for record in history:
        messages.append({
            "role": record["role"],
            "content": record["message"],
        })
    return messages


def chat_with_ollama(history: list, user_input: str) -> str:
    """
    Core Ollama chat function with integrated system guidance.
    """
    # 1. Start with the System Prompt for clean/unambiguous output
    messages = [SYSTEM_PROMPT]

    # 2. Rebuild conversation context from DB
    messages.extend(build_messages_from_history(history))

    # 3. Append the new user message
    messages.append({"role": "user", "content": user_input})

    # 4. Call Ollama with the full context
    try:
        response = ollama.chat(
            model="llama3",
            messages=messages
        )
        bot_reply = response['message']['content']
    except Exception as e:
        print(f"Ollama Request Error: {e}")
        bot_reply = "I apologize, but I am currently experiencing connection difficulties. Please try again in a moment."

    return bot_reply
