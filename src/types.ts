export interface CandidateProfile {
  name: string;
  targetRole: string;
  organization: string;
  experienceYears: number;
  qualifications: string[];
  preferredQualifications: string[];
  travelReadiness: string;
  salaryBand: string;
  platforms: {
    name: string;
    level: string;
    highlights: string[];
  }[];
}

export interface OntologyObject {
  id: string;
  title: string;
  icon: string;
  properties: { name: string; type: string; description: string }[];
  actions: { name: string; impact: string; hitlRequired: boolean }[];
  relations: string[];
  sourceSystem: string;
}

export interface AgentStep {
  id: string;
  title: string;
  phase: "INGESTION" | "INTENT_EXTRACTION" | "ONTOLOGY_QUERY" | "RAG_RETRIEVAL" | "DECISION_SYNTHESIS" | "HITL_GATE" | "WRITEBACK_EXECUTION";
  status: "pending" | "running" | "waiting_approval" | "completed" | "failed";
  details: string;
  payload?: any;
  timestamp?: string;
}

export interface RagEvaluationMetrics {
  faithfulness: number; // 0 to 1
  answerRelevance: number; // 0 to 1
  contextRecall: number; // 0 to 1
  hallucinationRisk: number; // 0 to 1
  latencyMs: number;
  tokenCostUsd: number;
  citationsVerified: number;
  safetyStatus: string;
}

export interface PodMember {
  id: string;
  name: string;
  role: string;
  location: "Onshore (Client Embedded)" | "Offshore (Deloitte Global Delivery)";
  avatar: string;
  skills: string[];
  currentFocus: string;
  health: "optimal" | "blocked" | "in-review";
}

export interface QualityGate {
  id: string;
  name: string;
  category: "Code & Testing" | "Ontology & Data" | "LLMOps & RAG" | "Security & Governance";
  criteria: string;
  status: "passed" | "in_progress" | "action_required";
  leadSignoff: boolean;
}

export interface CaseStudy {
  id: string;
  clientSector: string;
  title: string;
  executiveProblem: string;
  fdeSolutionArchitecture: string;
  palantirStack: string[];
  businessImpact: {
    metric: string;
    value: string;
    description: string;
  }[];
  architectureDiagramUrl?: string;
  keyTakeaways: string[];
}

export interface CodeArtifact {
  id: string;
  title: string;
  category: "Foundry PySpark" | "Palantir AIP Function (TS)" | "dbt / Airflow" | "LLMOps Ragas Evaluation";
  filename: string;
  description: string;
  code: string;
  language: string;
}

export type ChunkingStrategyType = 
  | "Fixed 512t Overlap (64t)" 
  | "Hierarchical Section-Aware" 
  | "Semantic Sentence Boundary" 
  | "JSON-LD Schema AST" 
  | "Table & Spec Parser";

export interface DocumentChunkPreview {
  id: string;
  chunkIndex: number;
  tokenCount: number;
  snippet: string;
  embeddingVectorPreview: number[];
  metadataTags: { [key: string]: string };
}

export interface KnowledgeBaseDocument {
  id: string;
  filename: string;
  title: string;
  sector: "Aerospace & Defense" | "Life Sciences & FDA" | "Banking & FinTech" | "Foundry & SAP Architecture";
  classification: "RESTRICTED // ITAR" | "FDA_IND_CLEARED" | "STRICT_CONFIDENTIAL" | "INTERNAL // CO-FOUNDRY" | "ENTERPRISE PROPRIETARY";
  fileFormat: "PDF" | "DOCX" | "JSON-LD" | "MARKDOWN" | "YAML";
  fileSizeBytes: string;
  chunkCount: number;
  avgTokenCount: number;
  chunkingStrategy: ChunkingStrategyType;
  embeddingModel: string;
  vectorDimensions: number;
  vectorIndexStatus: "Indexed & Active" | "Re-indexing" | "Pending Embedding";
  lastIndexed: string;
  associatedOntologyObjects: string[];
  description: string;
  chunksSample: DocumentChunkPreview[];
}

export type WorkstreamType = 
  | "Foundry Ingestion" 
  | "AIP Logic Chain" 
  | "SAP BAPI Connector" 
  | "InfoSec & Compliance" 
  | "Ragas LLMOps";

export type BlockerSeverity = "CRITICAL" | "HIGH" | "MEDIUM";

export type BlockerStatus = "triage" | "active_spike" | "client_escalation" | "resolved";

export interface DeliveryBlocker {
  id: string;
  title: string;
  workstream: WorkstreamType;
  severity: BlockerSeverity;
  status: BlockerStatus;
  assignedEngineer: string;
  reporter: string;
  loggedAt: string;
  description: string;
  velocityImpactDays: number;
  fdeResolutionStrategy: string;
  resolutionNotes?: string;
}

export interface PodCapacityMetric {
  role: string;
  member: string;
  location: string;
  weeklyCapacityHours: number;
  allocatedHours: number;
  burnoutRisk: "low" | "optimal" | "elevated";
  primaryStream: WorkstreamType;
}

