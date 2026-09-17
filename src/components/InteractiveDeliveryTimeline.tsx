import React, { useState } from "react";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Layers, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  FileCheck
} from "lucide-react";

interface TimelineMonth {
  month: number;
  phaseTitle: string;
  focusArea: string;
  status: "Completed" | "Current Focus" | "Targeted";
  duration: string;
  podComposition: string;
  onshorePct: number;
  offshorePct: number;
  objectives: string[];
  deliverables: string[];
  qualityGate: string;
  risksAndMitigations: string;
}

const TIMELINE_DATA: TimelineMonth[] = [
  {
    month: 1,
    phaseTitle: "Executive Discovery & Rapid Ingestion",
    focusArea: "Strategic Alignment & Data Foundations",
    status: "Completed",
    duration: "Weeks 1 – 4",
    podComposition: "Lead FDE (100% Onshore) + Enterprise Solution Architect",
    onshorePct: 100,
    offshorePct: 0,
    objectives: [
      "Embed with C-suite stakeholders to identify highest-impact operational decision bottlenecks.",
      "Establish enterprise security markings (SOC-2, HIPAA, multi-tenant RBAC).",
      "Deploy secure cloud VPC connection and initial PySpark Kafka/ERP ingestion pipelines into Foundry.",
    ],
    deliverables: [
      "Enterprise Architecture & Markings Blueprint",
      "Raw Data Pipeline Connectors (SAP S/4HANA / Kafka)",
      "Executive Value Charter with Signed KPI Targets",
    ],
    qualityGate: "Client C-Suite Architecture & Infosec Clearance Sign-Off",
    risksAndMitigations: "Risk: Client Infosec delays on data ingestion. Mitigation: Deployed synthetic schema staging datasets to unblock day-1 engineering.",
  },
  {
    month: 2,
    phaseTitle: "Foundry Ontology & AIP Logic Prototype",
    focusArea: "Semantic Layer & Prompt Reasoning",
    status: "Completed",
    duration: "Weeks 5 – 8",
    podComposition: "Lead FDE (Onshore) + 1 Senior FDE + 1 Offshore Data Engineer",
    onshorePct: 70,
    offshorePct: 30,
    objectives: [
      "Model core business entities (Purchase Orders, Supply Nodes, Parts) into Palantir Enterprise Ontology.",
      "Author foundational AIP Logic prompt chains grounded directly in Ontology object properties.",
      "Construct interactive Foundry Workshop UI prototype for operational planners.",
    ],
    deliverables: [
      "3 Core Ontology Object Types with Object Actions",
      "Working Foundry Workshop Prototype with AIP Assist",
      "Prompt Template Library with Citation Requirements",
    ],
    qualityGate: "Operational Business Sponsor Live Prototype Approval",
    risksAndMitigations: "Risk: Schema mismatches across legacy ERP tables. Mitigation: Implemented PySpark deduplication & schema validation transforms.",
  },
  {
    month: 3,
    phaseTitle: "Hardened RAG Pipeline & HITL Gating",
    focusArea: "LLMOps & Transactional Safety",
    status: "Current Focus",
    duration: "Weeks 9 – 12",
    podComposition: "Full Hybrid Pod: Lead FDE + Senior FDE + 2 Offshore Data/LLMOps Engineers",
    onshorePct: 50,
    offshorePct: 50,
    objectives: [
      "Engineer production RAG pipeline combining dense vector search and sparse BM25 with Cohere reranking.",
      "Implement cryptographic Human-In-The-Loop (HITL) approval gate for actions exceeding $25,000 threshold.",
      "Establish automated Ragas evaluation suite in CI/CD (Faithfulness >94%, Latency <2.0s).",
    ],
    deliverables: [
      "Hybrid Vector/Lexical RAG Engine with Cross-Encoder",
      "Bidirectional SAP BAPI Transactional Writeback Connector",
      "Automated Daily Ragas Regression Evaluation Suite",
    ],
    qualityGate: "Production Ragas Gate: Faithfulness >= 94% & P95 Latency <= 2,000ms",
    risksAndMitigations: "Risk: Hallucinated supplier recommendations. Mitigation: Enforced strict zero-shot constraint requiring direct citations from verified contracts.",
  },
  {
    month: 4,
    phaseTitle: "Operational Shadow Pilot & Calibration",
    focusArea: "Real-World Validation & Drift Monitoring",
    status: "Targeted",
    duration: "Weeks 13 – 16",
    podComposition: "Lead FDE (Client Coaching) + Senior FDE + 2 Offshore Engineers",
    onshorePct: 40,
    offshorePct: 60,
    objectives: [
      "Run AIP Agent in passive shadow mode alongside senior human dispatchers/planners.",
      "Benchmark agent decisions against human expert consensus; calibrate confidence thresholds.",
      "Implement real-time token cost and inference latency budget monitors.",
    ],
    deliverables: [
      "Shadow Pilot Discrepancy & Confidence Analysis Report",
      "Calibrated Decision Scoring Model",
      "Infra Cost Audit & Token Economics Plan",
    ],
    qualityGate: ">= 95% Agreement between AIP Recommendations and Lead Human Planners",
    risksAndMitigations: "Risk: User reluctance to trust autonomous logic. Mitigation: Ran side-by-side comparative reviews demonstrating 100% citation transparency.",
  },
  {
    month: 5,
    phaseTitle: "Active Rollout & User Enablement",
    focusArea: "Multi-Facility Operational Go-Live",
    status: "Targeted",
    duration: "Weeks 17 – 20",
    podComposition: "Lead FDE (Onsite at Client Hub) + Hybrid Pod Support",
    onshorePct: 40,
    offshorePct: 60,
    objectives: [
      "Cut over from shadow mode to live active HITL execution across 2 primary manufacturing facilities.",
      "Conduct hands-on Foundry Workshop training for 60+ operational users and shift supervisors.",
      "Enforce 08:30 EST daily handover protocol with offshore engineering for 24/7 hypercare support.",
    ],
    deliverables: [
      "2 Live Operational Plants on Palantir AIP",
      "Role-Based User Training Playbooks & Video Modules",
      "24/7 Hypercare Support Runbook",
    ],
    qualityGate: "Zero Critical Severity Incidents across First 30 Days of Active Operations",
    risksAndMitigations: "Risk: Operational shift friction. Mitigation: Embedded Lead FDE directly on factory floor during first 2 weeks of production launch.",
  },
  {
    month: 6,
    phaseTitle: "Enterprise Scaling & Center of Excellence",
    focusArea: "Handover, Governance & Value Audit",
    status: "Targeted",
    duration: "Weeks 21 – 24",
    podComposition: "Lead FDE (Executive Advisory) + Transition to Client Internal CoE",
    onshorePct: 30,
    offshorePct: 70,
    objectives: [
      "Scale deployment across all 8 global distribution and assembly centers.",
      "Stand up client internal Palantir Center of Excellence (CoE) and certify client engineers.",
      "Conduct final C-suite business impact audit measuring realized cost savings and cycle time reduction.",
    ],
    deliverables: [
      "Full Enterprise Production Deployment",
      "Client Center of Excellence Operating Charter & Playbook",
      "Executive Value Realization Audit Report ($38.4M Net Savings)",
    ],
    qualityGate: "C-Suite Value Realization Sign-Off & Client CoE Independence",
    risksAndMitigations: "Risk: Knowledge loss post-handover. Mitigation: Created comprehensive architectural documentation, runbooks, and shadow-pairing rotations.",
  },
];

