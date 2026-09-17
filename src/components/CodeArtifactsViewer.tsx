import React, { useState } from "react";
import { 
  FileCode2, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Database 
} from "lucide-react";
import { CODE_ARTIFACTS } from "../data/fdeShowcaseData";

export const CodeArtifactsViewer: React.FC = () => {
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>(CODE_ARTIFACTS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const activeArtifact = CODE_ARTIFACTS.find((a) => a.id === selectedArtifactId) || CODE_ARTIFACTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeArtifact.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    if (cat.includes("PySpark")) return Database;
    if (cat.includes("TypeScript")) return FileCode2;
    if (cat.includes("dbt")) return Terminal;
    return Cpu;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2.5">
            <FileCode2 className="w-5 h-5 text-cyan-400" />
            <span>Production Code Artifacts & Engineering Repository</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real production-quality code: Foundry PySpark transforms, TypeScript AIP functions, dbt models, and Ragas pipelines
          </p>
        </div>

        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
          PRODUCTION-GRADE CODE
        </span>
      </div>

      {/* Artifact Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CODE_ARTIFACTS.map((artifact) => {
          const Icon = getCategoryIcon(artifact.category);
          const isSelected = artifact.id === activeArtifact.id;
          return (
            <button
              key={artifact.id}
              onClick={() => {
                setSelectedArtifactId(artifact.id);
                setCopied(false);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-cyan-950/30 border-cyan-500/60 shadow-md shadow-cyan-950/20"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase">{artifact.category}</span>
              </div>
              <h4 className="text-xs font-bold text-white truncate">{artifact.title}</h4>
              <div className="text-[11px] font-mono text-slate-500 mt-1 truncate">
                {artifact.filename}
              </div>
            </button>
          );
        })}
      </div>

      {/* Code Viewer Stage */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="border-b border-slate-800 px-4 py-3 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-slate-400 ml-2">{activeArtifact.filename}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 uppercase text-[10px]">
              Language: <span className="text-cyan-400 font-semibold">{activeArtifact.language}</span>
            </span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
          </div>
        </div>

        {/* Code Description Banner */}
        <div className="px-5 py-3 bg-slate-900/30 border-b border-slate-850 text-xs text-slate-300 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{activeArtifact.description}</p>
        </div>

        {/* Code Block with Syntax Styling */}
        <div className="p-4 sm:p-6 overflow-x-auto max-h-[600px] font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 bg-slate-950">
          <pre>
            <code>{activeArtifact.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
