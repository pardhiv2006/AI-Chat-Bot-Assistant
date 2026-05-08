const BASE = '/api';

export async function sendMessage(session_id, user_id, message) {
  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id, user_id, message }),
  });
  if (!res.ok) throw new Error(`Chat error: ${res.status}`);
  return res.json();
}

export async function fetchHistory(session_id) {
  const res = await fetch(`${BASE}/history?session_id=${encodeURIComponent(session_id)}`);
  if (!res.ok) throw new Error(`History error: ${res.status}`);
  return res.json();
}

export async function setUserName(session_id, name) {
  const res = await fetch(`${BASE}/set-name`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id, name }),
  });
  if (!res.ok) throw new Error(`Set-name error: ${res.status}`);
  return res.json();
}

export async function fetchSessions(user_id) {
  const res = await fetch(`${BASE}/sessions?user_id=${user_id}`);
  if (!res.ok) throw new Error(`Sessions error: ${res.status}`);
  return res.json();
}

export async function clearSession(session_id) {
  const res = await fetch(`${BASE}/clear?session_id=${encodeURIComponent(session_id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Clear error: ${res.status}`);
  return res.json();
}

export async function deleteSession(session_id) {
  const res = await fetch(`${BASE}/delete-session?session_id=${encodeURIComponent(session_id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Delete error: ${res.status}`);
  return res.json();
}