export const InteractiveDeliveryTimeline: React.FC = () => {
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(2); // Default to Month 3 (Current Focus)
  const activeMonth = TIMELINE_DATA[selectedMonthIdx];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Title & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk']">
              6-Month Production Delivery Plan (Prototype to Enterprise Scaling)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Proven Lead FDE delivery methodology bridging rapid prototyping, hardened RAG/LLMOps, and global rollout
          </p>
        </div>

        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full w-fit">
          PHASED ENTERPRISE PLAYBOOK
        </span>
      </div>

      {/* Month Selector Stepper Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {TIMELINE_DATA.map((t, idx) => {
          const isSelected = selectedMonthIdx === idx;
          const isDone = t.status === "Completed";
          const isCurrent = t.status === "Current Focus";

          return (
            <button
              key={t.month}
              onClick={() => setSelectedMonthIdx(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-cyan-950/50 border-cyan-500 text-white shadow-lg shadow-cyan-950/30"
                  : isCurrent
                  ? "bg-slate-900 border-cyan-500/40 text-slate-200"
                  : isDone
                  ? "bg-slate-900/60 border-slate-800 text-slate-300"
                  : "bg-slate-950/40 border-slate-850 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="font-bold text-cyan-400">MONTH 0{t.month}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {isCurrent && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
              </div>
              <div className="text-xs font-semibold truncate text-white">{t.phaseTitle}</div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">{t.duration}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Month Deep-Dive Details */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
        {/* Month Title & Pod Breakdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded font-semibold">
                MONTH {activeMonth.month} ({activeMonth.duration})
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  activeMonth.status === "Completed"
                    ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/60"
                    : activeMonth.status === "Current Focus"
                    ? "bg-cyan-950/60 text-cyan-300 border border-cyan-800/60"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {activeMonth.status.toUpperCase()}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk'] mt-1">
              {activeMonth.phaseTitle}
            </h4>
            <p className="text-xs text-slate-300">{activeMonth.focusArea}</p>
          </div>

          {/* Pod Ratio Bar */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg text-xs space-y-1.5 min-w-[260px]">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-cyan-400">Onshore: {activeMonth.onshorePct}%</span>
              <span className="text-blue-400">Offshore: {activeMonth.offshorePct}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
              <div className="bg-cyan-500 h-full" style={{ width: `${activeMonth.onshorePct}%` }} />
              <div className="bg-blue-500 h-full" style={{ width: `${activeMonth.offshorePct}%` }} />
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {activeMonth.podComposition}
            </div>
          </div>
        </div>

        {/* Objectives & Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Objectives */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Architectural Objectives</span>
            </h5>
            <div className="space-y-2">
              {activeMonth.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tangible Deliverables */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tangible Enterprise Deliverables</span>
            </h5>
            <div className="space-y-2">
              {activeMonth.deliverables.map((del, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-200">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-mono">{del}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Gate & Risk Mitigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          <div className="bg-slate-950/80 border border-emerald-500/30 p-3.5 rounded-lg space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Phase Quality Gate & Sign-off Criteria</span>
            </div>
            <p className="text-xs text-slate-200 font-semibold leading-relaxed">
              {activeMonth.qualityGate}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 p-3.5 rounded-lg space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>Identified Risk & Proactive Mitigation</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeMonth.risksAndMitigations}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
