# NeuralChat — Full-Stack AI Chatbot

A production-ready AI chatbot built with **Flask + SQLite + Ollama** (backend) and **React + Tailwind** (frontend). Features session-based persistent memory, a premium glassmorphism UI, and is powered entirely by a local **Llama 3** model.

---

## ✨ Features

- 🧠 **Persistent Memory** — Conversations stored in SQLite, rebuilt for every Ollama call
- 👥 **Multi-Session** — Isolated chat sessions with unique session IDs
- 🎨 **Premium UI** — Dark mode, glassmorphism, gradient bubbles, smooth animations
- ⚡ **Streaming-ready** — Typing indicator while Ollama processes
- 📱 **Responsive** — Mobile sidebar, collapsible desktop sidebar
- 🔒 **Local-first** — All AI runs via Ollama on your machine (no cloud APIs)

---

## 📁 Project Structure

```
ChatterBot/
├── backend/
│   ├── app.py              # Flask entry point
│   ├── db.py               # SQLite connection & schema
│   ├── models.py           # Data access layer (users, messages)
│   ├── chatbot_core.py     # Ollama logic (preserved from original)
│   └── routes/
│       └── chat_routes.py  # API endpoints
├── frontend/
│   ├── src/
│   │   ├── api.js                    # API client
│   │   ├── App.jsx                   # Root component
│   │   ├── index.css                 # Global styles & animations
│   │   └── components/
│   │       ├── Sidebar.jsx           # Session list + new chat
│   │       ├── Header.jsx            # Session title + actions
│   │       ├── ChatWindow.jsx        # Message feed + typing indicator
│   │       └── InputBox.jsx          # Floating glass input bar
│   └── vite.config.js
├── chatbot.py              # Original terminal chatbot (untouched logic)
└── venv/                   # Python virtual environment
```

---

## 🚀 Setup & Run

### Prerequisites

- [Ollama](https://ollama.com) installed and running
- `llama3` model pulled: `ollama pull llama3`
- Node.js 18+ and npm
- Python 3.9+

---

### 1. Start Ollama

```bash
ollama serve
# In a separate terminal:
ollama pull llama3
```

### 2. Start the Flask Backend

```bash
# From the project root:
cd backend
../venv/bin/python app.py
```

Backend runs on **http://localhost:5000**

### 3. Start the React Frontend

```bash
# From the project root:
cd frontend
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send message, get AI reply |
| `GET` | `/api/history?session_id=...` | Fetch chat history |
| `POST` | `/api/set-name` | Set/update session display name |
| `GET` | `/api/sessions` | List all sessions |
| `DELETE` | `/api/clear?session_id=...` | Clear session messages |
| `GET` | `/api/health` | Health check |

### POST `/api/chat`
```json
// Request
{ "session_id": "session_abc123", "message": "Hello!" }

// Response
{ "session_id": "session_abc123", "reply": "Hi there! How can I help?" }
```

---

## 🧠 How Memory Works

The original `messages = []` is **replaced by SQLite-backed history**:

```python
# Original (in-memory, lost on restart):
messages = []
messages.append({"role": "user", "content": user_input})

# Upgraded (persistent, session-isolated):
history = get_messages(session_id)          # Load from SQLite
messages = build_messages_from_history(history)  # Rebuild list
messages.append({"role": "user", "content": user_input})
ollama.chat(model="llama3", messages=messages)
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| AI Model | Ollama / Llama 3 (local) |
| Backend | Python 3, Flask, Flask-CORS |
| Database | SQLite (via Python stdlib) |
| Frontend | React 18, Vite |
| Styling | Tailwind CSS v4, Custom CSS |
| Fonts | Inter (Google Fonts) |
