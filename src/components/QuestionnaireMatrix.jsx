import React from 'react';
import { QUESTIONNAIRE_QUESTIONS } from '../data/rfxData';
import { VENDORS } from '../data/vendorData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileCheck2,
  Award
} from 'lucide-react';

export default function QuestionnaireMatrix() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Vendor Qualification & Quality Compliance Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Auditing 5 mandatory procurement criteria. Procurement teams cannot risk factory shutdown or packaging
            bursting in transit based on unverified spot quotes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
            3 Qualified
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 font-semibold">
            2 Disqualified
          </span>
        </div>
      </div>

      {/* Compliance Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-[11px] font-semibold text-slate-300 border-b border-slate-800">
              <tr>
                <th className="p-3 w-80">Pre-Qualification Requirement</th>
                {VENDORS.map((v) => (
                  <th key={v.id} className="p-3 min-w-[180px] border-l border-slate-800">
                    <div className="font-bold text-slate-100">{v.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{v.location}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-850 text-xs">
              {QUESTIONNAIRE_QUESTIONS.map((q) => (
                <tr key={q.id} className="hover:bg-slate-850/40">
                  <td className="p-3">
                    <div className="font-semibold text-slate-200">{q.id}: {q.question}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Weight: {q.weight}% • Mandatory: Yes
                    </div>
                  </td>

                  {VENDORS.map((v) => {
                    const ans = v.questionnaireAnswers[q.id];
                    if (!ans) return <td key={v.id} className="p-3 border-l border-slate-800">-</td>;

                    return (
                      <td key={v.id} className="p-3 border-l border-slate-800 align-top">
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          {ans.pass ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Pass
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Fail
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                          {ans.note}
                        </p>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Bottom Overall Status Row */}
              <tr className="bg-slate-950/80 font-bold border-t border-slate-750">
                <td className="p-3 text-slate-100">
                  Overall Qualification Status for Split Award
                </td>
                {VENDORS.map((v) => (
                  <td key={v.id} className="p-3 border-l border-slate-800">
                    {v.clearedQualityQuestionnaire ? (
                      <div className="text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 p-2 rounded-lg text-center">
                        ✓ APPROVED SUPPLIER
                        <div className="text-[10px] font-normal text-emerald-400 mt-0.5">
                          Eligible for PO Award
                        </div>
                      </div>
                    ) : (
                      <div className="text-rose-300 bg-rose-950/60 border border-rose-700/60 p-2 rounded-lg text-center">
                        ✕ DISQUALIFIED
                        <div className="text-[10px] font-normal text-rose-400 mt-0.5">
                          Audit or Terms Rejected
                        </div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
