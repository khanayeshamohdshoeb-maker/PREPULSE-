import React, { useState } from 'react';
import { useIncident } from '../context/IncidentContext';
import {
  INCIDENT_TYPE_LABELS,
  CONSCIOUSNESS_LABELS,
  BREATHING_LABELS,
  BOOLEAN_OBSERVATION_LABELS,
} from '../utils/constants';
import {
  Radio,
  CheckCircle2,
  Clock,
  MapPin,
  AlertTriangle,
  Users,
  HelpCircle,
  Volume2,
  FileText,
  Activity,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const ResponderView: React.FC = () => {
  const {
    incident,
    acknowledgeByResponder,
    markHandoffReceived,
    setActiveView,
    showToast,
  } = useIncident();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Derive counts of uncertainty markers
  const totalUncertainties = incident.people.reduce((acc, p) => {
    let count = 0;
    if (p.consciousness === 'not_sure') count++;
    if (p.breathing === 'not_sure' || p.breathing === 'cannot_tell') count++;
    if (p.majorBleeding === 'not_sure') count++;
    if (p.visibleInjury === 'not_sure') count++;
    if (p.trapped === 'not_sure') count++;
    return acc + count;
  }, 0);

  const status = incident.handoffStatus;
  const isAcknowledged = incident.responderInfo.acknowledged || status === 'reviewed' || status === 'received';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Prominent Mandatory Safety Label */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 flex items-center justify-between text-amber-300 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="font-mono font-bold uppercase tracking-wider">
            SIMULATED RESPONDER VIEW — NOT CONNECTED TO AMBULANCE OR HOSPITAL DISPATCH
          </span>
        </div>
        <span className="text-[11px] text-amber-400/80 hidden md:inline">
          Demonstration MDT Prototype
        </span>
      </div>

      {/* Responder Screen Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest font-bold">
              <Radio className="w-4 h-4 text-red-500" />
              <span>SIMULATED RESPONDER VIEW</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Incoming PREPULSE Case: <span className="font-mono text-amber-400">{incident.caseId}</span>
            </h1>
            <p className="text-sm font-semibold text-slate-200 mt-1">
              Event: {INCIDENT_TYPE_LABELS[incident.incidentType] || 'Road accident'}
            </p>
          </div>

          {/* Action Button: Acknowledge Handoff */}
          <div className="flex flex-col sm:items-end gap-2">
            {!isAcknowledged ? (
              <button
                type="button"
                onClick={acknowledgeByResponder}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Acknowledge Handoff</span>
              </button>
            ) : (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/80 text-emerald-300 font-mono text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>HANDOFF ACKNOWLEDGED — SIMULATION</span>
              </div>
            )}
            <span className="text-[11px] text-slate-400 font-mono">
              Status: {incident.handoffStatus.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Telemetry Strip: Location, Time, People, Observed Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Location</div>
            <div className="text-sm font-bold text-white mt-1 truncate">
              {incident.location.address}
            </div>
            <div className="text-xs text-slate-400 truncate">
              {incident.location.crossStreets}
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Time</div>
            <div className="text-sm font-bold text-white mt-1 font-mono">
              {incident.reportedAtTime}
            </div>
            <div className="text-[11px] text-amber-400 font-mono">SIMULATED DEMO TIME</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">People</div>
            <div className="text-sm font-bold text-white mt-1">
              {incident.peopleCount} {incident.peopleCount === 1 ? 'person' : 'people'}
            </div>
            <div className="text-xs text-slate-400">Observed at scene</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Uncertainties</div>
            <div className="text-sm font-bold text-amber-400 mt-1 font-mono">
              {totalUncertainties} noted
            </div>
            <div className="text-xs text-slate-400">Marked without guessing</div>
          </div>
        </div>
      </div>

      {/* Uncertainty Highlight Callout */}
      <div className="bg-amber-950/30 border-2 border-amber-500/60 rounded-2xl p-5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 font-mono">
              Observed Uncertainty Markers ({totalUncertainties} noted)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
            ZERO SPECULATION
          </span>
        </div>
        <p className="text-xs text-amber-200/90 leading-relaxed">
          The bystander explicitly reported uncertainty instead of guessing. Responders should verify these clinical parameters directly rather than assuming normalcy or condition.
        </p>
      </div>

      {/* Detailed Person Observations (Uncertainty visually obvious) */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-500" />
          <span>Patient Observations Stream</span>
        </h2>

        {incident.people.map((person) => (
          <div
            key={person.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-200 text-xs font-mono flex items-center justify-center">
                  #{person.personNumber}
                </span>
                <span>Person {person.personNumber} of {incident.peopleCount}</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                OBSERVED FACTS ONLY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Consciousness */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Consciousness
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {CONSCIOUSNESS_LABELS[person.consciousness]}
                </div>
                <div className="mt-1">
                  {person.consciousness === 'not_sure' ? (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 block truncate">
                      NOT SURE {person.consciousnessReason ? `· ${person.consciousnessReason}` : ''}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-emerald-400">
                      OBSERVED FACT
                    </span>
                  )}
                </div>
              </div>

              {/* Breathing */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Breathing
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {BREATHING_LABELS[person.breathing]}
                </div>
                <div className="mt-1">
                  {person.breathing === 'not_sure' || person.breathing === 'cannot_tell' ? (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 block truncate font-bold">
                      NOT SURE {person.breathingReason ? `· ${person.breathingReason}` : ''}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-emerald-400">
                      OBSERVED FACT
                    </span>
                  )}
                </div>
              </div>

              {/* Bleeding */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Major Visible Bleeding
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {BOOLEAN_OBSERVATION_LABELS[person.majorBleeding]}
                </div>
                <div className="mt-1">
                  {person.majorBleeding === 'yes' ? (
                    <span className="text-[10px] font-mono text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded border border-red-500/30 font-bold">
                      OBSERVED YES
                    </span>
                  ) : person.majorBleeding === 'not_sure' ? (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      NOT SURE
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">NONE SEEN</span>
                  )}
                </div>
              </div>

              {/* Serious Injury */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Visible Serious Injury
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {BOOLEAN_OBSERVATION_LABELS[person.visibleInjury]}
                </div>
                <div className="mt-1">
                  {person.visibleInjury === 'not_sure' ? (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 block truncate font-bold">
                      NOT SURE {person.visibleInjuryReason ? `· ${person.visibleInjuryReason}` : ''}
                    </span>
                  ) : person.visibleInjury === 'yes' ? (
                    <span className="text-[10px] font-mono text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded border border-red-500/30">
                      OBSERVED YES
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">NONE SEEN</span>
                  )}
                </div>
              </div>

              {/* Trapped */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Trapped / Pinned
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {BOOLEAN_OBSERVATION_LABELS[person.trapped]}
                </div>
                <div className="mt-1">
                  {person.trapped === 'yes' ? (
                    <span className="text-[10px] font-mono text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded border border-red-500/30 font-bold">
                      PINNED
                    </span>
                  ) : person.trapped === 'not_sure' ? (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      NOT SURE
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">NO</span>
                  )}
                </div>
              </div>
            </div>

            {person.additionalNote && (
              <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <strong className="text-slate-400 font-mono">Bystander note: </strong>
                <span>{person.additionalNote}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Witness Account */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Witness Account
            </h3>
          </div>
          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
            Witness description — not medically verified
          </span>
        </div>

        <blockquote className="text-sm sm:text-base text-slate-200 italic bg-slate-950 p-4 rounded-xl border border-slate-800">
          "{incident.witnessDescription || 'Motorbike and car collided near the intersection. One rider was thrown toward the roadside.'}"
        </blockquote>

        {incident.witnessAudioRecorded && (
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsPlayingAudio(true);
                  showToast('Playing simulated voice note sample');
                  setTimeout(() => setIsPlayingAudio(false), 2500);
                }}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isPlayingAudio
                    ? 'Playing simulated audio clip...'
                    : 'Optional voice note — simulated prototype feature'}
                </div>
                <div className="text-[11px] text-slate-400">
                  Demo only. No real emergency service receives this recording.
                </div>
              </div>
            </div>

            <span className="text-xs font-mono text-emerald-400 font-semibold">
              ATTACHED ({incident.witnessAudioDurationSeconds}s)
            </span>
          </div>
        )}
      </div>

      {/* Bottom navigation to Receiving Team and Timeline */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveView('handoff')}
          className="text-slate-400 hover:text-white"
        >
          ← Back to Incident Card
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveView('hospital')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>View Receiving Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveView('timeline')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>View Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 pt-2">
        Prototype simulation — not connected to emergency services.
      </div>
    </div>
  );
};
