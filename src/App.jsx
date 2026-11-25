import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ComparisonGrid from './components/ComparisonGrid';
import AnalystChat from './components/AnalystChat';
import RawVendorSubmissions from './components/RawVendorSubmissions';
import RfxCopilot from './components/RfxCopilot';
import QuestionnaireMatrix from './components/QuestionnaireMatrix';
import ProductMemo from './components/ProductMemo';
import CellInspectorModal from './components/CellInspectorModal';
import { calculateProcurementScenarios } from './data/analystEngine';
import { LINE_ITEMS, RFX_METADATA } from './data/rfxData';
import { VENDORS, getExtractedVendorData } from './data/vendorData';

export default function App() {
  const [activeTab, setActiveTab] = useState('grid');
  const [usdRate, setUsdRate] = useState(84.50);
  const [selectedCell, setSelectedCell] = useState(null);
  const [verifiedCells, setVerifiedCells] = useState([]);

  // Live calculated metrics
  const stats = calculateProcurementScenarios(usdRate, true);
  const extractedQuotes = getExtractedVendorData(usdRate);

  // Toggle cell verification
  const handleVerifyCell = (cellKey) => {
    setVerifiedCells((prev) => 
      prev.includes(cellKey) ? prev.filter((k) => k !== cellKey) : [...prev, cellKey]
    );
  };

  // Export complete 30-SKU comparison matrix to CSV
  const handleExportCsv = () => {
    const headers = [
      'Line #',
      'SKU Code',
      'Product Name',
      'Ply',
      'Dimensions (mm)',
      'Board GSM Spec',
      'Burst Strength (kg/cm2)',
      'Unit Weight (kg)',
      'Annual Qty',
      ...VENDORS.map((v) => `${v.name} (Raw Quote)`),
      ...VENDORS.map((v) => `${v.name} (Normalised INR/pc)`),
      ...VENDORS.map((v) => `${v.name} (Line Spend INR)`),
      'Lowest Price (INR/pc)',
      'Lowest Vendor',
    ];

    const rows = LINE_ITEMS.map((item) => {
      let lowestPrice = Infinity;
      let lowestVendorName = '';

      VENDORS.forEach((v) => {
        const q = extractedQuotes[v.id].find((x) => x.id === item.id);
        if (q && q.priceInr !== null && q.priceInr < lowestPrice) {
          lowestPrice = q.priceInr;
          lowestVendorName = v.name;
        }
      });

      const rawQuotes = VENDORS.map((v) => {
        const q = extractedQuotes[v.id].find((x) => x.id === item.id);
        return `"${q ? q.rawQuote : 'N/A'}"`;
      });

      const normRates = VENDORS.map((v) => {
        const q = extractedQuotes[v.id].find((x) => x.id === item.id);
        return q && q.priceInr !== null ? q.priceInr.toFixed(2) : 'N/A';
      });

      const lineSpends = VENDORS.map((v) => {
        const q = extractedQuotes[v.id].find((x) => x.id === item.id);
        return q && q.priceInr !== null ? (q.priceInr * item.annualQty).toFixed(0) : '0';
      });

      return [
        item.id,
        item.sku,
        `"${item.name}"`,
        item.ply,
        `"${item.dimensions}"`,
        `"${item.boardSpec}"`,
        item.bsKgCm2,
        item.weightKg,
        item.annualQty,
        ...rawQuotes,
        ...normRates,
        ...lineSpends,
        lowestPrice.toFixed(2),
        `"${lowestVendorName}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Aerchain_Corrugated_RFx_Comparison_USD_${usdRate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Navbar & Global Status */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        usdRate={usdRate}
        setUsdRate={setUsdRate}
        stats={stats}
        onExportCsv={handleExportCsv}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'grid' && (
          <ComparisonGrid
            usdRate={usdRate}
            onSelectCell={(data) => setSelectedCell(data)}
            verifiedCells={verifiedCells}
            onExportCsv={handleExportCsv}
          />
        )}

        {activeTab === 'analyst' && (
          <AnalystChat
            usdRate={usdRate}
            onSelectCell={(data) => setSelectedCell(data)}
          />
        )}

        {activeTab === 'raw_docs' && (
          <RawVendorSubmissions
            onTriggerExtract={() => setActiveTab('grid')}
          />
        )}

        {activeTab === 'rfx_copilot' && (
          <RfxCopilot
            onRfxDispatched={() => setActiveTab('raw_docs')}
          />
        )}

        {activeTab === 'compliance' && (
          <QuestionnaireMatrix />
        )}

        {activeTab === 'memo' && (
          <ProductMemo />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-850 bg-slate-900/60 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="text-slate-400">Aerchain · Quote Desk</strong> — Autonomous RFx &amp; Unstructured Extraction Prototype
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>Deterministic Math Engine</span>
            <span>•</span>
            <span>Cell Provenance Audit Layer</span>
            <span>•</span>
            <span>No Hardcoded Answers</span>
          </div>
        </div>
      </footer>

      {/* Deep Dive Cell Inspector Drawer / Modal */}
      {selectedCell && (
        <CellInspectorModal
          cellData={selectedCell}
          onClose={() => setSelectedCell(null)}
          onVerifyCell={handleVerifyCell}
          isVerified={verifiedCells.includes(`${selectedCell.item.id}_${selectedCell.vendor.id}`)}
        />
      )}

    </div>
  );
}
