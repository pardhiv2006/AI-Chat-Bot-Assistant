import React from 'react';

export default function SettingsView({ user, onLogout }) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative animate-fade-in">
      
      <div className="relative z-10 p-12 max-w-5xl w-full text-left">
        <header className="mb-14">
          <h2 className="text-[44px] font-bold text-[#111827] tracking-tight brand-font mb-3">Configuration</h2>
          <p className="text-slate-400 font-bold text-[12px] uppercase tracking-[0.4em] opacity-60">Identity & System Parameters</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 overflow-y-auto custom-scrollbar pr-6 flex-1 pb-16">
          
          {/* 👤 Personal Details Card */}
          <div className="glass-panel !bg-white/40 border-white/60 p-8 rounded-[40px] space-y-8 shadow-xl shadow-indigo-500/5">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-[28px] bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl border-2 border-white ring-8 ring-white/10">
                  {user?.username?.charAt(0).toUpperCase() || 'P'}
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">{user?.username || 'Pardhu'}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Identity</p>
                  </div>
               </div>
            </div>

            <div className="space-y-5 pt-4">
               <div className="p-5 bg-white/40 rounded-3xl border border-white/60 group hover:bg-white/60 transition-all">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</p>
                  <p className="text-[15px] font-bold text-slate-800">{user?.email || 'user@intellidesk.ai'}</p>
               </div>
               
               <div className="p-5 bg-white/40 rounded-3xl border border-white/60 group hover:bg-white/60 transition-all">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">System Role</p>
                  <p className="text-[15px] font-bold text-indigo-600">Workspace Administrator</p>
               </div>
            </div>
          </div>

          {/* ⚙️ System Configuration Card */}
          <div className="glass-panel !bg-white/40 border-white/60 p-8 rounded-[40px] space-y-8 shadow-xl shadow-indigo-500/5">
             <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Workspace Intelligence</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Running via Ollama Localhost</p>
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-between p-5 bg-white/50 rounded-3xl border border-white/80">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                         </svg>
                      </div>
                      <span className="font-bold text-slate-800">Active Model</span>
                   </div>
                   <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-indigo-100">Llama 3</span>
                </div>

                <div className="flex items-center justify-between p-5 bg-white/50 rounded-3xl border border-white/80">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                         </svg>
                      </div>
                      <span className="font-bold text-slate-800">Security Mode</span>
                   </div>
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">AES-256 Valid</span>
                </div>
             </div>

             <div className="pt-6">
                <button 
                  onClick={onLogout}
                  className="w-full py-4 bg-red-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-lg shadow-red-100 flex items-center justify-center gap-3 group/logout"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover/logout:-translate-x-1 transition-transform">
                     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Terminate Session
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
