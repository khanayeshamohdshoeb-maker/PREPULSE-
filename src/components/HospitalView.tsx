import React from 'react';
import { useIncident } from '../context/IncidentContext';
import {
  INCIDENT_TYPE_LABELS,
  CONSCIOUSNESS_LABELS,
  BREATHING_LABELS,
  BOOLEAN_OBSERVATION_LABELS,
} from '../utils/constants';
import {
  Building2,
  Clock,
  MapPin,
  AlertTriangle,
  Users,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Info,
  Activity,
} from 'lucide-react';

export const HospitalView: React.FC = () => {
  const { incident, setActiveView } = useIncident();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Prominent Safety & Prototype Disclaimer */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 flex items-center justify-between text-amber-300 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="font-mono font-bold uppercase tracking-wider">
            SIMULATED RECEIVING TEAM VIEW — INFORMATION CONTINUITY PROTOTYPE ONLY
          </span>
        </div>
        <span className="text-[11px] text-amber-400/80 hidden md:inline">
          Not connected to a real hospital
        </span>
      </div>

      {/* Screen Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
              <Building2 className="w-4 h-4 text-emerald-500" />
              <span>SIMULATED RECEIVING TEAM VIEW</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Incoming PREPULSE Case: <span className="font-mono text-amber-400">{incident.caseId}</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Event: <strong className="text-slate-200">{INCIDENT_TYPE_LABELS[incident.incidentType] || 'Road accident'}</strong> · Location: <strong className="text-slate-200">{incident.location.address}</strong>
            </p>
          </div>

          {/* Demonstration Notice Box */}
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-right max-w-xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              DEMONSTRATION STATUS
            </div>
            <div className="text-sm font-semibold text-white mt-0.5">
              Structured Information Stream
            </div>
            <div className="text-[11px] text-slate-400">
              Preserving original scene facts
            </div>
          </div>
        </div>

        {/* Required Notice from Section 8 */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p>
            <strong>Notice:</strong> This screen demonstrates how structured information could be displayed to a receiving professional team. It is not connected to a real hospital.
          </p>
        </div>
      </div>

      {/* Structured Inbound Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Incident Type */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Event Category
          </div>
          <div className="text-base font-bold text-white">
            {INCIDENT_TYPE_LABELS[incident.incidentType] || 'Road accident'}
          </div>
          <div className="text-xs text-slate-400">
            Bystander observation
          </div>
        </div>

        {/* Time */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Time Reported
          </div>
          <div className="text-base font-bold text-white font-mono">
            {incident.reportedAtTime}
          </div>
          <div className="text-[11px] text-amber-400 font-mono">
            SIMULATED DEMO TIME
          </div>
        </div>

        {/* Location */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Location
          </div>
          <div className="text-sm font-bold text-white truncate">
            {incident.location.address}
          </div>
          <div className="text-xs text-slate-400 truncate">
            {incident.location.crossStreets}
          </div>
        </div>

        {/* Medical Diagnosis */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Medical Diagnosis
          </div>
          <div className="text-base font-bold text-emerald-400 font-mono">
            None
          </div>
          <div className="text-xs text-slate-400">
            Facts only · No inferences
          </div>
        </div>
      </div>

      {/* Observed Information Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-500" />
            <span>Observed Scene Facts ({incident.peopleCount} {incident.peopleCount === 1 ? 'person' : 'people'})</span>
          </h2>
          <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
            Pre-hospital facts
          </span>
        </div>

        {incident.people.map((person) => (
          <div
            key={person.id}
            className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">
                Person {person.personNumber} of {incident.peopleCount}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Direct Bystander Report
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Consciousness</span>
                <span className="font-semibold text-slate-200">
                  {CONSCIOUSNESS_LABELS[person.consciousness]}
                </span>
                {person.consciousnessReason && (
                  <span className="text-[10px] text-amber-300 font-mono block mt-0.5 truncate">
                    {person.consciousnessReason}
                  </span>
                )}
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Breathing</span>
                <span className="font-semibold text-slate-200">
                  {BREATHING_LABELS[person.breathing]}
                </span>
                {person.breathingReason && (
                  <span className="text-[10px] text-amber-300 font-mono block mt-0.5 truncate">
                    {person.breathingReason}
                  </span>
                )}
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Major Bleeding</span>
                <span className="font-semibold text-slate-200">
                  {BOOLEAN_OBSERVATION_LABELS[person.majorBleeding]}
                </span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Visible Serious Trauma</span>
                <span className="font-semibold text-slate-200">
                  {BOOLEAN_OBSERVATION_LABELS[person.visibleInjury]}
                </span>
                {person.visibleInjuryReason && (
                  <span className="text-[10px] text-amber-300 font-mono block mt-0.5 truncate">
                    {person.visibleInjuryReason}
                  </span>
                )}
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Trapped / Pinned</span>
                <span className="font-semibold text-slate-200">
                  {BOOLEAN_OBSERVATION_LABELS[person.trapped]}
                </span>
              </div>
            </div>

            {person.additionalNote && (
              <div className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800">
                <span className="text-slate-400 font-mono">Note: </span>
                <span>{person.additionalNote}</span>
              </div>
            )}
          </div>
        ))}

        {/* Witness description */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Witness description — not medically verified
          </div>
          <p className="text-sm text-slate-200 italic">
            "{incident.witnessDescription || 'Motorbike and car collided near the intersection. One rider was thrown toward the roadside.'}"
          </p>
        </div>
      </div>

      {/* Continuity Purpose Statement */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Purpose of the Receiving Team View</span>
        </div>
        <p className="leading-relaxed">
          This screen demonstrates <strong>information continuity</strong>: ensuring the first bystander’s observations are neither distorted nor lost as the patient transitions from scene → EMS ambulance → receiving team. It deliberately avoids automated medical diagnoses or treatment recommendations.
        </p>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => setActiveView('responder')}
          className="text-slate-400 hover:text-white"
        >
          ← Back to Responder View
        </button>
        <button
          type="button"
          onClick={() => setActiveView('timeline')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>View Simulated Timeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-center text-xs text-slate-500 pt-2">
        Prototype simulation — not connected to emergency services.
      </div>
    </div>
  );
};
