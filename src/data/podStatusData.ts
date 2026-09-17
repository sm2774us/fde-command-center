import { DeliveryBlocker, PodCapacityMetric } from "../types";

export const POD_CAPACITY_METRICS: PodCapacityMetric[] = [
  {
    role: "Lead Forward Deployed Engineer",
    member: "Alexander Vance (Onsite Lead)",
    location: "Client HQ (Dallas / New York)",
    weeklyCapacityHours: 40,
    allocatedHours: 38,
    burnoutRisk: "optimal",
    primaryStream: "AIP Logic Chain"
  },
  {
    role: "Senior FDE (Onshore Delivery)",
    member: "Elena Rostova",
    location: "Deloitte US (Chicago Hub)",
    weeklyCapacityHours: 40,
    allocatedHours: 39,
    burnoutRisk: "optimal",
    primaryStream: "SAP BAPI Connector"
  },
  {
    role: "Senior Data Engineer (Offshore Lead)",
    member: "Vikram Malhotra",
    location: "Deloitte Global Delivery (Bengaluru)",
    weeklyCapacityHours: 40,
    allocatedHours: 36,
    burnoutRisk: "optimal",
    primaryStream: "Foundry Ingestion"
  },
  {
    role: "Pipeline & Ontology Engineer",
    member: "Priya Sharma",
    location: "Deloitte Global Delivery (Hyderabad)",
    weeklyCapacityHours: 40,
    allocatedHours: 35,
    burnoutRisk: "optimal",
    primaryStream: "Foundry Ingestion"
  },
  {
    role: "LLMOps & Evaluation Specialist",
    member: "Marcus Chen",
    location: "Deloitte US (Remote)",
    weeklyCapacityHours: 40,
    allocatedHours: 34,
    burnoutRisk: "low",
    primaryStream: "Ragas LLMOps"
  }
];

export const INITIAL_DELIVERY_BLOCKERS: DeliveryBlocker[] = [
  {
    id: "BLK-01",
    title: "Client InfoSec Delay: VPC Peering Routing Table Approval",
    workstream: "InfoSec & Compliance",
    severity: "CRITICAL",
    status: "client_escalation",
    assignedEngineer: "Alexander Vance (Lead FDE)",
    reporter: "Vikram Malhotra",
    loggedAt: "2026-09-15 14:30 EST",
    description: "Client Infosec firewall review pending for Foundry VPC peering to on-prem SAP RFC gateway port 3300. Blocking live integration test of `BAPI_PO_CHANGE`.",
    velocityImpactDays: 2.5,
    fdeResolutionStrategy: "Scheduled 30-minute escalation bridge with Client CISO & Cloud Architecture VP. Provisioned synthetic sandbox mock gateway in staging so offshore team isn't stalled.",
    resolutionNotes: "Security architecture blueprint delivered; awaiting CISO final thumb-print sign-off."
  },
  {
    id: "BLK-02",
    title: "SAP S/4HANA PO Schema Mismatch in Plant Code Field",
    workstream: "SAP BAPI Connector",
    severity: "HIGH",
    status: "active_spike",
    assignedEngineer: "Elena Rostova",
    reporter: "Elena Rostova",
    loggedAt: "2026-09-16 09:15 EST",
    description: "Plant codes for European distribution hubs require 4-character uppercase alphanumeric formatting, but incoming legacy EDI 850 feeds truncate leading zeros.",
    velocityImpactDays: 1.0,
    fdeResolutionStrategy: "Authoring PySpark regex normalization transform with schema-enforcing unit tests. Adding automated quarantine table for non-conforming EDI records.",
  },
  {
    id: "BLK-03",
    title: "Ragas Evaluation Benchmark Drift on Medical Terms",
    workstream: "Ragas LLMOps",
    severity: "MEDIUM",
    status: "triage",
    assignedEngineer: "Marcus Chen",
    reporter: "Marcus Chen",
    loggedAt: "2026-09-16 11:00 EST",
    description: "BioPharma oncology protocol retrieval scores dropped from 96.2% to 91.8% on newly added rare KRAS mutations due to embedding tokenizer truncation.",
    velocityImpactDays: 0.5,
    fdeResolutionStrategy: "Switching from standard Ada-002 tokenizer to BioLinkBERT-large with domain-adapted biomedical synonym dictionary.",
  },
  {
    id: "BLK-04",
    title: "Kafka Event Stream Watermark Lag on High-Volume Shift",
    workstream: "Foundry Ingestion",
    severity: "HIGH",
    status: "resolved",
    assignedEngineer: "Priya Sharma",
    reporter: "Vikram Malhotra",
    loggedAt: "2026-09-14 16:45 EST",
    description: "Foundry streaming ingestion job experienced 14-minute watermark lag during peak morning factory shift change (120,000 events/sec).",
    velocityImpactDays: 1.5,
    fdeResolutionStrategy: "Re-partitioned Kafka consumer groups from 6 to 18 partitions and doubled PySpark executor memory to 32GB with dynamic allocation enabled.",
    resolutionNotes: "Verified in staging. Latency reduced from 14 minutes down to 340ms under 2x simulated peak volume."
  },
  {
    id: "BLK-05",
    title: "AIP Logic Chain Timeout on Multi-Hop Ontology Traversal",
    workstream: "AIP Logic Chain",
    severity: "MEDIUM",
    status: "resolved",
    assignedEngineer: "Alexander Vance (Lead FDE)",
    reporter: "Elena Rostova",
    loggedAt: "2026-09-13 18:00 EST",
    description: "When an agent traversed PO -> Part -> Supplier -> Alternative Warehouse -> Flight Schedules, latency exceeded the 3,000ms SLA ceiling.",
    velocityImpactDays: 1.0,
    fdeResolutionStrategy: "Materialized pre-computed Link Cardinality indexes in Foundry Ontology and applied parallel tool execution in AIP Logic prompt chains.",
    resolutionNotes: "Latency dropped from 4,820ms to 1,210ms (75% faster). Passed P95 quality gate."
  }
];

export const SPRINT_SUMMARY = {
  sprintNumber: 14,
  sprintGoal: "Production RAG Hardening, SAP BAPI Writeback Verification, & HITL Governance Readiness",
  startDate: "2026-09-08",
  endDate: "2026-09-22",
  daysRemaining: 4,
  plannedVelocityPoints: 42,
  completedPoints: 34,
  inProgressPoints: 6,
  blockedPoints: 2,
  sprintHealth: "ON-TRACK (95% Confidence)",
  velocityHistory: [
    { sprint: "Sprint 11", planned: 38, delivered: 37, podCapacityPct: 92 },
    { sprint: "Sprint 12", planned: 40, delivered: 41, podCapacityPct: 96 },
    { sprint: "Sprint 13", planned: 44, delivered: 43, podCapacityPct: 98 },
    { sprint: "Sprint 14 (Current)", planned: 42, delivered: 34, podCapacityPct: 91 }
  ]
};
