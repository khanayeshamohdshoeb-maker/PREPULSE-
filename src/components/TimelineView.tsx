import React from 'react';
import { useIncident } from '../context/IncidentContext';
import {
  Clock,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export const TimelineView: React.FC = () => {
  const {
    incident,
    acknowledgeByResponder,
    setActiveView,
    loadDemoScenario,
  } = useIncident();

  // Exactly as specified in Section 9 of the prompt:
  // 16:25 — Incident reported
  // ↓
  // 16:26 — Observations recorded
  // ↓
  // 16:27 — Incident card generated
  // ↓
  // 16:28 — Handoff prepared
  // ↓
  // 16:29 — Responder view acknowledged
  const standardTimeline = [
    {
      time: '16:25',
      title: 'Incident reported',
      desc: 'Bystander initiated PREPULSE observation capture at scene',
      actor: 'Bystander',
      isCompleted: true,
    },
    {
      time: '16:26',
      title: 'Observations recorded',
      desc: 'Observed awareness, breathing, bleeding, and honest uncertainties logged for Person 1',
      actor: 'Bystander',
      isCompleted: true,
    },
    {
      time: '16:27',
      title: 'Incident card generated',
      desc: 'Observations structured into verified incident card without diagnosis.',
      actor: 'Bystander',
      isCompleted: true,
    },
    {
      time: '16:28',
      title: 'Handoff prepared',
      desc: 'Structured handoff card ready for professional responder review.',
      actor: 'Bystander',
      isCompleted:
        incident.handoffStatus === 'prepared' ||
        incident.handoffStatus === 'reviewed' ||
        incident.handoffStatus === 'received',
    },
    {
      time: '16:29',
      title: 'Responder view acknowledged',
      desc: 'Responder acknowledged handoff during simulated demonstration.',
      actor: 'EMS Responder',
      isCompleted:
        incident.responderInfo.acknowledged ||
        incident.handoffStatus === 'reviewed' ||
        incident.handoffStatus === 'received',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Prominent Mandatory Safety Label */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 flex items-center justify-between text-amber-300 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="font-mono font-bold uppercase tracking-wider">
            SIMULATED DEMO TIMELINE
          </span>
        </div>
        <span className="text-[11px] text-amber-400/80 hidden sm:inline">
          Demonstrates chronological progression
        </span>
      </div>

      {/* Screen Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              Chronological Audit Trail
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              Case Timeline: <span className="font-mono text-amber-400">{incident.caseId}</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Event: <strong className="text-slate-200">Road accident</strong> · Complete lifecycle tracking from first witness observation to simulated responder acknowledgment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadDemoScenario}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Scenario</span>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Visual Display */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10">
          {standardTimeline.map((item, index) => {
            return (
              <div key={index} className="relative group">
                {/* Node icon / bullet */}
                <div
                  className={`absolute -left-[33px] sm:-left-[41px] top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                    item.isCompleted
                      ? 'bg-red-600 border-red-500 text-white shadow-md shadow-red-600/30'
                      : 'bg-slate-900 border-slate-700 text-slate-500'
                  }`}
                >
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                  ) : (
                    <Clock className="w-3 h-3 text-slate-500" />
                  )}
                </div>

                {/* Content */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-1.5 hover:border-slate-700 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs sm:text-sm font-bold text-amber-400">
                      {item.time}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Actor: {item.actor}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Contextual Action Button if responder hasn't acknowledged yet */}
                  {!item.isCompleted && item.title.includes('Responder') && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={acknowledgeByResponder}
                        className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <span>Acknowledge Handoff</span>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Footer Note */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>Demonstration benchmark: under 5 minutes from incident to responder receipt</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveView('handoff')}
              className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-4"
            >
              Back to Incident Card
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveView('responder')}
              className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-4"
            >
              Open Responder View
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 pt-2">
        Prototype simulation — not connected to emergency services.
      </div>
    </div>
  );
};
