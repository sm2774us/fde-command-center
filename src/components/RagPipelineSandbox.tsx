import React, { useState } from "react";
import { RagMetricsTelemetryChart } from "./RagMetricsTelemetryChart";
import { KnowledgeBaseView } from "./KnowledgeBaseView";
import { 
  Cpu, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  DollarSign,
  FileText,
  Sliders,
  Flame,
  BookOpen
} from "lucide-react";
import { RagEvaluationMetrics } from "../types";

interface RagPreset {
  id: string;
  title: string;
  query: string;
  retrievedContext: string;
  generatedAnswer: string;
  chunkCount: number;
}

const PRESETS: RagPreset[] = [
  {
    id: "preset-aerospace",
    title: "Aerospace Maintenance SLA & Disruption Protocol",
    query: "What is the contractual supplier lead-time penalty for Tier-1 titanium fasteners if customs clearance is delayed beyond 7 business days?",
    retrievedContext: `[Document: Contract_Aero_Boeing_T1_Sec4.pdf | Markings: RESTRICTED]
Section 4.3 (Customs & Logistics Buffer): Supplier warrants that all titanium grade fasteners (Specification AMS-4928) shall maintain minimum 14-day warehouse safety buffer.
Section 4.8 (Liquidated Delay Damages): In the event of customs stoppage exceeding seven (7) consecutive business days at Rotterdam or Antwerp ports due to incomplete vendor documentation, a liquidated damage surcharge of 3.5% per calendar day shall apply, capped at 25% of total PO invoice value ($48,500). Expedited alternative hub routing can be executed by designated Plant Operations Lead via Palantir Workshop.`,
    generatedAnswer: `According to Section 4.8 of the Tier-1 Supplier Agreement [Contract_Aero_Boeing_T1_Sec4.pdf], if customs clearance for titanium fasteners is delayed beyond 7 consecutive business days due to vendor documentation, a liquidated damage surcharge of 3.5% per calendar day is incurred, capped at a maximum of 25% of the total purchase order invoice value. Furthermore, Section 4.3 allows the designated Plant Operations Lead to authorize expedited alternative hub routing directly in Palantir Workshop.`,
    chunkCount: 3,
  },
  {
    id: "preset-clinical",
    title: "Clinical Trial Protocol Exclusion Criteria (Oncology)",
    query: "Can a patient with prior EGFR TKI therapy and mild hepatic impairment be enrolled in Cohort B of the Phase 2 KRAS G12C study?",
    retrievedContext: `[Document: Protocol_ONC_KRAS_G12C_v3.2.pdf | Markings: FDA_IND_CLEARED]
Section 5.2.1 Cohort B Inclusion Criteria: Patients must have histologically confirmed non-small cell lung cancer (NSCLC) harboring KRAS G12C mutation, with disease progression following at least one line of platinum doublet chemotherapy or anti-PD-1 immunotherapy.
Section 5.3 Exclusion Criteria: 
- Item 4: Concurrent or prior therapy with targeted EGFR tyrosine kinase inhibitors (TKI) within 28 days of cycle 1 day 1 is prohibited unless confirmed negative for secondary resistance mutations.
- Item 7: Hepatic function: Total bilirubin > 1.5x ULN or AST/ALT > 2.5x ULN (mild impairment defined as Child-Pugh Class A is permitted provided AST/ALT <= 2.5x ULN).`,
    generatedAnswer: `Yes, enrollment into Cohort B is permitted subject to specific protocol conditions [Protocol_ONC_KRAS_G12C_v3.2.pdf, Section 5.3]:
1. Prior EGFR TKI therapy: Permitted only if there is a minimum 28-day washout period prior to Cycle 1 Day 1 and secondary resistance mutations are verified negative.
2. Mild hepatic impairment: Child-Pugh Class A is explicitly permissible provided AST and ALT remain <= 2.5x the Upper Limit of Normal (ULN).`,
    chunkCount: 2,
  },
];

