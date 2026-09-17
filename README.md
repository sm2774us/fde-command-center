# Lead Palantir Forward Deployed Engineer (FDE) — Enterprise Showcase Application
### Deloitte AI & Engineering Practice | Strategic Client Engagements & Production GenAI

---

## 1. Project Synopsis

The **Lead Palantir Forward Deployed Engineer (FDE) Showcase Application** is a full-stack, enterprise-grade web application engineered to demonstrate technical depth, architectural authority, and practitioner-leadership for the **Lead Palantir FDE** role at **Deloitte**.

In enterprise consulting and mission-critical engineering, the **Lead FDE** serves as the senior practitioner-leader embedded directly on-site with Deloitte’s most strategic Fortune 50 clients. The role requires an uncommon duality:
1. **Executive Gravitas & C-Suite Advisory**: Partnering with client CXOs (CIO, CDO, Head of Supply Chain, Chief Compliance Officer) to translate complex engineering trade-offs into high-conviction business decisions, de-risk AI adoption, and define phased roadmaps from discovery to enterprise scaling.
2. **Hands-On Technical Mastery**: Writing, debugging, and reviewing production PySpark pipelines, Palantir Enterprise Ontology models, AIP Logic chains, hybrid RAG retrieval systems, and transactional writeback integrations into SAP S/4HANA and core banking ledgers.
3. **Cross-Functional Pod Leadership**: Leading hybrid engineering pods of 2–5 engineers (onshore client-anchored practitioners coupled with Deloitte Global Delivery offshore scale), enforcing daily 08:30 EST asynchronous handover protocols, strict quality gates (Definition of Done), and accelerating junior FDE talent.

This application provides an interactive, live-operational demonstration of every facet of this mandate—featuring real-time simulated AIP agent workflows with cryptographic Human-In-The-Loop (HITL) gates, automated Ragas LLMOps telemetry charts, interactive 6-month delivery timelines, production code repositories, and an AI strategic advisor powered by Gemini.

---

## 2. Directory Structure

```
.
├── .env.example                     # Environment variable declarations (GEMINI_API_KEY)
├── .gitignore                       # Git exclusions for node_modules, build artifacts, logs
├── index.html                       # HTML5 entrypoint with Plus Jakarta Sans & Space Grotesk typography
├── metadata.json                    # Application metadata, permissions, and major capabilities
├── package.json                     # Project manifest, dependencies, and build/transpile scripts
├── server.ts                        # Full-stack Node/Express server, Vite middleware & Gemini API routes
├── tsconfig.json                    # Strict TypeScript compiler configuration
├── vite.config.ts                   # Vite configuration with Tailwind CSS plugin
├── public/                          # Static assets and public resources
└── src/
    ├── App.tsx                      # Primary application shell, tab router, and enterprise footer
    ├── main.tsx                     # React 18 DOM mount and root hydration
    ├── index.css                    # Tailwind CSS v4 setup and @media print PDF layout styles
    ├── types.ts                     # Core TypeScript domain interfaces (Ontology, Pod, RAG, Case Studies)
    ├── vite-env.d.ts                # TypeScript declarations for Vite image and client imports
    ├── assets/
    │   └── images/
    │       └── deloitte_fde_logo_*.jpg # Cybernetic Deloitte FDE high-tech brand emblem
    ├── context/
    │   └── ThemeContext.tsx         # Persistent UI Theme Provider (Enterprise Dark vs Clean Light)
    ├── components/
    │   ├── Header.tsx               # Top navigation, Deloitte FDE brand emblem, theme toggle, and contact CTA
    │   ├── ContactSlideOver.tsx     # C-Suite Engagement drawer with CRM validation, SLAs, and direct profiles
    │   ├── CandidateExecutiveSummary.tsx # Hero executive summary, value modeler, and 100% qualifications audit
    │   ├── InteractiveDeliveryTimeline.tsx # 6-month phased delivery plan (Prototype to Enterprise Scaling)
    │   ├── PalantirPlatformWorkbench.tsx # In-depth Foundry, AIP, Maven & Multi-Cloud architecture inspector
    │   ├── InteractiveAgentSimulator.tsx # Operational AIP agent simulation with HITL governance & SAP writeback
    │   ├── RagPipelineSandbox.tsx   # 5-stage production RAG pipeline visualizer with live Ragas evaluation
    │   ├── KnowledgeBaseView.tsx    # Grid catalog of ingested docs, chunking strategies, and vector metadata
    │   ├── RagMetricsTelemetryChart.tsx # Recharts-powered P95 latency, accuracy, and hallucination telemetry
    │   ├── PodLeadershipGovernance.tsx # Cross-functional pod operating model and DoD gates
    │   ├── PodStatusDashboard.tsx   # Team capacity allocation, sprint velocity, and 4-column blocker Kanban
    │   ├── CaseStudiesGallery.tsx   # Fortune 50 case studies (Aerospace Supply Chain, BioPharma, Banking AML)
    │   ├── CodeArtifactsViewer.tsx  # Production PySpark transforms, AIP functions, dbt models, and Ragas suites
    │   └── FdeAiAdvisor.tsx         # Live conversational FDE Strategic Advisor powered by server-side Gemini
    └── data/
        ├── fdeShowcaseData.ts       # Domain data: Ontology definitions, pod rosters, quality gates, and code samples
        ├── knowledgeBaseData.ts     # Enterprise knowledge base documents, chunks, vectors, and security markings
        └── podStatusData.ts         # Sprint velocity histories, capacity breakdowns, and Kanban delivery blockers
```

