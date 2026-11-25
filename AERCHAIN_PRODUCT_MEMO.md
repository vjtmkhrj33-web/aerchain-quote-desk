# Kill the Quote Spreadsheet: Architecture, Edge Decisions, and The Better Problem
**Aerchain Product Management Take-Home Assignment**  
*Author:* Lead Product Manager Candidate  
*Category:* Corrugated Packaging (30 SKUs, 5 Vendors, ₹4.1 Crore Spend)  
*Date:* February 2026  

---

## 1. Executive Summary & Problem Statement

Every year, enterprise procurement organizations spend thousands of skilled analyst hours manually retyping, cleaning, and reconciling supplier quotes. In categories like corrugated packaging, industrial spares, or freight logistics, no vendor complies with standard RFx templates. 

When a category manager tenders **30 line items of corrugated packaging** across 5 suppliers, the incoming submissions represent five completely unstructured, incompatible data modalities:
1. **Shree Pack Industries (Ahmedabad):** Raw ERP export dump that completely ignored the buyer's column headers and template.
2. **Gujarat Corru-Pack Pvt Ltd (Surat):** Formal letterhead quote priced **per 100 pieces**, with a buried conditional **4.0% retrospective volume rebate** in a footnote.
3. **Deccan Cartons & Containers (Hyderabad):** Narrative Word document that quoted only **27 of 30 lines** due to rotary die deck machine width limits (2100mm) and coating constraints.
4. **Sunrise Packaging Solutions (Mundra SEZ):** Smartphone photo of a printed rate card taken at an angle, full of OCR character noise, and quoted in **US Dollars ($)**.
5. **Raghav Boxes & Co. (Bhiwandi):** Informal 1-line email stating: *"₹42/kg for the 5-ply, 38 for the 3-ply, rest same as last year, freight extra."*

### The Week We Deleted
- **Days 1–3:** The buyer opens Excel and manually retypes 150 cells, converting units (/100, /kg, USD to INR) by hand. Errors creep in silently.
- **Day 4:** The Vice President of Supply Chain asks a simple question:  
  > *"What if we split the award, cheapest per line, but only among vendors who cleared our quality questionnaire?"*
- **Day 5:** The spreadsheet breaks. Nested VLOOKUPs corrupt. The conditional rebate threshold (100,000 units/quarter) is ignored. The missing lines from Deccan cause unquoted supply chain gaps. Another day is lost.

**Our System Ends This.** We have built an end-to-end autonomous procurement intelligence engine that drafts the RFx, reads whatever vendors send back, lands them in an auditable comparison matrix, and allows natural language interrogation with deterministic mathematical guarantees.

---

## 2. System Architecture & The 4-Pillar Pipeline

```
┌─────────────────┐       ┌────────────────────────┐       ┌────────────────────────┐       ┌───────────────────────┐
│  RFx Co-pilot   │ ───►  │ Multi-Modal Ingestion  │ ───►  │ Trust & Provenance     │ ───►  │ Semantic Analyst Chat │
│  Scope & 30 SKUs│       │ Normalization to ₹/pc  │       │ Verbatim Citations     │       │ Deterministic Math    │
└─────────────────┘       └────────────────────────┘       └────────────────────────┘       └───────────────────────┘
```

### Pillar 1: RFx Co-pilot
- The buyer "talks an RFx into existence".
- Generates 30 line items: 10 3-Ply RSC cartons, 10 5-Ply heavy duty master cartons, and 10 Printed 5-Ply D2C shippers.
- Sets technical parameters: Dimensions (mm), Board Spec (GSM), Bursting Factor (BF), Bursting Strength (BS in kg/cm²), and Box Weight (kg).
- Establishes commercial rules: FOR Destination delivery, Net 45-day payment terms, and a mandatory 5-point vendor qualification questionnaire (ISO 9001, FSC paper, calibrated testing lab, >250 MT capacity, 45-day payment acceptance).

### Pillar 2: Multi-Modal Ingestion & Unit Normalization
- Converts all incoming data into an immutable, auditable canonical unit: **₹ per piece (INR)**.
- **Per 100 Pieces:** Extracted and divided by 100.
- **Per Kilogram (Kg):** Formula-derived using the RFx's locked box weight:  
  $$\text{Unit Price (₹/box)} = \text{Box Weight (kg)} \times \text{Rate (₹/kg)}$$
- **USD Quotes:** Converted via an explicit buyer-entered currency assumption (e.g. ₹84.50/USD). The system strictly refuses to hallucinate currency exchange rates.

