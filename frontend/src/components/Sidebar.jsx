import React from 'react';

export default function Sidebar({ activeView, onSelectView, onLogout, user, isCollapsed, setIsCollapsed }) {
  const menuItems = [
    { id: 'dashboard', label: 'New Chat', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
    { id: 'history', label: 'History', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
    { id: 'settings', label: 'Settings', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) }
  ];

  return (
    <div className={`${isCollapsed ? 'w-[100px]' : 'w-[320px]'} h-full flex flex-col p-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sidebar-glass-panel-cinematic relative z-30`}>
      
      {/* 🏷️ Header Section - Centered Branding */}
      <div className={`flex flex-col items-center mb-16 px-1`}>
        <div className={`flex items-center gap-5 group cursor-pointer ${isCollapsed ? 'flex-col gap-3' : 'w-full'}`} onClick={() => onSelectView('dashboard')}>
          <div className="w-14 h-14 shrink-0 logo-glass-badge-nexus flex items-center justify-center shadow-xl">
             <div className="w-10 h-10 logo-icon-nexus flex items-center justify-center text-white shadow-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                   <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-pulse" />
                   <path d="M12 7v3M12 14v3M7 12H4M20 12h-3" stroke="currentColor" strokeLinecap="round" />
                </svg>
             </div>
          </div>
          {!isCollapsed ? (
            <div className="flex-1 flex flex-col animate-fade-in">
               <h1 className="text-[24px] font-black tracking-tight text-[#0f172a] brand-font leading-none mb-1">IntelliDesk</h1>
               <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] opacity-70 leading-none">Intelligence Hub</p>
            </div>
          ) : (
             <div className="h-4" /> // Spacer for collapsed
          )}
        </div>

        {/* 🧭 Internal Toggle Button - Positioned consistently */}
        <div className={`w-full flex mt-6 ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-12 h-12 sidebar-toggle-internal flex items-center justify-center group/toggle shadow-sm hover:shadow-indigo-500/10 transition-all"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <div className="w-5 h-5 border-2 border-slate-400 rounded-[5px] relative flex items-center justify-center transition-colors group-hover/toggle:border-indigo-500">
               <div className={`absolute inset-y-0 left-[35%] w-[2px] bg-slate-400 group-hover/toggle:bg-indigo-500 transition-all ${isCollapsed ? 'rotate-90' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Navigation - Standardized & Centered Icons */}
      <nav className={`flex-1 space-y-6 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectView(item.id)}
            className={`flex items-center transition-all duration-300 sidebar-btn-tinted group ${
              isCollapsed 
                ? 'w-16 h-16 justify-center rounded-[24px]' 
                : 'w-full gap-4 px-5 py-4 rounded-[22px]'
            } ${
              activeView === item.id 
                ? 'bg-white/60 !shadow-2xl !shadow-indigo-500/15 text-indigo-600 border-white scale-[1.05]' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className={`flex items-center justify-center transition-all duration-300 ${activeView === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="text-[16px] font-extrabold tracking-tight animate-fade-in">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* User Area - Centered & Premium */}
      <div className={`pt-8 border-t border-white/50 mt-auto ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        <div className={`flex items-center transition-all hover:scale-[1.05] hover:bg-white/60 rounded-[28px] bg-white/40 border border-white/80 shadow-xl shadow-indigo-500/5 ${
          isCollapsed ? 'w-16 h-16 justify-center' : 'gap-4 p-4 mb-8 w-full'
        }`}>
          <div className="w-12 h-12 shrink-0 rounded-[18px] bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-2xl border-2 border-white ring-4 ring-white/10">
             {user?.username?.charAt(0).toUpperCase() || 'P'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-[17px] font-black text-slate-900 truncate tracking-tight">{user?.username || 'Pardhu'}</p>
              <p className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest opacity-70">Identity Session</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={onLogout}
          className={`transition-all shadow-2xl shadow-slate-200 flex items-center justify-center group/logout rounded-[24px] bg-slate-900 text-white ${
            isCollapsed ? 'w-16 h-16 mt-6' : 'w-full py-5 px-4 mt-0 gap-4'
          }`}
          title="Terminate Session"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover/logout:-translate-x-1 transition-transform">
             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-[0.25em] animate-fade-in">Terminate</span>}
        </button>
      </div>
    </div>
  );
}
