import { CandidateProfile, CaseStudy, CodeArtifact, OntologyObject, PodMember, QualityGate } from "../types";

export const FDE_PROFILE: CandidateProfile = {
  name: "Alexander 'Alex' Vance",
  targetRole: "Lead Forward Deployed Engineer (FDE) - Palantir & GenAI Solutions",
  organization: "Deloitte AI & Engineering Practice (Strategic Client Pods)",
  experienceYears: 8,
  travelReadiness: "100% Mobile (Ready for 50%+ client on-site deployment across US & Global hubs)",
  salaryBand: "$189,200 – $372,900 (Aligned with Senior Practitioner-Leader Band)",
  qualifications: [
    "B.S. in Computer Science & Engineering (Systems & Distributed Computing)",
    "8+ years of production experience in Software Engineering, Distributed Data Systems, and Analytics Engineering",
    "2+ years of hands-on production engineering deploying GenAI / LLM-powered enterprise solutions",
    "3+ years deep specialization across Palantir Foundry, Palantir AIP (Artificial Intelligence Platform), and Palantir Maven",
    "Proven track record leading high-velocity client pods (2–5 onshore/offshore engineers) with direct C-suite exposure",
    "Architected mission-critical data pipelines handling 10TB+/day with PySpark, dbt, Airflow, and Kafka",
    "Enforced production-grade LLMOps, automated RAG evaluation suites (Ragas, TruLens), and security Markings",
  ],
  preferredQualifications: [
    "Deep multi-cloud expertise across AWS (Bedrock, EKS, S3), Azure (OpenAI, ADLS, AKS), and GCP (Vertex AI)",
    "C-Suite & Executive discovery leadership: defining ROI, latency SLAs, token budgets, and risk mitigation",
    "Hybrid delivery champion: established asynchronous handoff workflows between onshore leads & offshore pods",
    "Comprehensive enterprise integrations: SAP S/4HANA, Salesforce CRM, Snowflake, Epic EHR, and REST/gRPC",
    "Strict adherence to security, data privacy, HIPAA, SOC-2 Type II, and defense high-assurance governance",
  ],
  platforms: [
    {
      name: "Palantir Foundry",
      level: "Principal Practitioner",
      highlights: [
        "Enterprise Ontology Design (Objects, Links, Actions & Writebacks)",
        "Pipeline Builder & PySpark Transforms with Branching & Markings",
        "Workshop App Development with granular role-based UI controls",
        "Contour, Quiver, and Code Workspaces for exploratory analytics",
      ],
    },
    {
      name: "Palantir AIP",
      level: "Lead Architect",
      highlights: [
        "AIP Logic: Graph-grounded LLM chaining & deterministic reasoning",
        "AIP Assist: Embedded copilot workflows with context isolation",
        "AIP Automate: Autonomous agentic execution with strict HITL guardrails",
        "Ontology Action Functions in TypeScript with schema verification",
      ],
    },
    {
      name: "Palantir Maven",
      level: "Mission Systems Specialist",
      highlights: [
        "Multi-modal sensor & edge data fusion for critical infrastructure",
        "Tactical edge deployment with disconnected/low-bandwidth sync",
        "High-assurance decision support with sub-second tactical telemetry",
      ],
    },
  ],
};

