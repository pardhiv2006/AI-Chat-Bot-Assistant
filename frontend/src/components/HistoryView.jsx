import React from 'react';

export default function HistoryView({ sessions, onSelectSession, onDeleteSession }) {
  return (
    <div className="flex-1 flex flex-col bg-transparent h-full overflow-hidden relative">
      <div className="premium-bg opacity-30" />
      
      <div className="relative z-10 p-12 max-w-6xl w-full text-left h-full flex flex-col">
        <header className="mb-14 shrink-0">
          <h2 className="text-[44px] font-bold text-[#111827] tracking-tight brand-font mb-3">History</h2>
          <p className="text-slate-400 font-bold text-[12px] uppercase tracking-[0.4em] opacity-60">Your Intelligence Archive</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto custom-scrollbar pr-6 flex-1 pb-16">
          {sessions.length === 0 ? (
            <div className="col-span-full p-20 rounded-[44px] border-2 border-dashed border-white/40 flex flex-col items-center gap-6 glass-panel text-center">
              <span className="text-6xl animate-bounce">📭</span>
              <div>
                <p className="text-slate-600 text-xl font-bold mb-2">No intelligence found</p>
                <p className="text-slate-400 font-medium text-sm">Start a new conversation to begin your archive.</p>
              </div>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.session_id}
                className="group relative flex flex-col items-start gap-6 p-8 glass-panel !bg-white/40 border-white/60 hover:!bg-white/70 rounded-[36px] transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] text-left cursor-pointer"
                onClick={() => onSelectSession(session.session_id, session.name)}
              >
                {/* Delete Button - Premium & Functional */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Permanently archive this session?")) {
                      onDeleteSession(session.session_id);
                    }
                  }}
                  className="absolute top-6 right-6 w-11 h-11 rounded-2xl bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white flex items-center justify-center shadow-lg border border-red-100"
                  title="Delete Session"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="w-16 h-16 rounded-[22px] bg-gradient-to-tr from-indigo-50 to-white flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-sm border border-white">
                  💬
                </div>

                <div className="space-y-2 w-full">
                  <h4 className="text-xl font-bold text-[#111827] group-hover:text-indigo-600 transition-colors line-clamp-1 leading-tight">
                    {session.name || 'Untitled Insight'}
                  </h4>
                  <div className="flex items-center gap-3">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest opacity-70">
                      {new Date(session.last_activity || session.created_at).toLocaleDateString(undefined, { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                      })}
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest">
                      {session.message_count || 0} MESSAGES
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20 w-full flex items-center justify-between">
                   <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 border-2 border-white" />
                      <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white" />
                   </div>
                   <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Workspace ID: {session.session_id.slice(-4).toUpperCase()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
