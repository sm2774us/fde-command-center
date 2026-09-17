import React, { useState } from "react";
import { InteractiveDeliveryTimeline } from "./InteractiveDeliveryTimeline";
import { 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Layers, 
  Shield, 
  Sparkles, 
  Plane, 
  DollarSign, 
  Clock, 
  ArrowRight,
  ChevronRight,
  FileCheck,
  Printer,
  FileText
} from "lucide-react";
import { FDE_PROFILE } from "../data/fdeShowcaseData";

interface ExecutiveSummaryProps {
  onNavigateTab: (tab: string) => void;
}

export const CandidateExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ onNavigateTab }) => {
  // Interactive Value Modeler State
  const [podEngineers, setPodEngineers] = useState<number>(4);
  const [deploymentWeeks, setDeploymentWeeks] = useState<number>(12);
  const [automationRate, setAutomationRate] = useState<number>(75);

  // Computed projections
  const estimatedSavings = ((podEngineers * 3.2 * (automationRate / 100)) * (deploymentWeeks / 12)).toFixed(1);
  const triageReduction = Math.min(95, Math.round(50 + (automationRate * 0.45)));

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner: Senior Practitioner-Leader Positioning */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 md:p-8 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Forward Deployed Engineering Pod Leadership</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Space_Grotesk'] leading-tight">
              Bridging C-Suite Strategic Vision & Hands-On Production Engineering
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Senior practitioner-leader embedded directly with Fortune 50 clients. Proven record architecting and deploying 
              enterprise GenAI solutions with <strong className="text-cyan-300 font-medium">Palantir Foundry, Palantir AIP, and Palantir Maven</strong>, 
              leading hybrid onshore/offshore pods of 2–5 engineers, and establishing rigorous production RAG evaluation frameworks with automated Human-In-The-Loop controls.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab("simulator")}
                className="no-print px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <span>Launch Interactive AIP & HITL Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateTab("workbench")}
                className="no-print px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Explore Palantir Platform Workbench</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                title="Export this candidate profile and 6-month delivery plan as a clean PDF"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>Export Briefing / Print to PDF</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Badge Card */}
          <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Qualifications Benchmark</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="text-xl font-bold text-white font-mono">8+ Yrs</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Software & Data Eng</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="text-xl font-bold text-cyan-400 font-mono">2+ Yrs</div>
                <div className="text-[11px] text-slate-400 mt-0.5">GenAI in Production</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="text-xl font-bold text-emerald-400 font-mono">3+ Yrs</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Palantir Foundry & AIP</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="text-xl font-bold text-amber-400 font-mono">50%+</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Client Travel Ready</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Compensation</span>
                </span>
                <span className="font-mono text-slate-200 font-medium">$189K – $372K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mobility & Clearance</span>
                </span>
                <span className="font-mono text-slate-200 font-medium">Immediate / Nationwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of the Lead FDE Mandate (Directly from Job Description) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Core FDE Mandates & Responsibilities
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict alignment with Deloitte AI & Engineering client delivery expectations
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
            4 OPERATIONAL PILLARS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1: Client Engagement */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">1. Client Engagement & C-Suite Advisory</h4>
                <p className="text-[11px] text-slate-400">Executive discovery to phased roadmap</p>
              </div>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Serve as senior client-facing engineering partner for Product, Data, and Platform C-level leaders.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Define success metrics (quality, latency, cost, adoption, risk) and execute prototype-to-scale delivery plans.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Drive client pursuits, executive briefings, and platform partner co-selling with Palantir leadership.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Cross-Functional Pod Leadership */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">2. Cross-Functional Pod Leadership</h4>
                <p className="text-[11px] text-slate-400">Hybrid Onshore / Offshore Governance</p>
              </div>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Lead pods of 2–5 onshore anchored and offshore supported engineers with full delivery ownership.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Enforce sprint cadences, asynchronous handover protocols, risk registers, and strict quality gates.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mentor and develop junior FDEs through hands-on pair programming, code reviews, and architecture teardowns.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: GenAI Solution Development */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">3. GenAI Solution Architecture</h4>
                <p className="text-[11px] text-slate-400">AIP Agents, RAG & Evaluation Frameworks</p>
              </div>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Architect enterprise copilots, agentic workflows, and knowledge search on Palantir AIP and Foundry.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Govern hybrid RAG pipelines: semantic chunking, dense/sparse BM25 vector retrieval, and cross-encoder rerankers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Enforce automated Ragas/TruLens evaluation for faithfulness, hallucination prevention, and latency budgets.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4: Engineering & Data Foundations */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">4. Engineering & Data Foundations</h4>
                <p className="text-[11px] text-slate-400">PySpark, dbt, Cloud & Enterprise Connectors</p>
              </div>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Review and commit production code in PySpark, TypeScript, and SQL across Foundry Code Repositories.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Integrate SAP S/4HANA, Salesforce, Snowflake, and core systems via streaming Kafka & REST/gRPC.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Enforce Foundry Branching, Markings, row-level access control, and multi-cloud deployment (AWS/Azure/GCP).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Value & Phased Delivery Modeler */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>Interactive Client Value & Phased Delivery Modeler</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate operational ROI and time-to-value delivered by a Lead FDE Pod
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
            PROVEN CLIENT IMPACT
          </span>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Pod Size (Engineers)</span>
              <span className="font-mono text-cyan-400 font-bold">{podEngineers} (1 Lead + {podEngineers - 1} Hybrid)</span>
            </div>
            <input
              type="range"
              min="2"
              max="5"
              step="1"
              value={podEngineers}
              onChange={(e) => setPodEngineers(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <p className="text-[11px] text-slate-400">Onshore anchor + offshore Deloitte Global Delivery</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Engagement Timeline</span>
              <span className="font-mono text-cyan-400 font-bold">{deploymentWeeks} Weeks</span>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              step="2"
              value={deploymentWeeks}
              onChange={(e) => setDeploymentWeeks(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <p className="text-[11px] text-slate-400">Discovery (2w) → MVP (6w) → Enterprise Scale</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Process Automation Target</span>
              <span className="font-mono text-cyan-400 font-bold">{automationRate}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="90"
              step="5"
              value={automationRate}
              onChange={(e) => setAutomationRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <p className="text-[11px] text-slate-400">GenAI + AIP Logic with HITL sign-off</p>
          </div>
        </div>

        {/* Computed Outcome Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Projected Annual Cost Avoidance</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">${estimatedSavings}M USD</div>
            <p className="text-[11px] text-slate-400 mt-1">Reduced line stoppages, manual triage & freight penalties</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Operational Triage Reduction</span>
            <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">{triageReduction}% Faster</div>
            <p className="text-[11px] text-slate-400 mt-1">From 48-hour manual email chains to sub-hour resolution</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 font-mono uppercase">Governance & Compliance</span>
            <div className="text-2xl font-bold text-purple-400 font-mono mt-1">100% HITL Gated</div>
            <p className="text-[11px] text-slate-400 mt-1">Zero unverified autonomous writes to enterprise ERP</p>
          </div>
        </div>

        {/* Phased Roadmap Visualization */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Standard FDE Phased Delivery Cadence</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between text-cyan-400 font-mono font-bold">
                <span>Phase 1: Discovery & Prototype</span>
                <span>Weeks 1–3</span>
              </div>
              <p className="text-slate-300">
                Executive stakeholder alignment, source data connector setup (SAP/Salesforce), initial Foundry Ontology scoping, and working AIP prototype in Week 2.
              </p>
            </div>

            <div className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between text-blue-400 font-mono font-bold">
                <span>Phase 2: Hardened MVP</span>
                <span>Weeks 4–8</span>
              </div>
              <p className="text-slate-300">
                PySpark streaming pipelines, Human-In-The-Loop Action functions, Workshop UI build for business users, and Ragas automated regression testing.
              </p>
            </div>

            <div className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between text-emerald-400 font-mono font-bold">
                <span>Phase 3: Production Scale</span>
                <span>Weeks 9–16</span>
              </div>
              <p className="text-slate-300">
                Cross-plant roll-out, C-suite value realization review, handover to client platform team with comprehensive runbooks and offshore maintenance pod.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Month Phased Delivery Plan Timeline */}
      <InteractiveDeliveryTimeline />

      {/* Qualifications Checklist (100% Match) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          <span>Role Qualifications Match Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <span className="font-mono text-slate-400 uppercase text-[11px]">Required Qualifications:</span>
            {FDE_PROFILE.qualifications.map((q, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300 bg-slate-950/40 p-2 rounded border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{q}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <span className="font-mono text-slate-400 uppercase text-[11px]">Preferred Qualifications:</span>
            {FDE_PROFILE.preferredQualifications.map((pq, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300 bg-slate-950/40 p-2 rounded border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{pq}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