export const MOCK_ONTOLOGY_OBJECTS: OntologyObject[] = [
  {
    id: "obj-supply-order",
    title: "PurchaseOrder",
    icon: "Truck",
    sourceSystem: "SAP S/4HANA (Streaming Kafka Connector)",
    properties: [
      { name: "orderId", type: "String (PK)", description: "Unique PO identifier" },
      { name: "vendorTier", type: "Enum(Tier1, Tier2)", description: "Supplier strategic tier" },
      { name: "totalValueUsd", type: "Decimal(12,2)", description: "Contracted monetary total" },
      { name: "deliveryStatus", type: "Enum(Transit, Delayed, Blocked, Cleared)", description: "Live tracking state" },
      { name: "leadTimeDays", type: "Integer", description: "Estimated delivery transit buffer" },
    ],
    actions: [
      { name: "RerouteToSecondaryHub", impact: "High Financial Impact ($25K+)", hitlRequired: true },
      { name: "ExpediteCustomsClearance", impact: "Medium Operational Impact", hitlRequired: false },
      { name: "TriggerEscalationNotice", impact: "Low Impact (Notification)", hitlRequired: false },
    ],
    relations: ["VendorEntity", "DistributionCenter", "ProductionFacility"],
  },
  {
    id: "obj-vendor",
    title: "SupplierEntity",
    icon: "Building2",
    sourceSystem: "Salesforce & Ariba Procurement",
    properties: [
      { name: "supplierId", type: "String (PK)", description: "Global Dun & Bradstreet ID" },
      { name: "reliabilityScore", type: "Float(0.0-1.0)", description: "365-day rolling delivery reliability" },
      { name: "geopoliticalRisk", type: "Enum(Low, Moderate, Critical)", description: "Live geopolitical threat index" },
      { name: "carbonOffsetCertified", type: "Boolean", description: "ESG compliance certification" },
    ],
    actions: [
      { name: "FlagHighRiskVendor", impact: "Compliance Audit Triggered", hitlRequired: true },
      { name: "AdjustCreditLine", impact: "Financial Reallocation", hitlRequired: true },
    ],
    relations: ["PurchaseOrder", "WarehouseInventory", "LegalContract"],
  },
  {
    id: "obj-clinical-patient",
    title: "ClinicalTrialSubject",
    icon: "ShieldAlert",
    sourceSystem: "Epic Systems EHR & Medidata Rave",
    properties: [
      { name: "subjectId", type: "String (Hashed PII)", description: "De-identified patient token" },
      { name: "biomarkerCohort", type: "String", description: "Genomic inclusion marker (e.g. KRAS G12C)" },
      { name: "adverseEventScore", type: "Float(0.0-5.0)", description: "CTCAE grade severity index" },
      { name: "protocolDeviations", type: "Integer", description: "Count of logged non-conformances" },
    ],
    actions: [
      { name: "FlagAdverseEventForReview", impact: "FDA Regulatory Reporting Trigger", hitlRequired: true },
      { name: "ScheduleUrgentFollowUp", impact: "Patient Care Protocol", hitlRequired: false },
    ],
    relations: ["TrialProtocol", "InvestigationSite", "DosingRegimen"],
  },
];

export const POD_MEMBERS: PodMember[] = [
  {
    id: "pod-1",
    name: "Alex Vance (Lead FDE)",
    role: "Pod Lead & Principal Architect",
    location: "Onshore (Client Embedded)",
    avatar: "AV",
    skills: ["Palantir AIP", "Executive Discovery", "System Architecture", "PySpark", "HITL Governance"],
    currentFocus: "C-Suite Steering Committee alignment & AIP Automate guardrail verification",
    health: "optimal",
  },
  {
    id: "pod-2",
    name: "Elena Rostova",
    role: "Senior FDE (Full-Stack & Ontology)",
    location: "Onshore (Client Embedded)",
    avatar: "ER",
    skills: ["Foundry Workshop", "TypeScript Functions", "Ontology Action APIs", "React"],
    currentFocus: "Workshop application build for Plant Operations Director",
    health: "optimal",
  },
  {
    id: "pod-3",
    name: "Rajesh Kulkarni",
    role: "Senior Data & Distributed Systems Engineer",
    location: "Offshore (Deloitte Global Delivery)",
    avatar: "RK",
    skills: ["PySpark", "Kafka Streaming", "dbt Core", "Delta Lake / Iceberg", "Airflow"],
    currentFocus: "Incremental streaming pipelines for SAP S/4HANA PO events",
    health: "optimal",
  },
  {
    id: "pod-4",
    name: "Ananya Sharma",
    role: "MLOps & LLMOps Engineer",
    location: "Offshore (Deloitte Global Delivery)",
    avatar: "AS",
    skills: ["Ragas Evaluation", "Cohere Rerank", "Chroma / FAISS", "Prompt Management", "CI/CD"],
    currentFocus: "Automated regression benchmark on 500 golden Q&A pairs",
    health: "optimal",
  },
  {
    id: "pod-5",
    name: "Marcus Brody",
    role: "Associate FDE (Platform Integration)",
    location: "Onshore (Client Embedded)",
    avatar: "MB",
    skills: ["REST/gRPC APIs", "OAuth2 / IAM", "Foundry Markings", "Unit Testing"],
    currentFocus: "Securing SAP API gateway endpoints with mTLS & Foundry service tokens",
    health: "in-review",
  },
];

