# 5-Minute Video Walkthrough Script (Loom / Google Drive)
**Assignment:** Aerchain PM Take-Home — "Kill the Quote Spreadsheet"  
**Total Target Duration:** 4:30 – 5:30 minutes  
**Goal:** Deliver a crisp, confident, product-oriented walkthrough showing the live build, demonstrating the ugly edges, answering the VP's split-award question, and presenting the "Better Problem".

---

## Pre-Recording Checklist (30 seconds before recording)
1. Open your browser and navigate to the live prototype: `http://localhost:5173` (or your deployed hosted link).
2. Ensure browser zoom is comfortable (100% or 110%).
3. Have your Loom or screen recorder set to record both screen and mic (camera in corner is great for personal connection).
4. Start on the **Comparison Grid** tab.

---

## Detailed Minute-by-Minute Script & Click Actions

### 0:00 – 0:45 | Introduction & The Problem We Are Deleting
**What to show on screen:**
- Start on the **Comparison Grid** tab showing the 30 SKUs and 5 vendor columns.
- Slowly scroll down a few rows to show the 3-ply, 5-ply, and printed cartons.

**What to say (Word-for-Word Narration):**
> *"Hi everyone, I'm excited to present my build for the Aerchain Product Management take-home: **Kill the Quote Spreadsheet**.*
>
> *The scenario: an enterprise category manager needs **30 line items of corrugated packaging** representing **₹4.1 Crore of annual spend**.*
> 
> *In the real world, vendors never fill out your clean Excel template. They reply in five messy, incompatible formats: an ERP dump that ignored your headers, a letterhead quoted per 100 boxes with a rebate hidden in a footnote, a narrative Word doc missing three lines, an angled phone photo of a rate card in US Dollars, and an informal 1-line email.*
>
> *Normally, a buyer spends three full days retyping numbers and debugging broken spreadsheet formulas. Today, I'm going to walk you through the system that completely eliminates that week of manual pain."*

---

### 0:45 – 1:30 | Ingesting the Raw Ugly Edges (1-Click Model Normalization)
**What to show on screen:**
- Click on the **Raw Vendor Docs** tab in the top navigation.
- Click on **Shree Pack Industries** (ERP dump).
- Click on **Gujarat Corru-Pack** (point out the 4% footnote rebate).
- Click on **Deccan Cartons** (point out the note explaining why items 14, 22, and 29 are omitted).
- Click on **Sunrise Packaging** (point out the 32° angled photo OCR layer and USD rates).
- Click on **Raghav Boxes** (point out the 1-line email).

**What to say (Word-for-Word Narration):**
> *"Let's look at what vendors actually sent back in the **Raw Vendor Docs** tab.*
>
> *Here is Shree Pack: an ERP export where they completely ignored our template.*
>
> *Here is Gujarat Corru-Pack: formal letterhead priced per 100 pieces, but buried in Note 4 is a conditional 4% volume rebate.*
>
> *Here is Deccan Cartons: they sent a narrative Word document, but they only quoted 27 of 30 lines because lines 14, 22, and 29 exceed their corrugator machine bed width.*
>
> *Here is Sunrise Packaging: an angled smartphone photo with OCR noise, priced in US Dollars.*
>
> *And finally, Raghav Boxes: a classic procurement horror email stating '₹42/kg for 5-ply, 38 for 3-ply, rest same as last year, freight extra.'*
>
> *Our system ingests all five formats, normalizes everything to **₹ per piece**, and attaches an audit provenance trail to every single cell."*

---

### 1:30 – 2:45 | Trust at ₹4 Crore & The Cell Inspector
**What to show on screen:**
- Click back to the **Comparison Grid** tab.
- Click on an **Amber cell** (e.g. Row 1, Gujarat Corru-Pack: ₹11.80).
- Show the **Cell Inspector Modal** sliding open.
- Point to:
  1. The **Verbatim Excerpt from Source Document**.
  2. The **Formula Breakdown** (`₹1,180 ÷ 100 = ₹11.80/pc`).
  3. The **Confidence Score (96%)**.
  4. Click the **"Mark Verified for Audit"** button.
- Close modal.
- Now click on a **Red cell** (Row 14, Deccan Cartons: "NOT QUOTED").
- Show the source excerpt stating the 2100mm rotary slotter cylinder limit.
- Now click on Row 21, Raghav Boxes ("rest same as last year").

