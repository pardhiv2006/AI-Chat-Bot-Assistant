import { useState } from 'react';
import Logo from './Logo';

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) onLogin(data.user);
      else setError(data.error || 'Invalid email or password');
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page font-['Plus_Jakarta_Sans']">
      <div className="auth-card-modern fade-up !border-none">
        {/* Header Section */}
        <div className="flex flex-col items-center">
          {/* Avatar Container */}
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-sky-400 rounded-full flex items-center justify-center text-7xl shadow-2xl shadow-indigo-200 border-[6px] border-white animate-float-slow">
               👨‍💻
            </div>
            <div className="absolute bottom-0 right-0 w-14 h-14 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-slate-50 transform translate-x-1 translate-y-1">
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
               </svg>
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-1 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Sign in to your account</p>
        </div>

        {/* --- TOP SPACER (40px) --- */}
        <div style={{ height: '40px', width: '100%' }} />

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-[2rem] text-xs font-black border border-red-100">
            {error}
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left" autoComplete="off">
          <div className="space-y-3">
             <label className="block text-[13px] font-extrabold text-slate-800 uppercase tracking-widest ml-6">Email Address</label>
             <input
               type="email"
               required
               autoComplete="off"
               className="input-pill !bg-slate-50/50 focus:!bg-white"
               placeholder="name@company.com"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             />
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center px-6">
                <label className="text-[13px] font-extrabold text-slate-800 uppercase tracking-widest">Password</label>
             </div>
             <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password" 
                  className="input-pill !bg-slate-50/50 focus:!bg-white pr-16"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-500 transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45(0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
             </div>
          </div>

          {/* --- BUTTON SPACER (Iteration: 35px) --- */}
          <div style={{ height: '35px', width: '100%' }} />

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-pill"
            >
              {loading ? 'Entering...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="pt-6 text-center">
          <p className="text-slate-600 text-[15px] font-bold">
            Don't have an account?{' '}
            <button 
              onClick={onSwitch} 
              className="text-indigo-600 font-black hover:underline underline-offset-4 decoration-[3px] decoration-indigo-200 transition-all hover:decoration-indigo-600"
            >
              Create Free Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
