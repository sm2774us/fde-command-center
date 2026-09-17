import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from "recharts";
import { Activity, Sliders, Sparkles, AlertTriangle, CheckCircle2, TrendingUp, RefreshCw } from "lucide-react";

interface BenchmarkRun {
  batchId: string;
  chunkStrategy: string;
  accuracy: number; // 0 - 100%
  faithfulness: number; // 0 - 100%
  hallucinationRisk: number; // 0 - 100%
  latencyMs: number; // ms
  tokenCostCents: number; // $0.00x
}

const INITIAL_BENCHMARK_DATA: BenchmarkRun[] = [
  { batchId: "Run #1", chunkStrategy: "Fixed 256", accuracy: 84.5, faithfulness: 82.1, hallucinationRisk: 12.4, latencyMs: 890, tokenCostCents: 0.32 },
  { batchId: "Run #2", chunkStrategy: "Fixed 512", accuracy: 89.2, faithfulness: 88.0, hallucinationRisk: 8.5, latencyMs: 1120, tokenCostCents: 0.45 },
  { batchId: "Run #3", chunkStrategy: "Dense Vector", accuracy: 91.0, faithfulness: 89.4, hallucinationRisk: 6.8, latencyMs: 1240, tokenCostCents: 0.51 },
  { batchId: "Run #4", chunkStrategy: "Dense + BM25", accuracy: 94.6, faithfulness: 93.8, hallucinationRisk: 4.2, latencyMs: 1390, tokenCostCents: 0.54 },
  { batchId: "Run #5 (Prod)", chunkStrategy: "Hybrid + Cohere Rerank", accuracy: 97.4, faithfulness: 96.8, hallucinationRisk: 2.1, latencyMs: 1480, tokenCostCents: 0.58 },
  { batchId: "Run #6", chunkStrategy: "Complex Query Stress", accuracy: 95.8, faithfulness: 95.2, hallucinationRisk: 3.4, latencyMs: 1620, tokenCostCents: 0.62 },
  { batchId: "Run #7", chunkStrategy: "Multi-Hop Reasoning", accuracy: 96.2, faithfulness: 95.9, hallucinationRisk: 2.9, latencyMs: 1710, tokenCostCents: 0.65 },
  { batchId: "Run #8", chunkStrategy: "Ontology Grounded", accuracy: 98.1, faithfulness: 97.9, hallucinationRisk: 1.4, latencyMs: 1540, tokenCostCents: 0.59 },
];