### Pillar 3: Trust & Provenance Layer ("Trust at ₹4 Crore")
- Would a buyer with ₹4 crore on the line act on what's on screen? **Yes, because nothing is a black box.**
- **Cell-Level Inspector:** Clicking any cell opens a deep-dive audit drawer showing:
  - Exact verbatim snippet from the source document.
  - Confidence score percentage (e.g., 98% vs 68%).
  - The exact arithmetic formula applied.
  - Commercial caveats (freight extra, footnote rebate condition).
  - Human sign-off action ("Mark Verified by Buyer").
- **Visual Confidence Hierarchy:**
  - 🟢 **Green:** Lowest valid price on the line.
  - 🟡 **Amber:** Model derived with assumptions (click to inspect caveats).
  - 🔴 **Red:** Unresolvable, omitted, or disqualified baseline.

### Pillar 4: Conversational Analyst Copilot
- Translates natural language questions into deterministic calculations over the normalized data.
- Handles complex business constraints, volume rebate hurdles, multi-vendor split allocations, and risk checklists.

---

## 3. Handling the "Ugly Edges"

| Vendor | The Ugly Edge | How Our System Resolves It | What It Shows the Buyer |
| :--- | :--- | :--- | :--- |
| **Shree Pack Industries** | Ignored template; internal ERP codes; Ex-Works freight extra. | Maps columns semantically; extracts base rates; flags Ex-Works freight (+₹1.80/box) in landed cost comparison. | 🟢 Green on raw quote, but warns buyer of ₹27 Lakhs unbudgeted transit freight. |
| **Gujarat Corru-Pack** | Priced per 100 pcs; 4% rebate buried in Note 4 footnote. | Normalises line rates (/100); registers 100k quarterly volume condition in semantic memory. | 🟡 Amber cell tag. Dynamic rebate unlocks only when aggregate volume exceeds 100,000 units. |
| **Deccan Cartons** | Word document paragraph; **only 27 of 30 lines quoted** (lines 14, 22, 29 missing). | Identifies explicit exclusions (rotary slotter 2100mm limit, coating absence). | 🔴 Red cells ("NOT QUOTED"). In split-award optimization, engine automatically routes fallback to next cheapest approved vendor. |
| **Sunrise Packaging** | 32° angled photo; OCR noise; quoted in **USD ($)**. | High-fidelity token extraction; normalises to INR using buyer's FX rate. | 🟡 Amber badge ("USD @ ₹84.50"). Shows FX sensitivity: ₹1 swing shifts total spend by ₹16.5 Lakhs. |
| **Raghav Boxes & Co.** | Informal email: *"₹42/kg 5-ply, 38 3-ply, rest same as last year"*. | Calculates standard lines via box weight formula (Amber); **refuses to guess** unquoted printed boxes without prior contract on file (Red). | 🟡 Amber on standard lines; 🔴 Red on printed lines. Warns of unmetered weighbridge moisture risk. |

---

## 4. The VP's Core Scenarios & Demonstrable Results

### Scenario A: Split Award, Cheapest per Line, ONLY Among Quality-Cleared Vendors
- **The Filter:** Disqualifies **Shree Pack** (expired ISO certificate; rejected 45-day payment terms) and **Raghav Boxes** (no ISO/FSC/lab; 10 lines unresolvable).
- **Participating Vendors:** Gujarat Corru-Pack, Deccan Cartons, Sunrise Packaging.
- **Handling Deccan's Excluded Lines:** For Line 14, automatically awards to Gujarat (₹76.50). For Lines 22 & 29, automatically awards to Sunrise ($0.536 = ₹45.29; $0.770 = ₹65.07).
- **Volume Rebate Trigger:** Gujarat achieves >400,000 annualized units, triggering their 4.0% footnote rebate (-₹4.8 Lakhs savings).

**Financial Outcome:**
- **Single-Source Baseline (Gujarat Net):** ₹4,04,24,000 (₹4.04 Cr)
- **Quality-Cleared Split Award Spend:** ₹3,41,84,200 (₹3.42 Cr)
- **Net Defensible Savings:** **₹62,39,800 (₹62.4 Lakhs / 15.4% Spend Reduction)**
- **Allocation Breakdown:**
  - *Deccan Cartons:* 16 Lines · ₹1.46 Cr (42.7% volume)
  - *Gujarat Corru-Pack:* 8 Lines · ₹1.14 Cr (33.3% volume)
  - *Sunrise Packaging:* 6 Lines · ₹81.8 Lakhs (24.0% volume)

---