---

## 3. Compile, Build & Run Instructions

The application uses **React 18**, **TypeScript**, **Tailwind CSS**, and an **Express** backend integrated with **Vite** middleware for development and **esbuild** for high-performance CommonJS production bundling.

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- (Optional) **Gemini API Key**: Set `GEMINI_API_KEY` in your environment for live LLM reasoning in the FDE Advisor and RAG evaluation endpoints. The app includes an intelligent deterministic fallback engine if no key is present.

### Step 1: Environment Configuration
Copy `.env.example` to `.env` and provide your Gemini API key:
```bash
cp .env.example .env
# Edit .env and set GEMINI_API_KEY=your_api_key_here
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Development Mode (with Hot Server Execution)
Runs `server.ts` via `tsx` on port `3000`. Express mounts Vite in middleware mode with single-page application fallback:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### Step 4: Linting & Static Type Checking
Executes the TypeScript compiler without emitting files to catch type regressions:
```bash
npm run lint
```

### Step 5: Production Build (Transpilation & Server Bundling)
The build pipeline performs two synchronized operations:
1. `vite build`: Compiles and minifies the React frontend into static assets located in `dist/`.
2. `esbuild server.ts`: Bundles the Express TypeScript backend into a single, self-contained CommonJS file at `dist/server.cjs` with sourcemaps and externalized node modules:
```bash
npm run build
```

### Step 6: Production Run
Launches the compiled standalone server in production mode:
```bash
npm start
```
External ingress routes to port `3000` (`0.0.0.0:3000`).

---

## 4. Detailed Solution Explanation: Lead FDE Perspective

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           DELOITTE STRATEGIC CLIENT ENGAGEMENT                          │
│                                (Fortune 50 Enterprise)                                  │
└────────────────────────────────────────────┬────────────────────────────────────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
         ┌───────────────────────────┐               ┌───────────────────────────┐
         │    C-SUITE & BUSINESS     │               │   CLIENT IT & PLATFORM    │
         │  (CIO, CDO, Supply Chain) │               │ (InfoSec, SAP/ERP, Cloud) │
         └─────────────┬─────────────┘               └─────────────┬─────────────┘
                       │                                           │
                       └─────────────────────┬─────────────────────┘
                                             │
                                             ▼
                       ┌───────────────────────────────────────────┐
                       │     LEAD FORWARD DEPLOYED ENGINEER (FDE)  │
                       │    (Senior Practitioner-Leader Onsite)    │
                       └─────────────────────┬─────────────────────┘
                                             │
             ┌───────────────────────────────┼───────────────────────────────┐
             ▼                               ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│  CLIENT ADVISORY &      │     │  HYBRID POD LEADERSHIP  │     │  GENAI SOLUTION         │
│  STRATEGIC DISCOVERY    │     │  (2-5 Eng On/Offshore)  │     │  ARCHITECTURE           │
│ • Executive Value Model │     │ • Daily 08:30 EST Sync  │     │ • Palantir Foundry / AIP│
│ • Trade-Off Translation │     │ • Quality Gates (DoD)   │     │ • Hybrid RAG & LLMOps   │
│ • 6-Month Phased Plan   │     │ • Junior FDE Mentorship │     │ • HITL Cryptographic Gate│
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

### 4.1 Client Engagement & C-Suite Influence
The Lead FDE is embedded as the senior technical advisor to client leadership. In this application:
- **Value Modeler**: Quantifies the business ROI, time-to-first-operational-pilot, and risk reduction curves for strategic clients.
- **Architectural Trade-Off Translation**: Translates technical trade-offs into executive decisions—for instance, demonstrating why Palantir AIP’s object-grounded actions eliminate the critical data leakages and lack of transactional auditability common in DIY LangChain/Pinecone stacks.
- **Phased 6-Month Delivery Plan**: Provides client executives with an unambiguous timeline bridging Month 1 Discovery and Security Markings to Month 6 Center of Excellence (CoE) self-sufficiency.

### 4.2 Cross-Functional Pod Leadership & Program Governance
Strategic delivery velocity requires disciplined execution across time zones:
- **Hybrid Pod Architecture**: Structured for 2–5 engineers, anchoring senior client-facing engineering onshore while leveraging Deloitte Global Delivery (USI/India) for continuous 24-hour pipeline scaling.
- **Daily Handover Protocol**: 
  - *08:30 EST (19:00 IST)*: 15-minute high-bandwidth standup reviewing Jira blockers, PySpark regression logs, and code review assignments.
  - *17:30 EST*: Onshore evening video briefing and Foundry Knowledge Repo commit for offshore morning pickup.
- **Quality Gates (Definition of Done)**: Enforces hard criteria before any production branch promotion—100% PySpark idempotency, zero raw table exposures, automated Ragas validation (Faithfulness $\ge 0.94$, Hallucination $\le 0.05$), and dual-signoff protocols.

### 4.3 GenAI Solution Development: Palantir AIP & HITL Gating
Unlike toy chatbots that merely output text, enterprise FDE solutions execute operational actions:
- **Ontology Grounding**: Every prompt references concrete Object Types (`PurchaseOrder`, `SupplierEntity`) and relations.
- **Cryptographic Human-In-The-Loop Gate**: Autonomous actions are permitted for routine operational scenarios, but any action altering state or exceeding financial thresholds (e.g., $>\$25,000$ PO reroute) automatically pauses execution for an authorized officer's cryptographic signature.
- **Transactional Writeback**: Connects directly via SAP BAPI (`BAPI_PO_CHANGE`) or banking core APIs with an immutable audit event committed to Palantir Foundry metadata.

### 4.4 Production RAG Architecture & LLMOps Evaluation
Production enterprise retrieval requires strict guarantees:
1. **Semantic Chunking**: 512-token chunks with 64-token overlap, preserving table schemas and document hierarchy.
2. **Hybrid Retrieval**: Combines dense vector embeddings with sparse BM25 lexical keyword search via Reciprocal Rank Fusion (RRF) to eliminate semantic blind spots.
3. **Cross-Encoder Reranking**: Cohere/BGE reranker filters candidates down to the top 3 high-relevance chunks.
4. **Automated Ragas Telemetry**: Tracks Faithfulness, Answer Relevance, Context Recall, Hallucination Risk, P95 Latency, and Cost-Per-Query in CI/CD before any prompt template or model update is released.

---

## 5. UI/UX Mock Wire Diagrams (ASCII)

### 5.1 Global Shell & Navigation Header
```
+----------------------------------------------------------------------------------------------------+
| [o] MISSION ACTIVE | PALANTIR FDE SHOWCASE | DELOITTE AI & ENG PRACTICE | POD VELOCITY: 42 PTS/SP  |
+----------------------------------------------------------------------------------------------------+
| [DELOITTE EMBLEM]  Lead Forward Deployed Engineer (Palantir)     [ 50%+ Travel ] [ SOC-2/HIPAA ]  |
|  * Green Dot *     Deloitte AI & Engineering Practice            [ Comp: $189.2k - $372.9k ]       |
+----------------------------------------------------------------------------------------------------+
| [Overview] [Platform Workbench] [AIP Simulator] [RAG Sandbox] [Pod Governance] [Cases] [Code] [AI] |
+----------------------------------------------------------------------------------------------------+
```

### 5.2 Executive Summary & 6-Month Phased Delivery Timeline
```
+----------------------------------------------------------------------------------------------------+
| +---------------------------------------------------------+  +-----------------------------------+ |
| | Senior Practitioner-Leader Embedded Profile             |  | Value & Impact Modeler            | |
| | 7+ Yrs SE/Data | 2+ Yrs GenAI | 3+ Yrs Foundry/AIP      |  | Pod Size: [ 2 ][ 3 ][ 4 ][(5)]    | |
| |                                                         |  | Time-to-Pilot: 4.2 Weeks          | |
| | [ Launch AIP Simulator ]  [ Export Briefing / PDF ]     |  | Net Annual ROI: $38.4M            | |
| +---------------------------------------------------------+  +-----------------------------------+ |
|                                                                                                    |
| 6-MONTH PRODUCTION DELIVERY PLAN (PROTOTYPE TO SCALE)                                              |
| +----------------+ +----------------+ +----------------+ +----------------+ +-------------------+ |
| | MONTH 01 (Done)| | MONTH 02 (Done)| | MONTH 03 (ACT) | | MONTH 04 (Tgt) | | MONTH 05/06 (Tgt) | |
| | Discovery & Ingest| Ontology & AIP | Hardened RAG/HITL| Shadow Pilot & Cal| Enterprise Scale  | |
| +----------------+ +----------------+ +----------------+ +----------------+ +-------------------+ |
| +------------------------------------------------------------------------------------------------+ |
| | Active Phase Details: Month 03 - Hardened RAG Pipeline & HITL Gating                           | |
| | Pod Ratio: [==== Onshore 50% ====][==== Offshore 50% ====]                                      | |
| | • Objectives: Engineer hybrid search, enforce $25k HITL gate, implement automated Ragas CI/CD  | |
| | • Deliverables: Hybrid RAG Engine, SAP BAPI Writeback Connector, Automated Daily Regression    | |
| | • Quality Gate: Faithfulness >= 94% | P95 Latency <= 2,000ms                                   | |
| | • Risk Mitigation: Strict zero-shot contract citation enforcement                              | |
| +------------------------------------------------------------------------------------------------+ |
+----------------------------------------------------------------------------------------------------+
```

### 5.3 Interactive AIP Agent & HITL Simulator
```
+----------------------------------------------------------------------------------------------------+
| [!] OPERATIONAL INCIDENT: Aerospace Supply Chain Disruption (Severity: CRITICAL)                   |
| Event: PO #PO-88219 (Titanium Fasteners, $48,500) customs held at Rotterdam Hub (+14 day delay)    |
+----------------------------------------------------------------------------------------------------+
| AGENTIC EXECUTION PIPELINE                       | HUMAN-IN-THE-LOOP (HITL) GOVERNANCE GATE        |
| [1] Ingestion: Kafka stream from SAP S/4HANA [v] | Action: RerouteToSecondaryHub                   |
| [2] Ontology: Linked PO -> Supplier -> 3 Assemblies| Limit: Exceeds $25k autonomous threshold      |
| [3] AIP Logic: Synthesized Lyon Air-Freight [v]  | Authorizing Officer Signature:                  |
| [4] HITL Gate: Paused for C-Suite sign-off [*]   | [ Approved: Alternative buffer verified in Lyon ]|
| [5] Writeback: SAP BAPI_PO_CHANGE & Audit [PND]  | [ Authorize & Sign Action ] [ Reject & Revert ] |
|                                                  |-------------------------------------------------|
| Controls: [ Advance Step ] [ Reset Simulation ]  | IMMUTABLE FOUNDRY AUDIT LINEAGE                 |
|                                                  | tx_id: "TX-2026-09-16-FDE-88219"                |
|                                                  | target: "PurchaseOrder:PO-88219"                |
|                                                  | hitl_status: "CRYPTOGRAPHICALLY_VERIFIED"       |
+----------------------------------------------------------------------------------------------------+
```

### 5.4 RAG Pipeline Sandbox & Recharts Telemetry Visualizer
```
+----------------------------------------------------------------------------------------------------+
| 5-STAGE RAG TOPOLOGY: Chunking -> Hybrid Retrieval -> Cross-Encoder -> Grounding -> Ragas Gate     |
+----------------------------------------------------------------------------------------------------+
| RAG PIPELINE TELEMETRY & LLMOPS EVALUATION TRENDS (RECHARTS)      [ Combined ][ Quality ][ Latency ]|
|                                                                   [ Trigger Live Run ] [ Reset ]   |
|  100% |-----------===========================--------- Accuracy SLA (94%)                         |
|       |  *       *        *          *        *                                                    |
|   50% |   \     / \      / \        / \      / \                                                   |
|       |    *---*   *----*   *------*   *----*   *------ Faithfulness Score                         |
|    5% |------------------------------------------------ Hallucination Cap (5%)                     |
|    0% +------------------------------------------------                                            |
|       [Run 1]   [Run 2]   [Run 3]   [Run 4]   [Run 5] (Prod)                                       |
|       [ 890ms ] [1120ms]  [1240ms]  [1390ms]  [1480ms] (P95 Latency Bars)                         |
|----------------------------------------------------------------------------------------------------|
| Avg Grounded Accuracy: 97.4% | Avg Hallucination: 2.1% | Avg P95 Latency: 1480ms | Gate: PASSED   |
+----------------------------------------------------------------------------------------------------+
```

### 5.5 Knowledge Base Catalog & Document Chunking Explorer
```
+----------------------------------------------------------------------------------------------------+
| KNOWLEDGE BASE REPOSITORY & INGESTION CATALOG (Grid / Chunk Inspection)                            |
| Search: [ Filter documents or metadata... ]   Domain: [ All Domains v ]   Security: [ All Markings]|
+----------------------------------------------------------------------------------------------------+
| [DOC 01: Master Supply Agreement]   | [DOC 02: SAP S/4HANA PO Schema]     | [DOC 03: AML Risk Rulebook]|
| Domain: Aerospace Supply Chain      | Domain: Enterprise ERP Integration  | Domain: FinServ Compliance |
| Markings: [ITAR] [Proprietary]      | Markings: [Confidential]            | Markings: [BSA/AML] [PII]  |
| Ingestion: PySpark Unstructured     | Ingestion: Kafka Schema Registry    | Ingestion: OCR + LayoutLM  |
| Chunks: 84 Chunks (512 tokens)      | Chunks: 42 Schema Chunks            | Chunks: 128 Chunks         |
| Status: [v] Indexed (HNSW)          | Status: [v] Indexed (HNSW)          | Status: [v] Indexed (HNSW) |
| [ View Document Chunk Breakdown -> ]| [ View Document Chunk Breakdown -> ]| [ View Document Chunk... ] |
+----------------------------------------------------------------------------------------------------+
| EXPANDED CHUNK BREAKDOWN (Doc: Master Supply Agreement)                                            |
| Chunk #1 (Tokens: 504 | Overlap: 64) | Embedding: text-embedding-3-large (1536-dim)               |
| "Section 8.4: Liquidated damages for delivery failure beyond 7 calendar days trigger automatic..."  |
| Metadata: { source: "contract_v4.pdf", page: 12, author: "Legal Ops", security_clearance: "ITAR" } |
+----------------------------------------------------------------------------------------------------+
```

### 5.6 Pod Status Dashboard & Delivery Blocker Kanban Board
```
+----------------------------------------------------------------------------------------------------+
| POD STATUS & ACTIVE SPRINT VELOCITY                                                                |
| Active Sprint: Sprint 14 (Day 6/10) | Pod Velocity: 42 Pts / Sprint | Blocker Burn-Down: 85.7%     |
| Capacity: [ Lead FDE 95% ] [ Senior FDE 90% ] [ Data Eng 1 85% ] [ Data Eng 2 80% ] [ LLMOps 90% ]  |
+----------------------------------------------------------------------------------------------------+
| DELIVERY BLOCKER KANBAN BOARD (Interactive Drag / Stage Move)                                      |
| +--------------------+ +--------------------+ +--------------------+ +--------------------+       |
| | TRIAGE (1)         | | ACTIVE ENG (2)     | | ESCALATED CXO (1)  | | RESOLVED (1)       |       |
| +--------------------+ +--------------------+ +--------------------+ +--------------------+       |
| | [BLK-104]          | | [BLK-101]          | | [BLK-102]          | | [BLK-100]          |       |
| | Mil-Spec Cold Test | | SAP BAPI Sandbox   | | ITAR Clearance     | | PySpark Memory OOM |       |
| | Sev: MEDIUM        | | Sev: HIGH          | | Sev: CRITICAL      | | Sev: HIGH          |       |
| | Owner: Priya N.    | | Owner: Elena R.    | | Owner: Alex C.     | | Owner: Vikram S.   |       |
| | Stage: [Move ->]   | | Stage: [<- | ->]   | | Stage: [<- | ->]   | | [v] Signed Off     |       |
| +--------------------+ +--------------------+ +--------------------+ +--------------------+       |
+----------------------------------------------------------------------------------------------------+
```

### 5.7 C-Suite Engagement Slide-Over Dialog & Theme Mode
```
+-------------------------------------------------------------+ +------------------------------------+
| CLIENT PRESENTATION TOGGLE                                  | | GET IN TOUCH (C-SUITE ENGAGEMENT)  |
| [ Moon ] Enterprise Cybernetic (High-Contrast Slate-950)    | | Drawer with 4-Hour Response SLA    |
| [ Sun  ] Clean Light Mode (Optimized for Boardroom Displays)| | Fields: Name, Corporate Email,     |
| * Persisted across sessions via HTML root class + CSS tokens| | Org, Engagement Tier, Challenge    |
|                                                             | | Profiles: LinkedIn, GitHub, Email  |
+-------------------------------------------------------------+ +------------------------------------+
```

---

## 6. Unique Language & Technology Nuances and Choices

| Technology / Pattern | Why It Was Chosen | Lead FDE Architectural Justification |
| :--- | :--- | :--- |
| **Express + Vite Full-Stack Architecture** | Full-stack server proxying all GenAI calls | **Security & Zero Client-Side Secret Exposure:** Client browsers must never access enterprise LLM keys. The Express layer securely proxies Gemini SDK calls and provides production static serving. |
| **`esbuild` CommonJS Server Bundling** (`dist/server.cjs`) | Single bundled backend artifact with externalized dependencies | **Runtime Isolation & Cold Start Optimization:** Resolves all relative imports at build time, bypassing strict runtime Node ESM relative path resolution errors while producing sourcemaps for production debugging. |
| **Palantir Enterprise Ontology Layer** | Semantic graph of Objects, Properties, Links, and Actions | **Eliminates AI Hallucination via Determinism:** Flat vector databases return unstructured text. An Enterprise Ontology forces the LLM to interact with strongly-typed objects and transactional action mutations with fine-grained access control. |
| **Recharts ComposedChart (Dual Axis)** | Multi-metric visualization with bar and line overlays | **Holistic LLMOps Telemetry:** Visualizing latency (ms, Bar) and accuracy/hallucination risk (%, Line) on the same canvas immediately exposes Pareto trade-offs (e.g., whether a 300ms increase in cross-encoder latency yields sufficient gain in faithfulness). |
| **Cryptographic HITL State Gating** | Asynchronous execution pause awaiting human signature | **Enterprise Safety & Regulatory Compliance:** Autonomous state mutations exceeding financial limits ($25k) cannot be left to probabilistic models. Explicit cryptographic signatures guarantee compliance with SOX, SOC-2, and ISO 27001. |
| **CSS Print Engine (`@media print`)** | Optimized clean stylesheet stripping UI chrome | **Executive Boardroom Readiness:** Allows the Lead FDE to instantly export candidate qualifications, ROI models, and the 6-month delivery plan into a clean PDF document for C-suite steering committees. |
| **Strict TypeScript Type Contracts** (`/src/types.ts`) | Comprehensive domain modeling across the entire lifecycle | **Zero Runtime Type Coercion:** Ensures end-to-end type safety across Ontology definitions, Pod health metrics, Ragas scores, and Case Study schemas. |

---

## 7. Deloitte Practice & Role Alignment Matrix

| Lead Palantir FDE Job Requirement | Application Component & Implementation Evidence |
| :--- | :--- |
| **7+ Years Software / Data Engineering** | `/src/components/CodeArtifactsViewer.tsx` — Production PySpark incremental transforms with watermark deduplication, dbt temporal feature marts, and CI/CD quality gates. |
| **1+ Years GenAI / LLM in Production** | `/src/components/RagPipelineSandbox.tsx` & `/src/components/RagMetricsTelemetryChart.tsx` — Hybrid dense/BM25 retrieval, cross-encoders, and live Ragas evaluation scorecards. |
| **1+ Years Palantir Foundry / AIP / Maven** | `/src/components/PalantirPlatformWorkbench.tsx` & `/src/components/InteractiveAgentSimulator.tsx` — Ontology modeling, AIP Logic chains, Maven tactical edge fusion, and SAP S/4HANA writebacks. |
| **C-Suite & Executive Advisory** | `/src/components/CandidateExecutiveSummary.tsx` & `/src/components/CaseStudiesGallery.tsx` — Executive value modelers, phased roadmaps, and Fortune 50 business impact studies ($38.4M saved). |
| **Hybrid Pod Leadership (2–5 Engineers)** | `/src/components/PodLeadershipGovernance.tsx` — Onshore/offshore roster allocation, daily 08:30 EST handover SLAs, junior FDE coaching, and Definition of Done gates. |
| **Multi-Cloud Foundations (AWS, Azure, GCP)** | `/src/components/PalantirPlatformWorkbench.tsx` — Deep infrastructure breakdown across AWS EKS/Bedrock, Azure AKS/OpenAI, and GCP GKE/Vertex AI. |
| **50%+ Travel Mobility & Compensation Band** | Application Header & Executive Profile — Explicit commitment to 50%+ national travel and alignment with the $189,200 to $372,900 wage band. |

---

*Authored for the Deloitte AI & Engineering Practice — Lead Palantir Forward Deployed Engineer Capability.*
