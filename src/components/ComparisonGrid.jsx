import React, { useState } from 'react';
import { LINE_ITEMS } from '../data/rfxData';
import { VENDORS, getExtractedVendorData } from '../data/vendorData';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Info, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Check, 
  Eye, 
  HelpCircle,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export default function ComparisonGrid({ 
  usdRate, 
  onSelectCell, 
  verifiedCells, 
  onExportCsv 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, LOWEST, ISSUES
  const [hoveredCell, setHoveredCell] = useState(null);

  const extractedQuotes = getExtractedVendorData(usdRate);

  // Filter items
  const filteredItems = LINE_ITEMS.filter((item) => {
    const matchesSearch = 
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dimensions.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.boardSpec.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGroup = 
      selectedGroup === 'ALL' || 
      (selectedGroup === '3-PLY' && item.ply === '3-Ply') ||
      (selectedGroup === '5-PLY' && item.ply === '5-Ply') ||
      (selectedGroup === 'PRINTED' && item.ply === '5-Ply Printed');

    // Filter by issues (missing or amber)
    let matchesStatus = true;
    if (statusFilter === 'ISSUES') {
      const hasDeccanMissing = [14, 22, 29].includes(item.id);
      const hasRaghavMissing = item.id > 20;
      matchesStatus = hasDeccanMissing || hasRaghavMissing;
    }

    return matchesSearch && matchesGroup && matchesStatus;
  });

  // Calculate lowest price for each item among valid quotes
  const getLowestPriceOnLine = (itemId) => {
    let lowest = Infinity;
    VENDORS.forEach((vendor) => {
      const q = extractedQuotes[vendor.id].find((x) => x.id === itemId);
      if (q && q.priceInr !== null && q.priceInr < lowest) {
        lowest = q.priceInr;
      }
    });
    return lowest === Infinity ? null : lowest;
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search 30 line items by SKU, dimensions, GSM or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold mr-1">Category:</span>
            {[
              { id: 'ALL', label: 'All 30 Lines' },
              { id: '3-PLY', label: '3-Ply RSC (10)' },
              { id: '5-PLY', label: '5-Ply Heavy (10)' },
              { id: 'PRINTED', label: 'Printed D2C (10)' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedGroup(btn.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  selectedGroup === btn.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-750'
                }`}
              >
                {btn.label}
              </button>
            ))}

            {/* Issues Toggle */}
            <button
              onClick={() => setStatusFilter(statusFilter === 'ISSUES' ? 'ALL' : 'ISSUES')}
              className={`ml-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'ISSUES'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-rose-300 border border-slate-750'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {statusFilter === 'ISSUES' ? 'Showing Incomplete Lines' : 'Filter Incomplete Lines'}
            </button>
          </div>
        </div>

        {/* Legend & Guide */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-slate-300">Cell Key:</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/30 border border-emerald-500 inline-block"></span>
              Lowest on Line
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/30 border border-amber-500 inline-block"></span>
              Converted / Derived Rate (Click for Audit)
            </span>
            <span className="flex items-center gap-1 text-rose-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/30 border border-rose-500 inline-block"></span>
              Unquoted / Excluded / Baseline Void
            </span>
            <span className="flex items-center gap-1 text-indigo-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
              Buyer Verified
            </span>
          </div>

          <div className="text-slate-400 italic">
            Click any cell to inspect verbatim source text, confidence score & conversion math.
          </div>
        </div>
      </div>

      {/* The Master Side-by-Side Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto max-h-[640px] scrollbar-thin">
          <table className="w-full text-left border-collapse text-xs">
            
            {/* Table Header */}
            <thead className="bg-slate-950/95 sticky top-0 z-20 backdrop-blur border-b border-slate-800 text-[11px] font-semibold text-slate-300">
              <tr>
                {/* SKU Spec Columns */}
                <th className="p-3 w-12 text-center text-slate-500 border-r border-slate-800/60">#</th>
                <th className="p-3 min-w-[200px] border-r border-slate-800/60">
                  Line Item & Specifications
                </th>
                <th className="p-3 w-24 text-right border-r border-slate-800/60">
                  Annual Qty
                </th>

                {/* 5 Vendor Headers */}
                {VENDORS.map((vendor) => {
                  return (
                    <th key={vendor.id} className="p-3 min-w-[170px] border-r border-slate-800/60 last:border-r-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-100">{vendor.name}</span>
                        {vendor.clearedQualityQuestionnaire ? (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            QA Pass
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-400 border border-rose-800">
                            QA Fail
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {vendor.location}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>{vendor.quotedLinesCount}/30 Quoted</span>
                        <span className="text-slate-400 font-semibold">{vendor.formatType.split(' ')[0]}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-850">
              {filteredItems.map((item, idx) => {
                const lowestPrice = getLowestPriceOnLine(item.id);

                return (
                  <tr key={item.id} className="hover:bg-slate-850/50 transition">
                    
                    {/* Index */}
                    <td className="p-3 text-center text-slate-500 font-mono border-r border-slate-800/60">
                      {item.id}
                    </td>

                    {/* Line Item Meta */}
                    <td className="p-3 border-r border-slate-800/60">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-200">{item.sku}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                          item.ply === '3-Ply' 
                            ? 'bg-blue-950 text-blue-300 border border-blue-800/60' 
                            : item.ply === '5-Ply'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800/60'
                            : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                        }`}>
                          {item.ply}
                        </span>
                      </div>
                      <div className="font-medium text-slate-300 text-xs mt-0.5">{item.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex gap-2">
                        <span>{item.dimensions}</span>
                        <span>•</span>
                        <span>{item.weightKg * 1000}g / box</span>
                        <span>•</span>
                        <span>BS: {item.bsKgCm2} kg/cm²</span>
                      </div>
                    </td>

                    {/* Annual Qty */}
                    <td className="p-3 text-right font-mono text-slate-300 border-r border-slate-800/60">
                      {item.annualQty.toLocaleString()}
                    </td>

                    {/* 5 Vendor Quotes */}
                    {VENDORS.map((vendor) => {
                      const quote = extractedQuotes[vendor.id].find((q) => q.id === item.id);
                      if (!quote) return <td key={vendor.id} className="p-3">-</td>;

                      const isLowest = quote.priceInr !== null && quote.priceInr === lowestPrice;
                      const cellKey = `${item.id}_${vendor.id}`;
                      const isVerified = verifiedCells.includes(cellKey);

                      // Style determinations
                      let cellBg = 'bg-slate-900/30';
                      let textColor = 'text-slate-300';
                      let borderColor = 'border-slate-800';

                      if (quote.status === 'red') {
                        cellBg = 'bg-rose-950/20';
                        textColor = 'text-rose-400';
                        borderColor = 'border-rose-900/40';
                      } else if (isLowest) {
                        cellBg = 'bg-emerald-950/40';
                        textColor = 'text-emerald-300 font-bold';
                        borderColor = 'border-emerald-600/60';
                      } else if (quote.status === 'amber') {
                        cellBg = 'bg-amber-950/20';
                        textColor = 'text-amber-300';
                        borderColor = 'border-amber-750/40';
                      }

                      return (
                        <td
                          key={vendor.id}
                          onClick={() => onSelectCell({ item, vendor, quote, usdRate })}
                          className={`p-3 border-r border-slate-800/60 last:border-r-0 cursor-pointer transition hover:ring-1 hover:ring-indigo-400 ${cellBg}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-mono text-xs ${textColor}`}>
                              {quote.priceInr !== null ? `₹${quote.priceInr.toFixed(2)}` : 'NOT QUOTED'}
                            </span>
                            {isVerified && (
                              <span className="h-4 w-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]" title="Verified by buyer">
                                ✓
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                            <span className="truncate max-w-[100px]">{quote.rawQuote}</span>
                            <span className={`px-1 py-0.2 rounded text-[9px] ${
                              quote.status === 'green' ? 'text-emerald-400 bg-emerald-950/80' :
                              quote.status === 'amber' ? 'text-amber-400 bg-amber-950/80' :
                              'text-rose-400 bg-rose-950/80'
                            }`}>
                              {quote.confidence}%
                            </span>
                          </div>

                          {/* Flag label */}
                          {quote.flag && (
                            <div className="text-[9px] text-slate-400 font-medium truncate mt-0.5">
                              {quote.flag}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
