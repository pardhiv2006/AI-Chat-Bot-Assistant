export default function Logo({ className = "w-8 h-8", iconOnly = false, light = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <div className={`w-10 h-10 ${light ? 'bg-white' : 'bg-indigo-600'} rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={light ? '#6366f1' : 'white'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
            <path d="M12 22V12" className="opacity-40" />
          </svg>
        </div>
        <div className={`absolute -top-1 -right-1 w-4 h-4 ${light ? 'bg-indigo-50' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm border border-indigo-100`}>
           <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
        </div>
      </div>
      {!iconOnly && (
        <div className="flex flex-col leading-tight">
          <span className={`text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
            Intelli<span className="text-indigo-600">Desk</span>
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${light ? 'text-indigo-200' : 'text-slate-400'}`}>
            AI Workspace
          </span>
        </div>
      )}
    </div>
  );
}
