import React, { useState } from "react";
import { 
  Layers, 
  Cpu, 
  Radio, 
  Cloud, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  GitBranch, 
  Code, 
  Server,
  Workflow,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { MOCK_ONTOLOGY_OBJECTS } from "../data/fdeShowcaseData";

export const PalantirPlatformWorkbench: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<"foundry" | "aip" | "maven">("aip");
  const [selectedCloud, setSelectedCloud] = useState<"aws" | "azure" | "gcp">("aws");
  const [selectedOntologyIndex, setSelectedOntologyIndex] = useState<number>(0);

  const activeOntology = MOCK_ONTOLOGY_OBJECTS[selectedOntologyIndex];

  return (
    <div className="space-y-6 pb-12">
      {/* Platform Selector Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Palantir Technology Stack & Architectural Workbench</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Hands-on technical mastery across Palantir Foundry, AIP, Maven, and Multi-Cloud Foundations
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setSelectedPlatform("foundry")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              selectedPlatform === "foundry"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Palantir Foundry
          </button>
          <button
            onClick={() => setSelectedPlatform("aip")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              selectedPlatform === "aip"
                ? "bg-cyan-500 text-slate-950 font-bold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Palantir AIP</span>
          </button>
          <button
            onClick={() => setSelectedPlatform("maven")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              selectedPlatform === "maven"
                ? "bg-amber-500 text-slate-950 font-bold shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Palantir Maven
          </button>
        </div>
      </div>

      {/* Dynamic Platform View */}
      {selectedPlatform === "foundry" && (
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Palantir Foundry: Enterprise Ontology & Pipelines</h3>
                  <p className="text-xs text-slate-400">The operational semantic layer powering data integration and applications</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2.5 py-1 rounded">
                CORE ONTOLOGY LAYER
              </span>
            </div>

            {/* Ontology Objects Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
              {/* Object Selector */}
              <div className="lg:col-span-4 space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400">Ontology Object Types</span>
                {MOCK_ONTOLOGY_OBJECTS.map((obj, i) => (
                  <button
                    key={obj.id}
                    onClick={() => setSelectedOntologyIndex(i)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all text-xs flex items-center justify-between ${
                      selectedOntologyIndex === i
                        ? "bg-blue-950/40 border-blue-500/50 text-blue-200"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">{obj.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{obj.sourceSystem}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))}

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-cyan-400" />
                    <span>Branching: Isolated development branches without production pollution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Markings: Granular classification & row-level access (MAC/RBAC)</span>
                  </div>
                </div>
              </div>

              {/* Object Detail Card */}
              <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-400">Selected Object Definition</span>
                    <h4 className="text-base font-bold text-white font-mono">{activeOntology.title}</h4>
                  </div>
                  <div className="text-right text-[11px] font-mono text-slate-400">
                    Source: <span className="text-slate-200">{activeOntology.sourceSystem}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Properties */}
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-2">Properties & Schema</span>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {activeOntology.properties.map((p, idx) => (
                        <div key={idx} className="bg-slate-900/90 border border-slate-800 p-2 rounded text-xs flex justify-between items-center">
                          <span className="font-mono text-slate-200">{p.name}</span>
                          <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800/40">
                            {p.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions & HITL */}
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-2">Ontology Actions (State Mutators)</span>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {activeOntology.actions.map((act, idx) => (
                        <div key={idx} className="bg-slate-900/90 border border-slate-800 p-2.5 rounded text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{act.name}</span>
                            {act.hitlRequired ? (
                              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 border border-amber-800/60 px-1.5 py-0.5 rounded">
                                HITL REQUIRED
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                                AUTONOMOUS
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">{act.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Relations */}
                <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono uppercase text-[10px]">Ontology Links:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeOntology.relations.map((rel, idx) => (
                      <span key={idx} className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-slate-300 font-mono text-[11px]">
                        → {rel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPlatform === "aip" && (
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Palantir AIP: Artificial Intelligence Platform</h3>
                  <p className="text-xs text-slate-400">Ontology-Grounded LLM Reasoning, AIP Logic, and Autonomous Actions</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
                ENTERPRISE GENAI ENGINE
              </span>
            </div>

            {/* Architecture Node Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-4">
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Input Layer</span>
                  <Radio className="w-4 h-4 text-slate-400" />
                </div>
                <h5 className="text-sm font-semibold text-white">AIP Assist / User Intent</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Natural language prompt extracted from Workshop UI, Slack, or automated streaming triggers.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-cyan-500/30 p-4 rounded-lg space-y-2 shadow-sm shadow-cyan-950/30">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Reasoning Core</span>
                  <Workflow className="w-4 h-4 text-cyan-400" />
                </div>
                <h5 className="text-sm font-semibold text-white">AIP Logic Chains</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Multi-turn reasoning grounded in the Enterprise Ontology, fetching verified Object properties.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 uppercase">Safety Gate</span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <h5 className="text-sm font-semibold text-white">Human-In-The-Loop (HITL)</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cryptographic approval required for state changes exceeding financial or operational thresholds.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-emerald-500/30 p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Execution</span>
                  <Server className="w-4 h-4 text-emerald-400" />
                </div>
                <h5 className="text-sm font-semibold text-white">AIP Automate & Writeback</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Transactional commit to Ontology with webhook sync to SAP, Salesforce, or Oracle ERP.
                </p>
              </div>
            </div>

            {/* Why AIP Beats DIY Stacks Teardown */}
            <div className="mt-6 p-4 rounded-lg bg-slate-950/90 border border-slate-800">
              <h4 className="text-xs font-mono uppercase text-cyan-400 mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Lead FDE Trade-Off Analysis: Palantir AIP vs DIY LangChain/LlamaIndex</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <div className="font-semibold text-slate-200">1. Actionable Writebacks vs Read-Only Q&A</div>
                  <p className="text-slate-400">
                    DIY vector stacks answer questions but cannot safely execute operational transactions. AIP connects directly to Action Types with transactional integrity.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-slate-200">2. Security Markings vs Leaky Context</div>
                  <p className="text-slate-400">
                    Palantir enforces strict row-level Markings. The LLM cannot access or synthesize confidential or HIPAA records the caller lacks clearance to inspect.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-slate-200">3. Native Auditability vs Black-Box Logs</div>
                  <p className="text-slate-400">
                    Every AIP agent step, prompt variation, and human approval is cryptographically logged in Foundry metadata for regulatory compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPlatform === "maven" && (
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Palantir Maven: Tactical Edge & Mission Fusion</h3>
                  <p className="text-xs text-slate-400">High-assurance multi-modal sensor telemetry for critical operations and defense</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded">
                MISSION SYSTEMS ARCHITECTURE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-lg space-y-2">
                <span className="font-mono text-amber-400 uppercase text-[10px]">Edge Capability 01</span>
                <h5 className="text-sm font-semibold text-white">Sub-Second Multi-Modal Sensor Ingestion</h5>
                <p className="text-slate-300">
                  Real-time ingestion of radar, video feeds, satellite imagery, and IoT telematics at the tactical edge with micro-batching.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-lg space-y-2">
                <span className="font-mono text-amber-400 uppercase text-[10px]">Edge Capability 02</span>
                <h5 className="text-sm font-semibold text-white">Disconnected / Low-Bandwidth Sync</h5>
                <p className="text-slate-300">
                  Edge nodes operate autonomously during communication blackouts, syncing deltas and resolving conflicts upon reconnection.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-lg space-y-2">
                <span className="font-mono text-amber-400 uppercase text-[10px]">Edge Capability 03</span>
                <h5 className="text-sm font-semibold text-white">High-Assurance Entity Disambiguation</h5>
                <p className="text-slate-300">
                  Automated correlation of fragmented signals into a unified Common Operational Picture (COP) with zero manual latency.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Cloud Foundations (AWS, Azure, GCP) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cloud className="w-5 h-5 text-cyan-400" />
              <span>Multi-Cloud & Enterprise Infrastructure Foundations</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Deep familiarity with cloud environments, IAM, storage, compute, and networking
            </p>
          </div>

          <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setSelectedCloud("aws")}
              className={`px-3 py-1 rounded transition-all ${
                selectedCloud === "aws" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-slate-400"
              }`}
            >
              AWS Cloud
            </button>
            <button
              onClick={() => setSelectedCloud("azure")}
              className={`px-3 py-1 rounded transition-all ${
                selectedCloud === "azure" ? "bg-blue-500/20 text-blue-300 border border-blue-500/40" : "text-slate-400"
              }`}
            >
              Microsoft Azure
            </button>
            <button
              onClick={() => setSelectedCloud("gcp")}
              className={`px-3 py-1 rounded transition-all ${
                selectedCloud === "gcp" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-slate-400"
              }`}
            >
              Google Cloud (GCP)
            </button>
          </div>
        </div>

        {/* Cloud Architecture Details */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-xs">
          {selectedCloud === "aws" && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <span className="font-mono text-amber-400 uppercase text-[10px]">Compute & Orchestration</span>
                <p className="text-slate-200 font-semibold mt-1">Amazon EKS & AWS Lambda</p>
                <p className="text-slate-400 text-[11px]">Kubernetes clusters running Foundry agent sidecars & microservices</p>
              </div>
              <div>
                <span className="font-mono text-amber-400 uppercase text-[10px]">Storage & Lakehouse</span>
                <p className="text-slate-200 font-semibold mt-1">S3 & AWS Glue Catalog</p>
                <p className="text-slate-400 text-[11px]">Parquet/Iceberg bronze-silver-gold partitioned data buckets</p>
              </div>
              <div>
                <span className="font-mono text-amber-400 uppercase text-[10px]">Enterprise GenAI</span>
                <p className="text-slate-200 font-semibold mt-1">AWS Bedrock (Claude 3.5)</p>
                <p className="text-slate-400 text-[11px]">Private VPC endpoints for secure foundation model inference</p>
              </div>
              <div>
                <span className="font-mono text-amber-400 uppercase text-[10px]">Security & IAM</span>
                <p className="text-slate-200 font-semibold mt-1">AWS IAM & KMS</p>
                <p className="text-slate-400 text-[11px]">IRSA (IAM Roles for Service Accounts) & customer-managed keys</p>
              </div>
            </div>
          )}

          {selectedCloud === "azure" && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <span className="font-mono text-blue-400 uppercase text-[10px]">Compute & Orchestration</span>
                <p className="text-slate-200 font-semibold mt-1">Azure Kubernetes (AKS)</p>
                <p className="text-slate-400 text-[11px]">High-availability node pools with auto-scaling Foundry worker nodes</p>
              </div>
              <div>
                <span className="font-mono text-blue-400 uppercase text-[10px]">Storage & Lakehouse</span>
                <p className="text-slate-200 font-semibold mt-1">ADLS Gen2 & Synapse</p>
                <p className="text-slate-400 text-[11px]">Hierarchical namespace storage for 10TB+ daily PySpark workloads</p>
              </div>
              <div>
                <span className="font-mono text-blue-400 uppercase text-[10px]">Enterprise GenAI</span>
                <p className="text-slate-200 font-semibold mt-1">Azure OpenAI Service</p>
                <p className="text-slate-400 text-[11px]">Provisioned Throughput Units (PTU) with private networking</p>
              </div>
              <div>
                <span className="font-mono text-blue-400 uppercase text-[10px]">Security & IAM</span>
                <p className="text-slate-200 font-semibold mt-1">Microsoft Entra ID & Key Vault</p>
                <p className="text-slate-400 text-[11px]">RBAC integration with Palantir Foundry user authentication</p>
              </div>
            </div>
          )}

          {selectedCloud === "gcp" && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <span className="font-mono text-emerald-400 uppercase text-[10px]">Compute & Orchestration</span>
                <p className="text-slate-200 font-semibold mt-1">Google Kubernetes Engine (GKE)</p>
                <p className="text-slate-400 text-[11px]">Autopilot clusters with multi-zone resilience and workload identity</p>
              </div>
              <div>
                <span className="font-mono text-emerald-400 uppercase text-[10px]">Storage & Analytics</span>
                <p className="text-slate-200 font-semibold mt-1">BigQuery & Cloud Storage</p>
                <p className="text-slate-400 text-[11px]">Federated BigQuery tables connected directly to Foundry datasets</p>
              </div>
              <div>
                <span className="font-mono text-emerald-400 uppercase text-[10px]">Enterprise GenAI</span>
                <p className="text-slate-200 font-semibold mt-1">Vertex AI (Gemini 3 Series)</p>
                <p className="text-slate-400 text-[11px]">High-throughput vector search endpoints and multi-modal models</p>
              </div>
              <div>
                <span className="font-mono text-emerald-400 uppercase text-[10px]">Security & IAM</span>
                <p className="text-slate-200 font-semibold mt-1">Google Cloud IAM & Cloud KMS</p>
                <p className="text-slate-400 text-[11px]">Fine-grained service accounts with zero persistent root credentials</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