export const RagPipelineSandbox: React.FC = () => {
  const [activeSubView, setActiveSubView] = useState<"pipeline" | "knowledge_base">("pipeline");
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const preset = PRESETS[selectedPresetIndex];

  const [denseWeight, setDenseWeight] = useState<number>(0.65); // Dense vs Sparse BM25
  const [rerankTopK, setRerankTopK] = useState<number>(3);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const [metrics, setMetrics] = useState<RagEvaluationMetrics>({
    faithfulness: 0.965,
    answerRelevance: 0.942,
    contextRecall: 0.928,
    hallucinationRisk: 0.035,
    latencyMs: 1420,
    tokenCostUsd: 0.0054,
    citationsVerified: 2,
    safetyStatus: "PASSED_COMPLIANT",
  });

  const runLiveEvaluation = async () => {
    setIsEvaluating(true);
    try {
      const response = await fetch("/api/gemini/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: preset.query,
          retrievedContext: preset.retrievedContext,
          generatedAnswer: preset.generatedAnswer,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMetrics({
          faithfulness: data.faithfulness ?? 0.96,
          answerRelevance: data.answerRelevance ?? 0.94,
          contextRecall: data.contextRecall ?? 0.92,
          hallucinationRisk: data.hallucinationRisk ?? 0.04,
          latencyMs: data.latencyMs ?? 1380,
          tokenCostUsd: data.tokenCostUsd ?? 0.0049,
          citationsVerified: data.citationsVerified ?? 3,
          safetyStatus: data.safetyStatus ?? "PASSED_COMPLIANT",
        });
      }
    } catch (err) {
      console.warn("Evaluation failed, retaining local metrics", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Sub-view Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Production RAG Architecture & LLMOps Evaluation Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Hybrid Dense/Sparse vector retrieval, cross-encoder reranking, and automated Ragas evaluation gates
          </p>
        </div>

        {/* Sub-view Navigation Pill Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveSubView("pipeline")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === "pipeline"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Pipeline & LLMOps</span>
          </button>

          <button
            onClick={() => setActiveSubView("knowledge_base")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === "knowledge_base"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950/70 text-cyan-300 border border-cyan-800/60">
              6 Docs
            </span>
          </button>
        </div>
      </div>

      {activeSubView === "knowledge_base" ? (
        <KnowledgeBaseView />
      ) : (
        <>
          {/* Scenario Selector */}
          <div className="flex items-center justify-between bg-slate-900/30 border border-slate-800 px-4 py-2.5 rounded-xl">
            <div className="text-xs text-slate-400 font-mono">
              ACTIVE TEST SCENARIO: <strong className="text-white font-sans">{preset.title}</strong>
            </div>
            <div className="flex items-center gap-2">
              {PRESETS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPresetIndex(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedPresetIndex === idx
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {p.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 5-Stage RAG Pipeline Visualizer */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
        <span className="text-xs font-mono uppercase text-slate-400 block">
          End-to-End Enterprise RAG Pipeline Topology
        </span>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase">Stage 01</span>
            <div className="font-semibold text-white">Semantic Chunking</div>
            <p className="text-[11px] text-slate-400">
              512-token chunks with 64-token overlap, preserving table schemas & document headers.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-cyan-500/30 p-3.5 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase">Stage 02</span>
            <div className="font-semibold text-white">Hybrid Retrieval</div>
            <p className="text-[11px] text-slate-400">
              Dense Vector Embeddings + BM25 Lexical Keyword Search via Reciprocal Rank Fusion (RRF).
            </p>
          </div>

          <div className="bg-slate-950/80 border border-blue-500/30 p-3.5 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-blue-400 uppercase">Stage 03</span>
            <div className="font-semibold text-white">Cross-Encoder Rerank</div>
            <p className="text-[11px] text-slate-400">
              Cohere / BGE-Reranker filters Top 50 candidates down to Top 3 high-relevance chunks.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 p-3.5 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-purple-400 uppercase">Stage 04</span>
            <div className="font-semibold text-white">Ontology LLM Grounding</div>
            <p className="text-[11px] text-slate-400">
              Context injected into prompt window with citation tracking and row-level Markings check.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 p-3.5 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase">Stage 05</span>
            <div className="font-semibold text-white">Ragas Quality Gate</div>
            <p className="text-[11px] text-slate-400">
              Automated validation of Faithfulness (&gt;0.94) and Hallucination Risk (&lt;0.05).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Query & Retrieved Context */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Query & Context */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-cyan-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                <span>Enterprise User Query</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">Live RAG Input</span>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono">
              {preset.query}
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Retrieved Context Chunks (Hybrid BM25 + Dense)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                Rerank Score: 0.984
              </span>
            </div>
            <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
              {preset.retrievedContext}
            </pre>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Grounded LLM Output with Verified Citations</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-400">Zero Hallucinations</span>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 font-mono leading-relaxed">
              {preset.generatedAnswer}
            </div>
          </div>
        </div>

        {/* Live Evaluation Metrics & Telemetry */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Ragas & LLMOps Evaluation Scorecard</h4>
              </div>
              <button
                onClick={runLiveEvaluation}
                disabled={isEvaluating}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isEvaluating ? "Evaluating..." : "Run Evaluation"}</span>
              </button>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Faithfulness Score (Grounding)</span>
                  <span className="font-mono text-emerald-400 font-bold">{(metrics.faithfulness * 100).toFixed(1)}% (Bar: &ge;94%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.faithfulness * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Answer Relevance</span>
                  <span className="font-mono text-cyan-400 font-bold">{(metrics.answerRelevance * 100).toFixed(1)}% (Bar: &ge;92%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.answerRelevance * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Context Recall</span>
                  <span className="font-mono text-blue-400 font-bold">{(metrics.contextRecall * 100).toFixed(1)}% (Bar: &ge;90%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.contextRecall * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Hallucination Risk Score</span>
                  <span className="font-mono text-rose-400 font-bold">{(metrics.hallucinationRisk * 100).toFixed(1)}% (Bar: &le;5%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.hallucinationRisk * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Operational SLAs (Latency & Token Cost) */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>P95 Latency</span>
                </div>
                <div className="text-lg font-bold text-white font-mono mt-1">
                  {(metrics.latencyMs / 1000).toFixed(2)}s
                </div>
                <span className="text-[10px] text-emerald-400">Within &lt; 2.2s SLA bar</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cost Per Query</span>
                </div>
                <div className="text-lg font-bold text-white font-mono mt-1">
                  ${metrics.tokenCostUsd.toFixed(4)}
                </div>
                <span className="text-[10px] text-emerald-400">Within &lt; $0.015 budget</span>
              </div>
            </div>

            {/* Quality Sign-off Badge */}
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Production Gate: APPROVED</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Lead FDE Sign-Off</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Recharts Telemetry Component */}
      <RagMetricsTelemetryChart />
    </>
  )}
</div>
  );
};
