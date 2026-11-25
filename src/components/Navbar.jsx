import React from 'react';
import { 
  Building2, 
  FileSpreadsheet, 
  Bot, 
  FileText, 
  HelpCircle, 
  Sparkles, 
  DollarSign, 
  ShieldCheck, 
  Layers,
  FileCode2,
  Download
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  usdRate, 
  setUsdRate, 
  stats,
  onExportCsv
}) {
  const tabs = [
    { id: 'grid', label: 'Comparison Grid', icon: FileSpreadsheet, badge: '30 SKUs' },
    { id: 'analyst', label: 'Analyst Copilot', icon: Bot, badge: 'VP Queries' },
    { id: 'raw_docs', label: 'Raw Vendor Docs', icon: FileText, badge: '5 Sources' },
    { id: 'rfx_copilot', label: 'RFx Builder', icon: Sparkles, badge: 'Scope' },
    { id: 'compliance', label: 'Quality & QA', icon: ShieldCheck, badge: 'Audit' },
    { id: 'memo', label: 'PM Strategy & Memo', icon: FileCode2, badge: 'Better Problem' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 sticky top-0 z-40 backdrop-blur">
      {/* Top tier brand and metadata */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Category */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
              A
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold tracking-tight text-white text-lg">Aerchain</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                  Quote Desk
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live AI Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Annual Corrugated Packaging Procurement (FY 2026-27) · 30 Lines · ₹4.1 Cr Spend
              </p>
            </div>
          </div>

          {/* Quick Metrics & Currency Controls */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {/* Currency Input Assumption */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-lg shadow-sm">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300 font-medium">USD→INR Assumption:</span>
              <div className="flex items-center">
                <span className="text-slate-400 mr-1">₹</span>
                <input
                  type="number"
                  step="0.1"
                  min="70"
                  max="100"
                  value={usdRate}
                  onChange={(e) => setUsdRate(parseFloat(e.target.value) || 84.50)}
                  className="w-16 bg-slate-900 border border-slate-600 rounded px-1.5 py-0.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Quick Spend Badges */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-850 border border-slate-800 px-3 py-1.5 rounded-lg">
              <span className="text-slate-400">Baseline:</span>
              <span className="font-semibold text-slate-200 font-mono">
                ₹{(stats.baselineSpend / 10000000).toFixed(2)} Cr
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-medium">QA Split Award:</span>
              <span className="font-bold text-emerald-300 font-mono">
                ₹{(stats.qualitySplitNetSpend / 10000000).toFixed(2)} Cr
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 text-[11px] font-bold border border-emerald-800/60">
                Save ₹{(stats.savingsVsBaseline / 100000).toFixed(1)}L ({stats.savingsPercent.toFixed(1)}%)
              </span>
            </div>

            {/* Export CSV Button */}
            <button
              onClick={onExportCsv}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
              title="Export complete comparison matrix to CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 mt-3 border-t border-slate-850 pt-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-indigo-500/30 text-indigo-200 font-semibold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
