import { LINE_ITEMS } from './rfxData';
import { VENDORS, getExtractedVendorData } from './vendorData';

// Core procurement math and reasoning engine

export function calculateProcurementScenarios(usdInrRate = 84.50, applyGujaratRebate = true) {
  const extractedQuotes = getExtractedVendorData(usdInrRate);

  // 1. Single-source scenario for Gujarat Corru-Pack
  let gujaratTotalGross = 0;
  let gujaratTotalUnits = 0;
  LINE_ITEMS.forEach(item => {
    const quote = extractedQuotes.gujarat_corru.find(q => q.id === item.id);
    if (quote && quote.priceInr) {
      gujaratTotalGross += quote.priceInr * item.annualQty;
      gujaratTotalUnits += item.annualQty;
    }
  });
  // 4% rebate if quarterly volume > 100,000 units (annualized > 400,000 units)
  const gujaratRebateApplies = gujaratTotalUnits >= 400000;
  const gujaratRebateAmount = gujaratRebateApplies && applyGujaratRebate ? gujaratTotalGross * 0.04 : 0;
  const gujaratTotalNet = gujaratTotalGross - gujaratRebateAmount;

  // 2. Single-source scenario for Shree Pack (with landed cost note)
  let shreePackTotalBase = 0;
  let shreePackFreightTotal = 0;
  LINE_ITEMS.forEach(item => {
    const quote = extractedQuotes.shree_pack.find(q => q.id === item.id);
    if (quote && quote.priceInr) {
      shreePackTotalBase += quote.priceInr * item.annualQty;
      shreePackFreightTotal += 1.80 * item.annualQty; // Ex-works freight
    }
  });

  // 3. Single-source scenario for Sunrise Packaging (USD converted)
  let sunriseTotal = 0;
  LINE_ITEMS.forEach(item => {
    const quote = extractedQuotes.sunrise_pack.find(q => q.id === item.id);
    if (quote && quote.priceInr) {
      sunriseTotal += quote.priceInr * item.annualQty;
    }
  });

  // 4. Theoretical Unconstrained Lowest (Cherry-pick across all 5 vendors)
  const unconstrainedAllocations = [];
  let unconstrainedTotalSpend = 0;

  LINE_ITEMS.forEach(item => {
    let lowestPrice = Infinity;
    let winningVendor = null;
    let winningQuote = null;

    VENDORS.forEach(vendor => {
      const q = extractedQuotes[vendor.id].find(x => x.id === item.id);
      if (q && q.priceInr !== null && q.priceInr < lowestPrice) {
        lowestPrice = q.priceInr;
        winningVendor = vendor;
        winningQuote = q;
      }
    });

    const lineTotal = lowestPrice * item.annualQty;
    unconstrainedTotalSpend += lineTotal;
    unconstrainedAllocations.push({
      lineItem: item,
      winner: winningVendor,
      winningPrice: lowestPrice,
      lineSpend: lineTotal,
      quote: winningQuote,
    });
  });

  // 5. VP SCENARIO: Split Award, Cheapest per line, ONLY among vendors who cleared Quality Questionnaire
  // Approved vendors: gujarat_corru, deccan_cartons, sunrise_pack
  const approvedVendorIds = VENDORS.filter(v => v.clearedQualityQuestionnaire).map(v => v.id);
  const qualitySplitAllocations = [];
  let qualitySplitGrossSpend = 0;
  const vendorVolumes = { gujarat_corru: 0, deccan_cartons: 0, sunrise_pack: 0 };
  const vendorSpend = { gujarat_corru: 0, deccan_cartons: 0, sunrise_pack: 0 };
  const vendorLineCount = { gujarat_corru: 0, deccan_cartons: 0, sunrise_pack: 0 };

  LINE_ITEMS.forEach(item => {
    let lowestPrice = Infinity;
    let winningVendorId = null;
    let winningQuote = null;

    approvedVendorIds.forEach(vId => {
      const q = extractedQuotes[vId].find(x => x.id === item.id);
      if (q && q.priceInr !== null && q.priceInr < lowestPrice) {
        lowestPrice = q.priceInr;
        winningVendorId = vId;
        winningQuote = q;
      }
    });

    const lineTotal = lowestPrice * item.annualQty;
    qualitySplitGrossSpend += lineTotal;
    vendorVolumes[winningVendorId] += item.annualQty;
    vendorSpend[winningVendorId] += lineTotal;
    vendorLineCount[winningVendorId] += 1;

    qualitySplitAllocations.push({
      lineItem: item,
      winnerId: winningVendorId,
      winnerName: VENDORS.find(v => v.id === winningVendorId).name,
      winningPrice: lowestPrice,
      lineSpend: lineTotal,
      quote: winningQuote,
      // Flag if this was an edge case fallback (e.g. Deccan skipped lines 14, 22, 29)
      isFallbackLine: [14, 22, 29].includes(item.id),
      fallbackReason: [14, 22, 29].includes(item.id) 
        ? (item.id === 14 ? "Deccan Cartons excluded due to 2100mm rotary slotter limit; awarded to next lowest quality-cleared bidder."
          : item.id === 22 ? "Deccan Cartons excluded due to 4-color printing capacity bottleneck; awarded to next lowest."
          : "Deccan Cartons excluded due to lack of hydrophobic varnish coater; awarded to next lowest.")
        : null,
    });
  });

  // Check Gujarat volume rebate in the split award scenario
  // Quarterly volume needed: 1,00,000 units (annualized 4,00,000 units)
  const gujaratSplitRebateTriggered = vendorVolumes.gujarat_corru >= 400000;
  const gujaratSplitRebateSavings = gujaratSplitRebateTriggered && applyGujaratRebate 
    ? vendorSpend.gujarat_corru * 0.04 
    : 0;
  const qualitySplitNetSpend = qualitySplitGrossSpend - gujaratSplitRebateSavings;

  // Comparison metrics
  const baselineSpend = gujaratTotalNet; // Enterprise standard single-source baseline
  const savingsVsBaseline = baselineSpend - qualitySplitNetSpend;
  const savingsPercent = (savingsVsBaseline / baselineSpend) * 100;

  return {
    usdInrRate,
    baselineSpend,
    unconstrainedTotalSpend,
    qualitySplitGrossSpend,
    qualitySplitNetSpend,
    savingsVsBaseline,
    savingsPercent,
    singleSource: {
      gujarat: { gross: gujaratTotalGross, rebate: gujaratRebateAmount, net: gujaratTotalNet, lines: 30 },
      shreePack: { base: shreePackTotalBase, freight: shreePackFreightTotal, landed: shreePackTotalBase + shreePackFreightTotal, lines: 30 },
      sunrise: { total: sunriseTotal, lines: 30 },
    },
    qualitySplit: {
      totalNetSpend: qualitySplitNetSpend,
      vendorVolumes,
      vendorSpend,
      vendorLineCount,
      allocations: qualitySplitAllocations,
      gujaratRebateTriggered: gujaratSplitRebateTriggered,
      gujaratRebateSavings: gujaratSplitRebateSavings,
    },
  };
}

