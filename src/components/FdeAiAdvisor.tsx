import React, { useState } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw,
  Copy,
  Check
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: string;
  timestamp: string;
}

const DEFAULT_QUESTIONS = [
  "Why Palantir AIP with an Ontology over a DIY LangChain + Pinecone stack?",
  "How do you structure daily handoffs for a 5-person hybrid onshore/offshore pod?",
  "Walk me through your production RAG hallucination elimination framework.",
  "How do you convince a cautious CIO to permit GenAI writebacks into SAP?",
];

export const FdeAiAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      role: "assistant",
      content: `### Welcome to the Lead Palantir FDE Strategic Advisory Console

I am the embedded **Palantir Lead Forward Deployed Engineer Advisor**, powered by the enterprise FDE knowledge kernel and Gemini.

Feel free to evaluate my technical depth and leadership perspective on:
- **Palantir Foundry, AIP, & Maven** architectural decisions and ontology modeling
- **Hybrid Onshore / Offshore Pod Leadership** (sprint cadences, handover SLAs, quality gates)
- **Production RAG & LLMOps** (hybrid search, cross-encoder rerankers, Ragas evaluations)
- **C-Suite Engagement & Phased Roadmap Delivery** (translating technical trade-offs into business decisions)

Select one of the strategic questions below, or type your own scenario inquiry.`,
      timestamp: new Date().toLocaleTimeString(),
      source: "fde-knowledge-engine",
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          conversation: messages.slice(-4),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: ChatMessage = {
          id: `asst-${Date.now()}`,
          role: "assistant",
          content: data.text || "No response received.",
          source: data.source || "gemini-3.8-flash",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: `### Lead FDE Architectural Assessment: ${textToSend}

**Executive Summary:**
When deploying mission-critical GenAI for strategic clients, the differentiator is anchoring non-deterministic models into a deterministic **Enterprise Ontology** (Palantir Foundry & AIP).

1. **Deterministic Guardrails:** Every LLM action must map to a verified Ontology Action Type with explicit row-level Markings and Human-in-the-Loop gates.
2. **Production Pipeline Velocity:** Leveraging PySpark transforms with strict idempotency and automated Ragas evaluation suites guarantees that enterprise data lakes don't degrade into data swamps.
3. **Pod Governance:** Onshore leads anchor client C-suite discovery while offshore pods scale data engineering 24/7 with strict 08:30 EST handover SLAs.`,
        source: "fde-offline-engine",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2.5">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span>Interactive Lead FDE Strategic Advisor & Interview Console</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Query technical trade-offs, architecture decisions, pod governance scenarios, and C-suite alignment strategies
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GEMINI & FDE KERNEL POWERED</span>
          </span>
        </div>
      </div>

      {/* Suggested Scenario Questions */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase text-slate-400 block">
          Strategic Inquiry Presets (Click to Test Technical Depth):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DEFAULT_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(q)}
              disabled={isLoading}
              className="text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
            >
              <span className="truncate pr-2">{q}</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover:opacity-100 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat History Box */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-6 min-h-[420px] max-h-[580px] overflow-y-auto space-y-4 shadow-2xl">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 font-bold font-mono">
                  FDE
                </div>
              )}

              <div
                className={`max-w-3xl rounded-xl p-4 space-y-2 ${
                  isUser
                    ? "bg-cyan-600/20 border border-cyan-500/40 text-cyan-100"
                    : "bg-slate-900/90 border border-slate-800 text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1.5 mb-1.5">
                  <span className="font-semibold text-slate-300">
                    {isUser ? "Interviewer / Strategic Client Executive" : "Lead Palantir FDE (Senior Practitioner)"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => copyMessage(msg.id, msg.content)}
                        className="hover:text-white transition-colors"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="whitespace-pre-wrap leading-relaxed font-sans">
                  {msg.content}
                </div>

                {msg.source && (
                  <div className="pt-1.5 text-[10px] font-mono text-cyan-400/80">
                    Engine: {msg.source}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Lead FDE Advisor is synthesizing technical assessment...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask a question on Palantir Foundry, AIP, RAG evaluation, pod leadership, or client discovery..."
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
        />
        <button
          onClick={() => sendMessage()}
          disabled={isLoading || !inputQuery.trim()}
          className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-950/40"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Submit</span>
        </button>
      </div>
    </div>
  );
};
