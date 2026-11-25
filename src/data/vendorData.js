// Raw vendor responses, questionnaire answers, and normalized extractions

export const VENDORS = [
  {
    id: "shree_pack",
    name: "Shree Pack Industries",
    location: "Ahmedabad, Gujarat",
    formatType: "Spreadsheet Dump (CSV / Excel)",
    description: "Exported directly from ERP, completely ignored the buyer's template and field naming.",
    quotedLinesCount: 30,
    totalLines: 30,
    quoteStatus: "Complete (Template Ignored)",
    deliveryTerms: "Ex-Works Ahmedabad (Freight Extra ~₹1.80/box)",
    statedPaymentTerms: "30 Days from Dispatch",
    questionnaireAnswers: {
      Q1: { pass: false, note: "Submitted ISO 9001 certificate expired in Nov 2021. Renewal audit pending." },
      Q2: { pass: true, note: "FSC-STD-40-004 certificate valid through 2027." },
      Q3: { pass: true, note: "Internal lab test facility with digital burst tester." },
      Q4: { pass: true, note: "Capacity ~380 MT/month across 2 corrugator lines." },
      Q5: { pass: false, note: "Insists on 30 days payment; rejected 45 days." },
    },
    clearedQualityQuestionnaire: false,
    rawDocumentContent: `VENDOR ERP EXPORT DUMP - SHREE PACK INDUSTRIES (AHMEDABAD)
JOB_RUN_ID: SP_EXP_2026_094 | DATE: 12-FEB-2026 | OPERATOR: MAHESH_B

PART_NO,VENDOR_INTERNAL_CODE,DIMENSIONS_MM,PLY_SPEC,BURST_SPEC,MOQ_LOT,UNIT_RATE_INR,LEAD_DAYS
01,SP-BOX-RSC-01,200x150x100,3P-140/120/120,6.5-7.0,5000,11.20,5
02,SP-BOX-RSC-02,280x200x120,3P-150/120/130,7.0-7.5,5000,14.40,5
03,SP-BOX-RSC-03,320x210x140,3P-160/125/140,7.5-8.0,4000,17.90,6
04,SP-BOX-RSC-04,350x250x160,3P-150/130/140,8.0-8.5,4000,20.80,6
05,SP-BOX-RSC-05,300x240x180,3P-160/130/140,8.0-8.5,3000,19.90,5
06,SP-BOX-RSC-06,260x180x150,3P-170/135/140,8.5-9.0,3000,17.10,5
07,SP-BOX-RSC-07,400x300x150,3P-150/130/130,7.5-8.0,2500,23.20,7
08,SP-BOX-RSC-08,220x160x80,3P-160/120/130,7.0-7.5,5000,12.90,5
09,SP-BOX-RSC-09,360x260x220,3P-170/140/150,9.0-9.5,2500,26.10,7
10,SP-BOX-RSC-10,420x320x200,3P-160/130/140,8.5-9.0,2500,26.90,7
11,SP-BOX-HD-11,450x350x300,5P-180/140x2/150,13.5-14.0,2000,43.50,8
12,SP-BOX-HD-12,500x400x250,5P-200/150x2/180,15.0-15.5,2000,50.80,8
13,SP-BOX-HD-13,420x380x340,5P-190/150x2/170,16.0-16.5,1500,53.90,9
14,SP-BOX-HD-14,650x450x400,5P-220/160x2/200,17.5-18.0,1000,74.50,10
15,SP-BOX-HD-15,480x360x320,5P-180/140x2/160,14.0-14.5,1500,48.20,8
16,SP-BOX-HD-16,520x420x380,5P-200/150x2/180,16.5-17.0,1200,62.80,9
17,SP-BOX-HD-17,400x400x200,5P-190/150x2/180,15.5-16.0,1500,46.90,8
18,SP-BOX-HD-18,600x300x250,5P-180/140x2/160,13.8-14.2,1500,45.40,8
19,SP-BOX-HD-19,550x450x350,5P-220/160x2/200,17.0-17.5,1000,66.50,10
20,SP-BOX-HD-20,500x500x400,5P-200/150x2/180,16.0-16.5,1000,70.80,10
21,SP-BOX-PR-21,340x260x180,5P-PR-2C,12.0-12.5,2500,36.20,10
22,SP-BOX-PR-22,420x300x150,5P-PR-4C,13.5-14.0,2000,44.90,12
23,SP-BOX-PR-23,360x280x200,5P-PR-2C,12.5-13.0,2000,40.50,10
24,SP-BOX-PR-24,400x270x140,5P-PR-2C,14.0-14.5,2000,42.10,10
25,SP-BOX-PR-25,450x340x220,5P-PR-2C,13.0-13.5,1500,46.50,11
26,SP-BOX-PR-26,800x180x160,5P-PR-2C,14.5-15.0,1200,54.80,12
27,SP-BOX-PR-27,320x240x120,5P-PR-2C,11.5-12.0,2500,32.80,9
28,SP-BOX-PR-28,520x380x280,5P-PR-2C,15.0-15.5,1200,57.60,12
29,SP-BOX-PR-29,500x300x200,5P-PR-VARN,16.5-17.0,1200,64.70,12
30,SP-BOX-PR-30,460x360x300,5P-PR-4C,14.0-14.5,1500,52.80,12
COMMENTS: All rates Ex-Works Ahmedabad. GST 18% extra. Payment 30 days. No freight included.`,
  },

  {
    id: "gujarat_corru",
    name: "Gujarat Corru-Pack Pvt Ltd",
    location: "Surat, Gujarat",
    formatType: "Letterhead PDF (Priced per 100 pcs + Footnote Rebate)",
    description: "Formal letterhead quote with pricing in 'Per 100 Pieces', plus a buried 4% volume rebate in Note 4.",
    quotedLinesCount: 30,
    totalLines: 30,
    quoteStatus: "Complete (Priced /100 pcs + 4% Footnote)",
    deliveryTerms: "FOR Destination (Warehouses in Bhiwandi, Bangalore & Chennai)",
    statedPaymentTerms: "Net 45 Days (agreed to RFx terms)",
    rebateCondition: "4.0% retrospective rebate if aggregate quarterly purchase exceeds 1,00,000 units across all lines.",
    questionnaireAnswers: {
      Q1: { pass: true, note: "ISO 9001:2015 Cert #TUV-IND-9942 valid till Oct 2027." },
      Q2: { pass: true, note: "FSC certified Chain-of-Custody cert #FSC-C084321." },
      Q3: { pass: true, note: "NABL accredited in-house testing lab with computerized BCT, ECT & Cobb." },
      Q4: { pass: true, note: "Capacity 650 MT/month (5-ply high-speed automatic BHS line)." },
      Q5: { pass: true, note: "Accepts 45 days credit terms unconditionally." },
    },
    clearedQualityQuestionnaire: true,
    rawDocumentContent: `GUJARAT CORRU-PACK PRIVATE LIMITED
Plot 44-48, GIDC Sachin Industrial Estate, Surat - 394230
Email: sales@gujaratcorrupack.com | CIN: U21014GJ1998PTC034112
QUOTATION REF: GCP/RFQ/2026-27/088B                          DATE: 14th February 2026

To: Category Manager - Packaging Procurement
Subject: Official Commercial Offer for Annual Corrugated Packaging Requirement (30 Lines)

Dear Sir/Madam,
We are pleased to submit our most competitive rates on FOR Destination basis across your 30 RFx line items.
All prices below are in INDIAN RUPEES (INR) strictly quoted PER ONE HUNDRED (100) PIECES:

3-PLY REGULAR SLOTTED CONTAINERS:
Line 01 (PKG-3P-001): Rs. 1,180.00 / 100 pcs
Line 02 (PKG-3P-002): Rs. 1,490.00 / 100 pcs
Line 03 (PKG-3P-003): Rs. 1,840.00 / 100 pcs
Line 04 (PKG-3P-004): Rs. 2,160.00 / 100 pcs
Line 05 (PKG-3P-005): Rs. 2,060.00 / 100 pcs
Line 06 (PKG-3P-006): Rs. 1,770.00 / 100 pcs
Line 07 (PKG-3P-007): Rs. 2,420.00 / 100 pcs
Line 08 (PKG-3P-008): Rs. 1,360.00 / 100 pcs
Line 09 (PKG-3P-009): Rs. 2,710.00 / 100 pcs
Line 10 (PKG-3P-010): Rs. 2,780.00 / 100 pcs

5-PLY HEAVY DUTY MASTER CARTONS:
Line 11 (PKG-5P-011): Rs. 4,490.00 / 100 pcs
Line 12 (PKG-5P-012): Rs. 5,250.00 / 100 pcs
Line 13 (PKG-5P-013): Rs. 5,550.00 / 100 pcs
Line 14 (PKG-5P-014): Rs. 7,650.00 / 100 pcs
Line 15 (PKG-5P-015): Rs. 4,980.00 / 100 pcs
Line 16 (PKG-5P-016): Rs. 6,450.00 / 100 pcs
Line 17 (PKG-5P-017): Rs. 4,830.00 / 100 pcs
Line 18 (PKG-5P-018): Rs. 4,680.00 / 100 pcs
Line 19 (PKG-5P-019): Rs. 6,850.00 / 100 pcs
Line 20 (PKG-5P-020): Rs. 7,260.00 / 100 pcs

PRINTED 5-PLY RETAIL / D2C SHIPPERS:
Line 21 (PKG-PR-021): Rs. 3,740.00 / 100 pcs
Line 22 (PKG-PR-022): Rs. 4,640.00 / 100 pcs
Line 23 (PKG-PR-023): Rs. 4,190.00 / 100 pcs
Line 24 (PKG-PR-024): Rs. 4,340.00 / 100 pcs
Line 25 (PKG-PR-025): Rs. 4,790.00 / 100 pcs
Line 26 (PKG-PR-026): Rs. 5,640.00 / 100 pcs
Line 27 (PKG-PR-027): Rs. 3,380.00 / 100 pcs
Line 28 (PKG-PR-028): Rs. 5,950.00 / 100 pcs
Line 29 (PKG-PR-029): Rs. 6,650.00 / 100 pcs
Line 30 (PKG-PR-030): Rs. 5,450.00 / 100 pcs

COMMERCIAL TERMS & NOTES:
1. Delivery: Door delivery (FOR Destination) included in quoted base rates.
2. Payment: Net 45 days from date of physical delivery and receipt of tax invoice.
3. Validity: Rates valid for 12 months with quarterly paper kraft price review.
4. Footnote Rebate: We offer an exclusive commercial volume rebate of 4.0% (Four Percent) to be credited quarterly on gross billing value, provided that cumulative purchase across all contracted lines exceeds 1,00,000 units in that quarter.
For Gujarat Corru-Pack Pvt Ltd,
Authorized Signatory`,
  },

  {
    id: "deccan_cartons",
    name: "Deccan Cartons & Containers",
    location: "Hyderabad & Sri City",
    formatType: "Word Doc Paragraphs (Quoted 27 of 30 lines)",
    description: "Quoted in text narrative; explicitly excluded lines 14, 22, and 29 due to rotary die limitations.",
    quotedLinesCount: 27,
    totalLines: 30,
    quoteStatus: "Partial (27/30 Lines Quoted)",
    deliveryTerms: "FOR South DCs (Bhiwandi delivery freight +₹0.75/pc extra)",
    statedPaymentTerms: "Net 45 Days",
    questionnaireAnswers: {
      Q1: { pass: true, note: "ISO 9001:2015 certified by DNV-GL." },
      Q2: { pass: true, note: "FSC certified paper sourcing agreements." },
      Q3: { pass: true, note: "Full lab with digital burst tester and humidity chamber." },
      Q4: { pass: true, note: "Capacity 420 MT/month across Sri City & Hyderabad plants." },
      Q5: { pass: true, note: "Agreed to Net 45 Days terms." },
    },
    clearedQualityQuestionnaire: true,
    rawDocumentContent: `COMMERCIAL QUOTATION SUBMISSION
DECCAN CARTONS & CONTAINERS LLP - HYDERABAD / SRI CITY
SENT VIA MS WORD / EMAIL TRANSMISSION - ATTN: SOURCING TEAM

Regarding your tender for 30 line items of corrugated packaging, please note our itemized unit rates below on per-piece basis (FOR Hyderabad / Bangalore DC). 

For 3-ply corrugated cartons: Line 1: Rs. 11.45/pc; Line 2: Rs. 14.65/pc; Line 3: Rs. 18.05/pc; Line 4: Rs. 21.20/pc; Line 5: Rs. 20.15/pc; Line 6: Rs. 17.35/pc; Line 7: Rs. 23.60/pc; Line 8: Rs. 13.15/pc; Line 9: Rs. 26.45/pc; Line 10: Rs. 27.25/pc.

For 5-ply heavy duty master shippers: Line 11 is Rs. 43.90/pc; Line 12 is Rs. 51.30/pc; Line 13 is Rs. 54.40/pc; Line 15 is Rs. 48.90/pc; Line 16 is Rs. 63.20/pc; Line 17 is Rs. 47.30/pc; Line 18 is Rs. 45.90/pc; Line 19 is Rs. 67.20/pc; Line 20 is Rs. 71.40/pc.
*** PLEASE TAKE NOTE: We regret to inform that Item 14 (PKG-5P-014, 650x450x400 mm) is NOT QUOTED as its dimensions exceed the maximum bed cylinder width of our existing rotary slotter (max 2100mm).

For 5-ply printed cartons: Line 21 is Rs. 36.60/pc; Line 23 is Rs. 40.90/pc; Line 24 is Rs. 42.50/pc; Line 25 is Rs. 46.90/pc; Line 26 is Rs. 55.20/pc; Line 27 is Rs. 33.10/pc; Line 28 is Rs. 58.10/pc; Line 30 is Rs. 53.20/pc.
*** PLEASE NOTE: Item 22 (PKG-PR-022) requires a 4-color inline printer slotter which is currently booked at 100% capacity; hence NOT QUOTED. Also Item 29 (PKG-PR-029) requires specialized hydrophobic varnish coating which we do not process in-house; hence NOT QUOTED.

All acceptable lines are quoted net of freight for South India DCs. Payment terms: 45 days.`,
  },

  {
    id: "sunrise_pack",
    name: "Sunrise Packaging Solutions",
    location: "Mundra SEZ, Gujarat",
    formatType: "Angled Smartphone Photo (OCR Text in USD $)",
    description: "Printed price sheet photographed at an angle on a smartphone; OCR text has noisy tokens and prices in USD.",
    quotedLinesCount: 30,
    totalLines: 30,
    quoteStatus: "Complete (OCR Noisy, Quoted in USD $)",
    deliveryTerms: "FOR Destination (Customs duty paid from SEZ to DTA)",
    statedPaymentTerms: "Net 45 Days against Letter of Credit or Open Account",
    questionnaireAnswers: {
      Q1: { pass: true, note: "ISO 9001:2015 + BRCGS Packaging Certified Global Standard." },
      Q2: { pass: true, note: "100% FSC virgin Nordic kraft pulp imported." },
      Q3: { pass: true, note: "State of the art automated R&D lab with ISTA packaging drop/vibration testing." },
      Q4: { pass: true, note: "Massive automated facility, capacity >1,200 MT/month." },
      Q5: { pass: true, note: "Accepts 45 days open account credit terms." },
    },
    clearedQualityQuestionnaire: true,
    rawDocumentContent: `[OCR LAYER RECONSTRUCTED FROM IMAGE: IMG_20260215_164219.JPG (ANGLE: 32 DEG, GLARE TOP-RIGHT)]
========================================================================
SUnr1se P@ckag1ng S0lut1ons (SEZ Mundra) - EXPORT & DTA RATE CARD FY26
========================================================================
CURRENCY: U.S. DOLLARS (USD $) | FOB / CIF / DTA DESTINATION RATES
ALL PRICES PER INDIVIDUAL UNIT (USD $ / PIECE)

ITEM / SPEC           | DIM (MM)     | UNIT PRICE (USD $)
---------------------------------------------------------
L01 PKG-3P-001        | 200x150x100  | $ 0.136
L02 PKG-3P-002        | 280x200x120  | $ 0.174
L03 PKG-3P-003        | 320x210x140  | $ 0.214
L04 PKG-3P-004        | 350x250x160  | $ 0.252
L05 PKG-3P-005        | 300x240x180  | $ 0.240
L06 PKG-3P-006        | 260x180x150  | $ 0.206
L07 PKG-3P-007        | 400x300x150  | $ 0.280
L08 PKG-3P-008        | 220x160x80   | $ 0.156
L09 PKG-3P-009        | 360x260x220  | $ 0.312
L10 PKG-3P-010        | 420x320x200  | $ 0.322
---------------------------------------------------------
L11 PKG-5P-011        | 450x350x300  | $ 0.520
L12 PKG-5P-012        | 500x400x250  | $ 0.608
L13 PKG-5P-013        | 420x380x340  | $ 0.642
L14 PKG-5P-014        | 650x450x400  | $ 0.888
L15 PKG-5P-015        | 480x360x320  | $ 0.578
L16 PKG-5P-016        | 520x420x380  | $ 0.748
L17 PKG-5P-017        | 400x400x200  | $ 0.560
L18 PKG-5P-018        | 600x300x250  | $ 0.542
L19 PKG-5P-019        | 550x450x350  | $ 0.795
L20 PKG-5P-020        | 500x500x400  | $ 0.840
---------------------------------------------------------
L21 PKG-PR-021 (2-C)  | 340x260x180  | $ 0.432
L22 PKG-PR-022 (4-C)  | 420x300x150  | $ 0.536
L23 PKG-PR-023 (2-C)  | 360x280x200  | $ 0.485
L24 PKG-PR-024 (2-C)  | 400x270x140  | $ 0.502
L25 PKG-PR-025 (2-C)  | 450x340x220  | $ 0.554
L26 PKG-PR-026 (2-C)  | 800x180x160  | $ 0.652
L27 PKG-PR-027 (2-C)  | 320x240x120  | $ 0.392
L28 PKG-PR-028 (2-C)  | 520x380x280  | $ 0.688
L29 PKG-PR-029 (VARN) | 500x300x200  | $ 0.770
L30 PKG-PR-030 (4-C)  | 460x360x300  | $ 0.630
=========================================================
NOTE: Rates quoted in USD. Buyer handles INR payment at prevailing RBI ref rate on invoice date. FOR destination delivery included.`,
  },

  {
    id: "raghav_boxes",
    name: "Raghav Boxes & Co.",
    location: "Bhiwandi, Maharashtra",
    formatType: "1-Line Email ('₹42/kg for 5-ply, 38 for 3-ply, rest same as last year')",
    description: "Informal email response with per-kg rates for standard boxes, unresolvable baseline for printed, and freight extra.",
    quotedLinesCount: 20,
    totalLines: 30,
    quoteStatus: "Partial & Ambiguous (10 lines unresolvable)",
    deliveryTerms: "Ex-Godown Bhiwandi ('freight extra at actuals')",
    statedPaymentTerms: "Not stated in email",
    questionnaireAnswers: {
      Q1: { pass: false, note: "No ISO certificate provided. Small proprietary unit." },
      Q2: { pass: false, note: "Buys local mixed mill paper, no FSC tracking." },
      Q3: { pass: false, note: "Manual hand-crank burst tester only, no calibration certificates." },
      Q4: { pass: false, note: "Capacity ~110 MT/month (below 250 MT threshold)." },
      Q5: { pass: false, note: "Did not respond to questionnaire terms." },
    },
    clearedQualityQuestionnaire: false,
    rawDocumentContent: `FROM: raghavboxes@rediffmail.com
TO: procurement.buyer@enterprise.com
DATE: Mon, 16 Feb 2026 11:22:14 +0530
SUBJECT: Re: RFx Corrugated Packaging Requirement

Hi Sir,
as discussed please find our rates: ₹42/kg for the 5-ply, 38 for the 3-ply, rest same as last year, freight extra.

Regards,
Raghav
Raghav Boxes & Co., Bhiwandi
Ph: +91 98200 XXXXX`,
  },
];