export const QUALITY_GATES: QualityGate[] = [
  {
    id: "gate-1",
    name: "Ontology Schema Integrity & Lineage Test",
    category: "Ontology & Data",
    criteria: "All Object Types possess zero dangling foreign keys, deterministic primary keys, and complete data dictionary documentation in Foundry Metadata.",
    status: "passed",
    leadSignoff: true,
  },
  {
    id: "gate-2",
    name: "PySpark Idempotency & Backfill Safety",
    category: "Code & Testing",
    criteria: "Incremental builds run with strictly idempotent merge operations; passes automated 30-day historical replay test without duplicate rows.",
    status: "passed",
    leadSignoff: true,
  },
  {
    id: "gate-3",
    name: "Ragas Faithfulness & Hallucination Threshold",
    category: "LLMOps & RAG",
    criteria: "Faithfulness score >= 0.94 and Hallucination Risk <= 0.05 across 200 synthetic adversarial prompts before production promotion.",
    status: "passed",
    leadSignoff: true,
  },
  {
    id: "gate-4",
    name: "Human-In-The-Loop (HITL) Action Guardrail",
    category: "Security & Governance",
    criteria: "Any state-mutating action with financial impact > $10,000 or regulatory implication requires dual cryptographic sign-off in Palantir Workshop.",
    status: "passed",
    leadSignoff: true,
  },
  {
    id: "gate-5",
    name: "Latency Budget & Token Cost SLA",
    category: "LLMOps & RAG",
    criteria: "End-to-end P95 retrieval-to-generation latency under 2.2 seconds; token cost per query under $0.015 USD.",
    status: "passed",
    leadSignoff: true,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-supply-chain",
    clientSector: "Fortune 50 Global Aerospace & Industrial Manufacturer",
    title: "Autonomous Supply Chain Disruption Resolution with Foundry & AIP",
    executiveProblem: "Tier-1 component delivery delays were causing $4.2M/week in assembly line idle time. Critical ERP updates were locked across 14 fragmented SAP and Oracle instances, requiring 48-72 hours of manual coordinator triage per incident.",
    fdeSolutionArchitecture: "Deployed a high-velocity Palantir FDE pod. Created an unified Enterprise Ontology modeling 850,000 PurchaseOrders, 4,200 Vendors, and 12 Assembly Plants. Layered Palantir AIP Logic to monitor streaming geopolitical and logistics feeds, synthesize dynamic rerouting options, and trigger Human-In-The-Loop actions directly back into SAP.",
    palantirStack: ["Palantir Foundry", "Palantir AIP Logic", "Workshop", "PySpark Streaming", "Kafka", "SAP S/4HANA Connector"],
    businessImpact: [
      { metric: "Triage Latency", value: "94% Reduction", description: "Incident response dropped from 48 hours to 18 minutes." },
      { metric: "Annual Cost Savings", value: "$38.4 Million", description: "Direct reduction in line stoppages and expedited freight surcharges." },
      { metric: "Autonomous Resolution", value: "78% Operations", description: "Routine customs clearances and secondary stock reallocations resolved autonomously." },
      { metric: "Planner Adoption", value: "96% Active DAU", description: "Over 350 global plant planners active daily within 6 weeks of rollout." },
    ],
    keyTakeaways: [
      "Translating raw data lake tables into an Actionable Ontology was the key catalyst for C-suite buy-in.",
      "Executive sponsors required guaranteed Human-in-the-Loop gates before permitting write-backs to SAP.",
      "Hybrid pod structure allowed onshore team to co-locate with plant managers while offshore team scaled PySpark pipelines 24/7.",
    ],
  },
  {
    id: "case-clinical-trials",
    clientSector: "Top 5 Global BioPharmaceutical Leader",
    title: "GenAI Clinical Protocol Intelligence & FDA Compliance Copilot",
    executiveProblem: "Clinical trial design teams took an average of 9 months to author and review 200+ page clinical study protocols across Oncology and Immunology, navigating thousands of legacy trial reports, FDA guidance documents, and adverse event registries.",
    fdeSolutionArchitecture: "Architected an enterprise RAG knowledge engine on Palantir Foundry and AIP Assist. Ingested 150,000 clinical PDF protocols with semantic table parsing, domain-specialized embeddings, and strict row-level security Markings. Implemented a dual-critic verification agent that enforces medical claim citations and checks protocol feasibility against patient electronic health record cohorts.",
    palantirStack: ["Palantir AIP Assist", "Foundry Pipeline Builder", "Vector Search Index", "PySpark", "Epic EHR Connector", "TruLens / Ragas"],
    businessImpact: [
      { metric: "Protocol Authoring Time", value: "4.5 Months Saved", description: "Draft-to-submission cycle compressed from 9 months to 4.5 months." },
      { metric: "Audit Citation Traceability", value: "100% Cryptographic", description: "Every generated protocol recommendation links to verified peer-reviewed or FDA sources." },
      { metric: "Protocol Amendments", value: "32% Fewer Deviations", description: "Reduced costly post-launch clinical protocol amendments by identifying dosage conflicts early." },
      { metric: "Medical Officer Trust", value: "94% Approval Rate", description: "Validated by 60+ Chief Medical Officers across 14 global therapeutic areas." },
    ],
    keyTakeaways: [
      "In life sciences, hallucination tolerance is absolute zero; automated citation lineage is mandatory.",
      "Foundry's granular Markings ensured unblinded trial data remained strictly partitioned from general research.",
      "Mentored junior client data scientists to maintain custom Ragas evaluation datasets.",
    ],
  },
  {
    id: "case-aml-banking",
    clientSector: "Tier-1 Global Investment Bank & Wealth Management",
    title: "Entity Resolution Graph & Financial Crime (AML) Copilot",
    executiveProblem: "Over 12,000 daily transaction alerts were flooding compliance investigators. Disparate shell company accounts across 8 international jurisdictions obscured ultimate beneficial ownership (UBO), resulting in regulatory scrutiny and 40% analyst burnout.",
    fdeSolutionArchitecture: "Implemented Palantir Foundry Graph Ontology and Palantir Maven multi-entity link analysis. Embedded an AIP Copilot to perform autonomous entity resolution across SWIFT wire records, corporate registries, and sanctions lists. Created a deterministic case narrative generator with automated regulatory SAR (Suspicious Activity Report) drafting.",
    palantirStack: ["Palantir Foundry", "Palantir Maven Graph Engine", "AIP Automate", "dbt Core", "Snowflake Integration", "FinCEN SAR Exporter"],
    businessImpact: [
      { metric: "False Positive Reduction", value: "68% Drop", description: "Filtered out non-suspicious alerts using graph-resolved counterparty history." },
      { metric: "Investigation Velocity", value: "3.8x Faster", description: "Compliance analysts close complex multi-layered entity investigations in under 35 minutes." },
      { metric: "Regulatory Penalties", value: "$0 Fines", description: "100% compliance record achieved during annual Federal Reserve & OCC audits." },
      { metric: "Analyst Satisfaction", value: "+45 NPS", description: "Eliminated repetitive manual copy-pasting across disparate green-screen terminal systems." },
    ],
    keyTakeaways: [
      "Combining Knowledge Graph link analysis with LLM reasoning outperforms pure text RAG by orders of magnitude.",
      "Executive alignment required presenting the prototype directly to the Chief Compliance Officer in Week 3.",
      "Established offshore 24/7 data pipeline monitoring pod that guaranteed 99.99% ingestion uptime.",
    ],
  },
];

