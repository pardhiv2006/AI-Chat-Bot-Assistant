import React, { useState, useRef, useEffect } from 'react';

export default function InputBox({ onSend, disabled }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full relative z-30 pb-4">
      <div className={`relative flex items-center glass-panel !bg-white/60 rounded-[36px] p-3 transition-all duration-500 shadow-2xl shadow-black/5 border-2 border-white/80 group focus-within:border-indigo-200 focus-within:shadow-indigo-500/5 ${disabled ? 'opacity-50 grayscale' : ''}`}>
        
        {/* Attachment Hub Icon */}
        <button className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors bg-white/40 rounded-[26px] border border-white/60 ml-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="How can IntelliDesk help you today?"
          className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-[17px] font-medium text-slate-700 placeholder:text-slate-300 resize-none max-h-48 min-h-[60px] leading-relaxed"
          disabled={disabled}
        />

        <div className="flex items-center gap-4 pr-3">
           <button className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors group/mic">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover/mic:scale-110 transition-transform">
               <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeLinecap="round"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round"/>
             </svg>
           </button>

           <button
             onClick={handleSend}
             disabled={!text.trim() || disabled}
             className={`w-12 h-12 rounded-[26px] flex items-center justify-center transition-all duration-500 ${
               text.trim() && !disabled
                 ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 hover:scale-[1.05]'
                 : 'bg-slate-100 text-slate-300'
             }`}
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
               <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </button>
        </div>
      </div>
      
      <p className="mt-6 text-[11px] text-center font-bold text-slate-400 uppercase tracking-[0.4em] opacity-40">
        AI Intelligence Hub • v5.2.1 • Protected by AES-256
      </p>
    </div>
  );
}