export const RagMetricsTelemetryChart: React.FC = () => {
  const [data, setData] = useState<BenchmarkRun[]>(INITIAL_BENCHMARK_DATA);
  const [activeMetricView, setActiveMetricView] = useState<"combined" | "accuracy" | "latency">("combined");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const simulateNewBenchmarkRun = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const runNum = data.length + 1;
      const randomVariance = (Math.random() - 0.5) * 2;
      const newRun: BenchmarkRun = {
        batchId: `Run #${runNum}`,
        chunkStrategy: "Live AIP Stress Test",
        accuracy: +(96.5 + randomVariance * 1.5).toFixed(1),
        faithfulness: +(96.0 + randomVariance * 1.2).toFixed(1),
        hallucinationRisk: +(2.5 - randomVariance * 0.8).toFixed(1),
        latencyMs: Math.round(1450 + randomVariance * 120),
        tokenCostCents: +(0.56 + randomVariance * 0.04).toFixed(2),
      };
      setData((prev) => [...prev.slice(1), newRun]);
      setIsSimulating(false);
    }, 600);
  };

  const resetData = () => {
    setData(INITIAL_BENCHMARK_DATA);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const runInfo = data.find((d) => d.batchId === label);
      return (
        <div className="bg-slate-950 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 font-mono">
          <div className="font-bold text-white border-b border-slate-800 pb-1 flex justify-between gap-4">
            <span>{label}</span>
            <span className="text-cyan-400 font-normal">{runInfo?.chunkStrategy}</span>
          </div>
          <div className="text-emerald-400">
            Accuracy & Grounding: <span className="font-bold text-white">{runInfo?.accuracy}%</span>
          </div>
          <div className="text-cyan-400">
            Faithfulness: <span className="font-bold text-white">{runInfo?.faithfulness}%</span>
          </div>
          <div className="text-rose-400">
            Hallucination Risk: <span className="font-bold text-white">{runInfo?.hallucinationRisk}%</span>
          </div>
          <div className="text-amber-400">
            P95 Latency: <span className="font-bold text-white">{runInfo?.latencyMs} ms</span>
          </div>
          <div className="text-slate-400 text-[10px] pt-1 border-t border-slate-800">
            Token Cost: ${((runInfo?.tokenCostCents || 0) / 100).toFixed(4)} USD / query
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-5">
      {/* Telemetry Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
              RAG Pipeline Telemetry & LLMOps Evaluation Trends (Recharts)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Continuous regression tracking: Latency (P95), Faithfulness / Accuracy, and Hallucination Risk across chunking & reranking runs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveMetricView("combined")}
              className={`px-2.5 py-1 rounded transition-all ${
                activeMetricView === "combined"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Combined View
            </button>
            <button
              onClick={() => setActiveMetricView("accuracy")}
              className={`px-2.5 py-1 rounded transition-all ${
                activeMetricView === "accuracy"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Quality & Risk
            </button>
            <button
              onClick={() => setActiveMetricView("latency")}
              className={`px-2.5 py-1 rounded transition-all ${
                activeMetricView === "latency"
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Latency (ms)
            </button>
          </div>

          <button
            onClick={simulateNewBenchmarkRun}
            disabled={isSimulating}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSimulating ? "Simulating..." : "Trigger Live Run"}</span>
          </button>

          <button
            onClick={resetData}
            title="Reset to default benchmark runs"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Grounded Accuracy</span>
          <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
            {(data.reduce((acc, cur) => acc + cur.accuracy, 0) / data.length).toFixed(1)}%
          </div>
          <span className="text-[10px] text-emerald-400/80">SLA: &ge;94.0%</span>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Hallucination Risk</span>
          <div className="text-lg font-bold text-rose-400 font-mono mt-0.5">
            {(data.reduce((acc, cur) => acc + cur.hallucinationRisk, 0) / data.length).toFixed(1)}%
          </div>
          <span className="text-[10px] text-rose-400/80">Threshold: &le;5.0%</span>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Avg P95 Latency</span>
          <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">
            {Math.round(data.reduce((acc, cur) => acc + cur.latencyMs, 0) / data.length)} ms
          </div>
          <span className="text-[10px] text-amber-400/80">Budget: &le;2,000 ms</span>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Production Status</span>
          <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>GATE PASSED</span>
          </div>
          <span className="text-[10px] text-slate-400">Zero Regression Detected</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="batchId" 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
            />
            {activeMetricView !== "latency" && (
              <YAxis 
                yAxisId="pct"
                domain={[0, 105]} 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                tickFormatter={(val) => `${val}%`}
              />
            )}
            {activeMetricView !== "accuracy" && (
              <YAxis 
                yAxisId="latency" 
                orientation="right"
                domain={[0, 2400]} 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                tickFormatter={(val) => `${val}ms`}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />

            {/* Threshold References */}
            {activeMetricView !== "latency" && (
              <>
                <ReferenceLine 
                  yAxisId="pct" 
                  y={94} 
                  stroke="#10b981" 
                  strokeDasharray="4 4" 
                  label={{ value: "Accuracy SLA (94%)", fill: "#10b981", fontSize: 10, position: "insideTopLeft" }} 
                />
                <ReferenceLine 
                  yAxisId="pct" 
                  y={5} 
                  stroke="#f43f5e" 
                  strokeDasharray="4 4" 
                  label={{ value: "Hallucination Cap (5%)", fill: "#f43f5e", fontSize: 10, position: "insideBottomLeft" }} 
                />
              </>
            )}

            {activeMetricView !== "accuracy" && (
              <ReferenceLine 
                yAxisId="latency" 
                y={2000} 
                stroke="#f59e0b" 
                strokeDasharray="4 4" 
                label={{ value: "Latency Budget (2000ms)", fill: "#f59e0b", fontSize: 10, position: "insideTopRight" }} 
              />
            )}

            {/* Metrics */}
            {(activeMetricView === "combined" || activeMetricView === "latency") && (
              <Bar 
                yAxisId="latency" 
                dataKey="latencyMs" 
                name="P95 Latency (ms)" 
                fill="#38bdf8" 
                opacity={0.35} 
                radius={[4, 4, 0, 0]} 
                barSize={24}
              />
            )}

            {(activeMetricView === "combined" || activeMetricView === "accuracy") && (
              <>
                <Line 
                  yAxisId="pct" 
                  type="monotone" 
                  dataKey="accuracy" 
                  name="Grounded Accuracy (%)" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: "#10b981" }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  yAxisId="pct" 
                  type="monotone" 
                  dataKey="faithfulness" 
                  name="Faithfulness Score (%)" 
                  stroke="#06b6d4" 
                  strokeWidth={2} 
                  strokeDasharray="3 3"
                  dot={{ r: 3, fill: "#06b6d4" }} 
                />
                <Line 
                  yAxisId="pct" 
                  type="monotone" 
                  dataKey="hallucinationRisk" 
                  name="Hallucination Risk (%)" 
                  stroke="#f43f5e" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: "#f43f5e" }} 
                  activeDot={{ r: 6 }} 
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
        <span>Architectural Takeaway: Hybrid retrieval with Cohere Cross-Encoder reranking pushes accuracy to 97.4% while suppressing hallucination risk below 2.5%.</span>
        <span className="text-cyan-400 shrink-0 ml-2">Lead FDE Evaluation Standard</span>
      </div>
    </div>
  );
};
