import React, { useState, useEffect } from 'react';
import { useIncident } from '../context/IncidentContext';
import { IncidentCard } from './IncidentCard';
import QRCode from 'qrcode';
import {
  Share2,
  Printer,
  Radio,
  Maximize2,
  Minimize2,
  Check,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Info,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';

export const HandoffMode: React.FC = () => {
  const { incident, updateIncident, setActiveView, showToast } = useIncident();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isFieldDisplayMode, setIsFieldDisplayMode] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    const summaryText = `PREPULSE HANDOFF
Case ID: ${incident.caseId}
Status: ${incident.handoffStatus.toUpperCase()}
Event: ${incident.incidentType}
Time: ${incident.reportedAtTime} (SIMULATED DEMO TIME)
Location: ${incident.location.address} - ${incident.location.crossStreets}
People: ${incident.peopleCount}
Witness: ${incident.witnessDescription}
Diagnosis: None (Observations only)`;

    QRCode.toDataURL(summaryText, {
      width: 240,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error', err));
  }, [incident]);

  const handleShareHandoff = () => {
    const textSummary = `[PREPULSE HANDOFF]
Case ID: ${incident.caseId}
Event: ${incident.incidentType}
Time: ${incident.reportedAtTime}
Location: ${incident.location.address} (${incident.location.crossStreets})
People: ${incident.peopleCount}
Witness Account: "${incident.witnessDescription}"
Status: ${incident.handoffStatus}
Demo handoff — not connected to emergency services`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textSummary);
      setCopiedSummary(true);
      showToast('Structured handoff summary copied to clipboard');
      setTimeout(() => setCopiedSummary(false), 2500);
    } else {
      showToast('Handoff summary ready');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const status = incident.handoffStatus; // 'prepared' | 'reviewed' | 'received'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Prominent Safety Notice */}
      <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-amber-200">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-amber-400">
            DEMO HANDOFF — NOT CONNECTED TO EMERGENCY SERVICES
          </span>
        </div>
        <span className="text-[11px] text-amber-300/80 hidden md:inline">
          Prototype state machine only
        </span>
      </div>

      {/* Screen Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold uppercase tracking-widest">
            <span>CASE ID: {incident.caseId}</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-normal">SIMULATED DEMO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            PREPULSE HANDOFF
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            A structured summary of the witness's observations. Designed for rapid review.
          </p>
        </div>

        {/* Action Buttons Hub */}
        <div className="flex flex-wrap items-center gap-2.5 no-print">
          <button
            type="button"
            onClick={() => setIsFieldDisplayMode(!isFieldDisplayMode)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 shadow transition-colors"
          >
            {isFieldDisplayMode ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4 text-amber-400" />
            )}
            <span>{isFieldDisplayMode ? 'Standard View' : 'Show to Responder'}</span>
          </button>

          <button
            type="button"
            onClick={handleShareHandoff}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 shadow transition-colors"
          >
            {copiedSummary ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4 text-blue-400" />
            )}
            <span>{copiedSummary ? 'Copied' : 'Share Handoff'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 shadow transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print / Export</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('responder')}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all active:scale-95"
          >
            <Radio className="w-4 h-4" />
            <span>Open Responder View</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HANDOFF STATUS BAR & STATE MACHINE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              HANDOFF STATUS
            </span>
            <div className="text-base font-bold text-white mt-0.5 flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  status === 'received'
                    ? 'bg-emerald-400'
                    : status === 'reviewed'
                    ? 'bg-amber-400'
                    : 'bg-blue-400'
                }`}
              />
              <span className="capitalize">{status}</span>
              <span className="text-xs text-slate-500 font-normal font-mono">
                (Prototype state machine only)
              </span>
            </div>
          </div>

          {/* Stepper: Prepared → Reviewed → Received */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                status === 'prepared'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              1. Prepared
            </span>
            <span className="text-slate-600">→</span>
            <span
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                status === 'reviewed'
                  ? 'bg-amber-500 text-slate-950'
                  : status === 'received'
                  ? 'bg-slate-800 text-emerald-400'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              2. Reviewed
            </span>
            <span className="text-slate-600">→</span>
            <span
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                status === 'received'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              3. Received
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          This is a prototype demonstration state machine. It does NOT imply a real responder or hospital has received it.
        </p>
      </div>

      {/* Main Grid: Signature Incident Card + QR Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Full Incident Card */}
        <div className={`space-y-6 ${isFieldDisplayMode ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
          <IncidentCard incident={incident} />

          {/* Core Product Philosophy & Differentiator Callout */}
          <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 space-y-2">
            <div className="text-sm sm:text-base font-extrabold text-amber-300">
              “It is better to report uncertainty than to guess.”
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              PREPULSE treats “Not sure” as useful information—not as a failure to answer.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              The system preserves uncertainty instead of turning it into a diagnosis.
            </p>
          </div>
        </div>

        {/* Right Column: Scan & Responder Preview */}
        {!isFieldDisplayMode && (
          <div className="lg:col-span-4 space-y-6 no-print">
            {/* Scannable Handover Token */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Simulated Scan Token
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  {incident.caseId}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl mx-auto w-fit shadow-md">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Responder Fast Scan QR"
                    className="w-48 h-48 mx-auto"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-slate-800 text-xs font-mono">
                    Generating Token...
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-300 leading-relaxed">
                  A responder can review the structured handoff during the simulated demonstration.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveView('responder')}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>Open Simulated Responder View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Links to Ecosystem */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <span className="font-mono uppercase tracking-wider text-slate-400 block">
                Next Demonstration Views
              </span>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveView('responder')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors flex items-center justify-between"
                >
                  <span>1. Responder View</span>
                  <span className="text-amber-400 font-mono">Acknowledge →</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('hospital')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors flex items-center justify-between"
                >
                  <span>2. Receiving Team</span>
                  <span className="text-blue-400 font-mono">Continuity →</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('timeline')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors flex items-center justify-between"
                >
                  <span>3. Simulated Timeline</span>
                  <span className="text-emerald-400 font-mono">Audit →</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-500 pt-2">
        Prototype simulation — not connected to emergency services.
      </div>
    </div>
  );
};