**What to say (Word-for-Word Narration):**
> *"Now, the core question in the brief: **Would a buyer with ₹4 Crore on the line act on what's on this screen?***
>
> *In enterprise procurement, AI cannot be a black box. If an AI claims a vendor quoted ₹11.80, the buyer needs to defend that number in front of internal audit.*
>
> *Watch what happens when I click any cell. Clicking Gujarat's rate on Line 1 opens our **Cell-Level Inspector**.*
>
> *Here, the buyer sees the **verbatim excerpt** from the raw document: 'Line 01: Rs. 1,180.00 / 100 pcs'. They see the exact math applied: divided by 100 to get ₹11.80. They see the commercial caveats and the 96% confidence score. And the buyer can click **'Mark Verified'** to stamp their approval into the audit trail.*
>
> *Next, let's look at an ugly edge: Line 14 under Deccan Cartons is marked **RED**. Why? Clicking it shows Deccan's exact technical refusal: their rotary die cylinder cannot handle a 650x450mm blank size.*
>
> *And for Raghav Boxes on Line 21, they wrote 'rest same as last year'. A naive LLM might hallucinate a price. Our system explicitly refuses to guess without a prior contract baseline on file, marking it RED. That is how you earn trust at ₹4 Crore."*

---

### 2:45 – 4:00 | The VP's Question & The Conversational Analyst
**What to show on screen:**
- Click on the **Analyst Copilot** tab.
- Click the top suggested query:  
  **"What if we split it, cheapest per line, but only among vendors who cleared the quality questionnaire?"**
- Watch the copilot immediately calculate and render the cards, savings, and allocation table.
- Point to:
  - Baseline Spend: ₹4.04 Cr
  - Quality Split Award Spend: ₹3.42 Cr
  - Defensible Savings: **₹62.4 Lakhs (15.4% spend reduction)**
  - Vendor allocation cards (Deccan 16 lines, Gujarat 8 lines, Sunrise 6 lines).
  - Point out that Deccan's missing lines (14, 22, 29) were automatically routed to Gujarat and Sunrise.
- Next, click the second suggested query:  
  **"Which numbers should I verify by hand before signing off on ₹4 crore?"**
- Show the 5 audit risk cards (Raghav weighbridge moisture, Sunrise USD currency swing, Gujarat 4% volume rebate threshold).

**What to say (Word-for-Word Narration):**
> *"Now let's answer the VP's question in the **Analyst Copilot**.*
>
> *The VP asks: 'What if we split it, cheapest per line, but only among vendors who cleared our quality questionnaire?'*
>
> *Watch this: I click the question. The system immediately checks our Quality Matrix. It disqualifies Shree Pack because their ISO 9001 certificate expired, and Raghav Boxes because they have no certified testing lab.*
>
> *It runs deterministic math across Gujarat, Deccan, and Sunrise. For Deccan's missing lines 14, 22, and 29, the engine automatically routes them to the next cheapest quality-cleared supplier.*
>
> *And because Gujarat receives over 100,000 units in this split award, it dynamically unlocks their **4% footnote rebate**, saving an additional ₹4.8 Lakhs!*
>
> *The result: our single-source baseline was ₹4.04 Crore. The Quality Split Award comes out to **₹3.42 Crore** — delivering a defensible savings of **₹62.4 Lakhs, or 15.4%** across 30 lines!*
>
> *And when the VP asks: 'Which numbers should I verify by hand before signing?', the system produces a prioritized audit checklist: Raghav's weighbridge moisture risk, Sunrise's USD currency sensitivity, and Gujarat's rebate volume hurdle."*

---

### 4:00 – 5:00 | "The Possibly Better Problem" & Closing
**What to show on screen:**
- Click on the **PM Strategy & Memo** tab.
- Scroll down to Section 5: **"The Possibly Better Problem"**.
- Highlight the 3 strategic insights.

**What to say (Word-for-Word Narration):**
> *"Finally, I want to address the note on the assignment: **What is the possibly better problem?***
>
> *Document extraction is a solvable technical problem. Within two years, multi-modal models will extract any document at 99.9% accuracy.*
>
> *The multi-million dollar disaster in corrugated packaging happens **AFTER the contract is signed**:*
>
> *1. **Spot Bids Are an Illusion:** Kraft paper represents 70% of box cost. If you sign a fixed ₹28/box quote and kraft paper spikes 15% four months later, the supplier defaults and halts delivery. The better problem is **Index-Linked Conversion Pricing** tied to paper mill commodity indices.*
>
> *2. **Post-Award Spec Creep:** Vendors quote 180 GSM kraft, but deliver 150 GSM with starch spray to pass basic tests. Over ₹4 Crore of spend, a 5% grammage reduction siphons ₹20 Lakhs of invisible leakage. The better problem is **closing the loop between Quote Desk and the warehouse weighbridge** to audit delivered box grammage before paying invoices.*
>
> *3. **Capacity Hedging:** Single-sourcing to the lowest bidder without checking their monthly plant capacity creates catastrophic factory shutdown risk.*
>
> *Thank you so much. The working code, PPT deck, and complete product strategy memo are all included in the submission. I'd love to discuss how we can build this into Aerchain's core platform!"*

---

## Tips for Recording
- Keep your tone crisp, energetic, and executive-level.
- You don't need to apologize for anything; the prototype works smoothly and looks like a tier-1 enterprise SaaS application.
- If you stumble on a word, pause for 1 second and repeat the sentence — Loom lets you trim easily!
