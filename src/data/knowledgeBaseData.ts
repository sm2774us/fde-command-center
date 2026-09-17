import { KnowledgeBaseDocument } from "../types";

export const KNOWLEDGE_BASE_DOCUMENTS: KnowledgeBaseDocument[] = [
  {
    id: "doc-aero-01",
    filename: "Contract_Aero_Boeing_T1_Sec4.pdf",
    title: "Aerospace Master Supply Agreement — Tier-1 Fasteners & Hardware",
    sector: "Aerospace & Defense",
    classification: "RESTRICTED // ITAR",
    fileFormat: "PDF",
    fileSizeBytes: "4.8 MB",
    chunkCount: 42,
    avgTokenCount: 486,
    chunkingStrategy: "Fixed 512t Overlap (64t)",
    embeddingModel: "text-embedding-3-large",
    vectorDimensions: 3072,
    vectorIndexStatus: "Indexed & Active",
    lastIndexed: "2026-09-15 08:24 EST",
    associatedOntologyObjects: ["PurchaseOrder", "SupplierEntity", "AircraftAssembly"],
    description: "Legal master supply agreement stipulating SLA clauses, delivery buffer thresholds, liquidated damages for port customs stoppages, and expedited air-freight escalation pathways.",
    chunksSample: [
      {
        id: "chk-aero-042",
        chunkIndex: 4,
        tokenCount: 508,
        snippet: "Section 4.3 (Customs & Logistics Buffer): Supplier warrants that all titanium grade fasteners (Specification AMS-4928) shall maintain minimum 14-day warehouse safety buffer. In the event of customs stoppage exceeding seven (7) consecutive business days at Rotterdam or Antwerp ports due to vendor documentation, a liquidated damage surcharge of 3.5% per calendar day shall apply, capped at 25% of total PO invoice value ($48,500). Expedited alternative hub routing can be executed by designated Plant Operations Lead via Palantir Workshop.",
        embeddingVectorPreview: [0.0421, -0.0189, 0.0832, -0.0512, 0.0094, 0.1145, -0.0381],
        metadataTags: {
          section: "4.3",
          clause_type: "Liquidated Damages",
          threshold_usd: "48500",
          jurisdiction: "EU / North America",
          security_marking: "ITAR_RESTRICTED"
        }
      },
      {
        id: "chk-aero-043",
        chunkIndex: 5,
        tokenCount: 492,
        snippet: "Section 4.8 (Secondary Hub Allocation & Authorization Protocol): When freight rerouting is triggered via Palantir AIP automated dispatch, authorization is strictly conditional upon: (i) secondary supplier AS9100 Rev D audit validation within 90 days, (ii) metallurgical test certificates uploaded to Foundry raw dataset `raw_supplier_certs`, and (iii) cryptographic HITL signature by Tier-1 Procurement Director if invoice value exceeds USD $25,000.",
        embeddingVectorPreview: [0.0385, -0.0211, 0.0914, -0.0423, 0.0152, 0.0987, -0.0298],
        metadataTags: {
          section: "4.8",
          clause_type: "HITL Authorization",
          audit_standard: "AS9100D",
          writeback_target: "SAP_BAPI_PO_CHANGE"
        }
      }
    ]
  },
  {
    id: "doc-onc-02",
    filename: "Protocol_ONC_KRAS_G12C_v3.2.pdf",
    title: "Phase 2 Clinical Trial Protocol — KRAS G12C Advanced NSCLC",
    sector: "Life Sciences & FDA",
    classification: "FDA_IND_CLEARED",
    fileFormat: "PDF",
    fileSizeBytes: "12.4 MB",
    chunkCount: 78,
    avgTokenCount: 510,
    chunkingStrategy: "Hierarchical Section-Aware",
    embeddingModel: "BioBERT-v2 / ada-002",
    vectorDimensions: 1536,
    vectorIndexStatus: "Indexed & Active",
    lastIndexed: "2026-09-14 19:10 EST",
    associatedOntologyObjects: ["ClinicalSubject", "BiomarkerProfile", "CohortDefinition"],
    description: "FDA-cleared clinical trial master protocol outlining strict subject inclusion/exclusion criteria, prior therapy washout windows, hepatic tolerance thresholds, and concomitant medications.",
    chunksSample: [
      {
        id: "chk-onc-018",
        chunkIndex: 18,
        tokenCount: 495,
        snippet: "Section 5.2.1 Cohort B Inclusion Criteria: Histologically confirmed metastatic or locally advanced non-small cell lung cancer (NSCLC) with documented KRAS G12C point mutation via CLIA-certified NGS assay. Prior exposure to platinum doublet chemotherapy and/or anti-PD-L1 checkpoint inhibitor required with radiographic RECIST v1.1 progression.",
        embeddingVectorPreview: [-0.0142, 0.0763, -0.0315, 0.0628, 0.0441, -0.0198, 0.0583],
        metadataTags: {
          protocol_code: "KRAS-G12C-PH2",
          fda_ind_num: "IND-148922",
          cohort: "Cohort B",
          biomarker: "KRAS G12C"
        }
      },
      {
        id: "chk-onc-019",
        chunkIndex: 19,
        tokenCount: 520,
        snippet: "Section 5.3 Exclusion Criteria (Hepatic & Prior TKI): Patients with concurrent or prior therapy with targeted EGFR tyrosine kinase inhibitors (TKI) within 28 days of Cycle 1 Day 1 are excluded unless confirmed negative for secondary resistance mutations. Mild hepatic impairment (Child-Pugh Class A) permitted provided AST and ALT remain <= 2.5x ULN; total bilirubin must not exceed 1.5x ULN.",
        embeddingVectorPreview: [-0.0201, 0.0812, -0.0289, 0.0594, 0.0388, -0.0145, 0.0612],
        metadataTags: {
          section: "5.3",
          category: "Exclusion Criteria",
          washout_days: "28",
          hepatic_limit: "Child-Pugh A"
        }
      }
    ]
  },
  {
    id: "doc-aml-03",
    filename: "Directive_SWIFT_AML_KYC_2026.pdf",
    title: "Global Banking AML / FinCEN High-Risk Jurisdiction Surveillance Directive",
    sector: "Banking & FinTech",
    classification: "STRICT_CONFIDENTIAL",
    fileFormat: "PDF",
    fileSizeBytes: "8.2 MB",
    chunkCount: 64,
    avgTokenCount: 472,
    chunkingStrategy: "Semantic Sentence Boundary",
    embeddingModel: "Voyage-Finance-2",
    vectorDimensions: 1536,
    vectorIndexStatus: "Indexed & Active",
    lastIndexed: "2026-09-12 14:45 EST",
    associatedOntologyObjects: ["AccountRiskProfile", "SWIFTTransaction", "SARFiling"],
    description: "FinCEN and SWIFT compliance rulebook defining automated SAR filing thresholds, multi-hop structuring anomaly detection, and sanction screening protocols for correspondent cross-border transactions.",
    chunksSample: [
      {
        id: "chk-aml-007",
        chunkIndex: 7,
        tokenCount: 468,
        snippet: "Clause 3.14 (Structuring & Rapid Layering Thresholds): Wire transfers split into increments below $10,000 USD executed within a 72-hour window across more than three distinct intermediary BIC routing codes must be flagged with AML Severity Score >= 85. The compliance system shall automatically generate a Suspicious Activity Report (SAR) payload and lock correspondent ledger balances pending MLRO review.",
        embeddingVectorPreview: [0.0612, 0.0145, -0.0841, 0.0321, -0.0762, 0.0118, 0.0439],
        metadataTags: {
          regulator: "FinCEN / SWIFT",
          threshold_amount: "10000 USD",
          time_window: "72 hours",
          action_trigger: "AUTOMATED_SAR_DRAFT"
        }
      }
    ]
  },
  {
    id: "doc-foundry-04",
    filename: "Foundry_Ontology_Schema_Export_v4.json",
    title: "Palantir Enterprise Semantic Graph — Core Ontology Object & Action Spec",
    sector: "Foundry & SAP Architecture",
    classification: "INTERNAL // CO-FOUNDRY",
    fileFormat: "JSON-LD",
    fileSizeBytes: "3.2 MB",
    chunkCount: 112,
    avgTokenCount: 430,
    chunkingStrategy: "JSON-LD Schema AST",
    embeddingModel: "Code-Embed-v1",
    vectorDimensions: 1536,
    vectorIndexStatus: "Indexed & Active",
    lastIndexed: "2026-09-16 04:15 EST",
    associatedOntologyObjects: ["PurchaseOrder", "SupplierEntity", "WarehouseNode", "DisruptionAlert"],
    description: "Machine-readable schema AST definition of object types, primary keys, many-to-one foreign links, and transactional Action Types governing bidirectional SAP S/4HANA writeback mutations.",
    chunksSample: [
      {
        id: "chk-fnd-001",
        chunkIndex: 1,
        tokenCount: 445,
        snippet: "{\"$schema\": \"palantir.ontology.v4\", \"objectType\": \"PurchaseOrder\", \"primaryKey\": \"po_number\", \"backingDatasource\": \"ri.foundry.main.dataset.88fa29-sap-po-clean\", \"actions\": [{\"actionId\": \"RerouteToSecondaryHub\", \"requiresSignoff\": true, \"securityMarking\": \"RESTRICTED_SUPPLY_CHAIN\", \"parameters\": [{\"name\": \"targetHubId\", \"type\": \"string\"}, {\"name\": \"approverSignature\", \"type\": \"string\"}]}]}",
        embeddingVectorPreview: [0.0125, -0.0418, 0.0522, 0.0891, -0.0143, 0.0617, -0.0812],
        metadataTags: {
          schema_version: "v4.2",
          object: "PurchaseOrder",
          action: "RerouteToSecondaryHub",
          governance: "HITL_ENFORCED"
        }
      }
    ]
  },
  {
    id: "doc-sap-05",
    filename: "SAP_S4HANA_BAPI_Integration_Spec.pdf",
    title: "SAP S/4HANA BAPI & OData v4 Transactional Connector Specification",
    sector: "Foundry & SAP Architecture",
    classification: "ENTERPRISE PROPRIETARY",
    fileFormat: "PDF",
    fileSizeBytes: "6.4 MB",
    chunkCount: 36,
    avgTokenCount: 512,
    chunkingStrategy: "Table & Spec Parser",
    embeddingModel: "text-embedding-3-large",
    vectorDimensions: 3072,
    vectorIndexStatus: "Indexed & Active",
    lastIndexed: "2026-09-13 11:30 EST",
    associatedOntologyObjects: ["PurchaseOrder", "MaterialMaster", "VendorMaster"],
    description: "Interface control document for bidirectional SAP RFC/BAPI connectors (`BAPI_PO_CHANGE`, `BAPI_MATERIAL_AVAILABILITY`), idempotency token validation, and SAP rollback triggers.",
    chunksSample: [
      {
        id: "chk-sap-003",
        chunkIndex: 3,
        tokenCount: 488,
        snippet: "Section 2.4: BAPI_PO_CHANGE Payload Schema. To update delivery plant and storage location without disrupting material ledger consistency, the caller must supply `POHEADER` with field `COMP_CODE` and `EXPIMP_ITEM` containing target plant ID. Idempotency is guaranteed via `SAP_TRANSACTION_ID` header matching SHA-256 hash of the Palantir Foundry audit record.",
        embeddingVectorPreview: [0.0514, -0.0322, 0.0681, -0.0119, 0.0452, 0.0811, -0.0194],
        metadataTags: {
          interface: "RFC / BAPI",
          function: "BAPI_PO_CHANGE",
          idempotency: "SHA-256 Hash",
          erp_target: "SAP S/4HANA 2023"
        }
      }
    ]
  },
  {
    id: "doc-aip-06",
    filename: "Palantir_AIP_Agent_Safety_Runbook.md",
    title: "Palantir AIP Agent Safety, Prompt Defense & HITL Governance Runbook",
    sector: "Aerospace & Defense",
    classification: "INTERNAL // CO-FOUNDRY",
    fileFormat: "MARKDOWN",
    fileSizeBytes: "1.9 MB",
    chunkCount: 28,
    avgTokenCount: 460,
    chunkingStrategy: "Semantic Sentence Boundary",
    embeddingModel: "text-embedding-3-large",
    vectorDimensions: 3072,
    vectorIndexStatus: "Indexed & Active",
    lastIndexed: "2026-09-16 02:00 EST",
    associatedOntologyObjects: ["AuditLineage", "PolicyRule"],
    description: "Lead FDE standard operating procedure for preventing jailbreaks, enforcing zero-shot citation constraints, handling low-confidence hallucination falls, and configuring cryptographic human sign-off gates.",
    chunksSample: [
      {
        id: "chk-aip-002",
        chunkIndex: 2,
        tokenCount: 475,
        snippet: "Rule 4.1 (Zero-Shot Context Isolation): The AIP Agent prompt chain must strictly forbid ungrounded speculation. If similarity search score returns top-1 chunk cosine distance < 0.78, the agent must output status `UNCERTAIN_REQUIRING_OPERATOR_REVIEW` and provide direct links to the relevant Foundry Workshop object inspector rather than formulating an ungrounded recommendation.",
        embeddingVectorPreview: [0.0341, 0.0512, -0.0294, 0.0814, -0.0621, 0.0211, 0.0489],
        metadataTags: {
          sop_code: "FDE-LLMOPS-004",
          cosine_cutoff: "0.78",
          fallback_mode: "OPERATOR_DISPATCH"
        }
      }
    ]
  }
];
