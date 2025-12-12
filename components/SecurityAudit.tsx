import React, { useState } from 'react';
import { Device, Alert } from '../types';
import { analyzeSecurityPosture, generateComplianceMap } from '../services/geminiService';
import { BrainCircuit, FileText, RefreshCw, CheckSquare, ShieldAlert } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Assuming we'd handle markdown rendering, but for this XML we'll output raw text or basic HTML mapping if preferred. For simplicity, we just display text in whitespace-pre-wrap

interface SecurityAuditProps {
  devices: Device[];
  alerts: Alert[];
}

const SecurityAudit: React.FC<SecurityAuditProps> = ({ devices, alerts }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [compliance, setCompliance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ANALYSIS' | 'COMPLIANCE'>('ANALYSIS');

  const runAnalysis = async () => {
    setIsLoading(true);
    const result = await analyzeSecurityPosture(devices, alerts);
    setAnalysis(result);
    setIsLoading(false);
  };

  const runCompliance = async (std: 'NIST' | 'GDPR') => {
    setIsLoading(true);
    const result = await generateComplianceMap(std);
    setCompliance(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">AI Security Audit</h2>
          <p className="text-slate-400">Intelligent threat detection and regulatory compliance mapping powered by Gemini.</p>
        </div>
      </header>

      <div className="flex gap-4 border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('ANALYSIS')}
          className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'ANALYSIS' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-white'}`}
        >
          Threat Analysis
        </button>
        <button 
          onClick={() => setActiveTab('COMPLIANCE')}
          className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'COMPLIANCE' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-white'}`}
        >
          Compliance (NIST/GDPR)
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 min-h-[400px]">
        {activeTab === 'ANALYSIS' && (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <BrainCircuit className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">System Heuristics</h3>
                    <p className="text-xs text-slate-400">Analyzes logs, firmware signatures, and device anomalies.</p>
                  </div>
                </div>
                <button 
                  onClick={runAnalysis}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
                  Run Analysis
                </button>
             </div>

             {analysis ? (
               <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                 {analysis}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center h-64 text-slate-500 border-2 border-dashed border-slate-800 rounded-lg">
                 <ShieldAlert className="w-12 h-12 mb-3 opacity-20" />
                 <p>No analysis run yet. Initiate a scan to detect threats.</p>
               </div>
             )}
          </div>
        )}

        {activeTab === 'COMPLIANCE' && (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <CheckSquare className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Standards Mapping</h3>
                    <p className="text-xs text-slate-400">Generate checklists based on NIST IoT or GDPR guidelines.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => runCompliance('NIST')}
                    disabled={isLoading}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    Load NIST Guidelines
                  </button>
                  <button 
                    onClick={() => runCompliance('GDPR')}
                    disabled={isLoading}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    Load GDPR Checklist
                  </button>
                </div>
             </div>

             {compliance ? (
               <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                 {compliance}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center h-64 text-slate-500 border-2 border-dashed border-slate-800 rounded-lg">
                 <FileText className="w-12 h-12 mb-3 opacity-20" />
                 <p>Select a regulatory standard to generate a compliance report.</p>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityAudit;