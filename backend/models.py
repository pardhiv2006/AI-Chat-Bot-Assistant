# type: ignore
from db import get_connection


# ─── Auth Operations ───────────────────────────────────────────────────────────

def create_user(username, email, password):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            (username, email, password),
        )
        conn.commit()
        return True
    except Exception as e:
        print(f"[DB ERROR] create_user failed: {e}")
        return False
    finally:
        conn.close()

def get_user_by_email(email):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()
    return dict(user) if user else None

# ─── Session Operations ────────────────────────────────────────────────────────

def create_session(user_id, session_id, name="New Chat"):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO sessions (user_id, session_id, name) VALUES (?, ?, ?)",
        (user_id, session_id, name),
    )
    conn.commit()
    conn.close()

def update_session_name(session_id, name):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE sessions SET name = ? WHERE session_id = ?", (name, session_id)
    )
    conn.commit()
    conn.close()

def get_user_sessions(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT s.session_id, s.name, s.created_at,
               COUNT(m.id) AS message_count,
               MAX(m.timestamp) AS last_activity
        FROM sessions s
        LEFT JOIN messages m ON s.session_id = m.session_id
        WHERE s.user_id = ?
        GROUP BY s.session_id
        ORDER BY last_activity DESC, s.created_at DESC
    """, (user_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]


# ─── Message Operations ─────────────────────────────────────────────────────────

def save_message(session_id: str, role: str, message: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO messages (session_id, role, message) VALUES (?, ?, ?)",
        (session_id, role, message),
    )
    conn.commit()
    conn.close()


def get_messages(session_id: str) -> list:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT role, message, timestamp FROM messages WHERE session_id = ? ORDER BY timestamp ASC",
        (session_id,),
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def delete_session_messages(session_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM messages WHERE session_id = ?", (session_id,))
    conn.commit()
    conn.close()

def delete_session(session_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM messages WHERE session_id = ?", (session_id,))
        cursor.execute("DELETE FROM sessions WHERE session_id = ?", (session_id,))
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()
