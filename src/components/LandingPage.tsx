import React from 'react';
import { useIncident } from '../context/IncidentContext';
import {
  Eye,
  CheckSquare,
  FileSpreadsheet,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Radio,
  Building2,
  ChevronRight,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, loadDemoScenario, resetToBlank, incident } = useIncident();

  const handleStartIncident = () => {
    resetToBlank();
  };

  const handleJudgeWalkthrough = () => {
    loadDemoScenario();
    setActiveView('handoff');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Safety Notice Banner — Section 13 specification */}
      <section className="bg-amber-500/10 border-b border-amber-500/20 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-amber-200">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium">
              {incident.isRealEmergency
                ? 'REAL EMERGENCY? Contact your local emergency service first. PREPULSE does not provide emergency response.'
                : 'DEMO MODE — No emergency service is contacted. (For real emergencies, always contact your local emergency service first).'}
            </span>
          </div>
          <span className="text-[11px] text-amber-300/80 font-mono">
            Safety Prototype
          </span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 text-center space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-display">
            PREPULSE
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-slate-100 font-display tracking-tight">
            “Don't diagnose. Don't guess. Capture what matters.”
          </p>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            A bystander-to-responder emergency information handoff assistant.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleStartIncident}
            className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Start an Incident</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleJudgeWalkthrough}
            className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>2-Min Judge Test (PP-4821)</span>
          </button>

          <a
            href="#how-it-works"
            className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-sm transition-colors flex items-center gap-1.5"
          >
            <span>See How It Works</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>
        </div>
      </section>

      {/* Section 2: THE PROBLEM & THE PREPULSE APPROACH */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-left">
          {/* The Problem */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              THE PROBLEM
            </span>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              “In the first moments of an emergency, witnesses may see important details but not know what information matters, what is uncertain, or how to communicate it clearly to responders.”
            </p>
          </div>

          <div className="h-px bg-slate-800" />

          {/* The PREPULSE Approach */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              THE PREPULSE APPROACH
            </span>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              “PREPULSE turns observations into a structured handoff without asking bystanders to diagnose or guess.”
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Visual: SEE → CAPTURE → STRUCTURE → HAND OFF */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
            PREPULSE Observation Protocol
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            SEE → CAPTURE → STRUCTURE → HAND OFF
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 1: SEE */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs font-bold text-red-400">01</span>
              <Eye className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-white">SEE</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Arrive at the scene. Ensure scene safety and verify emergency dispatch is called first.
            </p>
          </div>

          {/* Step 2: CAPTURE */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs font-bold text-amber-400">02</span>
              <CheckSquare className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-white">CAPTURE</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Answer rapid observational prompts. Mark honest uncertainty whenever unable to verify.
            </p>
          </div>

          {/* Step 3: STRUCTURE */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs font-bold text-blue-400">03</span>
              <FileSpreadsheet className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-white">STRUCTURE</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Observations compile into a standardized, non-diagnostic incident card with verified locations.
            </p>
          </div>

          {/* Step 4: HAND OFF */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-xs font-bold text-emerald-400">04</span>
              <Radio className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-white">HAND OFF</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A responder can review the structured handoff during the simulated demonstration.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Signature Feature — Uncertainty */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>The Central Product Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            “It is better to report uncertainty than to guess.”
          </h2>
          <div className="space-y-1.5 text-sm text-slate-300 leading-relaxed">
            <p>
              PREPULSE treats “Not sure” as useful information—not as a failure to answer.
            </p>
            <p className="text-slate-400">
              “Not sure” is preserved as information. It is never converted into a guess or a diagnosis.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
              Poor visibility
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
              Person obstructed
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
              Scene unsafe
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
              Cannot tell
            </span>
          </div>
        </div>
      </section>

      {/* 3 Demonstrations: Incident Card, Responder View, Receiving Team */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
            Ecosystem Prototype
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Three Continuous Information Views
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {/* Card 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase">View 1</span>
              <h3 className="text-base font-bold text-white">Incident Card</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The structured bystander handoff card ready for responder review.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                loadDemoScenario();
                setActiveView('handoff');
              }}
              className="text-xs text-slate-200 hover:text-white font-semibold flex items-center gap-1 pt-2"
            >
              <span>Open Card (PP-4821)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-amber-400 uppercase">View 2</span>
              <h3 className="text-base font-bold text-white">Simulated Responder View</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Field MDT layout with prominent uncertainty markers and acknowledgment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                loadDemoScenario();
                setActiveView('responder');
              }}
              className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 pt-2"
            >
              <span>Open Responder View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase">View 3</span>
              <h3 className="text-base font-bold text-white">Simulated Receiving Team View</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-hospital continuity display without medical recommendations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                loadDemoScenario();
                setActiveView('hospital');
              }}
              className="text-xs text-slate-200 hover:text-white font-semibold flex items-center gap-1 pt-2"
            >
              <span>Open Receiving Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Quiet Footer Note */}
      <section className="text-center text-xs text-slate-500 pt-4">
        Prototype simulation — not connected to emergency services.
      </section>
    </div>
  );
};
