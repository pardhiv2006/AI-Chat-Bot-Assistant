# 🌌 IntelliDesk AI — The Nexus of Intelligence

![IntelliDesk Banner](https://img.shields.io/badge/IntelliDesk-AI-6366f1?style=for-the-badge&logo=ai&logoColor=white)
![Powered by Groq](https://img.shields.io/badge/Powered%20By-Groq-orange?style=for-the-badge)
![Model Llama 3.1](https://img.shields.io/badge/Model-Llama%203.1-blue?style=for-the-badge)

**IntelliDesk AI** is a premium, cinematic AI workspace designed for high-performance conversations. Built with a "Dribbble-grade" SaaS aesthetic, it combines the speed of **Groq Cloud API** with a sophisticated React dashboard to deliver an elite AI experience.

---

## ✨ Key Features

- 🎭 **Cinematic Interface**: A high-fidelity, glassmorphic UI with smooth animations and dynamic gradients.
- ⚡ **Instant Intelligence**: Powered by Groq's Llama 3.1 8B model for sub-second response times.
- 🔐 **Secure Authentication**: Built-in user registration and login system with persistent sessions.
- 📁 **Smart Workspaces**: Create, manage, and delete multiple chat sessions with full history retrieval.
- 📱 **Responsive Design**: Seamless experience across desktop and mobile browsers.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite + Vanilla CSS (Premium Glassmorphism)
- **Backend**: Flask (Python 3)
- **Database**: SQLite (Local persistent storage)
- **AI Engine**: Groq Cloud API (Meta Llama 3.1)
- **Deployment**: Render (Unified Single-Link Blueprint)

---

## 🚀 Quick Start (Local)

### 1. Prerequisites
- Python 3.9+
- Node.js 18+
- A [Groq API Key](https://console.groq.com/keys)

### 2. Setup
```bash
# Install dependencies
npm install --prefix frontend
pip install -r backend/requirements.txt

# Create your environment file
echo "GROQ_API_KEY=your_key_here" > backend/.env
```

### 3. Run Development Server
```bash
npm run dev
```
The app will open at `http://localhost:5173`.

---

## ☁️ Deployment (Render)

This project is optimized for **Render Blueprints**. To deploy your own instance:

1. Push this repository to **GitHub**.
2. Go to **Render Dashboard** → **Blueprints**.
3. Connect this repository.
4. Enter your `GROQ_API_KEY` when prompted.
5. **Done!** Render will automatically build the frontend and host it via the Flask backend.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for the future of AI interfaces.
</p>
