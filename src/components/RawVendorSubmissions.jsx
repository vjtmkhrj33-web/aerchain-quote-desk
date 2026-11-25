import React, { useState } from 'react';
import { VENDORS } from '../data/vendorData';
import { 
  FileSpreadsheet, 
  FileText, 
  Mail, 
  Camera, 
  FileCode, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Copy,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function RawVendorSubmissions({ onTriggerExtract }) {
  const [selectedVendorId, setSelectedVendorId] = useState('shree_pack');
  const [isExtracting, setIsExtracting] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedVendor = VENDORS.find((v) => v.id === selectedVendorId) || VENDORS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedVendor.rawDocumentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReRun = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      if (onTriggerExtract) onTriggerExtract();
    }, 800);
  };

  const getVendorIcon = (id) => {
    switch (id) {
      case 'shree_pack': return FileSpreadsheet;
      case 'gujarat_corru': return FileText;
      case 'deccan_cartons': return FileCode;
      case 'sunrise_pack': return Camera;
      case 'raghav_boxes': return Mail;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
            Raw Incoming Vendor Submissions (Messy, Unstructured, Real-world)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Vendors do not follow templates. The system ingests five completely different unstructured shapes:
            Excel dumps, letterhead PDFs, narrative paragraphs, angled smartphone photos, and 1-line emails.
          </p>
        </div>

        <button
          onClick={handleReRun}
          disabled={isExtracting}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition cursor-pointer self-start md:self-auto disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isExtracting ? 'animate-spin' : ''}`} />
          {isExtracting ? 'Processing Extraction Passes...' : 'Re-Run Live Model Extraction'}
        </button>
      </div>

      {/* Main Vendor Viewer Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Left Selector Roster */}
        <div className="lg:col-span-1 space-y-2">
          {VENDORS.map((vendor) => {
            const Icon = getVendorIcon(vendor.id);
            const isSelected = selectedVendor.id === vendor.id;

            return (
              <button
                key={vendor.id}
                onClick={() => setSelectedVendorId(vendor.id)}
                className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500 shadow-md text-slate-100'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs truncate text-slate-200">{vendor.name}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{vendor.formatType.split('(')[0]}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                    <span className="font-mono text-slate-400">{vendor.quotedLinesCount}/30 quoted</span>
                    <span className="text-slate-600">•</span>
                    <span className={vendor.clearedQualityQuestionnaire ? 'text-emerald-400' : 'text-rose-400'}>
                      {vendor.clearedQualityQuestionnaire ? 'QA Pass' : 'QA Fail'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Document Display */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
          
          {/* Document Header Bar */}
          <div className="p-4 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-100">{selectedVendor.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  {selectedVendor.location}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Format: <strong className="text-indigo-300">{selectedVendor.formatType}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'Copied!' : 'Copy Raw Text'}
              </button>
            </div>
          </div>

          {/* Special Callout per Vendor Format */}
          <div className="p-3 bg-slate-950/80 border-b border-slate-800 text-xs">
            {selectedVendor.id === 'shree_pack' && (
              <div className="flex items-center gap-2 text-slate-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Template Ignored:</strong> Columns are formatted as ERP internal codes (<code className="text-indigo-300">SP-BOX-RSC-01</code>) and quoted Ex-Works. Freight is extra.
                </span>
              </div>
            )}

            {selectedVendor.id === 'gujarat_corru' && (
              <div className="flex items-center gap-2 text-slate-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Buried Commercial Rebate:</strong> Quoted <em>Per 100 Pieces</em>, plus <strong>Note 4</strong> buries a conditional 4% rebate if quarterly volume exceeds 1,00,000 units.
                </span>
              </div>
            )}

            {selectedVendor.id === 'deccan_cartons' && (
              <div className="flex items-center gap-2 text-slate-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  <strong>Omitted Lines (27/30):</strong> Vendor explicitly excluded Lines 14, 22, and 29 due to rotary die deck width (2100mm) and coating machine limitations.
                </span>
              </div>
            )}

            {selectedVendor.id === 'sunrise_pack' && (
              <div className="flex items-center gap-2 text-slate-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Noisy Angled Photo in USD:</strong> Photographed at 32° angle. OCR layer has skewed tokens, priced in USD ($). Currency conversion requires explicit buyer assumption.
                </span>
              </div>
            )}

            {selectedVendor.id === 'raghav_boxes' && (
              <div className="flex items-center gap-2 text-slate-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  <strong>The Procurement Horror Email:</strong> Quoted ₹/kg for 3-ply and 5-ply, but stated <em>'rest same as last year'</em> with no contract baseline on record. Freight uncapped.
                </span>
              </div>
            )}
          </div>

          {/* Raw Text Window */}
          <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-y-auto max-h-[460px] whitespace-pre-wrap leading-relaxed select-text">
            {selectedVendor.rawDocumentContent}
          </div>

          {/* Commercial Terms Summary Footer */}
          <div className="p-3 bg-slate-850 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-slate-300 font-semibold">Delivery:</span> {selectedVendor.deliveryTerms}
            </div>
            <div>
              <span className="text-slate-300 font-semibold">Payment Terms:</span> {selectedVendor.statedPaymentTerms}
            </div>
            <div className="text-indigo-400 font-medium">
              Extraction Pipeline: Pass 1 Normalise → Pass 2 Confidence Score → Pass 3 Verification
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
