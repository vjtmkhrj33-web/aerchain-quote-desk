import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldAlert, 
  Calculator, 
  FileSearch, 
  Check, 
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function CellInspectorModal({ cellData, onClose, onVerifyCell, isVerified }) {
  if (!cellData) return null;

  const { item, vendor, quote, usdRate } = cellData;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'green':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence / Lowest Valid
          </span>
        );
      case 'amber':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-700">
            <AlertTriangle className="w-3.5 h-3.5" /> Normalised with Assumptions (Verify)
          </span>
        );
      case 'red':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-700">
            <XCircle className="w-3.5 h-3.5" /> Unresolvable / Missing / Excluded
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-750 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {item.sku}
              </span>
              <h3 className="text-sm font-bold text-slate-100">{item.name}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Vendor: <span className="font-semibold text-slate-200">{vendor.name}</span> ({vendor.location})
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          
          {/* Status & Confidence Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Validation State</div>
              <div className="mt-1">{getStatusBadge(quote.status)}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Model Confidence</div>
              <div className="text-lg font-bold font-mono text-slate-100 mt-0.5">
                {quote.confidence}%
              </div>
            </div>
          </div>

          {/* Pricing Comparison Math Box */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold">
              <Calculator className="w-4 h-4" />
              <span>Normalisation & Formula Breakdown</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Raw Quoted Text</span>
                <span className="font-mono font-bold text-slate-100 text-sm">{quote.rawQuote}</span>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Normalised Rate</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {quote.priceInr !== null ? `₹${quote.priceInr.toFixed(2)} / pc` : 'N/A (Unquoted)'}
                </span>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[11px]">Annual Line Value</span>
                <span className="font-mono font-bold text-slate-100 text-sm">
                  {quote.priceInr !== null ? `₹${((quote.priceInr * item.annualQty) / 100000).toFixed(2)} Lakhs` : '₹0'}
                </span>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-750 text-slate-300 font-mono text-[11px] leading-relaxed">
              <span className="text-indigo-300 font-bold">Rule Applied: </span>
              {quote.note}
            </div>
          </div>

          {/* Verbatim Source Snippet */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <FileSearch className="w-4 h-4 text-slate-400" />
                Verbatim Excerpt from Source Document
              </span>
              <span className="text-[11px] text-slate-500 font-mono">{vendor.formatType}</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-amber-200/90 whitespace-pre-wrap leading-relaxed">
              {quote.snippet}
            </div>
          </div>

          {/* Commercial & Contractual Caveats */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Commercial Terms & Audit Notice</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
              <li><strong className="text-slate-300">Delivery Terms:</strong> {vendor.deliveryTerms}</li>
              <li><strong className="text-slate-300">Payment Terms:</strong> {vendor.statedPaymentTerms}</li>
              {vendor.rebateCondition && (
                <li className="text-amber-300">
                  <strong>Conditional Rebate:</strong> {vendor.rebateCondition}
                </li>
              )}
              {quote.unit === 'usd_per_pc' && (
                <li className="text-amber-300">
                  <strong>FX Sensitivity:</strong> Converted at ₹{usdRate.toFixed(2)}/USD. A ₹1 change shifts this line by ₹{(item.annualQty * (quote.priceInr / usdRate)).toFixed(0)}.
                </li>
              )}
            </ul>
          </div>

          {/* Trust Guarantee Box */}
          <div className="border border-indigo-900/40 bg-indigo-950/20 p-3.5 rounded-xl text-[11px] text-indigo-300 leading-relaxed">
            <strong className="text-indigo-200 block mb-0.5">Trust at ₹4 Crore Guarantee:</strong>
            Every number shown is backed by an auditable formula and source document citation. 
            No hallucinated rates; no hidden rounding.
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-850 flex items-center justify-between">
          <button
            onClick={() => onVerifyCell(`${item.id}_${vendor.id}`)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              isVerified
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Check className="w-4 h-4" />
            {isVerified ? 'Verified by Buyer ✓' : 'Mark Verified for Audit'}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
