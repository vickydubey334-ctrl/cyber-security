import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, CheckCircle, Wifi, Lock, Activity } from 'lucide-react';
import { Device, DeviceStatus, Alert } from '../types';

interface DashboardProps {
  devices: Device[];
  alerts: Alert[];
}

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#64748b'];

const Dashboard: React.FC<DashboardProps> = ({ devices, alerts }) => {
  
  // Stats
  const onlineCount = devices.filter(d => d.status === DeviceStatus.ONLINE).length;
  const vulnerableCount = devices.filter(d => d.status === DeviceStatus.VULNERABLE || d.status === DeviceStatus.COMPROMISED).length;
  const updatingCount = devices.filter(d => d.status === DeviceStatus.UPDATING).length;

  const statusData = [
    { name: 'Secure', value: onlineCount },
    { name: 'Updating', value: updatingCount },
    { name: 'Vulnerable', value: vulnerableCount },
    { name: 'Offline', value: devices.length - onlineCount - vulnerableCount - updatingCount },
  ];

  const trafficData = [
    { name: '00:00', success: 40, failed: 2 },
    { name: '04:00', success: 30, failed: 1 },
    { name: '08:00', success: 20, failed: 5 },
    { name: '12:00', success: 27, failed: 3 },
    { name: '16:00', success: 18, failed: 0 },
    { name: '20:00', success: 23, failed: 1 },
    { name: '23:59', success: 34, failed: 2 },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Operational Overview</h2>
        <p className="text-slate-400">Real-time monitoring of secure boot integrity and firmware distribution.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">Total Fleet</span>
            <Wifi className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white">{devices.length}</div>
          <div className="text-xs text-indigo-400 mt-2">12 New devices linked</div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">Secure Boot Active</span>
            <Lock className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">{((onlineCount / devices.length) * 100).toFixed(1)}%</div>
          <div className="text-xs text-emerald-400 mt-2">Integrity Verified</div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">Active Updates</span>
            <Activity className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">{updatingCount}</div>
          <div className="text-xs text-amber-400 mt-2">Delta updates in progress</div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">Security Alerts</span>
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-3xl font-bold text-white">{alerts.length}</div>
          <div className="text-xs text-rose-400 mt-2">Requires attention</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Firmware Handshake Traffic</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSuccess)" />
                <Area type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorFailed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Device Health</h3>
          <div className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4 flex-wrap justify-center">
                {statusData.map((item, idx) => (
                  <div key={item.name} className="flex items-center text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[idx] }}></span>
                    {item.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alert Feed */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Security Alerts</h3>
          <button className="text-xs text-emerald-400 hover:text-emerald-300">View Audit Logs</button>
        </div>
        <div className="divide-y divide-slate-800">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-start gap-4">
               <div className={`mt-1 p-2 rounded-lg ${
                 alert.severity === 'CRITICAL' ? 'bg-rose-500/10 text-rose-500' :
                 alert.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-500' : 
                 'bg-yellow-500/10 text-yellow-500'
               }`}>
                 <AlertTriangle className="w-4 h-4" />
               </div>
               <div className="flex-1">
                 <div className="flex justify-between mb-1">
                   <h4 className="text-sm font-medium text-slate-200">{alert.message}</h4>
                   <span className="text-xs text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <p className="text-xs text-slate-400">Source: {alert.source}</p>
                   {!alert.acknowledged && (
                     <button className="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 transition-colors">
                       Acknowledge
                     </button>
                   )}
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;