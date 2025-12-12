import React from 'react';
import { Device, DeviceStatus } from '../types';
import { Search, Filter, Cpu, Battery, MoreVertical, RefreshCw } from 'lucide-react';

interface DeviceListProps {
  devices: Device[];
  onDeploy: (deviceId: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onDeploy }) => {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">Device Fleet</h2>
           <p className="text-slate-400">Manage connected IoT endpoints and monitor secure boot status.</p>
        </div>
        
        <div className="flex gap-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
             <input 
               type="text" 
               placeholder="Search UUID or IP..." 
               className="bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none w-64"
             />
           </div>
           <button className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-400 hover:text-white transition-colors">
             <Filter className="w-5 h-5" />
           </button>
        </div>
      </header>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900 text-slate-200 font-medium uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Device Name / ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Firmware</th>
                <th className="px-6 py-4">Health</th>
                <th className="px-6 py-4">Last Seen</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-slate-700">
                         <Cpu className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{device.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{device.id.substring(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      device.status === DeviceStatus.ONLINE ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      device.status === DeviceStatus.UPDATING ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      device.status === DeviceStatus.VULNERABLE ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-slate-700 text-slate-400 border-slate-600'
                    }`}>
                      {device.status === DeviceStatus.UPDATING && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-300">
                    v{device.firmwareVersion}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Battery className="w-4 h-4" />
                        <span className="text-xs">{device.batteryLevel}%</span>
                      </div>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${device.batteryLevel}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(device.lastSeen).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       {device.status !== DeviceStatus.UPDATING && (
                         <button 
                           onClick={() => onDeploy(device.id)}
                           className="text-indigo-400 hover:text-indigo-300 text-xs font-medium px-3 py-1.5 rounded hover:bg-indigo-500/10 transition-colors"
                         >
                           Deploy Update
                         </button>
                       )}
                       <button className="p-1 text-slate-500 hover:text-white transition-colors">
                         <MoreVertical className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeviceList;