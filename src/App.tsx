import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Header } from "./components/Header";
import { CandidateExecutiveSummary } from "./components/CandidateExecutiveSummary";
import { PalantirPlatformWorkbench } from "./components/PalantirPlatformWorkbench";
import { InteractiveAgentSimulator } from "./components/InteractiveAgentSimulator";
import { RagPipelineSandbox } from "./components/RagPipelineSandbox";
import { PodLeadershipGovernance } from "./components/PodLeadershipGovernance";
import { CaseStudiesGallery } from "./components/CaseStudiesGallery";
import { CodeArtifactsViewer } from "./components/CodeArtifactsViewer";
import { FdeAiAdvisor } from "./components/FdeAiAdvisor";
import { ContactSlideOver } from "./components/ContactSlideOver";
import { Shield, Sparkles, Terminal, Plane, DollarSign, MessageSquare } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Top Header & Navigation */}
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
          {activeTab === "overview" && (
            <CandidateExecutiveSummary 
              onNavigateTab={setActiveTab} 
            />
          )}
          {activeTab === "workbench" && <PalantirPlatformWorkbench />}
          {activeTab === "simulator" && <InteractiveAgentSimulator />}
          {activeTab === "rag" && <RagPipelineSandbox />}
          {activeTab === "governance" && <PodLeadershipGovernance />}
          {activeTab === "cases" && <CaseStudiesGallery />}
          {activeTab === "code" && <CodeArtifactsViewer />}
          {activeTab === "advisor" && <FdeAiAdvisor />}
        </main>

        {/* Enterprise Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 sm:px-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-[10px]">
                FDE
              </div>
              <span>
                Palantir Lead Forward Deployed Engineer Showcase | Deloitte AI & Engineering Practice
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
              <button
                onClick={() => setIsContactOpen(true)}
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-sans text-xs font-semibold cursor-pointer mr-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>C-Suite Engagement</span>
              </button>

              <span className="flex items-center gap-1 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>SOC-2 / HIPAA / FedRAMP Ready</span>
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Plane className="w-3.5 h-3.5 text-amber-400" />
                <span>50%+ Travel Ready</span>
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>$189.2k – $372.9k Aligned</span>
              </span>
            </div>
          </div>
        </footer>

        {/* C-Suite Slide-Over Dialog */}
        <ContactSlideOver 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      </div>
    </ThemeProvider>
  );
}
