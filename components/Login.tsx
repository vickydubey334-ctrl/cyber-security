import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim whitespace to prevent accidental login failures
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (cleanUser === 'admin' && cleanPass === 'admin') {
      onLogin('ADMIN');
    } else if (cleanUser === 'user' && cleanPass === 'user') {
      onLogin('VIEWER');
    } else {
      setError('Invalid credentials. Try admin/admin.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-10 h-10 text-emerald-400" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">IoT Shield</h1>
          <p className="text-slate-400 text-sm">Secure Firmware Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase">ID / Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <Lock className="absolute right-3 top-3.5 w-4 h-4 text-slate-600" />
            </div>
          </div>

          {error && <div className="text-rose-400 text-xs text-center">{error}</div>}

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 group mt-2"
          >
            Access Secure Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            Authorized Personnel Only. <br/>All activities are monitored and logged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;