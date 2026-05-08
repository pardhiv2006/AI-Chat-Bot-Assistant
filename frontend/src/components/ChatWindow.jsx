import { useEffect, useRef } from 'react';

export default function ChatWindow({ messages, isTyping, user }) {
  const endRef = useRef(null);

  // 🚀 Direct Scroll Logic: Ensures user message is instantly positioned
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages, isTyping]);

  const nexusLogoIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
       <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-pulse" />
       <path d="M12 7v3M12 14v3M7 12H4M20 12h-3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-transparent animate-fade-in h-full">
        <div className="relative mb-10 animate-float">
          <div className="w-24 h-24 glass-panel rounded-[36px] flex items-center justify-center shadow-premium-shadow border-2 border-white">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-2xl flex items-center justify-center text-white shadow-xl">
               {nexusLogoIcon}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-xl border-2 border-white flex items-center justify-center text-xl">
            ✨
          </div>
        </div>
        <p className="text-slate-400 font-bold text-[12px] uppercase tracking-[0.5em] mb-4 opacity-60">Intelligence Sync</p>
        <p className="text-slate-500 max-w-[320px] text-center text-[16px] font-medium leading-relaxed opacity-70">
          Your workspace session is active. Send a message to begin the conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-12 py-16 relative z-10">
      {/* 🚀 Full-Width Container: Aligns messages to dashboard card borders */}
      <div className="w-full space-y-12">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-start gap-8 w-full ${msg.role === 'user' ? 'flex-row-reverse text-right' : 'flex-row text-left'} animate-fade-up`}>
            
            {/* 👤 Premium Circular Avatars */}
            <div className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-[11px] font-black border-2 border-white shadow-2xl ring-4 ring-white/10 ${
              msg.role === 'user' 
                ? 'bg-gradient-to-tr from-slate-900 to-slate-700 text-white' 
                : 'bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white'
            }`}>
              {msg.role === 'user' ? (user?.username?.charAt(0).toUpperCase() || 'U') : nexusLogoIcon}
            </div>
            
            {/* 💬 Elegant Translucent Chat Bubbles - Refined Width */}
            <div className={`flex flex-col max-w-[70%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-7 py-5 rounded-[32px] text-[16px] font-medium leading-[1.6] tracking-tight border border-white/60 shadow-2xl transition-all duration-500 ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-200/20' 
                  : 'glass-panel text-slate-800 backdrop-blur-3xl'
              }`}>
                <p className="whitespace-pre-wrap">{msg.message}</p>
              </div>
              <p className="mt-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-4 opacity-50">
                {msg.role === 'user' ? 'Authorized Identity' : 'IntelliDesk Nexus System'} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-8 animate-fade-in w-full">
            <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center text-[11px] font-black border-2 border-white shadow-2xl ring-4 ring-white/10">
               {nexusLogoIcon}
            </div>
            <div className="glass-panel border border-white/60 rounded-[28px] px-8 py-5 shadow-sm flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s]" />
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.1s]" />
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
            </div>
          </div>
        )}
        <div ref={endRef} className="h-12" />
      </div>
    </div>
  );
}
