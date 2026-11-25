import React, { useState } from 'react';
import { RFX_METADATA, LINE_ITEMS, QUESTIONNAIRE_QUESTIONS } from '../data/rfxData';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  FileCheck, 
  HelpCircle, 
  ShieldCheck, 
  Sliders, 
  Layers,
  Building,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function RfxCopilot({ onRfxDispatched }) {
  const [prompt, setPrompt] = useState(
    'Draft an annual packaging RFx for 30 corrugated box line items across 3-ply and 5-ply. Enforce FOR destination delivery terms, Net 45-day credit, and a strict 5-point quality questionnaire for FMCG and heavy industrial shippers.'
  );
  const [isDispatched, setIsDispatched] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const quickPrompts = [
    'Enforce 45-day payment terms & FOR delivery',
    'Include FSC certified paper requirement in QA',
    'Set 12-month pricing validity with paper index review',
  ];

  const handleDispatch = () => {
    setIsDispatched(true);
    setShowSuccessModal(true);
    if (onRfxDispatched) onRfxDispatched();
  };

  return (
    <div className="space-y-5">
      
      {/* Copilot Prompt Generator Header */}
      <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-900/40 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>RFx Co-Pilot: Natural Language Tender Authoring</span>
        </div>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl">
          Talk your RFx into existence. The co-pilot generates complete technical line items, GSM tolerances,
          bursting strength minimums, delivery SLAs, and an audited supplier pre-qualification questionnaire.
        </p>

        {/* Input Textarea */}
        <div className="mt-4 relative">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-slate-950 border border-slate-750 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed"
            placeholder="Describe your procurement requirement in natural language..."
          />
        </div>

        {/* Quick Chips & Actions */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Suggested additions:</span>
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => setPrompt((prev) => `${prev} ${q}.`)}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700 transition cursor-pointer"
              >
                + {q}
              </button>
            ))}
          </div>

          <button
            onClick={handleDispatch}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            {isDispatched ? 'RFx Sent (Live to 5 Vendors)' : 'Publish & Dispatch to 5 Vendors'}
          </button>
        </div>
      </div>

      {/* Generated Tender Metadata & Terms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Scope Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
            <Layers className="w-4 h-4" />
            <span>Scope of Requirement</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1.5">
            <div><strong className="text-slate-200">Category:</strong> {RFX_METADATA.category}</div>
            <div><strong className="text-slate-200">Line Items:</strong> 30 SKUs (10 3-Ply, 10 5-Ply, 10 Printed)</div>
            <div><strong className="text-slate-200">Total Volume:</strong> 1,515,000 units / annum</div>
            <div><strong className="text-slate-200">Estimated Value:</strong> {RFX_METADATA.totalEstimatedSpend}</div>
          </div>
        </div>

        {/* Commercial Conditions */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
            <FileCheck className="w-4 h-4" />
            <span>Standard Commercial Terms</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1.5">
            <div><strong className="text-slate-200">Incoterms:</strong> {RFX_METADATA.targetDeliveryTerms}</div>
            <div><strong className="text-slate-200">Payment:</strong> {RFX_METADATA.paymentTermsRequired}</div>
            <div><strong className="text-slate-200">Rate Validity:</strong> 12 Months with quarterly paper index review</div>
            <div><strong className="text-slate-200">Currency:</strong> Indian Rupees (INR ₹)</div>
          </div>
        </div>

        {/* Quality Questionnaire Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>5-Point Vendor Pre-Qualification</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <div className="text-[11px] text-slate-400">Vendors must clear all mandatory criteria:</div>
            <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5">
              <li>ISO 9001:2015 active certificate</li>
              <li>FSC certified paper chain of custody</li>
              <li>In-house calibrated bursting/BCT lab</li>
              <li>Capacity &gt; 250 MT/month</li>
              <li>Unconditional 45-day payment acceptance</li>
            </ul>
          </div>
        </div>

      </div>

      {/* The 30 Line Items Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-xs text-slate-200">
            Generated Technical Specification Deck ({LINE_ITEMS.length} Line Items)
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Weights & Board GSM locked for auditable unit conversions
          </span>
        </div>

        <div className="overflow-x-auto max-h-[360px] scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 sticky top-0 text-[11px] font-semibold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-2.5 w-12 text-center">#</th>
                <th className="p-2.5">SKU & Product Name</th>
                <th className="p-2.5">Ply</th>
                <th className="p-2.5">Dimensions (mm)</th>
                <th className="p-2.5">Board Spec & GSM</th>
                <th className="p-2.5 text-right">Burst Strength</th>
                <th className="p-2.5 text-right">Unit Weight</th>
                <th className="p-2.5 text-right">Annual Qty</th>
                <th className="p-2.5 text-right">Target Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-[11px]">
              {LINE_ITEMS.map((item) => (
                <tr key={item.id} className="hover:bg-slate-850/50">
                  <td className="p-2.5 text-center text-slate-500 font-mono">{item.id}</td>
                  <td className="p-2.5 font-medium text-slate-200">
                    <span className="font-mono text-slate-400 mr-1.5">{item.sku}</span>
                    {item.name}
                  </td>
                  <td className="p-2.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                      {item.ply}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-400 font-mono">{item.dimensions}</td>
                  <td className="p-2.5 text-slate-400 truncate max-w-[200px]" title={item.boardSpec}>
                    {item.boardSpec}
                  </td>
                  <td className="p-2.5 text-right font-mono text-slate-300">{item.bsKgCm2} kg/cm²</td>
                  <td className="p-2.5 text-right font-mono text-slate-300">{(item.weightKg * 1000).toFixed(0)}g</td>
                  <td className="p-2.5 text-right font-mono text-slate-200">{item.annualQty.toLocaleString()}</td>
                  <td className="p-2.5 text-right font-mono text-emerald-400">₹{item.targetPriceInr.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">RFx Dispatched Successfully</h3>
              <p className="text-xs text-slate-400 mt-1">
                Transmitted to 5 participating vendors via Portal & Email. Responses will be ingested automatically
                whatever format they arrive in.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left text-xs space-y-1 font-mono text-slate-300">
              <div>✓ Shree Pack Industries (ERP Gateway)</div>
              <div>✓ Gujarat Corru-Pack Pvt Ltd (Letterhead/PDF)</div>
              <div>✓ Deccan Cartons & Containers (Docx/Email)</div>
              <div>✓ Sunrise Packaging Solutions (SEZ Gateway)</div>
              <div>✓ Raghav Boxes & Co. (Direct Email)</div>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer"
            >
              Continue to Comparison Grid
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
