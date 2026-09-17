import React, { useState } from "react";
import { 
  Workflow, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Server, 
  FileCheck, 
  Clock, 
  DollarSign,
  Lock,
  Sparkles
} from "lucide-react";
import { AgentStep } from "../types";

interface Scenario {
  id: string;
  title: string;
  domain: string;
  triggerEvent: string;
  impactLevel: "Critical" | "High" | "Moderate";
  steps: AgentStep[];
  hitlActionName: string;
  hitlThreshold: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "sc-supply-chain",
    title: "Supply Chain Disruption: Rotterdam Port Customs Stoppage",
    domain: "Aerospace & Industrial Manufacturing",
    triggerEvent: "Kafka event emitted from SAP S/4HANA: PO #PO-88219 (Titanium Turbine Fasteners, $48,500) flagged as 'CUSTOMS_HELD' at Rotterdam Hub with +14 day projected delay.",
    impactLevel: "Critical",
    hitlActionName: "RerouteToSecondaryHub",
    hitlThreshold: "Financial impact exceeds $25,000 USD limit; requires Plant Operations Lead sign-off.",
    steps: [
      {
        id: "step-1",
        title: "Streaming Event Ingestion & Anomaly Detection",
        phase: "INGESTION",
        status: "pending",
        details: "Ingested Kafka stream from SAP S/4HANA. Detected delivery delay breaching 48-hour safety buffer for Plant #4 Assembly Line.",
      },
      {
        id: "step-2",
        title: "Ontology Graph Query & Impact Radius",
        phase: "ONTOLOGY_QUERY",
        status: "pending",
        details: "Queried Foundry Ontology: linked PO #PO-88219 → Supplier #SUP-401 → 3 downstream Aircraft Wing Assemblies → $120,000/day idle cost risk.",
      },
      {
        id: "step-3",
        title: "AIP Logic Optimization & Multi-Option Synthesis",
        phase: "DECISION_SYNTHESIS",
        status: "pending",
        details: "AIP Logic synthesized 2 viable mitigation routes. Recommended Option A: Air-freight 2,000 units from Lyon Distribution Center (Confidence: 96.4%, Freight Surcharge: $8,400).",
      },
      {
        id: "step-4",
        title: "Human-In-The-Loop (HITL) Cryptographic Approval Gate",
        phase: "HITL_GATE",
        status: "pending",
        details: "AIP identified state mutation cost ($48,500 PO value) exceeds autonomous threshold. Paused execution awaiting authorized manager sign-off.",
      },
      {
        id: "step-5",
        title: "Transactional Writeback to SAP & Audit Commit",
        phase: "WRITEBACK_EXECUTION",
        status: "pending",
        details: "Executed BAPI_PO_CHANGE transaction in SAP. Committed immutable audit entry in Palantir Foundry with Planner digital signature.",
      },
    ],
  },
  {
    id: "sc-aml",
    title: "Financial Crimes: Multi-Jurisdiction AML Shell Layering",
    domain: "Global Investment Banking & Compliance",
    triggerEvent: "SWIFT MT103 transaction $1,450,000 flagged across 4 nested offshore entities with non-matching beneficial ownership.",
    impactLevel: "Critical",
    hitlActionName: "FreezeFundsAndFileSAR",
    hitlThreshold: "Regulatory freeze requires Senior Compliance Officer cryptographic token.",
    steps: [
      {
        id: "step-1",
        title: "SWIFT Wire Ingestion & Entity Resolution",
        phase: "INGESTION",
        status: "pending",
        details: "Kafka streaming wire ingested into Foundry. Automated entity resolution linked accounts across Cyprus, BVI, and Delaware.",
      },
      {
        id: "step-2",
        title: "Knowledge Graph Link Traversal",
        phase: "ONTOLOGY_QUERY",
        status: "pending",
        details: "Maven Graph engine revealed circular transaction cycle within 3 hops of a sanctioned entity list (OFAC SDN match).",
      },
      {
        id: "step-3",
        title: "Autonomous SAR Narrative Drafting",
        phase: "DECISION_SYNTHESIS",
        status: "pending",
        details: "AIP Assist drafted FinCEN Suspicious Activity Report (SAR) narrative with exact transaction timestamps, accounts, and graph lineage.",
      },
      {
        id: "step-4",
        title: "Compliance Officer HITL Gating",
        phase: "HITL_GATE",
        status: "pending",
        details: "Awaiting formal review and cryptographic approval by BSA/AML Compliance Officer before freezing funds.",
      },
      {
        id: "step-5",
        title: "Real-Time Account Freeze & Regulatory Filing",
        phase: "WRITEBACK_EXECUTION",
        status: "pending",
        details: "Placed operational lock on core banking ledger and submitted encrypted SAR payload to regulatory gateway.",
      },
    ],
  },
];

