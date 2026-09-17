import React, { useState } from "react";
import { PodStatusDashboard } from "./PodStatusDashboard";
import { 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  GraduationCap, 
  ArrowRight, 
  Calendar, 
  Sparkles,
  Layers,
  Activity,
  KanbanSquare
} from "lucide-react";
import { POD_MEMBERS, QUALITY_GATES } from "../data/fdeShowcaseData";
import { QualityGate } from "../types";

export const PodLeadershipGovernance: React.FC = () => {
  const [activeSubView, setActiveSubView] = useState<"pod_status" | "governance">("pod_status");
  const [gates, setGates] = useState<QualityGate[]>(QUALITY_GATES);
  const [selectedMember, setSelectedMember] = useState(POD_MEMBERS[0]);

  const toggleGateSignoff = (gateId: string) => {
    setGates((prev) =>
      prev.map((g) => (g.id === gateId ? { ...g, leadSignoff: !g.leadSignoff } : g))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Sub-view Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2.5">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Cross-Functional Pod Leadership & Program Governance</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Operating model for 2–5 engineer hybrid pods (Onshore Anchored + Deloitte Global Delivery Offshore)
          </p>
        </div>

        {/* Sub-view Navigation Pill Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveSubView("pod_status")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === "pod_status"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Pod Status & Blocker Kanban</span>
          </button>

          <button
            onClick={() => setActiveSubView("governance")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === "governance"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Operating Model & DoD Gates</span>
          </button>
        </div>
      </div>

      {activeSubView === "pod_status" ? (
        <PodStatusDashboard />
      ) : (
        <>
          {/* Pod Roster Cockpit */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Hybrid Pod Structure & Talent Allocation</h3>
            <p className="text-xs text-slate-400">Onsite client-facing senior engineering paired with high-scale global delivery</p>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
            5 ACTIVE PRACTITIONERS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {POD_MEMBERS.map((member) => {
            const isSelected = selectedMember.id === member.id;
            return (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-cyan-950/40 border-cyan-500/60 shadow-md shadow-cyan-950/20"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs text-cyan-400 font-mono">
                    {member.avatar}
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      member.health === "optimal" ? "bg-emerald-500" : "bg-amber-400"
                    }`}
                  />
                </div>

                <div className="font-semibold text-xs text-white truncate">{member.name}</div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">{member.role}</div>
                <div className="text-[10px] font-mono text-cyan-400 mt-2 truncate">
                  {member.location.split(" ")[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Member Detail View */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-xs space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div>
              <span className="font-bold text-white text-sm">{selectedMember.name}</span>
              <span className="text-slate-400 text-xs ml-2 font-mono">({selectedMember.role})</span>
            </div>
            <span className="font-mono text-cyan-400 text-[11px]">{selectedMember.location}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Current Pod Focus</span>
              <p className="text-slate-300 font-mono">{selectedMember.currentFocus}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Core Competencies</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMember.skills.map((s, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Handover Protocol & Sprint Cadence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Asynchronous Handover Protocol */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">Daily Onshore / Offshore Handover Protocol</h4>
          </div>
          <p className="text-xs text-slate-400">
            Guarantees 24-hour continuous engineering velocity without dropped context or duplicated effort.
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-lg space-y-1">
              <div className="flex justify-between font-mono text-cyan-400 text-[11px]">
                <span>08:30 EST (19:00 IST)</span>
                <span>Overlap Sync Standup</span>
              </div>
              <p className="text-slate-300">
                15-minute high-bandwidth standup. Review Jira blockers, inspect overnight PySpark regression runs, and assign code reviews.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-lg space-y-1">
              <div className="flex justify-between font-mono text-blue-400 text-[11px]">
                <span>17:30 EST</span>
                <span>Onshore Evening Handover Brief</span>
              </div>
              <p className="text-slate-300">
                Lead FDE records 3-minute Loom video and pushes architecture decision notes in Foundry Knowledge Repo for offshore morning pickup.
              </p>
            </div>
          </div>
        </div>

        {/* Junior FDE Mentorship & Talent Acceleration */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Junior FDE Mentorship & Quality Standards</h4>
          </div>
          <p className="text-xs text-slate-400">
            Active cultivation of junior practitioners into autonomous forward deployed leaders.
          </p>

          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Weekly "Architecture Teardown" sessions analyzing complex Foundry Ontology schemas and AIP agent failure modes.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Shadowed C-suite executive briefing rotations: junior engineers present technical demos under Lead FDE coaching.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Rigorous pair programming on production PySpark code reviews to enforce idempotency and memory optimization.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Quality Gates (Definition of Done) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Engineering Quality Gates & Definition of Done (DoD)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict Lead FDE sign-off required prior to production branch promotion in Palantir Foundry
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded">
            ZERO-REGRESSION POLICY
          </span>
        </div>

        <div className="space-y-3">
          {gates.map((gate) => (
            <div
              key={gate.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{gate.name}</span>
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                    {gate.category}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{gate.criteria}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => toggleGateSignoff(gate.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    gate.leadSignoff
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{gate.leadSignoff ? "Lead FDE Approved" : "Sign-Off Required"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )}
</div>
  );
};
