import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  FileText, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Database, 
  Hash, 
  Clock, 
  Tag, 
  Eye, 
  X,
  Code,
  Sparkles,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { KNOWLEDGE_BASE_DOCUMENTS } from "../data/knowledgeBaseData";
import { KnowledgeBaseDocument, DocumentChunkPreview } from "../types";

interface KnowledgeBaseViewProps {
  onSelectDocumentForQuery?: (docTitle: string, queryText: string, contextSnippet: string) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ onSelectDocumentForQuery }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("ALL");
  const [selectedStrategy, setSelectedStrategy] = useState<string>("ALL");
  const [inspectingDoc, setInspectingDoc] = useState<KnowledgeBaseDocument | null>(null);
  const [selectedChunk, setSelectedChunk] = useState<DocumentChunkPreview | null>(null);

  // Filtered documents
  const filteredDocs = useMemo(() => {
    return KNOWLEDGE_BASE_DOCUMENTS.filter((doc) => {
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.associatedOntologyObjects.some(obj => obj.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSector = selectedSector === "ALL" || doc.sector === selectedSector;
      const matchesStrategy = selectedStrategy === "ALL" || doc.chunkingStrategy.includes(selectedStrategy);

      return matchesSearch && matchesSector && matchesStrategy;
    });
  }, [searchQuery, selectedSector, selectedStrategy]);

  // Aggregate stats
  const totalChunks = KNOWLEDGE_BASE_DOCUMENTS.reduce((acc, d) => acc + d.chunkCount, 0);
  const totalDocs = KNOWLEDGE_BASE_DOCUMENTS.length;

  const handleOpenInspect = (doc: KnowledgeBaseDocument) => {
    setInspectingDoc(doc);
    setSelectedChunk(doc.chunksSample[0] || null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Strategy Summary */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk']">
                Enterprise Knowledge Base & Ingested Document Index
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Visualizing document ingestion, semantic chunking boundaries, security markings, and vector metadata indexing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <span className="text-slate-400 block text-[10px]">INGESTED DOCS</span>
              <span className="text-white font-bold">{totalDocs} Active</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <span className="text-slate-400 block text-[10px]">TOTAL CHUNKS</span>
              <span className="text-cyan-400 font-bold">{totalChunks} Chunks</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <span className="text-slate-400 block text-[10px]">SECURITY MARKINGS</span>
              <span className="text-emerald-400 font-bold">100% Verified</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by title, filename, ontology objects (e.g., PurchaseOrder, KRAS)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 placeholder:text-slate-500"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Industry Sectors</option>
              <option value="Aerospace & Defense">Aerospace & Defense</option>
              <option value="Life Sciences & FDA">Life Sciences & FDA</option>
              <option value="Banking & FinTech">Banking & FinTech</option>
              <option value="Foundry & SAP Architecture">Foundry & SAP Architecture</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Chunking Strategies</option>
              <option value="Fixed 512t">Fixed 512t Overlap</option>
              <option value="Hierarchical">Hierarchical Section-Aware</option>
              <option value="Semantic">Semantic Sentence Boundary</option>
              <option value="JSON-LD">JSON-LD Schema AST</option>
              <option value="Table">Table & Spec Parser</option>
            </select>
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl hover:shadow-cyan-950/20 group"
          >
            {/* Card Header & Badges */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {doc.fileFormat} • {doc.fileSizeBytes}
                </span>

                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold border ${
                    doc.classification.includes("RESTRICTED") || doc.classification.includes("ITAR")
                      ? "bg-red-950/60 text-red-300 border-red-800/60"
                      : doc.classification.includes("FDA")
                      ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/60"
                      : doc.classification.includes("CONFIDENTIAL")
                      ? "bg-amber-950/60 text-amber-300 border-amber-800/60"
                      : "bg-cyan-950/60 text-cyan-300 border-cyan-800/60"
                  }`}
                >
                  {doc.classification}
                </span>
              </div>

              {/* Title & File */}
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {doc.title}
                </h4>
                <p className="text-[11px] font-mono text-cyan-400 mt-1 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-slate-500" />
                  <span className="truncate">{doc.filename}</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {doc.description}
              </p>
            </div>

            {/* Chunking & Indexing Metadata */}
            <div className="space-y-3 border-t border-slate-800/80 pt-3 text-xs">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Chunking Strategy:</span>
                  </span>
                  <span className="font-mono text-white font-semibold text-[10px] bg-slate-900 px-1.5 py-0.5 rounded">
                    {doc.chunkingStrategy}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
                  <div className="bg-slate-900/60 p-1.5 rounded">
                    <span className="text-slate-500 block">Total Chunks:</span>
                    <span className="text-cyan-400 font-bold">{doc.chunkCount} Units</span>
                  </div>
                  <div className="bg-slate-900/60 p-1.5 rounded">
                    <span className="text-slate-500 block">Avg Tokens:</span>
                    <span className="text-white font-bold">~{doc.avgTokenCount} t/chk</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono pt-1 text-slate-400 border-t border-slate-850">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Database className="w-3 h-3 text-emerald-400" />
                    <span>{doc.embeddingModel}</span>
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {doc.vectorDimensions}d
                  </span>
                </div>
              </div>

              {/* Associated Ontology Objects */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">
                  Grounding Ontology Objects:
                </span>
                <div className="flex flex-wrap gap-1">
                  {doc.associatedOntologyObjects.map((obj, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 px-1.5 py-0.5 rounded"
                    >
                      {obj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenInspect(doc)}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700/60"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inspect Chunks & Vector Metadata</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-2">
          <FileText className="w-8 h-8 mx-auto text-slate-600" />
          <p className="text-sm font-semibold text-slate-300">No ingested documents match your query.</p>
          <p className="text-xs">Try clearing the search text or resetting sector and chunking filters.</p>
        </div>
      )}

      {/* Document Chunks Inspector Modal */}
      {inspectingDoc && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
                    {inspectingDoc.sector}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                    {inspectingDoc.classification}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk']">
                  {inspectingDoc.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  File: {inspectingDoc.filename} ({inspectingDoc.chunkCount} Total Chunks)
                </p>
              </div>

              <button
                onClick={() => setInspectingDoc(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs">
              {/* Pipeline Architecture Blueprint for this document */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Chunking Strategy</span>
                  <p className="text-xs text-white font-semibold">{inspectingDoc.chunkingStrategy}</p>
                  <p className="text-[10px] text-slate-400">Overlapping sliding window with AST-aware boundary splits</p>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Embedding Topology</span>
                  <p className="text-xs text-cyan-300 font-semibold">{inspectingDoc.embeddingModel}</p>
                  <p className="text-[10px] text-slate-400">Dimensions: {inspectingDoc.vectorDimensions} | Cosine Distance Metric</p>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Index State</span>
                  <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{inspectingDoc.vectorIndexStatus}</span>
                  </p>
                  <p className="text-[10px] text-slate-400">Last Synced: {inspectingDoc.lastIndexed}</p>
                </div>
              </div>

              {/* Sample Chunks Selector & Deep Dive */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Extracted Chunk Samples & Metadata Tagging:
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    Showing {inspectingDoc.chunksSample.length} Sample Units
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inspectingDoc.chunksSample.map((chunk) => {
                    const isSelected = selectedChunk?.id === chunk.id;
                    return (
                      <div
                        key={chunk.id}
                        onClick={() => setSelectedChunk(chunk)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                          isSelected
                            ? "bg-cyan-950/30 border-cyan-500 shadow-md shadow-cyan-950/30"
                            : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-cyan-400 font-bold">
                            Chunk #{chunk.chunkIndex} ({chunk.tokenCount} Tokens)
                          </span>
                          <span className="text-slate-500">{chunk.id}</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono">
                          "{chunk.snippet}"
                        </p>

                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">
                            Granular Metadata Index:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(chunk.metadataTags).map(([key, val]) => (
                              <span
                                key={key}
                                className="text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded"
                              >
                                <strong className="text-cyan-400">{key}:</strong> {val}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Vector Preview */}
                        <div className="pt-1">
                          <span className="text-[9px] font-mono text-slate-500 block">
                            Vector Float Embeddings Preview ({inspectingDoc.vectorDimensions}d):
                          </span>
                          <div className="text-[9px] font-mono text-emerald-400 bg-slate-950 px-2 py-1 rounded truncate border border-slate-850">
                            [{chunk.embeddingVectorPreview.join(", ")}, ...]
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Grounded in Palantir Enterprise Ontology object layer with zero unverified speculation.
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectingDoc(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
