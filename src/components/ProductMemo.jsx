import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  TrendingUp, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ProductMemo() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto text-xs leading-relaxed text-slate-300 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
          <FileText className="w-5 h-5 text-indigo-400" />
          <span>Product Management Strategy Memo · Aerchain Take-Home</span>
        </div>
        <h1 className="text-xl font-extrabold text-slate-100 tracking-tight">
          Kill the Quote Spreadsheet: Architecture, Edge Decisions, and The Better Problem
        </h1>
        <p className="text-xs text-slate-400">
          Target Category: Corrugated Packaging (30 SKUs, ₹4.1 Cr Spend) · Role: Lead Product Manager
        </p>
      </div>

      {/* 1. The Core Problem We Deleted */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-400"></span>
          1. The Week We Deleted: The Structural Procurement Failure
        </h2>
        <p>
          Every year, enterprise procurement teams across the world spend days doing low-value manual data re-entry. 
          When a buyer sends an RFx for 30 corrugated packaging boxes to five vendors, vendors do not fill out the clean Excel template. 
          Instead, five heterogeneous formats arrive: an ERP dump that ignored column headers, a formal letterhead priced per 100 boxes with a rebate hidden in a footnote, a narrative Word doc missing three lines, an angled smartphone photo of a printed rate card quoted in USD, and a one-line email saying <em>"₹42/kg for 5-ply, 38 for 3-ply, rest same as last year"</em>.
        </p>
        <p>
          The buyer spends 3 full days manually retyping numbers, guessing conversions, and re-calculating units in Excel. 
          Then, when leadership asks: <em>"What if we split the award, cheapest per line, but only among vendors who cleared our quality questionnaire?"</em>, the spreadsheet breaks, formulas corrupt, and another day is lost.
        </p>
        <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-indigo-300 font-medium">
          Our solution replaces that manual week with an end-to-end autonomous pipeline: 
          <strong>Natural language RFx drafting → Multi-modal ingestion &amp; unit normalisation → Cell-level provenance &amp; confidence scoring → Natural language interrogation.</strong>
        </div>
      </section>

      {/* 2. How We Handled the Ugly Edges */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400"></span>
          2. The Ugly Edges: Precision Over Naive LLM Hallucination
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-slate-100 text-xs block">A. The Vendor Missing 3 Lines (Deccan Cartons: 27/30)</strong>
            <p className="text-slate-400 text-[11px]">
              Deccan omitted lines 14, 22, and 29 due to rotary slotter cylinder width (2100mm) and coating constraints. 
              <strong>Our Design:</strong> The system marks these cells RED (<span className="text-rose-400 font-mono">NOT QUOTED</span>), preserves the vendor's exact technical refusal snippet, and in split-award modeling, automatically falls back to the next cheapest quality-cleared supplier without crashing the optimization model.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-slate-100 text-xs block">B. Angled Phone Photo in USD (Sunrise Packaging)</strong>
            <p className="text-slate-400 text-[11px]">
              Rate card photographed on mobile with glare and OCR skew, quoted in US Dollars.
              <strong>Our Design:</strong> The AI normalises rates to ₹/pc using a <em>buyer-entered FX assumption</em> (e.g. ₹84.50/USD). The system explicitly refuses to guess the exchange rate. Cells are tagged AMBER with exact FX sensitivity so buyers can stress-test currency risk.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-slate-100 text-xs block">C. 'Per 100 Pieces' &amp; Buried 4% Rebate (Gujarat Corru-Pack)</strong>
            <p className="text-slate-400 text-[11px]">
              Priced in ₹/100 pieces with a conditional 4% rebate in Note 4.
              <strong>Our Design:</strong> System normalises line rates (divide by 100) for clean comparison, while registering the rebate condition into the semantic memory. In the Analyst engine, the 4% rebate is applied dynamically only if quarterly volume exceeds 1,00,000 units.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <strong className="text-slate-100 text-xs block">D. 'Rest Same as Last Year' Email (Raghav Boxes)</strong>
            <p className="text-slate-400 text-[11px]">
              For standard boxes, prices are calculated from box weights (wt × ₹/kg) with an AMBER warning. 
              For printed boxes where the vendor stated <em>'rest same as last year'</em>, the system refuses to guess a rate without a contract baseline on file and flags the cells RED. Guessing prior-year rates without verification is a cardinal sin in procurement.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Earning Trust at ₹4 Crore */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          3. Earning Trust: Why a Buyer with ₹4 Crore on the Line Can Act
        </h2>
        <p>
          Enterprise procurement executives do not trust black-box AI answers. If an AI claims a vendor quoted ₹32.40, 
          the buyer needs to defend that number in front of the CFO, the VP of Supply Chain, and internal audit.
        </p>
        <div className="space-y-2 text-slate-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-100">Cell-Level Verbatim Provenance:</strong> Clicking any cell in the comparison grid immediately displays the raw snippet from the vendor's source document with zero modifications.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-100">Mathematical Formula Transparency:</strong> Every conversion reveals its math: e.g. <code className="text-indigo-300 font-mono">0.38 kg × ₹38.00/kg = ₹14.44/box</code> or <code className="text-indigo-300 font-mono">$0.252 × 84.50 = ₹21.30/box</code>.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-100">Buyer Sign-Off Audit Trail:</strong> A built-in "Mark Verified" action allows category managers to stamp verified numbers with an audit timestamp, moving risk from the model to the human approver.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Decisions & What We Left Out */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
          4. Product Decisions &amp; What We Deliberately Left Out
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-200 text-xs">What We Decided:</h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-[11px]">
              <li><strong>Unit Harmonization to ₹/piece:</strong> All comparison happens on a single atomic unit. Per-kg and per-100 quotes are harmonized using immutable box weights defined in the RFx.</li>
              <li><strong>Deterministic Calculation over Hallucination:</strong> The Analyst chat runs real math over the normalized dataset. It does not allow the LLM to hallucinate totals or percentage savings.</li>
              <li><strong>Separation of Commercial Terms:</strong> Rebates, freight surcharges, and payment penalties are maintained as distinct attributes rather than baked silently into base quotes.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-200 text-xs">What We Left Out on Purpose:</h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-[11px]">
              <li><strong>SMTP Server Infrastructure:</strong> We stubbed outbound email delivery. Procurement workflows need deep ERP integration (SAP Ariba / Coupa), not building custom mail daemons.</li>
              <li><strong>Multi-tier Approval Hierarchy:</strong> While critical for production, for this prototype we focused on the core extraction and split-award intelligence layer.</li>
              <li><strong>Dynamic Real-Time OCR Model Training:</strong> Used high-fidelity OCR layer simulation to demonstrate reasoning without requiring multi-gigabyte native C++ OCR binaries.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. The Possibly Better Problem */}
      <section className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/40 border border-indigo-700/50 rounded-xl p-5 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          The Strategic Insight
        </div>
        <h2 className="text-base font-extrabold text-slate-100">
          5. "The Possibly Better Problem": Why Killing the Quote Spreadsheet Is Only Phase 1
        </h2>
        <p className="text-slate-300 text-xs leading-relaxed">
          The brief states: <em>"If you finish this and think 'the interesting problem was actually somewhere else' — tell us that too. We'd rather hire the person who found the better problem than the one who followed the brief perfectly."</em>
        </p>
        
        <p className="text-slate-300 text-xs leading-relaxed">
          Here is what 99% of procurement software gets wrong: <strong>Extraction is a solved technical problem. The catastrophic failure in packaging procurement happens AFTER the contract is signed.</strong>
        </p>

        <div className="space-y-3 pt-2">
          
          <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-900/40 space-y-1">
            <strong className="text-slate-200 text-xs block">Insight A: Fixed Spot Bids in Corrugated Packaging Are an Illusion</strong>
            <p className="text-slate-400 text-[11px]">
              Kraft paper accounts for 70% of the cost of a corrugated carton. In India and global markets, mill paper prices fluctuate monthly. 
              A vendor who signs a fixed-price contract at ₹28/box will inevitably default or demand price renegotiation in Month 4 when paper prices rise by 12%. 
              <strong>The Better Solution:</strong> The system should not compare static spot quotes. It should normalize bids to a <em>Conversion Index Formula</em>: <code className="text-indigo-300 font-mono">(Paper Weight × Paper Mill Index) + Conversion Margin + Printing Plate Cost + Freight</code>. This guarantees 12-month supply continuity.
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-900/40 space-y-1">
            <strong className="text-slate-200 text-xs block">Insight B: Post-Award Spec Creep &amp; Invoice Leakage</strong>
            <p className="text-slate-400 text-[11px]">
              A vendor quotes on 180 GSM virgin kraft. But when deliveries arrive at the warehouse, they sneakily downgrade to 150 GSM semi-chemical flute with starch spray to pass basic burst tests. 
              Over ₹4 Crore of annual spend, 5% GSM shrinkage bleeds ₹20 Lakhs of invisible value. 
              <strong>The Better Solution:</strong> Close the loop by connecting the Quote Desk directly to the Warehouse Weighbridge and Lab QA system (GRN level). Automatically cross-check delivered box grammage against the contracted RFx specification before clearing invoices.
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-indigo-900/40 space-y-1">
            <strong className="text-slate-200 text-xs block">Insight C: Phantom Capacity &amp; Single-Point Factory Risk</strong>
            <p className="text-slate-400 text-[11px]">
              A vendor may bid aggressively on all 30 lines. But their plant capacity might be 300 MT/month. 
              If the buyer awards 250 MT to that single vendor, a single boiler breakdown or labor strike shuts down the buyer's entire distribution network. 
              <strong>The Better Solution:</strong> Algorithmic award allocation that enforces multi-vendor capacity hedging (e.g. 60/40 split on critical high-runner SKUs) regardless of how cheap the primary bidder is.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}