// The Top 5 Numbers to Verify by Hand (Trust & Audit Risk Engine)
export function getNumbersToVerifyByHand(usdInrRate = 84.50) {
  return [
    {
      id: "AUDIT-01",
      severity: "CRITICAL",
      title: "Raghav Boxes: Formula-Derived Pricing from Box Weight",
      vendor: "Raghav Boxes & Co.",
      linesAffected: "Lines 1-20 (3-Ply & 5-Ply)",
      potentialExposure: "₹45,00,000+ spend at risk",
      reason: "Vendor never quoted per-piece prices. System multiplied theoretical weight by ₹38/kg (3-ply) and ₹42/kg (5-ply). In corrugation, paper moisture (+5%) and glue weight (+3%) swing actual weight. If vendor bills by gross scaled weighbridge rather than theoretical unit spec, budget will overrun by 8-12%. Furthermore, 'freight extra' is uncapped.",
      mitigationAction: "Demand explicit ₹/box fixed rate contract with FOR delivery terms before issuing PO.",
    },
    {
      id: "AUDIT-02",
      severity: "HIGH",
      title: "Sunrise Packaging: USD Currency Volatility Exposure",
      vendor: "Sunrise Packaging Solutions",
      linesAffected: "All 30 Lines (Quoted in USD $)",
      potentialExposure: "₹16,50,000 per ₹2 FX fluctuation",
      reason: `Rates are denominated in USD ($0.136 to $0.888). System currently normalises using buyer assumption ₹${usdInrRate.toFixed(2)}/USD. If INR depreciates to ₹87.00/USD during the contract year, the landed cost increases by ~3.0% across all awarded Sunrise lines.`,
      mitigationAction: "Negotiate fixed forward INR billing clause or establish a quarterly currency band with risk sharing.",
    },
    {
      id: "AUDIT-03",
      severity: "HIGH",
      title: "Gujarat Corru-Pack: Footnote 4.0% Rebate Threshold Risk",
      vendor: "Gujarat Corru-Pack Pvt Ltd",
      linesAffected: "Contract-wide Rebate (Note 4 in Letterhead)",
      potentialExposure: "₹7,20,000 rebate forfeiture",
      reason: "Note 4 specifies: 'Rebate applicable if cumulative purchase exceeds 1,00,000 units/quarter'. In an unconstrained split award, if lines awarded to Gujarat yield fewer than 100,000 units in any quarter, the 4% rebate is voided retrospectively.",
      mitigationAction: "Model quarterly dispatch forecasts against Gujarat's minimum threshold before signing split-award contracts.",
    },
    {
      id: "AUDIT-04",
      severity: "MEDIUM",
      title: "Deccan Cartons: Unquoted Tooling Lines (14, 22, 29)",
      vendor: "Deccan Cartons & Containers",
      linesAffected: "Line 14 (Heavy Auto Shipper), Line 22 (4-Color Retail), Line 29 (Varnish)",
      potentialExposure: "Supply continuity failure & price premium fallback",
      reason: "Deccan omitted these 3 lines due to machine bed width (2100mm max) and coating constraints. If an operational buyer mistakenly issues an umbrella contract to Deccan, these 3 critical production lines will face stockouts.",
      mitigationAction: "Secondary supplier contract (Gujarat or Sunrise) must be executed specifically for Lines 14, 22, and 29.",
    },
    {
      id: "AUDIT-05",
      severity: "MEDIUM",
      title: "Shree Pack: Ex-Works Commercial Terms vs FOR Destination",
      vendor: "Shree Pack Industries",
      linesAffected: "All 30 Lines (Quoted ₹/pc)",
      potentialExposure: "₹27,00,000 unbudgeted transit freight",
      reason: "Shree Pack's base prices appear to be lowest on many lines, but footer states 'Ex-Works Ahmedabad. Freight extra'. Average dedicated truck freight to South DCs adds ₹1.80 to ₹2.40 per box, which negates their superficial unit price advantage.",
      mitigationAction: "Compare Shree Pack ONLY on landed FOR cost (Unit Price + Actual Freight + Transit Insurance).",
    },
  ];
}