export const InteractiveAgentSimulator: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const scenario = SCENARIOS[selectedScenarioIndex];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hitlApproved, setHitlApproved] = useState<boolean | null>(null);
  const [plannerNotes, setPlannerNotes] = useState<string>("Approved after reviewing secondary inventory buffer in Lyon. Immediate priority.");
  const [completedSteps, setCompletedSteps] = useState<AgentStep[]>(scenario.steps);

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    setHitlApproved(null);
    setCompletedSteps(
      scenario.steps.map((s) => ({
        ...s,
        status: "pending",
      }))
    );
  };

  const handleScenarioChange = (idx: number) => {
    setSelectedScenarioIndex(idx);
    setIsRunning(false);
    setCurrentStepIndex(0);
    setHitlApproved(null);
    setCompletedSteps(
      SCENARIOS[idx].steps.map((s) => ({
        ...s,
        status: "pending",
      }))
    );
  };

  const advanceStep = () => {
    if (currentStepIndex >= scenario.steps.length) return;

    // If step 3 (index 3 is HITL gate), check if approved
    if (currentStepIndex === 3 && hitlApproved === null) {
      // Pause at HITL gate
      setCompletedSteps((prev) =>
        prev.map((s, idx) =>
          idx === 3 ? { ...s, status: "waiting_approval", timestamp: new Date().toLocaleTimeString() } : s
        )
      );
      return;
    }

    setCompletedSteps((prev) =>
      prev.map((s, idx) => {
        if (idx === currentStepIndex) {
          return { ...s, status: "completed", timestamp: new Date().toLocaleTimeString() };
        }
        if (idx === currentStepIndex + 1 && idx === 3) {
          return { ...s, status: "waiting_approval" };
        }
        return s;
      })
    );

    setCurrentStepIndex((prev) => prev + 1);
  };

  const approveHitl = () => {
    setHitlApproved(true);
    setCompletedSteps((prev) =>
      prev.map((s, idx) =>
        idx === 3
          ? {
              ...s,
              status: "completed",
              details: `${s.details} [APPROVED BY LEAD FDE / AUTHORIZED OFFICER: ${plannerNotes}]`,
              timestamp: new Date().toLocaleTimeString(),
            }
          : s
      )
    );
    setCurrentStepIndex(4);
  };

  const rejectHitl = () => {
    setHitlApproved(false);
    setCompletedSteps((prev) =>
      prev.map((s, idx) =>
        idx === 3
          ? {
              ...s,
              status: "failed",
              details: "Action rejected by human officer. Transaction aborted. Fallback protocol engaged.",
              timestamp: new Date().toLocaleTimeString(),
            }
          : s
      )
    );
  };

  const isComplete = currentStepIndex >= 5 && hitlApproved === true;

  return (
    <div className="space-y-6 pb-12">
      {/* Header and Scenario Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2.5">
            <Workflow className="w-5 h-5 text-cyan-400" />
            <span>Interactive Palantir AIP Agent & HITL Simulator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Experience end-to-end autonomous agentic reasoning with strict Human-In-The-Loop cryptographic governance
          </p>
        </div>

        <div className="flex items-center gap-2">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedScenarioIndex === idx
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {sc.id === "sc-supply-chain" ? "Aerospace Supply Chain" : "Banking AML Graph"}
            </button>
          ))}
        </div>
      </div>

      {/* Trigger Event Banner */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
                OPERATIONAL INCIDENT DETECTED ({scenario.domain})
              </span>
              <span className="text-[11px] font-mono text-slate-400">Severity: {scenario.impactLevel}</span>
            </div>
            <h4 className="text-sm font-bold text-white">{scenario.title}</h4>
            <p className="text-xs text-slate-300 font-mono leading-relaxed mt-1">
              {scenario.triggerEvent}
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Execution Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Execution Flow */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">AIP Agentic Execution Pipeline</span>
            <div className="flex items-center gap-2">
              <button
                onClick={advanceStep}
                disabled={currentStepIndex >= 5 || (currentStepIndex === 3 && hitlApproved === null)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Advance Next Step</span>
              </button>
              <button
                onClick={resetSimulation}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Steps Timeline */}
          <div className="space-y-3">
            {completedSteps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isDone = step.status === "completed";
              const isWaiting = step.status === "waiting_approval";
              const isFailed = step.status === "failed";

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isWaiting
                      ? "bg-amber-950/30 border-amber-500/50 shadow-lg shadow-amber-950/20"
                      : isDone
                      ? "bg-slate-950/60 border-slate-800"
                      : isCurrent
                      ? "bg-cyan-950/30 border-cyan-500/50 shadow-lg shadow-cyan-950/20"
                      : "bg-slate-950/20 border-slate-850 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] font-bold bg-slate-900 border border-slate-700 text-slate-300">
                        {idx + 1}
                      </span>
                      <h5 className="text-xs font-semibold text-white">{step.title}</h5>
                    </div>

                    <div>
                      {isDone && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>COMPLETED</span>
                        </span>
                      )}
                      {isWaiting && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded animate-pulse">
                          <Lock className="w-3 h-3" />
                          <span>AWAITING HITL</span>
                        </span>
                      )}
                      {isFailed && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
                          <span>ABORTED</span>
                        </span>
                      )}
                      {!isDone && !isWaiting && !isFailed && (
                        <span className="text-[10px] font-mono text-slate-500">PENDING</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-mono leading-relaxed pl-7">
                    {step.details}
                  </p>

                  {step.timestamp && (
                    <div className="text-[10px] font-mono text-slate-500 mt-2 pl-7 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Executed at {step.timestamp}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Human-in-the-Loop Approval Console & Writeback Telemetry */}
        <div className="lg:col-span-5 space-y-4">
          {/* HITL Card */}
          <div className="rounded-xl border border-amber-500/40 bg-slate-950/90 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold text-white">Human-In-The-Loop Governance Gate</h4>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50">
                CRITICAL GATE
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-slate-300">
                <strong className="text-white">Governed Action:</strong>{" "}
                <span className="font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {scenario.hitlActionName}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {scenario.hitlThreshold}
              </p>
            </div>

            {/* Approval Input */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase text-slate-400 block">
                Authorizing Officer Justification & Digital Signature:
              </label>
              <textarea
                value={plannerNotes}
                onChange={(e) => setPlannerNotes(e.target.value)}
                disabled={hitlApproved !== null}
                className="w-full h-18 bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none resize-none"
              />
            </div>

            {/* Actions */}
            {hitlApproved === null ? (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={approveHitl}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize & Sign Action</span>
                </button>
                <button
                  onClick={rejectHitl}
                  className="px-4 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 font-semibold text-xs transition-all cursor-pointer"
                >
                  <span>Reject & Revert</span>
                </button>
              </div>
            ) : hitlApproved ? (
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-lg text-xs text-emerald-300 font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cryptographic signature verified. Authorized for SAP writeback.</span>
              </div>
            ) : (
              <div className="p-3 bg-rose-950/30 border border-rose-500/40 rounded-lg text-xs text-rose-300 font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Action rejected by human officer. Transaction halted.</span>
              </div>
            )}
          </div>

          {/* Audit Trail & Enterprise Telemetry Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Immutable Foundry Audit Log & Writeback Payload</span>
            </h4>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-300 space-y-1.5 overflow-x-auto">
              <div className="text-slate-400">// Palantir Foundry Audit Event Lineage</div>
              <div><span className="text-cyan-400">transaction_id:</span> "TX-2026-09-16-FDE-88219"</div>
              <div><span className="text-cyan-400">ontology_target:</span> "PurchaseOrder:PO-88219"</div>
              <div><span className="text-cyan-400">action_type:</span> "{scenario.hitlActionName}"</div>
              <div><span className="text-cyan-400">agent_model:</span> "AIP-Logic-v4.2-Ontology-Grounded"</div>
              <div><span className="text-cyan-400">hitl_status:</span> "{hitlApproved ? 'CRYPTOGRAPHICALLY_VERIFIED' : 'PENDING_APPROVAL'}"</div>
              <div><span className="text-cyan-400">destination_system:</span> "SAP S/4HANA (BAPI_PO_CHANGE)"</div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ensures 100% compliance with SOC-2, ISO 27001, and corporate financial controls.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
