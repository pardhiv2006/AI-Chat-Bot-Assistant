import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import Login from './components/Login';
import Register from './components/Register';
import DashboardHome from './components/DashboardHome';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';
import { sendMessage, fetchHistory, fetchSessions, setUserName, deleteSession } from './api';

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [activeView, setActiveView] = useState('dashboard'); 
  const [sessions, setSessions] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [activeName, setActiveName] = useState('New Chat');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loadSessions = useCallback(async () => {
    if (!user) return;
    try {
      const data = await fetchSessions(user.id);
      setSessions(data.sessions || []);
    } catch (e) {
      console.error('Failed to load sessions:', e);
    }
  }, [user]);

  const loadHistory = useCallback(async (sessionId) => {
    try {
      const data = await fetchHistory(sessionId);
      setMessages(data.messages || []);
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    // Always default to Dashboard on load as requested
    setActiveView('dashboard');
    setActiveId('');
    setActiveName('New Chat');
    setMessages([]);
    loadSessions();
  }, [user, loadSessions]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('chatUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('chatUser');
    setUser(null);
    setSessions([]);
    setMessages([]);
    setActiveId('');
    setActiveView('dashboard');
  };

  const handleSelectView = (viewId) => {
    if (viewId === 'dashboard') {
      setActiveId('');
      setMessages([]);
      setActiveName('New Chat');
      localStorage.removeItem(`activeSessionId_${user?.id}`);
    }
    setActiveView(viewId);
  };

  const handleSelectSession = (sessionId, name) => {
    setActiveId(sessionId);
    setActiveName(name || 'Chat');
    loadHistory(sessionId);
    setActiveView('workspace');
    if (user) {
      localStorage.setItem(`activeSessionId_${user.id}`, sessionId);
      localStorage.setItem(`activeSessionName_${user.id}`, name || 'Chat');
    }
  };

  const handleNewFromSuggestion = (text) => {
    const newId = generateSessionId();
    setActiveId(newId);
    setMessages([]);
    setActiveName('New Chat');
    setActiveView('workspace');
    if (user) localStorage.setItem(`activeSessionId_${user.id}`, newId);
    handleSend(text, newId);
  };

  const handleRename = async (newName) => {
    setActiveName(newName);
    if (user) localStorage.setItem(`activeSessionName_${user.id}`, newName);
    try {
      await setUserName(activeId, newName);
      await loadSessions();
    } catch (e) {
      console.error('Rename failed:', e);
    }
  };

  const handleSend = async (text, targetId = null) => {
    let sessionId = targetId || activeId;
    
    if (!sessionId) {
      sessionId = generateSessionId();
      setActiveId(sessionId);
      setActiveView('workspace');
      if (user) localStorage.setItem(`activeSessionId_${user.id}`, sessionId);
    }

    const userMsg = { role: 'user', message: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    if (messages.length === 0 && activeName === 'New Chat') {
      const autoName = text.length > 25 ? text.substring(0, 25) + '...' : text;
      handleRename(autoName);
    }

    try {
      const data = await sendMessage(sessionId, user.id, text);
      const botMsg = { role: 'assistant', message: data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', message: 'Error: Connection lost.' }]);
    } finally {
      setIsTyping(false);
      loadSessions();
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      loadSessions();
      if (activeId === sessionId) {
        setActiveId('');
        setMessages([]);
        setActiveView('dashboard');
        localStorage.removeItem(`activeSessionId_${user?.id}`);
      }
    } catch (e) {
      console.error('Delete failed:', e);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-slate-50">
        {authMode === 'login' ? (
          <Login onLogin={handleLogin} onSwitch={() => setAuthMode('register')} />
        ) : (
          <Register onSwitch={() => setAuthMode('login')} onSuccess={() => setAuthMode('login')} />
        )}
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* 🌌 Global Atmosphere Background Layer */}
      <div className="dashboard-cinematic-atmosphere">
         <div className="middle-glow-bubble-lux" />
      </div>

      <Sidebar
        activeView={activeView}
        onSelectView={handleSelectView}
        onLogout={handleLogout}
        user={user}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="flex-1 main-content-glass-card">
        <div className="flex flex-col h-full relative overflow-hidden">
          {activeView !== 'dashboard' && (
            <Header
              sessionName={activeName}
              onRename={handleRename}
              onClear={() => setMessages([])}
              user={user}
              activeView={activeView}
            />
          )}

          <main className={`flex-1 flex flex-col overflow-hidden relative ${activeView === 'dashboard' ? 'items-center justify-center' : ''}`}>
            {activeView === 'dashboard' && (
              <DashboardHome 
                user={user} 
                onNewChat={handleNewFromSuggestion} 
                recentSessions={sessions}
                onSelectSession={handleSelectSession}
              />
            )}

            {activeView === 'history' && (
              <HistoryView 
                sessions={sessions} 
                onSelectSession={handleSelectSession}
                onDeleteSession={handleDeleteSession}
              />
            )}

            {activeView === 'settings' && (
              <SettingsView 
                user={user} 
                onLogout={handleLogout} 
              />
            )}

            {activeView === 'workspace' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <ChatWindow messages={messages} isTyping={isTyping} user={user} />
              </div>
            )}
          </main>
          
          {activeView === 'workspace' && (
            <div className="px-10 pb-10">
              <InputBox onSend={(text) => handleSend(text)} disabled={isTyping} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