### Scenario B: Top 5 Numbers to Verify by Hand Before Signing ₹4 Crore
1. **Raghav Boxes (Weight Formula Risk):** Theoretical weight multiplication ignores corrugator glue and moisture weight (+5–8% gross weighbridge overrun).
2. **Sunrise Packaging (FX Exposure):** Quoted in USD. An INR depreciation to ₹87.00 adds ₹8.2 Lakhs to annual spend.
3. **Gujarat Corru-Pack (Rebate Threshold):** If quarterly purchase falls below 100,000 boxes in any quarter, the 4% rebate is forfeited retrospectively.
4. **Deccan Cartons (Omitted Lines 14, 22, 29):** Secondary contracts must be placed with Gujarat or Sunrise to prevent assembly line stockouts.
5. **Shree Pack (Ex-Works vs Landed):** Superficial unit price is ₹2.50 lower, but adding ₹1.80 freight + insurance makes them more expensive than Gujarat!

---

## 5. Product Decisions & What We Left Out (and Why)

### What We Decided
1. **Atomic Unit Normalization (₹/piece):** Standardizing on a single unit is non-negotiable. Converting at line level preserves transparent auditability.
2. **Deterministic Calculation Over LLM Math:** LLMs are notoriously unreliable at arithmetic. Our architecture uses LLM for semantic entity recognition and natural language parsing, but routes financial rollups through a verified deterministic math engine.
3. **Refusal to Guess:** If a vendor says "rest same as last year", an unconstrained AI might guess a prior rate. We explicitly built a fail-safe: mark RED, alert the buyer, and require an explicit baseline link.

### What We Deliberately Left Out
1. **Custom SMTP / IMAP Mail Servers:** Enterprise procurement runs on SAP Ariba, Coupa, or Outlook. Rebuilding mail transport is low-leverage commodity plumbing.
2. **Complex Multi-Tier Approval Workflows:** Hierarchical sign-off trees belong to the ERP system of record. Our focus is the intelligence and decision engine.
3. **Native C++ OCR Engine Compilation:** Handled via web-standard OCR layer simulation to ensure cross-platform reproducibility and instant sub-second live demos.

---

## 6. The Strategic Insight: "The Possibly Better Problem"

> *"If you finish this and think 'the interesting problem was actually somewhere else' — tell us that too. We'd rather hire the person who found the better problem than the one who followed the brief perfectly."*

Extraction and normalization is an engineering problem with an expiration date. Within 24 months, multi-modal LLMs will extract any invoice or table with 99.9% accuracy. 

**The catastrophic, multi-million dollar failure in enterprise packaging procurement happens AFTER the contract is signed.**

### Insight 1: Fixed Spot Bids in Corrugated Packaging Are an Illusion
- Kraft paper represents **65% to 75%** of the cost of a corrugated carton. 
- In India and global markets, raw paper kraft mills change prices every 30 to 60 days.
- When an enterprise signs a 12-month fixed-price contract with a corrugator at ₹32/box, and kraft prices spike 15% four months later, the supplier faces bankruptcy and refuses to deliver. The supply chain freezes.
- **The Better Solution:** The Quote Desk shouldn't compare static spot bids. It should normalize bids to an **Index-Linked Conversion Formula**:
  $$\text{Contract Price} = (\text{Theoretical Box Weight} \times \text{Official Paper Mill Index Rate}) + \text{Conversion Margin} + \text{Freight}$$
  This guarantees supplier margin integrity, eliminates spot price renegotiation, and gives the buyer index-based transparency.

### Insight 2: Post-Award Spec Creep & Invoice Grammage Leakage
- A supplier bids on 180 GSM virgin kraft.
- In Month 3, under margin pressure, they quietly downgrade the inner flute to 140 GSM semi-chemical and spray extra starch to fool basic burst tests.
- Over ₹4 Crore of annual spend, **a 5% reduction in paper grammage siphons ₹20 Lakhs of unearned profit** into the vendor's pocket while increasing transit box collapse rates in monsoon season.
- **The Better Solution:** Close the loop between the Quote Desk and the Goods Receipt Note (GRN). When boxes arrive at the distribution center, connect digital weighbridges and lab burst testers directly to the original RFx contract specs. If delivered weight is 5% light, automatically debit the invoice before payment.

### Insight 3: Phantom Plant Capacity & Single-Point Operational Risk
- A vendor bids aggressively across all 30 lines.
- But their factory capacity is 300 MT/month. Awarding them 250 MT consumes 83% of their line. 
- A single boiler breakdown, power cut, or labor strike halts delivery to your regional distribution centers.
- **The Better Solution:** Algorithmic capacity hedging. The award engine must optimize for **Dual-Sourcing Resilience** (e.g., 65/35 volume split on critical revenue-generating SKUs) even if single-sourcing appears ₹8 Lakhs cheaper on paper.

---

## 7. Conclusion

By building the **Aerchain Quote Desk**, we have proven that unstructured procurement chaos can be transformed into an audited, defensible, and conversational strategic advantage. We have killed the quote spreadsheet not by replacing it with another rigid software form, but by giving the category buyer an AI analyst that speaks their language, respects their commercial reality, and protects their ₹4 Crore budget.
