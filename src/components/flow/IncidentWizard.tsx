import React, { useState } from 'react';
import { useIncident } from '../../context/IncidentContext';
import { IncidentType, UncertaintyReason } from '../../types/incident';
import {
  INCIDENT_TYPE_LABELS,
  CONSCIOUSNESS_LABELS,
  BREATHING_LABELS,
  BOOLEAN_OBSERVATION_LABELS,
  UNCERTAINTY_REASONS,
} from '../../utils/constants';
import { IncidentCard } from '../IncidentCard';
import {
  PhoneCall,
  AlertOctagon,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mic,
  Square,
  Play,
  Clock,
  MapPin,
  Check,
  ShieldAlert,
  Info,
  HelpCircle,
  Eye,
} from 'lucide-react';

export const IncidentWizard: React.FC = () => {
  const {
    incident,
    updateIncident,
    updatePersonObservation,
    setPersonUncertaintyReason,
    setPeopleCount,
    setActiveView,
    loadDemoScenario,
    showToast,
  } = useIncident();

  // 7-Step sequential indices:
  // 0: STEP 1 — Emergency Check
  // 1: STEP 2 — What Happened?
  // 2: STEP 3 — How Many People?
  // 3: STEP 4 — What Can You Observe?
  // 4: STEP 5 — Witness Account
  // 5: STEP 6 — Location & Time
  // 6: STEP 7 — Review & Verify
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activePersonIndex, setActivePersonIndex] = useState<number>(0);

  // Audio recording simulation states
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const [audioPlaybackActive, setAudioPlaybackActive] = useState(false);

  const handleSelectEmergencyStatus = (isReal: boolean) => {
    updateIncident({
      isRealEmergency: isReal,
      isDemoMode: !isReal,
    });
  };

  const handleStartAudioRecord = () => {
    setIsRecordingAudio(true);
    setRecordingTimer(1);
    const interval = setInterval(() => {
      setRecordingTimer((prev) => {
        if (prev >= 12) {
          clearInterval(interval);
          setIsRecordingAudio(false);
          updateIncident({
            witnessAudioRecorded: true,
            witnessAudioDurationSeconds: 12,
          });
          return 12;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopAudioRecord = () => {
    setIsRecordingAudio(false);
    updateIncident({
      witnessAudioRecorded: true,
      witnessAudioDurationSeconds: Math.max(3, recordingTimer),
    });
    showToast('Simulated voice note attached');
  };

  const handleVerificationToggle = (key: keyof typeof incident.verification) => {
    updateIncident({
      verification: {
        ...incident.verification,
        [key]: !incident.verification[key],
      },
    });
  };

  const allVerified =
    incident.verification.reportedObservedOnly &&
    incident.verification.markedUncertainty &&
    incident.verification.noDiagnosisMade &&
    incident.verification.reviewedLocationTime &&
    incident.verification.reviewedFinalSummary;

  const handleGenerateHandoff = () => {
    if (!allVerified) {
      showToast('Please check all 5 verification statements before generating handoff.');
      return;
    }

    updateIncident({
      handoffStatus: 'prepared',
    });
    setActiveView('handoff');
    showToast('PREPULSE Handoff Prepared');
  };

  const stepTitles = [
    'Emergency Check',
    'What Happened?',
    'How Many People?',
    'Record Observable Facts',
    'Witness Account',
    'Location & Time',
    'Review & Verify',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Compact 1 → 2 → 3 → 4 → 5 → 6 → 7 Progress Indicator */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 font-mono">
          {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
            <React.Fragment key={num}>
              <button
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep === idx
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-2 ring-red-400'
                    : currentStep > idx
                    ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-950 text-slate-500 hover:text-slate-400'
                }`}
                title={stepTitles[idx]}
              >
                {num}
              </button>
              {idx < 6 && <span className="text-slate-600">→</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">
            Step {currentStep + 1}: <strong className="text-white">{stepTitles[currentStep]}</strong>
          </span>
          <span className="text-slate-600">·</span>
          <span className="font-mono text-amber-400 font-bold">{incident.caseId}</span>
        </div>
      </div>

      {/* STEP 1 — EMERGENCY CHECK */}
      {currentStep === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
                STEP 1 — EMERGENCY CHECK
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Is this a real emergency?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* REAL EMERGENCY OPTION */}
            <button
              type="button"
              onClick={() => handleSelectEmergencyStatus(true)}
              className={`p-5 rounded-xl border text-left transition-all ${
                incident.isRealEmergency === true
                  ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-red-400 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>REAL EMERGENCY</span>
                </span>
                {incident.isRealEmergency === true && (
                  <CheckCircle2 className="w-5 h-5 text-red-400" />
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Contact your local emergency service first. PREPULSE does not provide emergency response."
              </p>
            </button>

            {/* DEMO / TRAINING OPTION */}
            <button
              type="button"
              onClick={() => handleSelectEmergencyStatus(false)}
              className={`p-5 rounded-xl border text-left transition-all ${
                incident.isRealEmergency === false
                  ? 'bg-amber-950/30 border-amber-500 ring-2 ring-amber-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-amber-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>DEMO / TRAINING</span>
                </span>
                {incident.isRealEmergency === false && (
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Use PREPULSE to explore the prototype."
              </p>
            </button>
          </div>

          {/* REAL EMERGENCY PROMINENT INSTRUCTION */}
          {incident.isRealEmergency === true && (
            <div className="p-5 rounded-xl bg-red-950/70 border-2 border-red-500 space-y-4">
              <div className="flex items-start gap-3">
                <AlertOctagon className="w-6 h-6 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    REAL EMERGENCY? Contact your local emergency service first.
                  </h3>
                  <p className="text-sm text-red-200 mt-1 leading-relaxed">
                    PREPULSE does not provide emergency response.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-red-500/30 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-red-300 font-medium">
                  After initiating contact with emergency dispatch:
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-lg text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <span>Continue to PREPARE INFORMATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* DEMO / TRAINING CONTINUATION */}
          {incident.isRealEmergency === false && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  DEMO MODE — No emergency service is contacted.
                </span>
                <span className="text-xs text-slate-400">Safe evaluation sandbox</span>
              </div>
              <p className="text-xs text-slate-300">
                Continue through the 7-step observation flow. All entries will be preserved as Case {incident.caseId}.
              </p>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Step 2: What Happened?</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 2 — WHAT HAPPENED? */}
      {currentStep === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
              STEP 2 — WHAT HAPPENED?
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              What happened?
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select what you observed. Do not diagnose the person's condition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(
              [
                'road_accident',
                'fall',
                'sudden_illness',
                'injury',
                'fire_related',
                'multiple_person',
                'other',
                'not_sure',
              ] as IncidentType[]
            ).map((type) => {
              const isSelected = incident.incidentType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateIncident({ incidentType: type })}
                  className={`min-h-[52px] px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-800 border-red-500 ring-2 ring-red-500/40 text-white font-bold'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-sm">{INCIDENT_TYPE_LABELS[type]}</span>
                  {isSelected && <Check className="w-4 h-4 text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(0)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm shadow transition-all flex items-center gap-2"
            >
              <span>Next: Step 3 — How Many People?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — HOW MANY PEOPLE? */}
      {currentStep === 2 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
              STEP 3 — HOW MANY PEOPLE?
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              How many people appear to need help?
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Options: 1 / 2 / 3 / 4+. A dedicated observation card will be created for each person.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((count) => {
              const isSelected = incident.peopleCount === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setPeopleCount(count)}
                  className={`h-24 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-slate-800 border-red-500 ring-2 ring-red-500/40 text-white font-bold'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-3xl font-mono font-black">
                    {count}
                    {count === 4 ? '+' : ''}
                  </span>
                  <span className="text-xs text-slate-400">
                    {count === 1 ? '1 person' : `${count} people`}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              Currently selected: <strong>{incident.peopleCount} {incident.peopleCount === 1 ? 'person' : 'people'}</strong>.
              In Step 4, you will record facts for Person 1 of {incident.peopleCount}
              {incident.peopleCount > 1 ? ` through Person ${incident.peopleCount} of ${incident.peopleCount}` : ''}.
            </span>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePersonIndex(0);
                setCurrentStep(3);
              }}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm shadow transition-all flex items-center gap-2"
            >
              <span>Next: Step 4 — Record Observable Facts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — WHAT CAN YOU OBSERVE? (RECORD OBSERVABLE FACTS + WHY NOT SURE?) */}
      {currentStep === 3 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
                STEP 4 — WHAT CAN YOU OBSERVE?
              </span>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                Person {activePersonIndex + 1} of {incident.peopleCount}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Record observable facts
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Report what you can actually see. If you cannot tell, choose “Not sure.”
            </p>
            <p className="text-xs text-amber-300 font-mono mt-1">
              “Not sure” is preserved as information. It is never converted into a guess.
            </p>
          </div>

          {/* Multi-person switcher tabs */}
          {incident.peopleCount > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
              {incident.people.map((person, idx) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => setActivePersonIndex(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
                    activePersonIndex === idx
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>
                    Person {person.personNumber} of {incident.peopleCount}
                  </span>
                </button>
              ))}
            </div>
          )}

          {(() => {
            const currentPerson = incident.people[activePersonIndex] || incident.people[0];

            return (
              <div className="space-y-6">
                {/* 1. Consciousness */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-white">
                      Consciousness
                    </label>
                    <span className="text-xs text-slate-400">
                      Does the person appear awake?
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { key: 'appears_awake', label: 'Appears awake' },
                      { key: 'does_not_appear_awake', label: 'Does not appear awake' },
                      { key: 'not_sure', label: 'Not sure' },
                    ].map((opt) => {
                      const selected = currentPerson.consciousness === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() =>
                            updatePersonObservation(
                              currentPerson.personNumber,
                              'consciousness',
                              opt.key as any
                            )
                          }
                          className={`min-h-[48px] px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between ${
                            selected
                              ? opt.key === 'not_sure'
                                ? 'bg-amber-950/40 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                                : 'bg-slate-800 border-red-500 text-white ring-1 ring-red-500 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {selected && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* "Why Not Sure?" feature for consciousness */}
                  {currentPerson.consciousness === 'not_sure' && (
                    <div className="p-3 bg-slate-900/90 rounded-lg border border-amber-500/30 space-y-2 mt-2">
                      <div className="flex items-center justify-between text-xs text-amber-300">
                        <span className="font-semibold flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Why are you unsure? (Optional reason)</span>
                        </span>
                        <span className="text-[11px] text-slate-400">Preserves verified context</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {UNCERTAINTY_REASONS.map((reason) => {
                          const isReasonActive = currentPerson.consciousnessReason === reason;
                          return (
                            <button
                              key={reason}
                              type="button"
                              onClick={() =>
                                setPersonUncertaintyReason(
                                  currentPerson.personNumber,
                                  'consciousness',
                                  reason
                                )
                              }
                              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                                isReasonActive
                                  ? 'bg-amber-400 text-slate-950 font-bold'
                                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                              }`}
                            >
                              {reason}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Breathing */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-white">
                      Breathing
                    </label>
                    <span className="text-xs text-slate-400">
                      Chest rise or audible breath
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { key: 'appears_normal', label: 'Appears normal' },
                      { key: 'does_not_appear_normal', label: 'Does not appear normal' },
                      { key: 'not_sure', label: 'Not sure' },
                      { key: 'cannot_tell', label: 'Cannot tell' },
                    ].map((opt) => {
                      const selected = currentPerson.breathing === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() =>
                            updatePersonObservation(
                              currentPerson.personNumber,
                              'breathing',
                              opt.key as any
                            )
                          }
                          className={`min-h-[48px] px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between ${
                            selected
                              ? opt.key === 'not_sure' || opt.key === 'cannot_tell'
                                ? 'bg-amber-950/40 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                                : 'bg-slate-800 border-red-500 text-white ring-1 ring-red-500 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {selected && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* "Why Not Sure?" feature for breathing */}
                  {(currentPerson.breathing === 'not_sure' ||
                    currentPerson.breathing === 'cannot_tell') && (
                    <div className="p-3 bg-slate-900/90 rounded-lg border border-amber-500/30 space-y-2 mt-2">
                      <div className="flex items-center justify-between text-xs text-amber-300">
                        <span className="font-semibold flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Why are you unsure? (Optional reason)</span>
                        </span>
                        <span className="text-[11px] text-slate-400">e.g. Person is obstructed</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {UNCERTAINTY_REASONS.map((reason) => {
                          const isReasonActive = currentPerson.breathingReason === reason;
                          return (
                            <button
                              key={reason}
                              type="button"
                              onClick={() =>
                                setPersonUncertaintyReason(
                                  currentPerson.personNumber,
                                  'breathing',
                                  reason
                                )
                              }
                              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                                isReasonActive
                                  ? 'bg-amber-400 text-slate-950 font-bold'
                                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                              }`}
                            >
                              {reason}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Major Visible Bleeding */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-white">
                      Major Visible Bleeding
                    </label>
                    <span className="text-xs text-slate-400">
                      Significant pooling or active flow
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['yes', 'no', 'not_sure'].map((opt) => {
                      const selected = currentPerson.majorBleeding === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            updatePersonObservation(
                              currentPerson.personNumber,
                              'majorBleeding',
                              opt as any
                            )
                          }
                          className={`min-h-[48px] px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between ${
                            selected
                              ? opt === 'yes'
                                ? 'bg-red-950/60 border-red-500 text-red-300 ring-1 ring-red-500 font-bold'
                                : opt === 'not_sure'
                                ? 'bg-amber-950/40 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                                : 'bg-slate-800 border-slate-600 text-white font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{BOOLEAN_OBSERVATION_LABELS[opt]}</span>
                          {selected && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* "Why Not Sure?" feature for major visible bleeding */}
                  {currentPerson.majorBleeding === 'not_sure' && (
                    <div className="p-3 bg-slate-900/90 rounded-lg border border-amber-500/30 space-y-2 mt-2">
                      <div className="flex items-center justify-between text-xs text-amber-300">
                        <span className="font-semibold flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Why are you unsure? (Optional reason)</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {UNCERTAINTY_REASONS.map((reason) => {
                          const isReasonActive = currentPerson.majorBleedingReason === reason;
                          return (
                            <button
                              key={reason}
                              type="button"
                              onClick={() =>
                                setPersonUncertaintyReason(
                                  currentPerson.personNumber,
                                  'majorBleeding',
                                  reason
                                )
                              }
                              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                                isReasonActive
                                  ? 'bg-amber-400 text-slate-950 font-bold'
                                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                              }`}
                            >
                              {reason}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Visible Serious Injury */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-white">
                      Visible Serious Injury
                    </label>
                    <span className="text-xs text-slate-400">
                      Obvious deformity, severe trauma
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['yes', 'no', 'not_sure'].map((opt) => {
                      const selected = currentPerson.visibleInjury === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            updatePersonObservation(
                              currentPerson.personNumber,
                              'visibleInjury',
                              opt as any
                            )
                          }
                          className={`min-h-[48px] px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between ${
                            selected
                              ? opt === 'yes'
                                ? 'bg-red-950/60 border-red-500 text-red-300 ring-1 ring-red-500 font-bold'
                                : opt === 'not_sure'
                                ? 'bg-amber-950/40 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                                : 'bg-slate-800 border-slate-600 text-white font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{BOOLEAN_OBSERVATION_LABELS[opt]}</span>
                          {selected && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* "Why Not Sure?" feature for visible injury */}
                  {currentPerson.visibleInjury === 'not_sure' && (
                    <div className="p-3 bg-slate-900/90 rounded-lg border border-amber-500/30 space-y-2 mt-2">
                      <div className="flex items-center justify-between text-xs text-amber-300">
                        <span className="font-semibold flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Why are you unsure? (Optional reason)</span>
                        </span>
                        <span className="text-[11px] text-slate-400">e.g. Poor visibility</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {UNCERTAINTY_REASONS.map((reason) => {
                          const isReasonActive = currentPerson.visibleInjuryReason === reason;
                          return (
                            <button
                              key={reason}
                              type="button"
                              onClick={() =>
                                setPersonUncertaintyReason(
                                  currentPerson.personNumber,
                                  'visibleInjury',
                                  reason
                                )
                              }
                              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                                isReasonActive
                                  ? 'bg-amber-400 text-slate-950 font-bold'
                                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                              }`}
                            >
                              {reason}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Trapped / Unable to Move */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-white">
                      Trapped / Unable to Move Because of Surroundings
                    </label>
                    <span className="text-xs text-slate-400">
                      Pinned by wreckage or debris
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['yes', 'no', 'not_sure'].map((opt) => {
                      const selected = currentPerson.trapped === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            updatePersonObservation(
                              currentPerson.personNumber,
                              'trapped',
                              opt as any
                            )
                          }
                          className={`min-h-[48px] px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between ${
                            selected
                              ? opt === 'yes'
                                ? 'bg-red-950/60 border-red-500 text-red-300 ring-1 ring-red-500 font-bold'
                                : opt === 'not_sure'
                                ? 'bg-amber-950/40 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                                : 'bg-slate-800 border-slate-600 text-white font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{BOOLEAN_OBSERVATION_LABELS[opt]}</span>
                          {selected && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* "Why Not Sure?" feature for trapped */}
                  {currentPerson.trapped === 'not_sure' && (
                    <div className="p-3 bg-slate-900/90 rounded-lg border border-amber-500/30 space-y-2 mt-2">
                      <div className="flex items-center justify-between text-xs text-amber-300">
                        <span className="font-semibold flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Why are you unsure? (Optional reason)</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {UNCERTAINTY_REASONS.map((reason) => {
                          const isReasonActive = currentPerson.trappedReason === reason;
                          return (
                            <button
                              key={reason}
                              type="button"
                              onClick={() =>
                                setPersonUncertaintyReason(
                                  currentPerson.personNumber,
                                  'trapped',
                                  reason
                                )
                              }
                              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                                isReasonActive
                                  ? 'bg-amber-400 text-slate-950 font-bold'
                                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                              }`}
                            >
                              {reason}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {activePersonIndex < incident.peopleCount - 1 ? (
              <button
                type="button"
                onClick={() => setActivePersonIndex((prev) => prev + 1)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-sm shadow transition-all flex items-center gap-2"
              >
                <span>Continue to Person {activePersonIndex + 2} of {incident.peopleCount}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm shadow transition-all flex items-center gap-2"
              >
                <span>Next: Step 5 — Witness Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 5 — WITNESS ACCOUNT */}
      {currentStep === 4 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
                STEP 5 — WITNESS ACCOUNT
              </span>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                Witness description — not medically verified
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              What did you see happen?
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Describe only what you personally observed. Do not diagnose.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Bystander Narrative
              </label>
              <textarea
                rows={3}
                value={incident.witnessDescription}
                onChange={(e) => updateIncident({ witnessDescription: e.target.value })}
                placeholder="Motorbike and car collided near the intersection. One rider was thrown toward the roadside."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Optional voice-note UI with honest simulated prototype labeling */}
            <div className="p-4 sm:p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-blue-400" />
                  <span>Optional voice note — simulated prototype feature</span>
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  Demo only. No real emergency service receives this recording.
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {!isRecordingAudio ? (
                  <button
                    type="button"
                    onClick={handleStartAudioRecord}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
                  >
                    <Mic className="w-4 h-4 text-red-400" />
                    <span>
                      {incident.witnessAudioRecorded
                        ? 'Re-record Simulated Voice Note'
                        : 'Record Simulated Voice Note'}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopAudioRecord}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors animate-pulse"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop ({recordingTimer}s)</span>
                  </button>
                )}

                {incident.witnessAudioRecorded && !isRecordingAudio && (
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
                    <button
                      type="button"
                      onClick={() => {
                        setAudioPlaybackActive(true);
                        setTimeout(() => setAudioPlaybackActive(false), 2500);
                        showToast('Playing simulated voice note sample');
                      }}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <span>
                      {audioPlaybackActive
                        ? 'Playing audio...'
                        : `Simulated audio attached (${incident.witnessAudioDurationSeconds}s)`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm shadow transition-all flex items-center gap-2"
            >
              <span>Next: Step 6 — Location & Time</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 — LOCATION & TIME */}
      {currentStep === 5 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
                STEP 6 — LOCATION & TIME
              </span>
              <span className="text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                SIMULATED DEMO LOCATION · SIMULATED DEMO TIME
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Where and when did this happen?
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              For demo mode, a clearly fictional intersection is used. No actual personal location is exposed.
            </p>
          </div>

          {/* Location & Nearest Landmark Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={incident.location.address}
                  onChange={(e) =>
                    updateIncident({
                      location: { ...incident.location, address: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-semibold focus:outline-none focus:border-red-500"
                />
                <span className="text-[11px] text-amber-400/90 font-mono block mt-1">
                  SIMULATED DEMO LOCATION
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Nearest Landmark / Cross Streets
                </label>
                <input
                  type="text"
                  value={incident.location.crossStreets}
                  onChange={(e) =>
                    updateIncident({
                      location: { ...incident.location, crossStreets: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-semibold focus:outline-none focus:border-red-500"
                />
                <span className="text-[11px] text-slate-500 block mt-1">
                  e.g. Main St & 2nd Ave
                </span>
              </div>
            </div>

            {/* Time block */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-xs text-slate-400 font-mono uppercase">
                    Incident Time
                  </div>
                  <div className="text-lg font-mono font-bold text-white">
                    {incident.reportedAtTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Edit time:</span>
                <input
                  type="text"
                  value={incident.reportedAtTime}
                  onChange={(e) => updateIncident({ reportedAtTime: e.target.value })}
                  className="w-24 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-white text-center focus:outline-none focus:border-red-500 font-bold"
                />
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                  SIMULATED DEMO TIME
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(6)}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-sm shadow transition-all flex items-center gap-2"
            >
              <span>Next: Step 7 — Review & Verify</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7 — REVIEW & VERIFY */}
      {currentStep === 6 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
              STEP 7 — REVIEW & VERIFY
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Review your observations
            </h2>
            <p className="text-sm text-slate-300">
              PREPULSE has organized what you entered. It has not diagnosed the situation.
            </p>
          </div>

          {/* Clean Incident Card Render */}
          <IncidentCard incident={incident} />

          {/* 5-item Verify Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Verify Before Handoff</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Confirm observational compliance before preparing the final handoff:
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  key: 'reportedObservedOnly',
                  label: 'I reported what I actually observed.',
                },
                {
                  key: 'markedUncertainty',
                  label: 'I marked uncertainty where I could not tell.',
                },
                {
                  key: 'noDiagnosisMade',
                  label: 'I did not make a medical diagnosis.',
                },
                {
                  key: 'reviewedLocationTime',
                  label: 'I reviewed the location and time.',
                },
                {
                  key: 'reviewedFinalSummary',
                  label: 'I reviewed the final incident summary.',
                },
              ].map((item) => {
                const checked =
                  incident.verification[item.key as keyof typeof incident.verification];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleVerificationToggle(item.key as any)}
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3 ${
                      checked
                        ? 'bg-emerald-950/30 border-emerald-500/80 text-emerald-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                        checked
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-600 bg-slate-900'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>{checked ? '☑' : '☐'} {item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5 self-start"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Location & Time</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateHandoff}
                disabled={!allVerified}
                className={`px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all ${
                  allVerified
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 cursor-pointer active:scale-95'
                    : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                }`}
              >
                <span>Generate Handoff</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
