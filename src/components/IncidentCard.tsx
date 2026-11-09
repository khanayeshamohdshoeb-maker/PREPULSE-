import React from 'react';
import { IncidentState } from '../types/incident';
import {
  INCIDENT_TYPE_LABELS,
  CONSCIOUSNESS_LABELS,
  BREATHING_LABELS,
  BOOLEAN_OBSERVATION_LABELS,
} from '../utils/constants';

interface IncidentCardProps {
  incident: IncidentState;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const person = incident.people[0] || {
    consciousness: 'appears_awake',
    breathing: 'not_sure',
    breathingReason: 'Person obstructed',
    majorBleeding: 'yes',
    visibleInjury: 'not_sure',
    visibleInjuryReason: 'Poor visibility',
    trapped: 'no',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-left shadow-xl text-slate-100 font-sans print:border-black print:bg-white print:text-black">
      {/* Top Header: PREPULSE INCIDENT CARD / Case ID */}
      <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
            PREPULSE INCIDENT CARD
          </div>
          <div className="text-2xl font-mono font-extrabold text-white mt-0.5 print:text-black">
            {incident.caseId} <span className="text-slate-500">·</span> <span className="text-amber-400 font-sans text-sm font-semibold">DEMO</span>
          </div>
        </div>

        <div className="text-right text-xs font-mono text-slate-400">
          STRUCTURED BYSTANDER HANDOFF
        </div>
      </div>

      {/* Primary Key Summary Row: Event, People, Time, Location */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-1 text-xs">
        <div>
          <span className="text-slate-400 font-mono uppercase block text-[11px]">Event</span>
          <span className="text-sm font-bold text-white print:text-black">
            {INCIDENT_TYPE_LABELS[incident.incidentType] || 'Road accident'}
          </span>
        </div>

        <div>
          <span className="text-slate-400 font-mono uppercase block text-[11px]">People</span>
          <span className="text-sm font-bold text-white print:text-black">
            {incident.peopleCount} {incident.peopleCount === 1 ? 'person' : 'people'}
          </span>
        </div>

        <div>
          <span className="text-slate-400 font-mono uppercase block text-[11px]">Time</span>
          <span className="text-sm font-bold text-white font-mono print:text-black">
            {incident.reportedAtTime}
          </span>
        </div>

        <div>
          <span className="text-slate-400 font-mono uppercase block text-[11px]">Location</span>
          <span className="text-sm font-bold text-white truncate block print:text-black">
            {incident.location.address || 'Demo Intersection'}
          </span>
          <span className="text-[11px] text-slate-400 truncate block">
            {incident.location.crossStreets || 'Main St & 2nd Ave'}
          </span>
        </div>
      </div>

      <div className="h-px bg-slate-800" />

      {/* OBSERVATIONS Section */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
          OBSERVATIONS
        </span>

        <div className="space-y-2">
          {/* Consciousness */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-sm">
            <span className="text-slate-200">
              Consciousness: <strong className="text-white font-semibold">{CONSCIOUSNESS_LABELS[person.consciousness]}</strong>
            </span>
            <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
              person.consciousness === 'not_sure'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'text-slate-400'
            }`}>
              {person.consciousness === 'not_sure' ? 'Uncertain' : 'Observed'}
            </span>
          </div>

          {/* Breathing */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-200">
                Breathing: <strong className="text-amber-300 font-semibold">{BREATHING_LABELS[person.breathing]}</strong>
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Uncertain
              </span>
            </div>
            {person.breathingReason && (
              <div className="text-xs text-amber-300/80 font-mono">
                Reason: {person.breathingReason}
              </div>
            )}
          </div>

          {/* Major visible bleeding */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-sm">
            <span className="text-slate-200">
              Major visible bleeding: <strong className="text-white font-semibold">{BOOLEAN_OBSERVATION_LABELS[person.majorBleeding]}</strong>
            </span>
            <span className="text-xs font-mono text-slate-400">
              Observed
            </span>
          </div>

          {/* Visible serious injury */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-200">
                Visible serious injury: <strong className="text-amber-300 font-semibold">{BOOLEAN_OBSERVATION_LABELS[person.visibleInjury]}</strong>
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Uncertain
              </span>
            </div>
            {person.visibleInjuryReason && (
              <div className="text-xs text-amber-300/80 font-mono">
                Reason: {person.visibleInjuryReason}
              </div>
            )}
          </div>

          {/* Trapped */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-sm">
            <span className="text-slate-200">
              Trapped: <strong className="text-white font-semibold">{BOOLEAN_OBSERVATION_LABELS[person.trapped]}</strong>
            </span>
            <span className="text-xs font-mono text-slate-400">
              Observed
            </span>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-800" />

      {/* WITNESS ACCOUNT Section */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold block">
          WITNESS ACCOUNT
        </span>
        <blockquote className="text-sm sm:text-base text-slate-200 italic bg-slate-950/50 p-3.5 rounded-lg border border-slate-800/80 leading-relaxed">
          "{incident.witnessDescription || 'Motorbike and car collided near the intersection. One rider was thrown toward the roadside.'}"
        </blockquote>
        <div className="text-xs text-slate-400 font-mono">
          Source: <span className="text-slate-200 font-sans font-medium">Bystander</span>
        </div>
      </div>

      <div className="h-px bg-slate-800" />

      {/* MEDICAL DIAGNOSIS Section */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
            MEDICAL DIAGNOSIS
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            None
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          “PREPULSE records observations and does not generate a medical diagnosis.”
        </p>
      </div>
    </div>
  );
};
