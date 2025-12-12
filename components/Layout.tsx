import React from 'react';
import { ShieldCheck, LayoutDashboard, Server, Activity, FileCode, Users, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  userRole: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout, userRole }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'devices', label: 'Device Fleet', icon: Server },
    { id: 'firmware', label: 'Firmware Manager', icon: FileCode },
    { id: 'security', label: 'Security & Compliance', icon: ShieldCheck },
    { id: 'logs', label: 'Audit Logs', icon: Activity },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <div className="bg-emerald-500/10 p-2 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">IoT Shield</h1>
            <p className="text-xs text-slate-400">Secure Update Mgr</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-800/50 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
                {userRole === 'ADMIN' ? 'AD' : 'USR'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Admin User</span>
                <span className="text-xs text-emerald-400">Connected</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 text-slate-400 hover:text-rose-400 transition-colors py-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-950 relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
        <div className="p-8 max-w-7xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;