// Helper to calculate extracted prices dynamically given USD/INR exchange rate
export function getExtractedVendorData(usdInrRate = 84.50) {
  // Line items pricing calculations for each vendor
  const extractedQuotes = {
    // 1. Shree Pack Industries (per piece directly quoted in INR)
    shree_pack: [
      { id: 1, rawQuote: "₹11.20", unit: "per_pc", priceInr: 11.20, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹11.20/pc Ex-works. Note freight ₹1.80/pc extra.", snippet: "01,SP-BOX-RSC-01,...,11.20,5" },
      { id: 2, rawQuote: "₹14.40", unit: "per_pc", priceInr: 14.40, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹14.40/pc Ex-works.", snippet: "02,SP-BOX-RSC-02,...,14.40,5" },
      { id: 3, rawQuote: "₹17.90", unit: "per_pc", priceInr: 17.90, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹17.90/pc Ex-works.", snippet: "03,SP-BOX-RSC-03,...,17.90,6" },
      { id: 4, rawQuote: "₹20.80", unit: "per_pc", priceInr: 20.80, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹20.80/pc Ex-works.", snippet: "04,SP-BOX-RSC-04,...,20.80,6" },
      { id: 5, rawQuote: "₹19.90", unit: "per_pc", priceInr: 19.90, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹19.90/pc Ex-works.", snippet: "05,SP-BOX-RSC-05,...,19.90,5" },
      { id: 6, rawQuote: "₹17.10", unit: "per_pc", priceInr: 17.10, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹17.10/pc Ex-works.", snippet: "06,SP-BOX-RSC-06,...,17.10,5" },
      { id: 7, rawQuote: "₹23.20", unit: "per_pc", priceInr: 23.20, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹23.20/pc Ex-works.", snippet: "07,SP-BOX-RSC-07,...,23.20,7" },
      { id: 8, rawQuote: "₹12.90", unit: "per_pc", priceInr: 12.90, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹12.90/pc Ex-works.", snippet: "08,SP-BOX-RSC-08,...,12.90,5" },
      { id: 9, rawQuote: "₹26.10", unit: "per_pc", priceInr: 26.10, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹26.10/pc Ex-works.", snippet: "09,SP-BOX-RSC-09,...,26.10,7" },
      { id: 10, rawQuote: "₹26.90", unit: "per_pc", priceInr: 26.90, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹26.90/pc Ex-works.", snippet: "10,SP-BOX-RSC-10,...,26.90,7" },
      { id: 11, rawQuote: "₹43.50", unit: "per_pc", priceInr: 43.50, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹43.50/pc Ex-works.", snippet: "11,SP-BOX-HD-11,...,43.50,8" },
      { id: 12, rawQuote: "₹50.80", unit: "per_pc", priceInr: 50.80, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹50.80/pc Ex-works.", snippet: "12,SP-BOX-HD-12,...,50.80,8" },
      { id: 13, rawQuote: "₹53.90", unit: "per_pc", priceInr: 53.90, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹53.90/pc Ex-works.", snippet: "13,SP-BOX-HD-13,...,53.90,9" },
      { id: 14, rawQuote: "₹74.50", unit: "per_pc", priceInr: 74.50, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹74.50/pc Ex-works.", snippet: "14,SP-BOX-HD-14,...,74.50,10" },
      { id: 15, rawQuote: "₹48.20", unit: "per_pc", priceInr: 48.20, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹48.20/pc Ex-works.", snippet: "15,SP-BOX-HD-15,...,48.20,8" },
      { id: 16, rawQuote: "₹62.80", unit: "per_pc", priceInr: 62.80, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹62.80/pc Ex-works.", snippet: "16,SP-BOX-HD-16,...,62.80,9" },
      { id: 17, rawQuote: "₹46.90", unit: "per_pc", priceInr: 46.90, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹46.90/pc Ex-works.", snippet: "17,SP-BOX-HD-17,...,46.90,8" },
      { id: 18, rawQuote: "₹45.40", unit: "per_pc", priceInr: 45.40, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹45.40/pc Ex-works.", snippet: "18,SP-BOX-HD-18,...,45.40,8" },
      { id: 19, rawQuote: "₹66.50", unit: "per_pc", priceInr: 66.50, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹66.50/pc Ex-works.", snippet: "19,SP-BOX-HD-19,...,66.50,10" },
      { id: 20, rawQuote: "₹70.80", unit: "per_pc", priceInr: 70.80, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹70.80/pc Ex-works.", snippet: "20,SP-BOX-HD-20,...,70.80,10" },
      { id: 21, rawQuote: "₹36.20", unit: "per_pc", priceInr: 36.20, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹36.20/pc Ex-works.", snippet: "21,SP-BOX-PR-21,...,36.20,10" },
      { id: 22, rawQuote: "₹44.90", unit: "per_pc", priceInr: 44.90, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹44.90/pc Ex-works.", snippet: "22,SP-BOX-PR-22,...,44.90,12" },
      { id: 23, rawQuote: "₹40.50", unit: "per_pc", priceInr: 40.50, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹40.50/pc Ex-works.", snippet: "23,SP-BOX-PR-23,...,40.50,10" },
      { id: 24, rawQuote: "₹42.10", unit: "per_pc", priceInr: 42.10, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹42.10/pc Ex-works.", snippet: "24,SP-BOX-PR-24,...,42.10,10" },
      { id: 25, rawQuote: "₹46.50", unit: "per_pc", priceInr: 46.50, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹46.50/pc Ex-works.", snippet: "25,SP-BOX-PR-25,...,46.50,11" },
      { id: 26, rawQuote: "₹54.80", unit: "per_pc", priceInr: 54.80, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹54.80/pc Ex-works.", snippet: "26,SP-BOX-PR-26,...,54.80,12" },
      { id: 27, rawQuote: "₹32.80", unit: "per_pc", priceInr: 32.80, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹32.80/pc Ex-works.", snippet: "27,SP-BOX-PR-27,...,32.80,9" },
      { id: 28, rawQuote: "₹57.60", unit: "per_pc", priceInr: 57.60, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹57.60/pc Ex-works.", snippet: "28,SP-BOX-PR-28,...,57.60,12" },
      { id: 29, rawQuote: "₹64.70", unit: "per_pc", priceInr: 64.70, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹64.70/pc Ex-works.", snippet: "29,SP-BOX-PR-29,...,64.70,12" },
      { id: 30, rawQuote: "₹52.80", unit: "per_pc", priceInr: 52.80, confidence: 99, status: "green", flag: "Lowest (Ex-works)", note: "Quoted ₹52.80/pc Ex-works.", snippet: "30,SP-BOX-PR-30,...,52.80,12" },
    ],

    // 2. Gujarat Corru-Pack (quoted per 100 pieces -> normalized = raw / 100)
    gujarat_corru: [
      { id: 1, rawQuote: "₹1,180 / 100 pcs", unit: "per_100", priceInr: 11.80, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹1,180 ÷ 100 = ₹11.80/pc. Subject to 4% quarterly volume rebate if >100k pcs.", snippet: "Line 01 (PKG-3P-001): Rs. 1,180.00 / 100 pcs" },
      { id: 2, rawQuote: "₹1,490 / 100 pcs", unit: "per_100", priceInr: 14.90, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹1,490 ÷ 100 = ₹14.90/pc. FOR destination.", snippet: "Line 02 (PKG-3P-002): Rs. 1,490.00 / 100 pcs" },
      { id: 3, rawQuote: "₹1,840 / 100 pcs", unit: "per_100", priceInr: 18.40, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹1,840 ÷ 100 = ₹18.40/pc. FOR destination.", snippet: "Line 03 (PKG-3P-003): Rs. 1,840.00 / 100 pcs" },
      { id: 4, rawQuote: "₹2,160 / 100 pcs", unit: "per_100", priceInr: 21.60, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹2,160 ÷ 100 = ₹21.60/pc. FOR destination.", snippet: "Line 04 (PKG-3P-004): Rs. 2,160.00 / 100 pcs" },
      { id: 5, rawQuote: "₹2,060 / 100 pcs", unit: "per_100", priceInr: 20.60, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹2,060 ÷ 100 = ₹20.60/pc. FOR destination.", snippet: "Line 05 (PKG-3P-005): Rs. 2,060.00 / 100 pcs" },
      { id: 6, rawQuote: "₹1,770 / 100 pcs", unit: "per_100", priceInr: 17.70, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹1,770 ÷ 100 = ₹17.70/pc. FOR destination.", snippet: "Line 06 (PKG-3P-006): Rs. 1,770.00 / 100 pcs" },
      { id: 7, rawQuote: "₹2,420 / 100 pcs", unit: "per_100", priceInr: 24.20, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹2,420 ÷ 100 = ₹24.20/pc. FOR destination.", snippet: "Line 07 (PKG-3P-007): Rs. 2,420.00 / 100 pcs" },
      { id: 8, rawQuote: "₹1,360 / 100 pcs", unit: "per_100", priceInr: 13.60, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹1,360 ÷ 100 = ₹13.60/pc. FOR destination.", snippet: "Line 08 (PKG-3P-008): Rs. 1,360.00 / 100 pcs" },
      { id: 9, rawQuote: "₹2,710 / 100 pcs", unit: "per_100", priceInr: 27.10, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹2,710 ÷ 100 = ₹27.10/pc. FOR destination.", snippet: "Line 09 (PKG-3P-009): Rs. 2,710.00 / 100 pcs" },
      { id: 10, rawQuote: "₹2,780 / 100 pcs", unit: "per_100", priceInr: 27.80, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹2,780 ÷ 100 = ₹27.80/pc. FOR destination.", snippet: "Line 10 (PKG-3P-010): Rs. 2,780.00 / 100 pcs" },
      { id: 11, rawQuote: "₹4,490 / 100 pcs", unit: "per_100", priceInr: 44.90, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹4,490 ÷ 100 = ₹44.90/pc. FOR destination.", snippet: "Line 11 (PKG-5P-011): Rs. 4,490.00 / 100 pcs" },
      { id: 12, rawQuote: "₹5,250 / 100 pcs", unit: "per_100", priceInr: 52.50, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹5,250 ÷ 100 = ₹52.50/pc. FOR destination.", snippet: "Line 12 (PKG-5P-012): Rs. 5,250.00 / 100 pcs" },
      { id: 13, rawQuote: "₹5,550 / 100 pcs", unit: "per_100", priceInr: 55.50, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹5,550 ÷ 100 = ₹55.50/pc. FOR destination.", snippet: "Line 13 (PKG-5P-013): Rs. 5,550.00 / 100 pcs" },
      { id: 14, rawQuote: "₹7,650 / 100 pcs", unit: "per_100", priceInr: 76.50, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹7,650 ÷ 100 = ₹76.50/pc. Wide flute line.", snippet: "Line 14 (PKG-5P-014): Rs. 7,650.00 / 100 pcs" },
      { id: 15, rawQuote: "₹4,980 / 100 pcs", unit: "per_100", priceInr: 49.80, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹4,980 ÷ 100 = ₹49.80/pc. FOR destination.", snippet: "Line 15 (PKG-5P-015): Rs. 4,980.00 / 100 pcs" },
      { id: 16, rawQuote: "₹6,450 / 100 pcs", unit: "per_100", priceInr: 64.50, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹6,450 ÷ 100 = ₹64.50/pc. FOR destination.", snippet: "Line 16 (PKG-5P-016): Rs. 6,450.00 / 100 pcs" },
      { id: 17, rawQuote: "₹4,830 / 100 pcs", unit: "per_100", priceInr: 48.30, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹4,830 ÷ 100 = ₹48.30/pc. FOR destination.", snippet: "Line 17 (PKG-5P-017): Rs. 4,830.00 / 100 pcs" },
      { id: 18, rawQuote: "₹4,680 / 100 pcs", unit: "per_100", priceInr: 46.80, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹4,680 ÷ 100 = ₹46.80/pc. FOR destination.", snippet: "Line 18 (PKG-5P-018): Rs. 4,680.00 / 100 pcs" },
      { id: 19, rawQuote: "₹6,850 / 100 pcs", unit: "per_100", priceInr: 68.50, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹6,850 ÷ 100 = ₹68.50/pc. FOR destination.", snippet: "Line 19 (PKG-5P-019): Rs. 6,850.00 / 100 pcs" },
      { id: 20, rawQuote: "₹7,260 / 100 pcs", unit: "per_100", priceInr: 72.60, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹7,260 ÷ 100 = ₹72.60/pc. FOR destination.", snippet: "Line 20 (PKG-5P-020): Rs. 7,260.00 / 100 pcs" },
      { id: 21, rawQuote: "₹3,740 / 100 pcs", unit: "per_100", priceInr: 37.40, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹3,740 ÷ 100 = ₹37.40/pc. 2-color flexo.", snippet: "Line 21 (PKG-PR-021): Rs. 3,740.00 / 100 pcs" },
      { id: 22, rawQuote: "₹4,640 / 100 pcs", unit: "per_100", priceInr: 46.40, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹4,640 ÷ 100 = ₹46.40/pc. 4-color flexo.", snippet: "Line 22 (PKG-PR-022): Rs. 4,640.00 / 100 pcs" },
      { id: 23, rawQuote: "₹4,190 / 100 pcs", unit: "per_100", priceInr: 41.90, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹4,190 ÷ 100 = ₹41.90/pc. 2-color flexo.", snippet: "Line 23 (PKG-PR-023): Rs. 4,190.00 / 100 pcs" },
      { id: 24, rawQuote: "₹4,340 / 100 pcs", unit: "per_100", priceInr: 43.40, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹4,340 ÷ 100 = ₹43.40/pc. Moisture barrier.", snippet: "Line 24 (PKG-PR-024): Rs. 4,340.00 / 100 pcs" },
      { id: 25, rawQuote: "₹4,790 / 100 pcs", unit: "per_100", priceInr: 47.90, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹4,790 ÷ 100 = ₹47.90/pc. 2-color flexo.", snippet: "Line 25 (PKG-PR-025): Rs. 4,790.00 / 100 pcs" },
      { id: 26, rawQuote: "₹5,640 / 100 pcs", unit: "per_100", priceInr: 56.40, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹5,640 ÷ 100 = ₹56.40/pc. Audio soundbar box.", snippet: "Line 26 (PKG-PR-026): Rs. 5,640.00 / 100 pcs" },
      { id: 27, rawQuote: "₹3,380 / 100 pcs", unit: "per_100", priceInr: 33.80, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹3,380 ÷ 100 = ₹33.80/pc. Mailer box.", snippet: "Line 27 (PKG-PR-027): Rs. 3,380.00 / 100 pcs" },
      { id: 28, rawQuote: "₹5,950 / 100 pcs", unit: "per_100", priceInr: 59.50, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹5,950 ÷ 100 = ₹59.50/pc. Cookware shipper.", snippet: "Line 28 (PKG-PR-028): Rs. 5,950.00 / 100 pcs" },
      { id: 29, rawQuote: "₹6,650 / 100 pcs", unit: "per_100", priceInr: 66.50, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹6,650 ÷ 100 = ₹66.50/pc. Cold storage varnish.", snippet: "Line 29 (PKG-PR-029): Rs. 6,650.00 / 100 pcs" },
      { id: 30, rawQuote: "₹5,450 / 100 pcs", unit: "per_100", priceInr: 54.50, confidence: 96, status: "amber", flag: "Per 100 pcs (+4% Rebate)", note: "Normalised: ₹5,450 ÷ 100 = ₹54.50/pc. 4-color hamper box.", snippet: "Line 30 (PKG-PR-030): Rs. 5,450.00 / 100 pcs" },
    ],

    // 3. Deccan Cartons (27 of 30 lines quoted in Word doc narrative)
    deccan_cartons: [
      { id: 1, rawQuote: "₹11.45/pc", unit: "per_pc", priceInr: 11.45, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text. Net FOR South DCs.", snippet: "Line 1: Rs. 11.45/pc" },
      { id: 2, rawQuote: "₹14.65/pc", unit: "per_pc", priceInr: 14.65, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 2: Rs. 14.65/pc" },
      { id: 3, rawQuote: "₹18.05/pc", unit: "per_pc", priceInr: 18.05, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 3: Rs. 18.05/pc" },
      { id: 4, rawQuote: "₹21.20/pc", unit: "per_pc", priceInr: 21.20, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 4: Rs. 21.20/pc" },
      { id: 5, rawQuote: "₹20.15/pc", unit: "per_pc", priceInr: 20.15, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 5: Rs. 20.15/pc" },
      { id: 6, rawQuote: "₹17.35/pc", unit: "per_pc", priceInr: 17.35, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 6: Rs. 17.35/pc" },
      { id: 7, rawQuote: "₹23.60/pc", unit: "per_pc", priceInr: 23.60, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 7: Rs. 23.60/pc" },
      { id: 8, rawQuote: "₹13.15/pc", unit: "per_pc", priceInr: 13.15, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 8: Rs. 13.15/pc" },
      { id: 9, rawQuote: "₹26.45/pc", unit: "per_pc", priceInr: 26.45, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 9: Rs. 26.45/pc" },
      { id: 10, rawQuote: "₹27.25/pc", unit: "per_pc", priceInr: 27.25, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 10: Rs. 27.25/pc" },
      { id: 11, rawQuote: "₹43.90/pc", unit: "per_pc", priceInr: 43.90, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 11 is Rs. 43.90/pc" },
      { id: 12, rawQuote: "₹51.30/pc", unit: "per_pc", priceInr: 51.30, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 12 is Rs. 51.30/pc" },
      { id: 13, rawQuote: "₹54.40/pc", unit: "per_pc", priceInr: 54.40, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 13 is Rs. 54.40/pc" },
      { id: 14, rawQuote: "NOT QUOTED", unit: "unquoted", priceInr: null, confidence: 100, status: "red", flag: "Tooling Limitation", note: "EXCLUDED BY VENDOR: Machine deck width 2100mm cannot accommodate 650x450mm blank size.", snippet: "Item 14 (PKG-5P-014) is NOT QUOTED as its dimensions exceed maximum bed cylinder width" },
      { id: 15, rawQuote: "₹48.90/pc", unit: "per_pc", priceInr: 48.90, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 15 is Rs. 48.90/pc" },
      { id: 16, rawQuote: "₹63.20/pc", unit: "per_pc", priceInr: 63.20, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 16 is Rs. 63.20/pc" },
      { id: 17, rawQuote: "₹47.30/pc", unit: "per_pc", priceInr: 47.30, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 17 is Rs. 47.30/pc" },
      { id: 18, rawQuote: "₹45.90/pc", unit: "per_pc", priceInr: 45.90, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 18 is Rs. 45.90/pc" },
      { id: 19, rawQuote: "₹67.20/pc", unit: "per_pc", priceInr: 67.20, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 19 is Rs. 67.20/pc" },
      { id: 20, rawQuote: "₹71.40/pc", unit: "per_pc", priceInr: 71.40, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 20 is Rs. 71.40/pc" },
      { id: 21, rawQuote: "₹36.60/pc", unit: "per_pc", priceInr: 36.60, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 21 is Rs. 36.60/pc" },
      { id: 22, rawQuote: "NOT QUOTED", unit: "unquoted", priceInr: null, confidence: 100, status: "red", flag: "Capacity Booked", note: "EXCLUDED BY VENDOR: 4-color inline printer slotter is 100% committed to existing clients.", snippet: "Item 22 (PKG-PR-022) requires a 4-color inline printer slotter which is currently booked at 100% capacity" },
      { id: 23, rawQuote: "₹40.90/pc", unit: "per_pc", priceInr: 40.90, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 23 is Rs. 40.90/pc" },
      { id: 24, rawQuote: "₹42.50/pc", unit: "per_pc", priceInr: 42.50, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 24 is Rs. 42.50/pc" },
      { id: 25, rawQuote: "₹46.90/pc", unit: "per_pc", priceInr: 46.90, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 25 is Rs. 46.90/pc" },
      { id: 26, rawQuote: "₹55.20/pc", unit: "per_pc", priceInr: 55.20, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 26 is Rs. 55.20/pc" },
      { id: 27, rawQuote: "₹33.10/pc", unit: "per_pc", priceInr: 33.10, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 27 is Rs. 33.10/pc" },
      { id: 28, rawQuote: "₹58.10/pc", unit: "per_pc", priceInr: 58.10, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 28 is Rs. 58.10/pc" },
      { id: 29, rawQuote: "NOT QUOTED", unit: "unquoted", priceInr: null, confidence: 100, status: "red", flag: "Capability Void", note: "EXCLUDED BY VENDOR: No in-house hydrophobic varnish coater.", snippet: "Item 29 (PKG-PR-029) requires specialized hydrophobic varnish coating which we do not process in-house" },
      { id: 30, rawQuote: "₹53.20/pc", unit: "per_pc", priceInr: 53.20, confidence: 98, status: "green", flag: "Standard Rate", note: "Extracted from narrative text.", snippet: "Line 30 is Rs. 53.20/pc" },
    ],

    // 4. Sunrise Packaging Solutions (SEZ Mundra - phone photo OCR in USD $)
    sunrise_pack: [
      { id: 1, rawUsd: 0.136, ocrSnippet: "L01 PKG-3P-001 | $ 0.136" },
      { id: 2, rawUsd: 0.174, ocrSnippet: "L02 PKG-3P-002 | $ 0.174" },
      { id: 3, rawUsd: 0.214, ocrSnippet: "L03 PKG-3P-003 | $ 0.214" },
      { id: 4, rawUsd: 0.252, ocrSnippet: "L04 PKG-3P-004 | $ 0.252" },
      { id: 5, rawUsd: 0.240, ocrSnippet: "L05 PKG-3P-005 | $ 0.240" },
      { id: 6, rawUsd: 0.206, ocrSnippet: "L06 PKG-3P-006 | $ 0.206" },
      { id: 7, rawUsd: 0.280, ocrSnippet: "L07 PKG-3P-007 | $ 0.280" },
      { id: 8, rawUsd: 0.156, ocrSnippet: "L08 PKG-3P-008 | $ 0.156" },
      { id: 9, rawUsd: 0.312, ocrSnippet: "L09 PKG-3P-009 | $ 0.312" },
      { id: 10, rawUsd: 0.322, ocrSnippet: "L10 PKG-3P-010 | $ 0.322" },
      { id: 11, rawUsd: 0.520, ocrSnippet: "L11 PKG-5P-011 | $ 0.520" },
      { id: 12, rawUsd: 0.608, ocrSnippet: "L12 PKG-5P-012 | $ 0.608" },
      { id: 13, rawUsd: 0.642, ocrSnippet: "L13 PKG-5P-013 | $ 0.642" },
      { id: 14, rawUsd: 0.888, ocrSnippet: "L14 PKG-5P-014 | $ 0.888" },
      { id: 15, rawUsd: 0.578, ocrSnippet: "L15 PKG-5P-015 | $ 0.578" },
      { id: 16, rawUsd: 0.748, ocrSnippet: "L16 PKG-5P-016 | $ 0.748" },
      { id: 17, rawUsd: 0.560, ocrSnippet: "L17 PKG-5P-017 | $ 0.560" },
      { id: 18, rawUsd: 0.542, ocrSnippet: "L18 PKG-5P-018 | $ 0.542" },
      { id: 19, rawUsd: 0.795, ocrSnippet: "L19 PKG-5P-019 | $ 0.795" },
      { id: 20, rawUsd: 0.840, ocrSnippet: "L20 PKG-5P-020 | $ 0.840" },
      { id: 21, rawUsd: 0.432, ocrSnippet: "L21 PKG-PR-021 | $ 0.432" },
      { id: 22, rawUsd: 0.536, ocrSnippet: "L22 PKG-PR-022 | $ 0.536" },
      { id: 23, rawUsd: 0.485, ocrSnippet: "L23 PKG-PR-023 | $ 0.485" },
      { id: 24, rawUsd: 0.502, ocrSnippet: "L24 PKG-PR-024 | $ 0.502" },
      { id: 25, rawUsd: 0.554, ocrSnippet: "L25 PKG-PR-025 | $ 0.554" },
      { id: 26, rawUsd: 0.652, ocrSnippet: "L26 PKG-PR-026 | $ 0.652" },
      { id: 27, rawUsd: 0.392, ocrSnippet: "L27 PKG-PR-027 | $ 0.392" },
      { id: 28, rawUsd: 0.688, ocrSnippet: "L28 PKG-PR-028 | $ 0.688" },
      { id: 29, rawUsd: 0.770, ocrSnippet: "L29 PKG-PR-029 | $ 0.770" },
      { id: 30, rawUsd: 0.630, ocrSnippet: "L30 PKG-PR-030 | $ 0.630" },
    ].map(item => {
      const convertedInr = Math.round((item.rawUsd * usdInrRate) * 100) / 100;
      return {
        id: item.id,
        rawQuote: `$${item.rawUsd.toFixed(3)}`,
        unit: "usd_per_pc",
        priceInr: convertedInr,
        confidence: 88,
        status: "amber",
        flag: `USD Converted (@ ₹${usdInrRate.toFixed(2)})`,
        note: `OCR parsed phone rate sheet. Normalised: $${item.rawUsd} × ₹${usdInrRate.toFixed(2)} = ₹${convertedInr.toFixed(2)}/pc. Currency risk sits with buyer.`,
        snippet: item.ocrSnippet,
      };
    }),

    // 5. Raghav Boxes & Co. ("₹42/kg for 5-ply, 38 for 3-ply, rest same as last year")
    raghav_boxes: [
      // Lines 1-10 (3-ply): Derived from box weight * ₹38/kg
      { id: 1, weight: 0.18, ratePerKg: 38 },
      { id: 2, weight: 0.24, ratePerKg: 38 },
      { id: 3, weight: 0.31, ratePerKg: 38 },
      { id: 4, weight: 0.38, ratePerKg: 38 },
      { id: 5, weight: 0.36, ratePerKg: 38 },
      { id: 6, weight: 0.29, ratePerKg: 38 },
      { id: 7, weight: 0.42, ratePerKg: 38 },
      { id: 8, weight: 0.20, ratePerKg: 38 },
      { id: 9, weight: 0.47, ratePerKg: 38 },
      { id: 10, weight: 0.49, ratePerKg: 38 },
      // Lines 11-20 (5-ply): Derived from box weight * ₹42/kg
      { id: 11, weight: 0.78, ratePerKg: 42 },
      { id: 12, weight: 0.92, ratePerKg: 42 },
      { id: 13, weight: 0.96, ratePerKg: 42 },
      { id: 14, weight: 1.35, ratePerKg: 42 },
      { id: 15, weight: 0.88, ratePerKg: 42 },
      { id: 16, weight: 1.15, ratePerKg: 42 },
      { id: 17, weight: 0.85, ratePerKg: 42 },
      { id: 18, weight: 0.82, ratePerKg: 42 },
      { id: 19, weight: 1.20, ratePerKg: 42 },
      { id: 20, weight: 1.28, ratePerKg: 42 },
    ].map(item => {
      const derivedPrice = Math.round((item.weight * item.ratePerKg) * 100) / 100;
      return {
        id: item.id,
        rawQuote: `₹${item.ratePerKg}/kg (wt ${item.weight}kg)`,
        unit: "per_kg_derived",
        priceInr: derivedPrice,
        confidence: 68,
        status: "amber",
        flag: "Weight-Formula Derived",
        note: `DERIVED CALCULATION: ${item.weight} kg × ₹${item.ratePerKg}/kg = ₹${derivedPrice.toFixed(2)}/pc. Freight extra at actuals. Caution: assumes strict zero tolerance on GSM moisture variation.`,
        snippet: item.id <= 10 ? "38 for the 3-ply" : "₹42/kg for the 5-ply",
      };
    }).concat(
      // Lines 21-30 (Printed 5-ply): "rest same as last year" -> UNRESOLVABLE (RED)
      Array.from({ length: 10 }, (_, i) => ({
        id: 21 + i,
        rawQuote: "rest same as last year",
        unit: "unresolvable",
        priceInr: null,
        confidence: 0,
        status: "red",
        flag: "Unresolvable Baseline",
        note: "UNRESOLVABLE WITHOUT AUDIT RISK: Vendor stated 'rest same as last year'. No contract baseline on file for FY25 printed cartons. Guessing would be a dangerous failure.",
        snippet: "rest same as last year, freight extra.",
      }))
    ),
  };

  return extractedQuotes;
}
