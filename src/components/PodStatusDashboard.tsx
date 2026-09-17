import React, { useState } from "react";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowRight, 
  Plus, 
  Filter, 
  ShieldAlert, 
  Zap, 
  Layers, 
  BarChart3, 
  ExternalLink,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { POD_CAPACITY_METRICS, INITIAL_DELIVERY_BLOCKERS, SPRINT_SUMMARY } from "../data/podStatusData";
import { DeliveryBlocker, BlockerStatus, WorkstreamType, BlockerSeverity } from "../types";

export const PodStatusDashboard: React.FC = () => {
  const [blockers, setBlockers] = useState<DeliveryBlocker[]>(INITIAL_DELIVERY_BLOCKERS);
  const [selectedWorkstream, setSelectedWorkstream] = useState<string>("ALL");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  // New blocker form state
  const [newBlocker, setNewBlocker] = useState<{
    title: string;
    workstream: WorkstreamType;
    severity: BlockerSeverity;
    assignedEngineer: string;
    description: string;
    velocityImpactDays: number;
    fdeResolutionStrategy: string;
  }>({
    title: "",
    workstream: "Foundry Ingestion",
    severity: "HIGH",
    assignedEngineer: "Alexander Vance (Lead FDE)",
    description: "",
    velocityImpactDays: 1,
    fdeResolutionStrategy: "",
  });

  // Filtered blockers
  const filteredBlockers = blockers.filter((b) => {
    const matchWs = selectedWorkstream === "ALL" || b.workstream === selectedWorkstream;
    const matchSev = selectedSeverity === "ALL" || b.severity === selectedSeverity;
    return matchWs && matchSev;
  });

  const handleMoveBlocker = (blockerId: string, nextStatus: BlockerStatus) => {
    setBlockers((prev) =>
      prev.map((b) => (b.id === blockerId ? { ...b, status: nextStatus } : b))
    );
  };

  const handleAddBlocker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlocker.title.trim()) return;

    const item: DeliveryBlocker = {
      id: `BLK-0${blockers.length + 1}`,
      title: newBlocker.title,
      workstream: newBlocker.workstream,
      severity: newBlocker.severity,
      status: "triage",
      assignedEngineer: newBlocker.assignedEngineer,
      reporter: "Lead FDE Standup",
      loggedAt: "Just now",
      description: newBlocker.description,
      velocityImpactDays: Number(newBlocker.velocityImpactDays),
      fdeResolutionStrategy: newBlocker.fdeResolutionStrategy || "Lead FDE actively investigating root cause and unblocking downstream pod dependencies.",
    };

    setBlockers([item, ...blockers]);
    setShowAddModal(false);
    setNewBlocker({
      title: "",
      workstream: "Foundry Ingestion",
      severity: "HIGH",
      assignedEngineer: "Alexander Vance (Lead FDE)",
      description: "",
      velocityImpactDays: 1,
      fdeResolutionStrategy: "",
    });
  };

  const columns: { status: BlockerStatus; title: string; color: string; badge: string }[] = [
    { status: "triage", title: "1. Triage & Daily Log", color: "border-slate-700", badge: "bg-slate-800 text-slate-300" },
    { status: "active_spike", title: "2. Active Pod Spike", color: "border-cyan-500/40", badge: "bg-cyan-950 text-cyan-300" },
    { status: "client_escalation", title: "3. Client Escalation (FDE)", color: "border-amber-500/40", badge: "bg-amber-950 text-amber-300" },
    { status: "resolved", title: "4. Resolved & Verified", color: "border-emerald-500/40", badge: "bg-emerald-950 text-emerald-300" },
  ];

  const totalAllocatedHours = POD_CAPACITY_METRICS.reduce((acc, m) => acc + m.allocatedHours, 0);
  const totalCapacityHours = POD_CAPACITY_METRICS.reduce((acc, m) => acc + m.weeklyCapacityHours, 0);
  const podUtilizationPct = Math.round((totalAllocatedHours / totalCapacityHours) * 100);

  return (
    <div className="space-y-6">
      {/* Velocity & Sprint Telemetry Header Card */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                ACTIVE SPRINT #{SPRINT_SUMMARY.sprintNumber} TELEMETRY
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
              {SPRINT_SUMMARY.sprintGoal}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Timeline: {SPRINT_SUMMARY.startDate} – {SPRINT_SUMMARY.endDate} • {SPRINT_SUMMARY.daysRemaining} days remaining in cycle
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">SPRINT VELOCITY</span>
              <span className="text-cyan-400 font-bold text-sm">
                {SPRINT_SUMMARY.completedPoints} / {SPRINT_SUMMARY.plannedVelocityPoints} PTS
              </span>
              <span className="text-slate-500 text-[10px] block">81% delivered</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">POD CAPACITY LOAD</span>
              <span className="text-emerald-400 font-bold text-sm">
                {podUtilizationPct}% ({totalAllocatedHours}h / {totalCapacityHours}h)
              </span>
              <span className="text-emerald-500 text-[10px] block">Optimal (Zero Burnout)</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">ACTIVE BLOCKERS</span>
              <span className="text-amber-400 font-bold text-sm">
                {blockers.filter((b) => b.status !== "resolved").length} Open
              </span>
              <span className="text-slate-500 text-[10px] block">2 resolved this cycle</span>
            </div>
          </div>
        </div>

        {/* Sprint History Velocity Trend */}
        <div className="border-t border-slate-800/80 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Pod Velocity Consistency (Last 4 Bi-Weekly Sprints):
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Historical Avg: 41.5 Story Points / Sprint
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SPRINT_SUMMARY.velocityHistory.map((h, i) => (
              <div key={i} className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl font-mono text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[11px]">{h.sprint}</span>
                  <span className="text-cyan-400 font-bold">{h.delivered} pts</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (h.delivered / h.planned) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Target: {h.planned} pts</span>
                  <span>Cap: {h.podCapacityPct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Capacity & Allocation Table */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Hybrid Pod Weekly Capacity Allocation (Onshore Anchor + USI Offshore)</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Balanced practitioner workload tracking to prevent technical debt and engineer fatigue
            </p>
          </div>
          <span className="text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 px-2.5 py-1 rounded">
            TOTAL POOL: 200 ENG HOURS / WEEK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {POD_CAPACITY_METRICS.map((member, i) => {
            const pct = Math.round((member.allocatedHours / member.weeklyCapacityHours) * 100);
            return (
              <div
                key={i}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-bold text-white">{member.member}</h5>
                    <p className="text-[11px] text-cyan-400 font-mono">{member.role}</p>
                    <p className="text-[10px] text-slate-500">{member.location}</p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold bg-slate-800 text-slate-300">
                    {member.primaryStream}
                  </span>
                </div>

                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Allocated: {member.allocatedHours}h / {member.weeklyCapacityHours}h</span>
                    <span className="text-emerald-400 font-bold">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        pct > 95 ? "bg-amber-400" : "bg-emerald-400"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kanban Delivery Blocker Board */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>Cross-Workstream Delivery Blocker Kanban Board</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Active tracking of cross-functional friction, client escalations, and Lead FDE resolution pathways.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Log New Delivery Blocker</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Workstream:</span>
            <select
              value={selectedWorkstream}
              onChange={(e) => setSelectedWorkstream(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Workstreams</option>
              <option value="Foundry Ingestion">Foundry Ingestion</option>
              <option value="AIP Logic Chain">AIP Logic Chain</option>
              <option value="SAP BAPI Connector">SAP BAPI Connector</option>
              <option value="InfoSec & Compliance">InfoSec & Compliance</option>
              <option value="Ragas LLMOps">Ragas LLMOps</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
            </select>
          </div>

          <span className="text-slate-500 text-[11px] ml-auto">
            Showing {filteredBlockers.length} active workstream cards
          </span>
        </div>

        {/* 4-Column Kanban Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
          {columns.map((col) => {
            const colBlockers = filteredBlockers.filter((b) => b.status === col.status);
            return (
              <div
                key={col.status}
                className={`bg-slate-950/70 border ${col.color} rounded-xl p-4 flex flex-col space-y-3 min-h-[440px]`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <span className="text-xs font-bold text-white">{col.title}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${col.badge}`}>
                    {colBlockers.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colBlockers.length === 0 ? (
                    <div className="p-6 text-center text-[11px] text-slate-500 italic">
                      No blockers in this lane
                    </div>
                  ) : (
                    colBlockers.map((blocker) => (
                      <div
                        key={blocker.id}
                        className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 space-y-2.5 transition-all text-xs"
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                              blocker.severity === "CRITICAL"
                                ? "bg-red-950 text-red-400 border border-red-800"
                                : blocker.severity === "HIGH"
                                ? "bg-amber-950 text-amber-400 border border-amber-800"
                                : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {blocker.severity}
                          </span>

                          <span className="text-[10px] font-mono text-cyan-400">
                            {blocker.id}
                          </span>
                        </div>

                        <div>
                          <h5 className="font-semibold text-white text-xs leading-snug">
                            {blocker.title}
                          </h5>
                          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                            Workstream: {blocker.workstream}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {blocker.description}
                        </p>

                        {/* Lead FDE Resolution Strategy */}
                        <div className="bg-slate-950/90 border border-slate-850 p-2 rounded-lg text-[10px] font-mono space-y-1">
                          <span className="text-cyan-400 font-semibold flex items-center gap-1">
                            <Zap className="w-3 h-3 text-cyan-400" />
                            <span>Lead FDE Action Strategy:</span>
                          </span>
                          <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
                            {blocker.fdeResolutionStrategy}
                          </p>
                        </div>

                        {blocker.resolutionNotes && (
                          <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 p-1.5 rounded border border-emerald-900/50">
                            ✓ {blocker.resolutionNotes}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-850">
                          <span>Owner: {blocker.assignedEngineer.split(" ")[0]}</span>
                          <span>Impact: {blocker.velocityImpactDays}d</span>
                        </div>

                        {/* Stage Progression Controls */}
                        <div className="pt-2 flex items-center justify-end gap-1.5">
                          {col.status !== "triage" && (
                            <button
                              onClick={() => {
                                const order: BlockerStatus[] = ["triage", "active_spike", "client_escalation", "resolved"];
                                const currIdx = order.indexOf(col.status);
                                if (currIdx > 0) handleMoveBlocker(blocker.id, order[currIdx - 1]);
                              }}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                            >
                              ← Back
                            </button>
                          )}

                          {col.status !== "resolved" && (
                            <button
                              onClick={() => {
                                const order: BlockerStatus[] = ["triage", "active_spike", "client_escalation", "resolved"];
                                const currIdx = order.indexOf(col.status);
                                if (currIdx < order.length - 1) handleMoveBlocker(blocker.id, order[currIdx + 1]);
                              }}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 cursor-pointer flex items-center gap-1 font-semibold"
                            >
                              <span>Next Stage</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for adding delivery blocker */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Log New Pod Delivery Blocker
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddBlocker} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-slate-400 uppercase text-[10px]">Blocker Summary *</label>
                <input
                  required
                  type="text"
                  value={newBlocker.title}
                  onChange={(e) => setNewBlocker({ ...newBlocker, title: e.target.value })}
                  placeholder="e.g., SAP OData v4 Certificate Expired on Staging Gateway"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-slate-400 uppercase text-[10px]">Workstream</label>
                  <select
                    value={newBlocker.workstream}
                    onChange={(e) => setNewBlocker({ ...newBlocker, workstream: e.target.value as WorkstreamType })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Foundry Ingestion">Foundry Ingestion</option>
                    <option value="AIP Logic Chain">AIP Logic Chain</option>
                    <option value="SAP BAPI Connector">SAP BAPI Connector</option>
                    <option value="InfoSec & Compliance">InfoSec & Compliance</option>
                    <option value="Ragas LLMOps">Ragas LLMOps</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-slate-400 uppercase text-[10px]">Severity</label>
                  <select
                    value={newBlocker.severity}
                    onChange={(e) => setNewBlocker({ ...newBlocker, severity: e.target.value as BlockerSeverity })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-400 uppercase text-[10px]">Description & Root Cause</label>
                <textarea
                  rows={3}
                  value={newBlocker.description}
                  onChange={(e) => setNewBlocker({ ...newBlocker, description: e.target.value })}
                  placeholder="Provide technical specifics, error messages, and which pipeline or branch is blocked..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-400 uppercase text-[10px]">Lead FDE Resolution Strategy</label>
                <textarea
                  rows={2}
                  value={newBlocker.fdeResolutionStrategy}
                  onChange={(e) => setNewBlocker({ ...newBlocker, fdeResolutionStrategy: e.target.value })}
                  placeholder="How will the Lead FDE unblock the pod? (e.g., client escalation, sandbox mocking, schema patch)..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-sm"
                >
                  Save to Kanban Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
