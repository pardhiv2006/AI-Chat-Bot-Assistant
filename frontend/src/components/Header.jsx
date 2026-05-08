import React from 'react';

export default function Header({ sessionName, onRename, onClear, user, activeView }) {
  const isDashboard = activeView === 'dashboard';

  return (
    <header className="h-20 bg-white/10 backdrop-blur-xl border-b border-white/20 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-500">
      <div className="flex-1" />

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
