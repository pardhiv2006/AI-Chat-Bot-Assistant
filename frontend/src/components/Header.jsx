import React from 'react';

export default function Header({ sessionName, onRename, onClear, user, activeView }) {
  const isDashboard = activeView === 'dashboard';

  return (
    <header className="h-20 bg-white/10 backdrop-blur-xl border-b border-white/20 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-500">
      <div className="flex items-center gap-6 flex-1">
        {!isDashboard ? (
          <div className="flex items-center gap-3 bg-white/20 px-5 py-2.5 rounded-2xl border border-white/30 group transition-all hover:bg-white/30 shadow-sm">
             <div className="w-8 h-8 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 shadow-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
             </div>
             {/* 🏷️ Clean Header: Naming area removed if it was 'Active Nexus Session' */}
             <span className="text-sm font-bold text-slate-800 tracking-tight">
                {sessionName === 'New Chat' ? '' : sessionName}
             </span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-2xl logo-glass-badge-nexus flex items-center justify-center text-indigo-600 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-pulse">
                   <circle cx="12" cy="12" r="3" />
                   <path d="M12 7v3M12 14v3M7 12H4M20 12h-3" strokeLinecap="round" />
                </svg>
             </div>
             <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.25em] opacity-60">System Intelligence</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="h-8 w-px bg-white/20" />
        
        <div className="flex items-center gap-4 pl-2">
           <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none">{user?.username || 'Pardhu'}</p>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1.5 opacity-80">Verified Identity</p>
           </div>
           <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-2xl border-2 border-white ring-4 ring-white/10 overflow-hidden transition-transform hover:scale-105">
              {user?.avatar ? <img src={user.avatar} alt="P" className="w-full h-full object-cover" /> : user?.username?.charAt(0).toUpperCase() || 'P'}
           </div>
        </div>
      </div>
    </header>
  );
}
