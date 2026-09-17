import React, { useState } from "react";
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  Calendar, 
  ShieldCheck, 
  Globe, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Copy,
  Check
} from "lucide-react";

interface ContactSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSlideOver: React.FC<ContactSlideOverProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    role: "",
    engagementType: "Executive Briefing & AIP Strategy",
    timeline: "Immediate / Q3 2026",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate enterprise CRM logging
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setReferenceId(`DELOITTE-FDE-${Math.floor(10000 + Math.random() * 90000)}`);
    }, 900);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("lead-fde@deloitte.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      organization: "",
      email: "",
      role: "",
      engagementType: "Executive Briefing & AIP Strategy",
      timeline: "Immediate / Q3 2026",
      message: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  DELOITTE AI & ENGINEERING PRACTICE
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Lead Palantir FDE Engagement
              </h2>
              <p className="text-xs text-slate-400">
                Direct C-Suite advisory, rapid AIP prototype scoping, and hybrid pod deployments.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isSubmitted ? (
              <div className="bg-slate-900/60 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-4 my-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                    Engagement Inquiry Dispatched
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Thank you, <span className="font-semibold text-white">{formData.name || "Executive Partner"}</span>. Your inquiry has been routed to our Lead FDE and Client Practice Leadership.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reference Tracking ID:</span>
                    <span className="text-cyan-400 font-bold">{referenceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Client Organization:</span>
                    <span className="text-slate-200">{formData.organization || "Enterprise Partner"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Engagement Mode:</span>
                    <span className="text-slate-200">{formData.engagementType}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-2 text-[11px]">
                    <span className="text-emerald-400">Guaranteed Response SLA:</span>
                    <span className="text-emerald-300">Within 4 Business Hours</span>
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Return to Showcase
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Sarah Jenkins"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Executive Role / Title *</label>
                    <input
                      required
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., CIO / VP Supply Chain"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Enterprise / Organization *</label>
                    <input
                      required
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g., Global Aerospace Corp"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Work Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="s.jenkins@enterprise.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Engagement Objective</label>
                    <select
                      value={formData.engagementType}
                      onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option>Executive Briefing & AIP Strategy</option>
                      <option>Hybrid FDE Pod Deployment (2–5 Eng)</option>
                      <option>RAG & LLMOps Architecture Audit</option>
                      <option>Palantir Center of Excellence (CoE) Advisory</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Target Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option>Immediate / Q3 2026</option>
                      <option>Next 30–60 Days</option>
                      <option>Q4 2026 Strategic Planning</option>
                      <option>Exploratory Discovery</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Strategic Problem Statement / Context</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current data landscape, mission bottlenecks (e.g., SAP ERP sync, customs delays, AML backlog), or target AI outcomes..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Routing to Lead FDE Pod...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Strategic Engagement Request</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Direct Channels & Professional Profiles */}
            <div className="border-t border-slate-800 pt-6 space-y-4">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Direct Channels & Professional Profiles
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* LinkedIn Profile */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">
                      in
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        LinkedIn Profile
                      </div>
                      <div className="text-[10px] text-slate-400">Alexander Vance | Lead FDE</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>

                {/* GitHub Repo */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs">
                      GH
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        GitHub Portfolio
                      </div>
                      <div className="text-[10px] text-slate-400">Production Code & RAG Suites</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>
              </div>

              {/* Direct Practice Email */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Direct Practice Inquiries</span>
                    <span className="text-xs font-mono text-white font-semibold">lead-fde@deloitte.com</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Global Delivery Hubs */}
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-850 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Deployment Hubs & Global Delivery</span>
                </div>
                <p className="leading-relaxed">
                  Onsite Embedded: Dallas, New York, Washington D.C. | Global Delivery Centers: Bengaluru & Hyderabad (Deloitte USI).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
