import React, { useState, useRef, useEffect } from 'react';

export default function DashboardHome({ user, onNewChat }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim()) {
      onNewChat(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden animate-fade-in">
      
      {/* 🫧 Cinematic Content (Floating directly on background) */}
      <div className="max-w-4xl w-full flex flex-col items-center relative z-10 -mt-16">
        
        {/* 🤖 AI Badge mascot container */}
        <div className="mb-10 animate-fade-up">
           <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[80px] animate-pulse" />
              <div className="relative w-32 h-32 flex items-center justify-center ai-badge-cinematic group overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-700 hover:scale-105 border-white/80">
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-xl">
                    <rect x="4" y="6" width="16" height="12" rx="5" fill="#4f46e5" />
                    <circle cx="9" cy="11" r="1.5" fill="white" />
                    <circle cx="15" cy="11" r="1.5" fill="white" />
                    <path d="M10 14.5c1 0.5 3 0.5 4 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 6l2-3m8 3l-2-3" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
                 </svg>
                 <div className="absolute bottom-6 right-7 animate-wave">
                    <span className="text-5xl drop-shadow-xl">👋</span>
                 </div>
              </div>
           </div>
        </div>

        {/* 👋 Hero Greeting Section */}
        <div className="text-center mb-16">
          <h1 className="text-[52px] font-bold tracking-tight leading-tight animate-fade-up [animation-delay:0.1s]">
             <span className="hero-text-navy">{getGreeting()},</span>{" "}
             <span className="hero-name-purple">{user?.username || 'Pardhu'}</span>{" "}
             <span>👋</span>
          </h1>
          <p className="mt-8 subheading-cinematic animate-fade-up [animation-delay:0.2s]">
             What incredible insight shall we synthesize today?
          </p>
        </div>

        {/* 🔍 Wide Floating Hub (Floating directly on background) */}
        <div className="w-full max-w-2xl input-hub-lux p-2.5 animate-fade-up [animation-delay:0.3s] flex items-center group transition-all duration-700 hover:shadow-[0_45px_90px_-16px_rgba(79,70,229,0.18)] hover:scale-[1.01] focus-within:border-indigo-300">
           <div className="w-13 h-13 bg-white/80 rounded-[18px] flex items-center justify-center text-slate-400 shadow-sm border border-white group-focus-within:text-indigo-500 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                 <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
           </div>
           <textarea 
             ref={textareaRef}
             rows="1"
             value={text}
             onChange={(e) => setText(e.target.value)}
             onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                 e.preventDefault();
                 handleSend();
               }
             }}
             placeholder="Describe your intent..."
             className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-xl font-medium text-slate-700 placeholder:text-slate-300 resize-none overflow-hidden max-h-60"
           />
           <div className="flex items-center gap-4 pr-3">
              <button className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-indigo-500 transition-colors group/mic">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover/mic:scale-110 transition-transform">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeLinecap="round"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round"/>
                 </svg>
              </button>
              {text.trim() && (
                <button 
                  onClick={handleSend}
                  className="h-13 px-8 bg-indigo-600 rounded-[20px] flex items-center justify-center text-white text-[15px] font-bold shadow-2xl shadow-indigo-100 animate-fade-in hover:bg-indigo-700 transition-all active:scale-95"
                >
                   Synthesize
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="ml-3">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </button>
              )}
           </div>
        </div>

        {/* 🏷️ Visible Identity Footer Text */}
        <div className="mt-16 animate-fade-up [animation-delay:0.4s]">
            <p className="text-[13px] footer-text-visible uppercase tracking-[0.5em]">
                AI Operating System • Identity Session v10.0
            </p>
        </div>

      </div>
    </div>
  );
}
