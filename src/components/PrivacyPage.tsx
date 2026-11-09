import React from 'react';
import { useIncident } from '../context/IncidentContext';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  FileText,
  UserX,
  CreditCard,
  Database,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { setActiveView } = useIncident();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActiveView('landing')}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Safety & Ethics Specification
        </span>
      </div>

      {/* Screen Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Privacy, Ethics & Operational Safety
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          PREPULSE is built on strict data minimization, zero-guesswork observation capture, and unambiguous boundary enforcement.
        </p>
      </div>

      {/* Core Privacy & Safety Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Principle 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <UserX className="w-4 h-4 text-red-400" />
            <span>Strict Data Minimization</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            PREPULSE collects only the information necessary for an immediate field handoff. We do NOT collect names, dates of birth, social security numbers, government IDs, insurance information, or residential addresses.
          </p>
        </div>

        {/* Principle 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>No Account, Password, or Payment Required</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            No bystander at an emergency scene should ever be delayed by a signup wall, payment prompt, or verification email. PREPULSE is 100% free, public-good, and zero-registration.
          </p>
        </div>

        {/* Principle 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Database className="w-4 h-4 text-blue-400" />
            <span>No Persistent Real Patient Records</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This prototype does not store real electronic health records (EHR) or link incident cards to individual identities. All demonstration scenarios use synthetic fictional data.
          </p>
        </div>

        {/* Principle 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Not Connected to Live 911 / 112 / 999</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The PREPULSE prototype does not replace emergency dispatch, dispatch ambulances, or establish live 911 connections. Bystanders must always dial local emergency authorities first.
          </p>
        </div>
      </div>

      {/* Explicit "What We Do NOT Do" Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
        <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
          Strict Architectural Boundaries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
            <span className="text-red-400 font-bold">✕</span>
            <span><strong>No Medical Diagnoses:</strong> We never infer medical conditions from observations (e.g. no "suspected concussion" or "likely fracture").</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
            <span className="text-red-400 font-bold">✕</span>
            <span><strong>No Treatment Directives:</strong> We never instruct untrained bystanders to perform invasive medical maneuvers or prescribe medications.</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
            <span className="text-red-400 font-bold">✕</span>
            <span><strong>No Exaggerated Claims:</strong> We never claim that PREPULSE "saves lives" or "cuts mortality by X%".</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
            <span className="text-red-400 font-bold">✕</span>
            <span><strong>No Public Patient Profiles:</strong> Incident cards are point-to-point responder handoffs, never social media feeds or public posts.</span>
          </div>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span>PREPULSE Prototype Specification · Compliance with emergency observation ethics</span>
        <button
          type="button"
          onClick={() => setActiveView('wizard')}
          className="text-red-400 hover:text-red-300 font-semibold"
        >
          Try Start Incident Flow →
        </button>
      </div>
    </div>
  );
};
