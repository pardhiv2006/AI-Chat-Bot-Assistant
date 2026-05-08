Build a full-stack AI chatbot application by upgrading an existing Python Ollama chatbot (chatbot.py) into a production-ready system.

🔹 EXISTING BASE CODE (DO NOT REMOVE LOGIC)

The current chatbot uses Ollama like this:

import ollama

messages = []

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        break

    messages.append({"role": "user", "content": user_input})

    response = ollama.chat(
        model="llama3",
        messages=messages
    )

    bot_reply = response['message']['content']
    print("Bot:", bot_reply)

    messages.append({"role": "assistant", "content": bot_reply})
🔥 UPGRADE REQUIREMENT

Convert this terminal-based chatbot into a full-stack AI web application without breaking the Ollama logic.

🔹 1. BACKEND (Flask + SQLite + Ollama)
Core Changes:
Wrap existing Ollama logic inside Flask API
Replace in-memory messages = [] with SQLite database persistence
Implement session-based memory system
🔹 Database (SQLite)
Users Table
id
session_id (unique)
name
Messages Table
id
session_id
role (user / assistant)
message
timestamp
🔹 Session Memory Logic

Instead of messages = [], rebuild conversation from DB:

messages = [
  {"role": "user", "content": "..."},
  {"role": "assistant", "content": "..."}
]
🔹 API ENDPOINTS
1. POST /chat

Input:

{
  "session_id": "...",
  "message": "Hello"
}

Flow:

Save user message in SQLite
Load previous messages for session_id
Rebuild messages list

Call Ollama:

ollama.chat(model="llama3", messages=messages)
Save assistant response in DB
Return response
2. GET /history
Returns full chat history for session_id
3. POST /set-name
Store/update user name per session
🔹 2. OLLAMA INTEGRATION RULE
Use ONLY local Ollama (llama3)
Keep original logic unchanged except replacing in-memory list with DB-loaded messages
Maintain conversational context using stored history
🔹 3. FRONTEND (React + Tailwind)

Build a premium AI chatbot UI (NOT basic ChatGPT clone)

🔥 UI/UX DESIGN REQUIREMENTS
🎨 Style Direction
SaaS-level premium interface
Dark mode default
Glassmorphism + gradients
Soft shadows + depth layering
Smooth animations everywhere
🧭 Layout
Sidebar
Chat sessions list
New chat button
Minimal icons
Smooth hover animations
Main Chat Area
Centered container
Floating message cards (not plain bubbles)
Smooth fade-in messages
Header
Session title
Settings icon
User avatar placeholder
💬 MESSAGE DESIGN
User Messages:
Right aligned
Gradient (purple → blue)
Glow effect
Rounded XL cards
Bot Messages:
Left aligned
Glassmorphism card (blur + transparency)
Soft shadow
AI avatar icon
⌨️ INPUT BOX
Floating glass input bar
Rounded pill design
Focus glow effect
Animated send button
Smooth UX transitions
✨ ANIMATIONS
Fade + slide-up messages
Typing indicator (3 bouncing dots)
Auto-scroll to latest message
Hover scale effects
Sidebar transitions
📱 RESPONSIVE DESIGN
Mobile optimized layout
Bottom input bar on mobile
Collapsible sidebar
🔹 4. ARCHITECTURE RULES
DO NOT remove Ollama logic
DO replace messages = [] with SQLite-driven history
Session ID controls all user isolation
Fully persistent memory system
🔹 5. PROJECT STRUCTURE
backend/
  app.py
  db.py
  models.py
  chatbot_core.py   (wraps Ollama logic)
  routes/

frontend/
  src/
    components/
      Sidebar.jsx
      ChatWindow.jsx
      MessageBubble.jsx
      InputBox.jsx
      Header.jsx
    App.jsx
🔹 6. FINAL OUTPUT REQUIRED

Generate:

Flask backend with SQLite + Ollama integration
Session-based memory system
React + Tailwind premium UI
API integration between frontend and backend
Clean modular folder structure
Setup & run instructions
🚀 FINAL GOAL

Transform the current terminal chatbot into:

Persistent AI chatbot with memory
Session-based multi-user system
SQLite-backed conversation storage
Ollama-powered intelligence
Premium SaaS-level chat UI (modern, animated, glassmorphism)