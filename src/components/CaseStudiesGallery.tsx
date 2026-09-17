import React, { useState } from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  Briefcase, 
  Building2, 
  Plane, 
  HeartPulse, 
  Landmark,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { CASE_STUDIES } from "../data/fdeShowcaseData";
import { CaseStudy } from "../types";

export const CaseStudiesGallery: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);
  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  const getCaseIcon = (sector: string) => {
    if (sector.includes("Aerospace") || sector.includes("Industrial")) return Plane;
    if (sector.includes("BioPharma") || sector.includes("Clinical")) return HeartPulse;
    return Landmark;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Strategic Client Engagements & Production Case Studies</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Enterprise case studies demonstrating executive discovery, ontology architecture, and C-suite business impact
          </p>
        </div>

        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
          FORTUNE 50 PROVEN RECORD
        </span>
      </div>

      {/* Case Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {CASE_STUDIES.map((cs) => {
          const Icon = getCaseIcon(cs.clientSector);
          const isSelected = cs.id === activeCase.id;
          return (
            <button
              key={cs.id}
              onClick={() => setSelectedCaseId(cs.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-cyan-950/30 border-cyan-500/60 shadow-lg shadow-cyan-950/20"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-cyan-400">
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase truncate">{cs.clientSector.split(" ")[0]}</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">{cs.title}</h4>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Key Win:</span>
                <span className="text-emerald-400 font-bold">{cs.businessImpact[0].value}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Case Study Breakdown */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-6">
        {/* Sector and Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
              {activeCase.clientSector}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk'] mt-1">
              {activeCase.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {activeCase.palantirStack.map((tech, i) => (
              <span
                key={i}
                className="bg-slate-950 border border-slate-700 text-slate-300 font-mono text-[11px] px-2.5 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem vs FDE Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem */}
          <div className="bg-slate-950/80 border border-rose-500/20 rounded-xl p-5 space-y-2">
            <span className="text-xs font-mono uppercase text-rose-400 font-semibold block">
              Executive Problem & Friction
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeCase.executiveProblem}
            </p>
          </div>

          {/* FDE Solution */}
          <div className="bg-slate-950/80 border border-cyan-500/20 rounded-xl p-5 space-y-2">
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold block">
              Lead FDE Solution & Architecture
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeCase.fdeSolutionArchitecture}
            </p>
          </div>
        </div>

        {/* Quantified Business Impact Grid */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase text-slate-400 block">
            Quantifiable Business & Operational Impact
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCase.businessImpact.map((imp, idx) => (
              <div key={idx} className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">{imp.metric}</span>
                <div className="text-xl font-bold text-emerald-400 font-mono">{imp.value}</div>
                <p className="text-[11px] text-slate-300 leading-normal">{imp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead FDE Key Takeaways & Lessons Learned */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-3">
          <h4 className="text-xs font-mono uppercase text-cyan-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Lead FDE Practitioner Insights & C-Suite Takeaways</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            {activeCase.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{takeaway}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
