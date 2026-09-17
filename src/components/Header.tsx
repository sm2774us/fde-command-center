import React, { useState } from "react";
import deloitteFdeLogo from "../assets/images/deloitte_fde_logo_1789611735175.jpg";
import { useTheme } from "../context/ThemeContext";
import { ContactSlideOver } from "./ContactSlideOver";
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Users, 
  Workflow, 
  Layers, 
  FileCode2, 
  Briefcase, 
  Bot, 
  Plane,
  Sparkles,
  Sun,
  Moon,
  MessageSquare
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenContact }) => {
  const { theme, toggleTheme, isLight } = useTheme();
  const [internalContactOpen, setInternalContactOpen] = useState(false);

  const handleOpenContact = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      setInternalContactOpen(true);
    }
  };

  const navItems = [
    { id: "overview", label: "Executive Overview", icon: Briefcase },
    { id: "workbench", label: "Foundry & AIP Stack", icon: Layers },
    { id: "simulator", label: "AIP Agent & HITL", icon: Workflow },
    { id: "rag", label: "RAG & LLMOps", icon: Cpu },
    { id: "governance", label: "Pod Governance", icon: Users },
    { id: "cases", label: "Client Engagements", icon: ShieldCheck },
    { id: "code", label: "Code Artifacts", icon: FileCode2 },
    { id: "advisor", label: "Lead FDE Advisor", icon: Bot },
  ];

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        {/* Top Status & Accreditation Bar */}
        <div className="border-b border-slate-800/80 px-4 lg:px-8 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-emerald-400 font-semibold tracking-wider uppercase">
              POD STATUS: ACTIVE & ON-TRACK
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-300">
              Deloitte AI & Engineering Practice — Strategic Client Engagements
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <div className="hidden md:flex items-center gap-1.5 text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>Palantir Foundry / AIP / Maven</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-amber-400">
              <Plane className="w-3.5 h-3.5" />
              <span>50%+ Travel Ready</span>
            </div>

            {/* Persistent UI Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 transition-all cursor-pointer font-sans text-[11px]"
              title={`Switch to ${isLight ? "Enterprise High-Contrast" : "Clean Light Presentation"} Mode`}
            >
              {isLight ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Clean Light</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enterprise</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Brand & Identity */}
        <div className="px-4 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <img 
                src={deloitteFdeLogo} 
                alt="Deloitte FDE Practice Emblem" 
                className="w-11 h-11 rounded-xl object-cover border border-cyan-400/40 shadow-lg shadow-cyan-950/50 group-hover:border-cyan-400 transition-all"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full" title="Deloitte Green Dot Accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                  Lead Forward Deployed Engineer
                </h1>
                <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase">
                  Palantir & GenAI Solutions
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Embedded Client Pod Leader | C-Suite Technical Translator | Enterprise Foundry & AIP Architect
              </p>
            </div>
          </div>

          {/* Quick Metrics & Get in Touch CTA */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 text-xs">
            <div className="hidden xl:flex bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-md flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Seniority</span>
              <span className="font-semibold text-slate-200">8+ Years Systems</span>
            </div>
            <div className="hidden lg:flex bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-md flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Pod Scale</span>
              <span className="font-semibold text-slate-200">2–5 Eng On/Offshore</span>
            </div>
            <div className="hidden sm:flex bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-md flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-mono">GenAI Production</span>
              <span className="font-semibold text-emerald-400">RAG + HITL</span>
            </div>

            {/* Get in Touch Button */}
            <button
              onClick={handleOpenContact}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
              <span>Get in Touch</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 lg:px-8 flex items-center gap-1 overflow-x-auto border-t border-slate-850 scrollbar-none py-1 bg-slate-950/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Slide-over Dialog */}
      <ContactSlideOver 
        isOpen={internalContactOpen} 
        onClose={() => setInternalContactOpen(false)} 
      />
    </>
  );
};

