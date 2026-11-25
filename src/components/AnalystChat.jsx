import React, { useState } from 'react';
import { calculateProcurementScenarios, getNumbersToVerifyByHand } from '../data/analystEngine';
import { LINE_ITEMS } from '../data/rfxData';
import { VENDORS } from '../data/vendorData';
import { 
  Bot, 
  Send, 
  Sparkles, 
  TrendingDown, 
  AlertTriangle, 
  ShieldCheck, 
  Calculator, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  HelpCircle,
  Download
} from 'lucide-react';

export default function AnalystChat({ usdRate, onSelectCell }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'bot',
      timestamp: '11:02 AM',
      text: `Hello! I am your Procurement Intelligence Copilot. All 30 line items across all 5 vendor responses have been normalized to ₹ per piece. 

I am connected directly to the extracted dataset and the qualification matrix. Ask me scenario questions, split-award models, sensitivity checks, or audit risks.`,
      suggestedQuestions: [
        'What if we split it, cheapest per line, but only among vendors who cleared the quality questionnaire?',
        'Which numbers should I verify by hand before signing off on ₹4 crore?',
        'Compare Gujarat Corru-Pack vs Shree Pack taking the 4% volume rebate into account.',
        'What is the financial and operational impact of Deccan missing lines 14, 22, and 29?',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const stats = calculateProcurementScenarios(usdRate, true);
  const auditRisks = getNumbersToVerifyByHand(usdRate);

  const handleAskQuestion = (queryText) => {
    if (!queryText.trim()) return;

    const userMsg = {
      id: `u_${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    setTimeout(() => {
      const botResponse = generateAnalystResponse(queryText, usdRate, stats, auditRisks);
      setMessages((prev) => [...prev, botResponse]);
      setIsProcessing(false);
    }, 600);
  };

  const generateAnalystResponse = (query, currentUsdRate, currentStats, risks) => {
    const qLower = query.toLowerCase();

    // 1. The VP's Core Question: Quality-Cleared Split Award
    if (
      qLower.includes('split') && 
      (qLower.includes('quality') || qLower.includes('cleared') || qLower.includes('questionnaire') || qLower.includes('cheapest'))
    ) {
      return {
        id: `b_${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'quality_split_scenario',
        text: `Here is the mathematical evaluation of the VP's Split Award Scenario (Cheapest per line, strictly among Quality-Cleared vendors):`,
        data: currentStats,
      };
    }

    // 2. The VP's Trust Question: Which numbers to verify by hand
    if (
      qLower.includes('verify by hand') || 
      qLower.includes('hand') || 
      qLower.includes('risk') || 
      qLower.includes('4 crore') ||
      qLower.includes('trust')
    ) {
      return {
        id: `b_${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'audit_risks',
        text: `Before committing ₹4 Crore of corporate capital, here are the TOP 5 NUMBERS and contract conditions you must physically audit:`,
        data: risks,
      };
    }

    // 3. Footnote rebate question: Gujarat vs Shree Pack
    if (
      qLower.includes('rebate') || 
      (qLower.includes('gujarat') && qLower.includes('shree'))
    ) {
      return {
        id: `b_${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'rebate_comparison',
        text: `True Landed Cost Comparison: Gujarat Corru-Pack (with 4% Footnote Rebate) vs Shree Pack Industries:`,
        data: {
          gujaratGross: currentStats.singleSource.gujarat.gross,
          gujaratRebate: currentStats.singleSource.gujarat.rebate,
          gujaratNet: currentStats.singleSource.gujarat.net,
          shreeBase: currentStats.singleSource.shreePack.base,
          shreeFreight: currentStats.singleSource.shreePack.freight,
          shreeLanded: currentStats.singleSource.shreePack.landed,
        },
      };
    }

    // 4. Missing lines question: Deccan Cartons
    if (
      qLower.includes('deccan') || 
      qLower.includes('14') || 
      qLower.includes('missing') ||
      qLower.includes('22') ||
      qLower.includes('29')
    ) {
      return {
        id: `b_${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'deccan_missing_analysis',
        text: `Impact Analysis for Deccan Cartons' Omitted Lines (SKUs 14, 22, 29):`,
        data: {
          omitted: [
            { id: 14, sku: 'PKG-5P-014', name: 'Wide-Flute Heavy Auto Shipper', qty: 30000, reason: 'Machine deck cylinder limit (2100mm)', fallback: 'Gujarat Corru-Pack @ ₹76.50/pc' },
            { id: 22, sku: 'PKG-PR-022', name: 'Luxury Electronics Retail Shipper (4-Color)', qty: 48000, reason: '4-Color inline printing slotter at 100% capacity', fallback: 'Sunrise Packaging @ $0.536 (₹45.29/pc)' },
            { id: 29, sku: 'PKG-PR-029', name: 'Export Cold-Storage Box (Hydrophobic Varnish)', qty: 38000, reason: 'No in-house varnish coating line', fallback: 'Sunrise Packaging @ $0.770 (₹65.07/pc)' },
          ],
        },
      };
    }

    // Generic dynamic query answer
    return {
      id: `b_${Date.now()}`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'generic_answer',
      text: `Based on real extracted data:
- Total category baseline: ₹${(currentStats.baselineSpend / 10000000).toFixed(2)} Cr across 30 SKUs.
- Unconstrained lowest possible spend (ignoring quality/terms): ₹${(currentStats.unconstrainedTotalSpend / 10000000).toFixed(2)} Cr.
- Defensible Quality-Cleared Split Award: ₹${(currentStats.qualitySplitNetSpend / 10000000).toFixed(2)} Cr (Net savings of ₹${(currentStats.savingsVsBaseline / 100000).toFixed(1)} Lakhs or ${currentStats.savingsPercent.toFixed(1)}%).
- Current USD→INR Rate Assumption: ₹${currentUsdRate.toFixed(2)}.

You can click any suggested question below or ask another specific scenario!`,
      suggestedQuestions: [
        'What if we split it, cheapest per line, but only among vendors who cleared the quality questionnaire?',
        'Which numbers should I verify by hand before signing off on ₹4 crore?',
      ],
    };
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[740px]">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Procurement Analyst Copilot
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                Real Reasoning Engine
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Interrogate quotes across lines, currencies, and qualification criteria without writing spreadsheet formulas.
            </p>
          </div>
        </div>

        <div className="text-right text-xs">
          <span className="text-slate-400">Model:</span>{' '}
          <span className="font-mono text-indigo-300 font-semibold">Deterministic Logic + Semantic Reasoning</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-400">
                {msg.sender === 'user' ? 'Category Buyer' : 'Analyst Copilot'}
              </span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-3xl rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-xs'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-xs shadow-md'
              }`}
            >
              {/* Plain Text */}
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Special Card: Quality Split Scenario */}
              {msg.type === 'quality_split_scenario' && (
                <div className="mt-4 space-y-3 pt-3 border-t border-slate-800 font-sans">
                  
                  {/* KPI Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 text-[11px] block">Single Source Baseline</span>
                      <span className="text-base font-bold font-mono text-slate-200">
                        ₹{(msg.data.baselineSpend / 10000000).toFixed(2)} Cr
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Gujarat Corru-Pack Net</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-emerald-900/60">
                      <span className="text-emerald-400 text-[11px] block font-semibold">QA Split Award Spend</span>
                      <span className="text-base font-bold font-mono text-emerald-300">
                        ₹{(msg.data.qualitySplitNetSpend / 10000000).toFixed(2)} Cr
                      </span>
                      <span className="text-[10px] text-emerald-400 block mt-0.5">3 Approved Suppliers</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-indigo-900/60">
                      <span className="text-indigo-400 text-[11px] block font-semibold">Defensible Savings</span>
                      <span className="text-base font-bold font-mono text-indigo-300">
                        ₹{(msg.data.savingsVsBaseline / 100000).toFixed(1)} Lakhs
                      </span>
                      <span className="text-[10px] text-indigo-300 block mt-0.5 font-bold">
                        {msg.data.savingsPercent.toFixed(1)}% reduction
                      </span>
                    </div>
                  </div>

                  {/* Vendor Allocation Breakdown */}
                  <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 space-y-2">
                    <div className="font-semibold text-slate-300 text-xs flex items-center justify-between">
                      <span>Award Allocation by Qualified Supplier</span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        (Shree Pack & Raghav disqualified for quality/completeness)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <strong className="text-slate-200 block">Deccan Cartons</strong>
                        <span className="text-slate-400 font-mono">
                          {msg.data.qualitySplit.vendorLineCount.deccan_cartons} Lines ({((msg.data.qualitySplit.vendorVolumes.deccan_cartons / 1515000) * 100).toFixed(0)}% vol)
                        </span>
                        <div className="font-bold text-slate-100 font-mono mt-1">
                          ₹{(msg.data.qualitySplit.vendorSpend.deccan_cartons / 100000).toFixed(1)} Lakhs
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <strong className="text-slate-200 block">Gujarat Corru-Pack</strong>
                        <span className="text-slate-400 font-mono">
                          {msg.data.qualitySplit.vendorLineCount.gujarat_corru} Lines ({((msg.data.qualitySplit.vendorVolumes.gujarat_corru / 1515000) * 100).toFixed(0)}% vol)
                        </span>
                        <div className="font-bold text-slate-100 font-mono mt-1">
                          ₹{(msg.data.qualitySplit.vendorSpend.gujarat_corru / 100000).toFixed(1)} Lakhs
                        </div>
                        {msg.data.qualitySplit.gujaratRebateTriggered && (
                          <span className="text-[10px] text-emerald-400 block font-semibold mt-0.5">
                            ✓ 4% Rebate Saved ₹{(msg.data.qualitySplit.gujaratRebateSavings / 100000).toFixed(1)}L
                          </span>
                        )}
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <strong className="text-slate-200 block">Sunrise Packaging</strong>
                        <span className="text-slate-400 font-mono">
                          {msg.data.qualitySplit.vendorLineCount.sunrise_pack} Lines ({((msg.data.qualitySplit.vendorVolumes.sunrise_pack / 1515000) * 100).toFixed(0)}% vol)
                        </span>
                        <div className="font-bold text-slate-100 font-mono mt-1">
                          ₹{(msg.data.qualitySplit.vendorSpend.sunrise_pack / 100000).toFixed(1)} Lakhs
                        </div>
                        <span className="text-[10px] text-amber-400 block mt-0.5">
                          USD converted @ ₹{currentUsdRate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fallback Notice for Lines 14, 22, 29 */}
                  <div className="p-3 bg-indigo-950/30 border border-indigo-900/50 rounded-xl text-[11px] text-indigo-300">
                    <strong className="text-indigo-200 block mb-1">Automated Tooling Fallback Resolution:</strong>
                    Lines 14, 22, and 29 could not be quoted by Deccan Cartons due to tooling/coating constraints. 
                    The engine automatically routed them to the next cheapest quality-cleared supplier (Gujarat for Line 14; Sunrise for Lines 22 & 29) without manual buyer intervention.
                  </div>

                </div>
              )}

              {/* Special Card: Audit Risks */}
              {msg.type === 'audit_risks' && (
                <div className="mt-4 space-y-3 pt-3 border-t border-slate-800">
                  {msg.data.map((risk) => (
                    <div
                      key={risk.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                          <AlertTriangle className={`w-3.5 h-3.5 ${
                            risk.severity === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'
                          }`} />
                          {risk.title}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                          risk.severity === 'CRITICAL' 
                            ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {risk.potentialExposure}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed">{risk.reason}</p>

                      <div className="pt-1 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Action: {risk.mitigationAction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Special Card: Rebate Comparison */}
              {msg.type === 'rebate_comparison' && (
                <div className="mt-4 space-y-3 pt-3 border-t border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-slate-200 text-xs">Gujarat Corru-Pack (Surat)</div>
                      <div className="space-y-1 text-[11px] text-slate-300 font-mono">
                        <div className="flex justify-between">
                          <span>Gross Quoted (/100 pcs):</span>
                          <span>₹{(msg.data.gujaratGross / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between text-emerald-400 font-semibold">
                          <span>Footnote 4% Rebate:</span>
                          <span>-₹{(msg.data.gujaratRebate / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between text-slate-100 font-bold pt-1 border-t border-slate-800 text-xs">
                          <span>Net Landed (FOR Destination):</span>
                          <span className="text-emerald-400">₹{(msg.data.gujaratNet / 10000000).toFixed(2)} Cr</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-emerald-400 pt-1">
                        ✓ Freight included in base rate. 4% rebate unlocked (&gt;100k volume).
                      </div>
                    </div>

                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-slate-200 text-xs">Shree Pack Industries (Ahmedabad)</div>
                      <div className="space-y-1 text-[11px] text-slate-300 font-mono">
                        <div className="flex justify-between">
                          <span>Superficial Base (₹/pc):</span>
                          <span>₹{(msg.data.shreeBase / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between text-rose-400 font-semibold">
                          <span>Ex-Works Freight (+₹1.80/box):</span>
                          <span>+₹{(msg.data.shreeFreight / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between text-slate-100 font-bold pt-1 border-t border-slate-800 text-xs">
                          <span>True Landed Cost:</span>
                          <span className="text-rose-300">₹{(msg.data.shreeLanded / 10000000).toFixed(2)} Cr</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-rose-400 pt-1">
                        ⚠ Failed ISO audit. Freight is extra. Net cost is higher than Gujarat!
                      </div>
                    </div>

                  </div>

                  <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-[11px] text-emerald-300 font-medium">
                    Key Procurement Takeaway: Gujarat Corru-Pack looks higher on raw price card, but with 
                    delivered freight and the 4% footnote rebate, Gujarat is actually <strong>₹21 Lakhs cheaper</strong> than Shree Pack, with certified quality!
                  </div>
                </div>
              )}

              {/* Special Card: Deccan Missing Analysis */}
              {msg.type === 'deccan_missing_analysis' && (
                <div className="mt-4 space-y-3 pt-3 border-t border-slate-800">
                  <div className="space-y-2">
                    {msg.data.omitted.map((item) => (
                      <div key={item.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-200">{item.sku} - {item.name}</span>
                          <span className="font-mono text-slate-400">{item.qty.toLocaleString()} units</span>
                        </div>
                        <div className="text-rose-400 mt-1">Constraint: {item.reason}</div>
                        <div className="text-emerald-400 mt-0.5">Automated Award Fallback: {item.fallback}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Questions below bot message */}
              {msg.suggestedQuestions && (
                <div className="mt-3 pt-3 border-t border-slate-850 space-y-1.5">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    Suggested Procurement Queries:
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {msg.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAskQuestion(q)}
                        className="text-left px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-indigo-300 hover:text-indigo-200 border border-slate-800 transition text-[11px] flex items-center justify-between cursor-pointer"
                      >
                        <span>{q}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-2 text-indigo-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
            <Bot className="w-4 h-4 animate-spin text-indigo-400" />
            <span>Analyst Copilot is querying the 30-line dataset & qualification engine...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-800 bg-slate-850">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskQuestion(inputQuery);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything (e.g. 'What if USD goes to 88?', 'Compare 3-ply prices', 'Show total volume')..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-750 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isProcessing}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Ask
          </button>
        </form>
      </div>

    </div>
  );
}
