import { IncidentState, PersonObservation, UncertaintyReason } from '../types/incident';

export const INCIDENT_TYPE_LABELS: Record<string, string> = {
  road_accident: 'Road accident',
  fall: 'Fall',
  sudden_illness: 'Sudden illness',
  injury: 'Injury',
  fire_related: 'Fire-related incident',
  multiple_person: 'Multiple-person incident',
  other: 'Other',
  not_sure: 'Not sure',
};

export const CONSCIOUSNESS_LABELS: Record<string, string> = {
  appears_awake: 'Appears awake',
  does_not_appear_awake: 'Does not appear awake',
  not_sure: 'Not sure',
};

export const BREATHING_LABELS: Record<string, string> = {
  appears_normal: 'Appears normal',
  does_not_appear_normal: 'Does not appear normal',
  not_sure: 'Not sure',
  cannot_tell: 'Cannot tell',
};

export const BOOLEAN_OBSERVATION_LABELS: Record<string, string> = {
  yes: 'Yes',
  no: 'No',
  not_sure: 'Not sure',
};

export const UNCERTAINTY_REASONS: UncertaintyReason[] = [
  'Poor visibility',
  'Person obstructed',
  'Scene unsafe',
  'Cannot tell',
  'Other',
];

export const createDefaultPerson = (personNumber: number): PersonObservation => ({
  id: `person-${personNumber}`,
  personNumber,
  consciousness: 'not_sure',
  breathing: 'not_sure',
  majorBleeding: 'not_sure',
  visibleInjury: 'not_sure',
  trapped: 'not_sure',
});

// Exact DEMO SCENARIO specified in section 2
export const INITIAL_DEMO_INCIDENT: IncidentState = {
  caseId: 'PP-4821', // SINGLE SOURCE OF TRUTH, NEVER CHANGES ARBITRARILY
  isRealEmergency: false,
  isDemoMode: true,
  reportedAtTime: '16:25',
  incidentType: 'road_accident',
  peopleCount: 1,
  people: [
    {
      id: 'person-1',
      personNumber: 1,
      consciousness: 'appears_awake',
      breathing: 'not_sure',
      breathingReason: 'Person obstructed',
      majorBleeding: 'yes',
      visibleInjury: 'not_sure',
      visibleInjuryReason: 'Poor visibility',
      trapped: 'no',
      additionalNote: 'Rider thrown to shoulder, helmet still on.',
    },
  ],
  witnessDescription:
    'Motorbike and car collided near the intersection. One rider was thrown toward the roadside.',
  witnessAudioRecorded: true,
  witnessAudioDurationSeconds: 12,
  location: {
    address: 'Demo Intersection',
    crossStreets: 'Main St & 2nd Ave',
    coordinates: { lat: 47.6042, lng: -122.3312 },
    accuracyText: 'Fictional demo intersection marker',
    isCurrentLocation: false,
    isDemoLocation: true,
  },
  verification: {
    reportedObservedOnly: true,
    markedUncertainty: true,
    noDiagnosisMade: true,
    reviewedLocationTime: true,
    reviewedFinalSummary: true,
  },
  handoffStatus: 'prepared',
  responderInfo: {
    acknowledged: false,
    acknowledgedAt: null,
    handedOffAt: null,
    unitId: 'Field Unit',
  },
  receivingTeamInfo: {
    etaMinutes: 6,
    triageBay: 'Receiving Bay 2',
    reviewedByTeam: false,
  },
  timeline: [
    {
      id: 'tl-1',
      timeFormatted: '16:25',
      title: 'Incident reported',
      detail: 'Bystander initiated PREPULSE observation capture at scene',
      actor: 'Bystander',
      isCompleted: true,
    },
    {
      id: 'tl-2',
      timeFormatted: '16:26',
      title: 'Observations recorded',
      detail: 'Observable facts recorded. Uncertainties marked with reasons.',
      actor: 'Bystander',
      isCompleted: true,
    },
    {
      id: 'tl-3',
      timeFormatted: '16:27',
      title: 'Incident card generated',
      detail: 'Observations structured into verified incident card.',
      actor: 'Bystander',
      isCompleted: true,
    },
    {
      id: 'tl-4',
      timeFormatted: '16:28',
      title: 'Handoff prepared',
      detail: 'Structured handoff card ready for professional responder review.',
      actor: 'Bystander',
      isCompleted: true,
    },
    {
      id: 'tl-5',
      timeFormatted: '16:29',
      title: 'Responder view acknowledged',
      detail: 'Responder acknowledged handoff during simulated demonstration.',
      actor: 'EMS Responder',
      isCompleted: false,
    },
  ],
};

export const createBlankIncident = (): IncidentState => {
  return {
    caseId: 'PP-4821', // Maintain same case ID or create blank within same stable identity
    isRealEmergency: false,
    isDemoMode: true,
    reportedAtTime: '16:25',
    incidentType: 'road_accident', // Default to a valid selection so user doesn't end up with "Not sure" accidentally
    peopleCount: 1,
    people: [createDefaultPerson(1)],
    witnessDescription: '',
    witnessAudioRecorded: false,
    witnessAudioDurationSeconds: 0,
    location: {
      address: 'Demo Intersection',
      crossStreets: 'Main St & 2nd Ave',
      coordinates: { lat: 47.6042, lng: -122.3312 },
      accuracyText: 'Simulated location marker',
      isCurrentLocation: false,
      isDemoLocation: true,
    },
    verification: {
      reportedObservedOnly: false,
      markedUncertainty: false,
      noDiagnosisMade: false,
      reviewedLocationTime: false,
      reviewedFinalSummary: false,
    },
    handoffStatus: 'prepared',
    responderInfo: {
      acknowledged: false,
      acknowledgedAt: null,
      handedOffAt: null,
      unitId: 'Field Unit',
    },
    receivingTeamInfo: {
      etaMinutes: 6,
      triageBay: 'Receiving Bay 2',
      reviewedByTeam: false,
    },
    timeline: [
      {
        id: 'tl-1',
        timeFormatted: '16:25',
        title: 'Incident reported',
        detail: 'Bystander initiated PREPULSE observation capture at scene',
        actor: 'Bystander',
        isCompleted: true,
      },
      {
        id: 'tl-2',
        timeFormatted: '16:26',
        title: 'Observations recorded',
        detail: 'Observable facts recorded. Uncertainties marked with reasons.',
        actor: 'Bystander',
        isCompleted: false,
      },
      {
        id: 'tl-3',
        timeFormatted: '16:27',
        title: 'Incident card generated',
        detail: 'Observations structured into verified incident card.',
        actor: 'Bystander',
        isCompleted: false,
      },
      {
        id: 'tl-4',
        timeFormatted: '16:28',
        title: 'Handoff prepared',
        detail: 'Structured handoff card ready for professional responder review.',
        actor: 'Bystander',
        isCompleted: false,
      },
      {
        id: 'tl-5',
        timeFormatted: '16:29',
        title: 'Responder view acknowledged',
        detail: 'Responder acknowledged handoff during simulated demonstration.',
        actor: 'EMS Responder',
        isCompleted: false,
      },
    ],
  };
};