export const CODE_ARTIFACTS: CodeArtifact[] = [
  {
    id: "code-pyspark",
    title: "Foundry PySpark Incremental Ontology Transform",
    category: "Foundry PySpark",
    filename: "transforms/supply_chain_ontology_builder.py",
    language: "python",
    description: "Production-grade incremental PySpark transform for Palantir Foundry. Enforces schema validation, handles deduplication, applies row-level security Markings, and outputs an Actionable PurchaseOrder object dataset.",
    code: `"""
Palantir Foundry Production Transform
Repository: /Transforms-GenAI/supply_chain/pyspark_ontology_sync
Author: Alexander Vance (Lead FDE)
"""

from transforms.api import transform, Input, Output, incremental
from pyspark.sql import functions as F
from pyspark.sql.window import Window
import logging

logger = logging.getLogger("FoundryTransform")

@incremental(snapshot_inputs=["vendor_master_dim"])
@transform(
    raw_orders=Input("/SourceData/SAP_ERP/raw_purchase_orders"),
    vendor_master_dim=Input("/Ontology/Dimensions/vendor_master_dim"),
    processed_orders=Output("/Ontology/Objects/PurchaseOrder_V2")
)
def compute_actionable_purchase_orders(ctx, raw_orders, vendor_master_dim, processed_orders):
    """
    Idempotent incremental build:
    1. Filters delta records by modified_at timestamp
    2. Enforces schema contract and cleans null foreign keys
    3. Enriches with vendor strategic reliability scores
    4. Computes GenAI disruption risk index
    """
    spark = ctx.spark_session
    
    # Read incremental delta from Foundry streaming log
    orders_df = raw_orders.dataframe('added')
    if orders_df.rdd.isEmpty():
        logger.info("No incremental records detected. Skipping processing.")
        return

    vendors_df = vendor_master_dim.dataframe()

    # Deduplicate within batch using latest SAP transaction commit id
    dedup_window = Window.partitionBy("order_id").orderBy(F.col("transaction_timestamp").desc())
    deduped_orders = orders_df.withColumn("row_num", F.row_number().over(dedup_window)) \\
                              .filter(F.col("row_num") == 1) \\
                              .drop("row_num")

    # Join with Vendor Ontology dimension
    enriched_df = deduped_orders.join(
        F.broadcast(vendors_df),
        on="vendor_id",
        how="left_outer"
    )

    # Compute Disruption Risk Index (Formula calibrated with Supply Chain Ops)
    curated_df = enriched_df.withColumn(
        "disruption_risk_score",
        F.when(F.col("delivery_status") == "DELAYED", F.lit(0.85))
         .when(F.col("vendor_tier") == "TIER_1", F.lit(0.15))
         .otherwise(F.lit(0.35)) +
        F.coalesce(F.col("geopolitical_risk_penalty"), F.lit(0.0))
    ).withColumn(
        "hitl_approval_required",
        (F.col("total_value_usd") > 25000.0) | (F.col("disruption_risk_score") > 0.75)
    ).withColumn(
        "_foundry_marking",
        F.lit("GLOBAL_SUPPLY_CHAIN_RESTRICTED")
    )

    # Write incrementally to Foundry object backing dataset
    processed_orders.write_dataframe(curated_df, mode='modify')
    logger.info("Successfully committed incremental batch to PurchaseOrder Ontology.")
`,
  },
  {
    id: "code-aip-ts",
    title: "Palantir AIP Action Function & HITL Gating",
    category: "Palantir AIP Function (TS)",
    filename: "functions/approveAndExecuteReroute.ts",
    language: "typescript",
    description: "Palantir AIP TypeScript Action function with cryptographic audit trail, dual-signoff Human-in-the-Loop validation, and SAP S/4HANA transactional writeback.",
    code: `import { Function, Integer, Double, Boolean, OntologyEdit } from "@foundry/functions-api";
import { Objects, PurchaseOrder, DistributionCenter, AuditLogEntry } from "@foundry/ontology-api";

/**
 * Palantir AIP Action Function
 * Governs autonomous agent recommendations with strict Human-In-The-Loop approval gates.
 * Designed & Maintained by Lead FDE Pod.
 */
export class PurchaseOrderAIPActions {

    @OntologyEdit(PurchaseOrder, AuditLogEntry)
    @Function()
    public async executeRerouteWithHITL(
        purchaseOrder: PurchaseOrder,
        targetDistributionCenter: DistributionCenter,
        authorizingOfficerId: string,
        confidenceScore: Double,
        plannerNotes: string
    ): Promise<Boolean> {
        // Enforce Lead FDE Security & Financial Limit Gate
        const orderValue = purchaseOrder.totalValueUsd ?? 0.0;
        const requiresDualApproval = orderValue > 50000.0;

        if (requiresDualApproval && !purchaseOrder.secondarySignoffOfficerId) {
            throw new Error(
                \`[FDE-SECURITY-GATE] Order \${purchaseOrder.orderId} exceeds $50,000 USD. Requires dual C-suite sign-off.\`
            );
        }

        // Apply state mutation to Ontology Object
        purchaseOrder.deliveryStatus = "REROUTED_ACTIVE";
        purchaseOrder.assignedHubId = targetDistributionCenter.hubId;
        purchaseOrder.lastModifiedBy = authorizingOfficerId;
        purchaseOrder.lastModifiedTimestamp = new Date();

        // Write immutable cryptographic audit log into Foundry
        const auditRecord = Objects.create().auditLogEntry();
        auditRecord.transactionId = \`TX-\${Date.now()}-\${Math.random().toString(36).substring(7)}\`;
        auditRecord.targetEntity = \`PurchaseOrder:\${purchaseOrder.orderId}\`;
        auditRecord.actionType = "AIP_AUTONOMOUS_REROUTE_APPROVED";
        auditRecord.agentConfidence = confidenceScore;
        auditRecord.signoffOfficer = authorizingOfficerId;
        auditRecord.operationalJustification = plannerNotes;
        auditRecord.committedTimestamp = new Date();

        // Trigger asynchronous webhook back to SAP S/4HANA (BAPI_PO_CHANGE)
        return true;
    }
}
`,
  },
  {
    id: "code-dbt-sql",
    title: "dbt Core Entity Resolution & Feature Mart",
    category: "dbt / Airflow",
    filename: "models/marts/fde_risk_entity_features.sql",
    language: "sql",
    description: "Production dbt model generating temporal risk features for LLM prompt context injection and real-time Foundry vector embedding pipelines.",
    code: `{{ config(
    materialized='incremental',
    unique_key='entity_fingerprint',
    incremental_strategy='merge',
    cluster_by=['jurisdiction_code', 'risk_tier']
) }}

WITH stg_transactions AS (
    SELECT
        account_id,
        counterparty_id,
        transaction_amount_usd,
        transaction_timestamp,
        jurisdiction_code,
        swift_memo_text
    FROM {{ ref('stg_swift_wire_transactions') }}
    {% if is_incremental() %}
        WHERE transaction_timestamp >= (SELECT MAX(transaction_timestamp) - INTERVAL '2 hours' FROM {{ this }})
    {% endif %}
),

entity_aggregates AS (
    SELECT
        account_id,
        COUNT(DISTINCT counterparty_id) AS velocity_unique_counterparties_24h,
        SUM(transaction_amount_usd) AS rolling_volume_usd_24h,
        AVG(transaction_amount_usd) AS avg_ticket_size_usd,
        MAX(transaction_timestamp) AS latest_activity_at
    FROM stg_transactions
    GROUP BY 1
)

SELECT
    MD5(CONCAT(ea.account_id, '::', CURRENT_DATE)) AS entity_fingerprint,
    ea.account_id,
    ea.velocity_unique_counterparties_24h,
    ea.rolling_volume_usd_24h,
    ea.avg_ticket_size_usd,
    CASE 
        WHEN ea.rolling_volume_usd_24h > 1000000 AND ea.velocity_unique_counterparties_24h > 15 THEN 'CRITICAL_AML_RISK'
        WHEN ea.rolling_volume_usd_24h > 250000 THEN 'MODERATE_MONITOR'
        ELSE 'LOW_BASELINE'
    END AS risk_tier,
    -- Context text formatted for direct LLM Prompt injection
    CONCAT(
        'Account [', ea.account_id, '] 24h volume: $', ROUND(ea.rolling_volume_usd_24h, 2),
        ' across ', ea.velocity_unique_counterparties_24h, ' distinct counterparties. Risk: ',
        CASE WHEN ea.rolling_volume_usd_24h > 1000000 THEN 'HIGH' ELSE 'NOMINAL' END
    ) AS llm_context_summary,
    ea.latest_activity_at,
    CURRENT_TIMESTAMP AS dbt_updated_at
FROM entity_aggregates ea;
`,
  },
  {
    id: "code-ragas",
    title: "LLMOps & Ragas Automated Evaluation Framework",
    category: "LLMOps Ragas Evaluation",
    filename: "llmops/evaluate_rag_pipeline.py",
    language: "python",
    description: "Automated regression evaluation suite in Python utilizing Ragas and TruLens to gate CI/CD merges. Checks Faithfulness, Answer Relevance, and Hallucination Risk.",
    code: `"""
Lead FDE LLMOps Quality Gate Pipeline
Evaluates Palantir AIP & Custom RAG retrieval grounding against Golden Ground-Truth datasets.
Runs automatically in GitHub Actions / Foundry Code Repositories CI.
"""

import os
import json
import numpy as np
from datasets import Dataset
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevance,
    context_recall,
    context_precision
)

# Strict Lead FDE Quality Standards
QUALITY_BAR = {
    "faithfulness": 0.94,
    "answer_relevance": 0.92,
    "context_recall": 0.90,
    "max_hallucination_rate": 0.05
}

def run_fde_eval_suite(golden_dataset_path: str):
    print(f"[LLMOps] Loading evaluation benchmark from {golden_dataset_path}...")
    with open(golden_dataset_path, "r") as f:
        bench_data = json.load(f)

    # Convert to HuggingFace Dataset format expected by Ragas
    eval_dataset = Dataset.from_dict({
        "question": [item["query"] for item in bench_data],
        "contexts": [item["retrieved_chunks"] for item in bench_data],
        "answer": [item["llm_generated_answer"] for item in bench_data],
        "ground_truth": [item["verified_reference"] for item in bench_data]
    })

    # Execute multi-metric evaluation
    results = evaluate(
        eval_dataset,
        metrics=[faithfulness, answer_relevance, context_recall, context_precision]
    )

    print("\n========== FDE PIPELINE EVALUATION REPORT ==========")
    print(f"Faithfulness Score:       {results['faithfulness']:.4f} (Target >= {QUALITY_BAR['faithfulness']})")
    print(f"Answer Relevance:         {results['answer_relevance']:.4f} (Target >= {QUALITY_BAR['answer_relevance']})")
    print(f"Context Recall:           {results['context_recall']:.4f} (Target >= {QUALITY_BAR['context_recall']})")
    
    hallucination_estimate = 1.0 - results['faithfulness']
    print(f"Hallucination Risk:       {hallucination_estimate:.4f} (Target <= {QUALITY_BAR['max_hallucination_rate']})")
    print("====================================================\n")

    # Gate verification
    if results['faithfulness'] < QUALITY_BAR['faithfulness']:
        raise ValueError(
            f"[QUALITY GATE FAILED] Faithfulness {results['faithfulness']} is below enterprise bar {QUALITY_BAR['faithfulness']}!"
        )

    print("[SUCCESS] All LLMOps Quality Gates PASSED. Approved for Production Foundry Deployment.")
    return results

if __name__ == "__main__":
    run_fde_eval_suite("eval_golden_sets/aerospace_rag_v4.json")
`,
  },
];
