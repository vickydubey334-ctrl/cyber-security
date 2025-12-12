import React, { useState } from 'react';
import { Firmware } from '../types';
import { Upload, Lock, Shield, FileCheck, Info } from 'lucide-react';

interface FirmwareManagerProps {
  firmwares: Firmware[];
  onAddFirmware: (fw: Firmware) => void;
}

const FirmwareManager: React.FC<FirmwareManagerProps> = ({ firmwares, onAddFirmware }) => {
  const [isUploading, setIsUploading] = useState(false);

  // Mock function to simulate a file upload and signing process
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate processing delay
      setTimeout(() => {
        const newFw: Firmware = {
          id: crypto.randomUUID(),
          version: `2.4.${Math.floor(Math.random() * 9)}`,
          releaseDate: new Date().toISOString(),
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          isSigned: true,
          signatureType: 'RSA-4096',
          hash: 'SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          status: 'DRAFT',
          description: 'Security patch and kernel optimization.'
        };
        onAddFirmware(newFw);
        setIsUploading(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Firmware Management</h2>
        <p className="text-slate-400">Secure code signing, integrity verification, and release channel management.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload & Sign Card */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/50 border border-indigo-500/30 p-6 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Lock className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Secure Upload & Sign</h3>
          </div>
          
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors group relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                {isUploading ? (
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                )}
              </div>
              <div className="text-sm font-medium text-slate-300">
                {isUploading ? 'Signing Firmware (HSM)...' : 'Drop firmware binary here'}
              </div>
              <div className="text-xs text-slate-500">
                Supports .bin, .hex. Automatically signs with RSA-4096.
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
             <div className="flex items-center gap-3 text-xs text-slate-400">
               <Shield className="w-4 h-4 text-emerald-500" />
               <span>Hardware Security Module (HSM) Online</span>
             </div>
             <div className="flex items-center gap-3 text-xs text-slate-400">
               <FileCheck className="w-4 h-4 text-emerald-500" />
               <span>Auto-verification of SHA-256 hashes</span>
             </div>
          </div>
        </div>

        {/* Firmware List */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
           <div className="p-6 border-b border-slate-800">
             <h3 className="text-lg font-semibold text-white">Repository</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-slate-400">
               <thead className="bg-slate-900 text-slate-200 text-xs uppercase">
                 <tr>
                   <th className="px-6 py-3">Version</th>
                   <th className="px-6 py-3">Signature</th>
                   <th className="px-6 py-3">Size</th>
                   <th className="px-6 py-3">Status</th>
                   <th className="px-6 py-3 text-right">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                 {firmwares.map((fw) => (
                   <tr key={fw.id} className="hover:bg-slate-800/30">
                     <td className="px-6 py-4 font-mono text-white">v{fw.version}</td>
                     <td className="px-6 py-4">
                       <div className="flex flex-col">
                         <span className="flex items-center gap-1 text-emerald-400 text-xs">
                           <Shield className="w-3 h-3" /> {fw.signatureType}
                         </span>
                         <span className="text-[10px] font-mono text-slate-600 mt-0.5 truncate w-24">
                           {fw.hash}
                         </span>
                       </div>
                     </td>
                     <td className="px-6 py-4">{fw.size}</td>
                     <td className="px-6 py-4">
                       <span className={`text-xs px-2 py-1 rounded border ${
                         fw.status === 'DEPLOYED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                         fw.status === 'SIGNED' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                         'bg-slate-700 text-slate-300 border-slate-600'
                       }`}>
                         {fw.status}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-right">
                       <button className="text-indigo-400 hover:text-white text-xs font-medium">
                         View Details
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
      
      {/* Encryption Info Block */}
      <div className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-emerald-400">Delta Updates Enabled</h4>
          <p className="text-xs text-emerald-300/70 mt-1">
            The system is currently configured to generate binary diffs (deltas) for version transitions, reducing bandwidth usage by up to 80% for constrained IoT devices. All transfers are protected via TLS 1.3.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirmwareManager;