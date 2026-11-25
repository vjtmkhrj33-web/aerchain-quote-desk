import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Theme colors
    DARK_BG = RGBColor(15, 23, 42)       # Slate 900
    CARD_BG = RGBColor(30, 41, 59)       # Slate 800
    TEXT_LIGHT = RGBColor(248, 250, 252) # Slate 50
    TEXT_MUTED = RGBColor(148, 163, 184) # Slate 400
    ACCENT_INDIGO = RGBColor(99, 102, 241) # Indigo 500
    ACCENT_EMERALD = RGBColor(16, 185, 129) # Emerald 500
    ACCENT_AMBER = RGBColor(245, 158, 11) # Amber 500
    ACCENT_ROSE = RGBColor(244, 63, 94) # Rose 500

    def set_slide_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = DARK_BG
        bg.line.fill.background() # no line
        return bg

    def add_header(slide, title_text, category_text="PRODUCT MANAGEMENT · TAKE-HOME ASSIGNMENT"):
        # Category label
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.5), Inches(0.4))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = f"AERCHAIN · {category_text}"
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = ACCENT_INDIGO

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.5), Inches(0.8))
        tf = title_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = TEXT_LIGHT

    # ==================== SLIDE 1: TITLE SLIDE ====================
    slide_layout = prs.slide_layouts[6] # blank
    s1 = prs.slides.add_slide(slide_layout)
    set_slide_bg(s1)

    # Accent decorative bar
    bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(2.2), Inches(0.15), Inches(3.2))
    bar.fill.solid()
    bar.fill.fore_color.rgb = ACCENT_INDIGO
    bar.line.fill.background()

    # Title box
    tbox = s1.shapes.add_textbox(Inches(1.2), Inches(2.0), Inches(11.0), Inches(3.6))
    tf1 = tbox.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "AERCHAIN PRODUCT MANAGEMENT ASSIGNMENT"
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = ACCENT_EMERALD

    p1 = tf1.add_paragraph()
    p1.text = "Kill the Quote Spreadsheet"
    p1.font.size = Pt(40)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_LIGHT

    p2 = tf1.add_paragraph()
    p2.text = "Autonomous RFx Authoring, Unstructured Vendor Normalization & Procurement Interrogation"
    p2.font.size = Pt(18)
    p2.font.color.rgb = ACCENT_INDIGO

    p3 = tf1.add_paragraph()
    p3.text = "\nScenario: 30 Line Items of Corrugated Packaging · 5 Heterogeneous Vendors · ₹4.1 Crore Spend\nDeliverables: Working Prototype · Scenario Engine · Product Strategy Memo · The Better Problem"
    p3.font.size = Pt(13)
    p3.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 2: THE PROBLEM WE DELETE ====================
    s2 = prs.slides.add_slide(slide_layout)
    set_slide_bg(s2)
    add_header(s2, "The Week We Delete: The Enterprise Procurement Breakdown")

    # 3 Cards
    cards_data = [
        ("The Vendor Chaos (Day 1-9)", [
            "Buyers send a clean RFx template.",
            "Vendors reply however they like:",
            "• Shree Pack: ERP dump, template ignored.",
            "• Gujarat: Quoted /100 pcs, buried 4% footnote rebate.",
            "• Deccan: Word paragraph, missing 3 lines.",
            "• Sunrise: Angled phone photo in USD ($).",
            "• Raghav: 1-line email ('₹42/kg 5-ply, rest same')."
        ], ACCENT_ROSE),
        ("The Manual Trap (Day 10-12)", [
            "Buyer opens Excel and manually retypes 150 cells.",
            "Normalizes units by hand (per 100, per kg, USD to INR).",
            "Hardcoded conversion errors sneak into formulas.",
            "Takes 3 full days of skilled buyer bandwidth.",
            "Zero audit trail between numbers and source docs."
        ], ACCENT_AMBER),
        ("The VP's Question (Day 13)", [
            "VP asks: 'What if we split it, cheapest per line, but only among vendors who cleared quality QA?'",
            "The spreadsheet breaks immediately.",
            "Conditionality (4% rebate threshold) vanishes.",
            "Tooling exclusions (Deccan's 3 missing lines) are missed.",
            "Another day lost re-writing nested VLOOKUPs."
        ], ACCENT_INDIGO),
    ]

    for i, (card_title, bullets, accent_col) in enumerate(cards_data):
        left = Inches(0.8 + i * 4.0)
        top = Inches(1.8)
        width = Inches(3.7)
        height = Inches(5.0)

        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = accent_col
        card.line.width = Pt(1.5)

        tb = s2.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
        ctf = tb.text_frame
        ctf.word_wrap = True
        
        cp0 = ctf.paragraphs[0]
        cp0.text = card_title
        cp0.font.size = Pt(14)
        cp0.font.bold = True
        cp0.font.color.rgb = TEXT_LIGHT

        for b in bullets:
            bp = ctf.add_paragraph()
            bp.text = b
            bp.font.size = Pt(11)
            bp.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 3: SYSTEM ARCHITECTURE ====================
    s3 = prs.slides.add_slide(slide_layout)
    set_slide_bg(s3)
    add_header(s3, "System Architecture: End-to-End Autonomous Pipeline")

    arch_steps = [
        ("1. RFx Co-pilot", "Natural language authoring generates 30 SKUs, dimensions, GSM tolerances, delivery SLAs & 5-point quality questionnaire.", ACCENT_INDIGO),
        ("2. Ingestion & Extraction", "Multi-modal extraction reads PDFs, ERP dumps, Word paragraphs, phone OCR, and emails. Normalises all rates to ₹/piece.", ACCENT_EMERALD),
        ("3. Trust & Provenance Layer", "Cell-level audit inspector. Clicking any cell shows exact raw quote snippet, conversion math, confidence score & buyer sign-off.", ACCENT_AMBER),
        ("4. Conversational Analyst", "Deterministic calculation engine + semantic reasoning. Computes split awards, sensitivity checks & risk rankings in real time.", ACCENT_ROSE),
    ]

    for i, (stitle, sdesc, scol) in enumerate(arch_steps):
        top = Inches(1.8 + i * 1.25)
        rect = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(11.7), Inches(1.05))
        rect.fill.solid()
        rect.fill.fore_color.rgb = CARD_BG
        rect.line.color.rgb = scol
        rect.line.width = Pt(1.5)

        tb = s3.shapes.add_textbox(Inches(1.1), top + Inches(0.15), Inches(11.1), Inches(0.8))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = stitle
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = scol

        p_d = tf.add_paragraph()
        p_d.text = sdesc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_LIGHT

    # ==================== SLIDE 4: THE UGLY EDGES ====================
    s4 = prs.slides.add_slide(slide_layout)
    set_slide_bg(s4)
    add_header(s4, "Handling the Ugly Edges: Precision Over Naive AI")

    edges = [
        ("Deccan Cartons (27 of 30 Lines)", "Quoted in text narrative. Omitted lines 14, 22, 29 due to 2100mm rotary slotter cylinder limit and coating absence.", "System tags cells RED (NOT QUOTED). In split-award optimization, engine automatically routes fallback to next cheapest approved vendor.", ACCENT_ROSE),
        ("Sunrise Packaging (Angled Photo in USD)", "Rate card photographed on mobile with glare and OCR skew, quoted in US Dollars.", "Normalises to ₹/piece using buyer-entered assumption (₹84.50/USD). Refuses to guess FX. Flags cells AMBER with currency sensitivity.", ACCENT_AMBER),
        ("Gujarat Corru-Pack (4% Footnote Rebate)", "Priced in ₹/100 pieces with buried Note 4 offering 4% rebate if quarterly volume exceeds 1,00,000 units.", "Normalises line rates (/100). Stores rebate condition in semantic memory. In Analyst engine, rebate unlocks dynamically only if volume >= 100k.", ACCENT_EMERALD),
        ("Raghav Boxes ('Rest Same as Last Year')", "Informal email: ₹42/kg for 5-ply, 38 for 3-ply, rest same as last year, freight extra.", "Calculates 3-ply/5-ply via box weight specs (wt × ₹/kg, Amber). Refuses to guess unquoted printed boxes without prior contract on file (Red).", ACCENT_INDIGO),
    ]

    for i, (etitle, eraw, efix, ecol) in enumerate(edges):
        top = Inches(1.8 + i * 1.3)
        rect = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(11.7), Inches(1.15))
        rect.fill.solid()
        rect.fill.fore_color.rgb = CARD_BG
        rect.line.color.rgb = ecol
        rect.line.width = Pt(1.5)

        tb = s4.shapes.add_textbox(Inches(1.1), top + Inches(0.1), Inches(11.1), Inches(0.95))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = etitle
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = ecol

        p1 = tf.add_paragraph()
        p1.text = f"Raw Input: {eraw}"
        p1.font.size = Pt(10.5)
        p1.font.color.rgb = TEXT_MUTED

        p2 = tf.add_paragraph()
        p2.text = f"Our System Solution: {efix}"
        p2.font.size = Pt(10.5)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

    # ==================== SLIDE 5: TRUST AT 4 CRORE ====================
    s5 = prs.slides.add_slide(slide_layout)
    set_slide_bg(s5)
    add_header(s5, "Earning Trust: Would a Buyer with ₹4 Crore on the Line Act?")

    trust_points = [
        ("Verbatim Source Snippets", "Every cell links directly to the raw text in the vendor's source document. No fabricated numbers.", ACCENT_EMERALD),
        ("Transparent Math & Formulas", "Every conversion shows the exact formula applied (e.g. 0.38 kg × ₹38.00/kg = ₹14.44/box).", ACCENT_INDIGO),
        ("Visual Trust Hierarchy", "Green = Lowest valid on line\nAmber = Derived / assumptions (click to inspect)\nRed = Unresolvable / tool limit", ACCENT_AMBER),
        ("Human Audit Sign-Off", "Built-in 'Mark Verified by Buyer' audit button stamps numbers with a human sign-off trail.", ACCENT_EMERALD),
    ]

    for i, (ttitle, tdesc, tcol) in enumerate(trust_points):
        left = Inches(0.8 + (i % 2) * 6.0)
        top = Inches(1.8 + (i // 2) * 2.6)
        width = Inches(5.7)
        height = Inches(2.3)

        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = tcol
        card.line.width = Pt(1.5)

        tb = s5.shapes.add_textbox(left + Inches(0.3), top + Inches(0.3), width - Inches(0.6), height - Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = ttitle
        p0.font.size = Pt(15)
        p0.font.bold = True
        p0.font.color.rgb = tcol

        p1 = tf.add_paragraph()
        p1.text = f"\n{tdesc}"
        p1.font.size = Pt(12)
        p1.font.color.rgb = TEXT_LIGHT

    # ==================== SLIDE 6: THE VP'S QUESTION ====================
    s6 = prs.slides.add_slide(slide_layout)
    set_slide_bg(s6)
    add_header(s6, "Answering the VP's Split Award Question in Real Time")

    # Big KPI Box
    kpi_box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(1.8))
    kpi_box.fill.solid()
    kpi_box.fill.fore_color.rgb = CARD_BG
    kpi_box.line.color.rgb = ACCENT_EMERALD
    kpi_box.line.width = Pt(2)

    ktb = s6.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(11.1), Inches(1.4))
    ktf = ktb.text_frame
    ktf.word_wrap = True

    kp0 = ktf.paragraphs[0]
    kp0.text = "VP Query: 'What if we split it, cheapest per line, but only among vendors who cleared quality QA?'"
    kp0.font.size = Pt(13)
    kp0.font.bold = True
    kp0.font.color.rgb = ACCENT_EMERALD

    kp1 = ktf.add_paragraph()
    kp1.text = "Baseline Single-Source: ₹4.04 Cr (Gujarat Net)  →  Quality Split Award Spend: ₹3.42 Cr\nNet Defensible Savings: ₹62.4 Lakhs (15.4% Spend Reduction across 30 Lines)"
    kp1.font.size = Pt(16)
    kp1.font.bold = True
    kp1.font.color.rgb = TEXT_LIGHT

    # 3 Vendor breakdown cards
    vbreakdowns = [
        ("Deccan Cartons (Hyderabad)", "16 Lines Awarded · ₹1.46 Cr Spend", "Won majority of standard 3-ply and 5-ply cartons. Omitted lines 14, 22, 29 handled automatically.", ACCENT_INDIGO),
        ("Gujarat Corru-Pack (Surat)", "8 Lines Awarded · ₹1.14 Cr Spend", "Won high-runner master cartons. 4% footnote rebate triggered (>100k quarterly units achieved).", ACCENT_EMERALD),
        ("Sunrise Packaging (Mundra SEZ)", "6 Lines Awarded · ₹81.8 Lakhs Spend", "Won complex 4-color and varnish items. Rates converted from USD at ₹84.50 assumption.", ACCENT_AMBER),
    ]

    for i, (vname, vstat, vdesc, vcol) in enumerate(vbreakdowns):
        left = Inches(0.8 + i * 4.0)
        top = Inches(3.9)
        width = Inches(3.7)
        height = Inches(3.0)

        c = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        c.fill.solid()
        c.fill.fore_color.rgb = CARD_BG
        c.line.color.rgb = vcol
        c.line.width = Pt(1.5)

        tb = s6.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = vname
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = vcol

        p1 = tf.add_paragraph()
        p1.text = vstat
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = TEXT_LIGHT

        p2 = tf.add_paragraph()
        p2.text = f"\n{vdesc}"
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = TEXT_MUTED

    # ==================== SLIDE 7: THE BETTER PROBLEM ====================
    s7 = prs.slides.add_slide(slide_layout)
    set_slide_bg(s7)
    add_header(s7, "The Strategic Insight: 'The Possibly Better Problem'")

    better_points = [
        ("1. Spot Bids in Packaging Are an Illusion", [
            "Kraft paper is 70% of box cost.",
            "Paper mill indices swing by 10-15% quarterly.",
            "Vendors bidding fixed spot prices default by Month 4.",
            "Better Solution: Index-linked conversion pricing: (Paper Weight × Mill Index) + Conversion Margin + Freight."
        ], ACCENT_AMBER),
        ("2. Post-Award Spec Creep & Invoice Bleed", [
            "Vendors quote 180 GSM virgin kraft.",
            "Deliveries arrive downgraded to 150 GSM testliner with starch.",
            "Over ₹4 Crore spend, 5% grammage shrinkage bleeds ₹20 Lakhs.",
            "Better Solution: Connect Quote Desk directly to Warehouse Weighbridge & Lab BCT to audit delivered GSM before paying."
        ], ACCENT_ROSE),
        ("3. Phantom Capacity & Delivery Disruption", [
            "A supplier quotes on all 30 lines, but has 300 MT/mo plant capacity.",
            "Single-sourcing 250 MT creates catastrophic single-point risk.",
            "Better Solution: Algorithmic capacity hedging (60/40 volume allocation) regardless of superficial lowest bidder."
        ], ACCENT_INDIGO),
    ]

    for i, (btitle, bbullets, bcol) in enumerate(better_points):
        left = Inches(0.8 + i * 4.0)
        top = Inches(1.8)
        width = Inches(3.7)
        height = Inches(5.1)

        c = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        c.fill.solid()
        c.fill.fore_color.rgb = CARD_BG
        c.line.color.rgb = bcol
        c.line.width = Pt(1.5)

        tb = s7.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = btitle
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = bcol

        for b in bbullets:
            bp = tf.add_paragraph()
            bp.text = f"• {b}"
            bp.font.size = Pt(10.5)
            bp.font.color.rgb = TEXT_LIGHT

    # Save presentation
    output_path = r"C:\PROJECTS\aerchain-quote-desk\Aerchain_Kill_The_Quote_Spreadsheet.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_deck()
