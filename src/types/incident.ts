export type IncidentType =
  | 'road_accident'
  | 'fall'
  | 'sudden_illness'
  | 'injury'
  | 'fire_related'
  | 'multiple_person'
  | 'other'
  | 'not_sure';

export type UncertaintyReason =
  | 'Poor visibility'
  | 'Person obstructed'
  | 'Scene unsafe'
  | 'Cannot tell'
  | 'Other';

export interface PersonObservation {
  id: string;
  personNumber: number;
  consciousness: 'appears_awake' | 'does_not_appear_awake' | 'not_sure';
  consciousnessReason?: UncertaintyReason;
  breathing: 'appears_normal' | 'does_not_appear_normal' | 'not_sure' | 'cannot_tell';
  breathingReason?: UncertaintyReason;
  majorBleeding: 'yes' | 'no' | 'not_sure';
  majorBleedingReason?: UncertaintyReason;
  visibleInjury: 'yes' | 'no' | 'not_sure';
  visibleInjuryReason?: UncertaintyReason;
  trapped: 'yes' | 'no' | 'not_sure';
  trappedReason?: UncertaintyReason;
  additionalNote?: string;
}

export interface TimelineEvent {
  id: string;
  timeFormatted: string;
  title: string;
  detail: string;
  actor: 'Bystander' | 'System' | 'EMS Responder' | 'Receiving Team';
  isCompleted: boolean;
}

export interface IncidentState {
  caseId: string; // e.g. "PP-4821" - SINGLE SOURCE OF TRUTH, NEVER CHANGES ARBITRARILY
  isRealEmergency: boolean | null;
  isDemoMode: boolean;
  reportedAtTime: string; // e.g. "16:25"
  incidentType: IncidentType;
  customIncidentType?: string;
  peopleCount: number; // 1, 2, 3, 4
  people: PersonObservation[];
  witnessDescription: string;
  witnessAudioRecorded: boolean;
  witnessAudioDurationSeconds: number;
  location: {
    address: string; // e.g. "Demo Intersection"
    crossStreets: string; // e.g. "Main St & 2nd Ave"
    coordinates: { lat: number; lng: number };
    accuracyText: string;
    isCurrentLocation: boolean;
    isDemoLocation: boolean;
  };
  verification: {
    reportedObservedOnly: boolean;
    markedUncertainty: boolean;
    noDiagnosisMade: boolean;
    reviewedLocationTime: boolean;
    reviewedFinalSummary: boolean;
  };
  handoffStatus: 'prepared' | 'reviewed' | 'received';
  responderInfo: {
    acknowledged: boolean;
    acknowledgedAt: string | null;
    handedOffAt: string | null;
    unitId: string | null;
  };
  receivingTeamInfo: {
    etaMinutes: number;
    triageBay: string;
    reviewedByTeam: boolean;
  };
  timeline: TimelineEvent[];
}

export type ActiveView =
  | 'landing'
  | 'wizard'
  | 'handoff'
  | 'responder'
  | 'hospital'
  | 'timeline'
  | 'privacy';
