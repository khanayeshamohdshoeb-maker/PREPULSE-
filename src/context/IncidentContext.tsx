import React, { createContext, useContext, useState, useEffect } from 'react';
import { IncidentState, ActiveView, PersonObservation, UncertaintyReason } from '../types/incident';
import { INITIAL_DEMO_INCIDENT, createBlankIncident, createDefaultPerson } from '../utils/constants';

interface IncidentContextType {
  incident: IncidentState;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;
  updateIncident: (updates: Partial<IncidentState>) => void;
  updatePersonObservation: <K extends keyof PersonObservation>(
    personNumber: number,
    key: K,
    value: PersonObservation[K]
  ) => void;
  setPersonUncertaintyReason: (
    personNumber: number,
    field: 'consciousness' | 'breathing' | 'majorBleeding' | 'visibleInjury' | 'trapped',
    reason: UncertaintyReason
  ) => void;
  setPeopleCount: (count: number) => void;
  loadDemoScenario: () => void;
  resetToBlank: () => void;
  acknowledgeByResponder: () => void;
  markHandoffReceived: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // SINGLE SOURCE OF TRUTH: All screens read & write this exact state object
  const [incident, setIncident] = useState<IncidentState>(INITIAL_DEMO_INCIDENT);
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current));
    }, 3200);
  };

  const updateIncident = (updates: Partial<IncidentState>) => {
    setIncident(prev => ({ ...prev, ...updates }));
  };

  const setPeopleCount = (count: number) => {
    setIncident(prev => {
      const currentPeople = [...prev.people];
      if (count > currentPeople.length) {
        for (let i = currentPeople.length + 1; i <= count; i++) {
          currentPeople.push(createDefaultPerson(i));
        }
      } else if (count < currentPeople.length) {
        currentPeople.length = count;
      }
      return {
        ...prev,
        peopleCount: count,
        people: currentPeople,
      };
    });
  };

  const updatePersonObservation = <K extends keyof PersonObservation>(
    personNumber: number,
    key: K,
    value: PersonObservation[K]
  ) => {
    setIncident(prev => {
      const updatedPeople = prev.people.map(p => {
        if (p.personNumber === personNumber) {
          const updated = { ...p, [key]: value };
          // If toggled away from not_sure/cannot_tell, clean up reason
          if (key === 'breathing' && value !== 'not_sure' && value !== 'cannot_tell') {
            delete updated.breathingReason;
          }
          if (key === 'consciousness' && value !== 'not_sure') {
            delete updated.consciousnessReason;
          }
          if (key === 'majorBleeding' && value !== 'not_sure') {
            delete updated.majorBleedingReason;
          }
          if (key === 'visibleInjury' && value !== 'not_sure') {
            delete updated.visibleInjuryReason;
          }
          if (key === 'trapped' && value !== 'not_sure') {
            delete updated.trappedReason;
          }
          return updated;
        }
        return p;
      });
      return {
        ...prev,
        people: updatedPeople,
      };
    });
  };

  const setPersonUncertaintyReason = (
    personNumber: number,
    field: 'consciousness' | 'breathing' | 'majorBleeding' | 'visibleInjury' | 'trapped',
    reason: UncertaintyReason
  ) => {
    const reasonKeyMap = {
      consciousness: 'consciousnessReason',
      breathing: 'breathingReason',
      majorBleeding: 'majorBleedingReason',
      visibleInjury: 'visibleInjuryReason',
      trapped: 'trappedReason',
    } as const;

    const reasonKey = reasonKeyMap[field];

    setIncident(prev => ({
      ...prev,
      people: prev.people.map(p => {
        if (p.personNumber === personNumber) {
          return { ...p, [reasonKey]: reason };
        }
        return p;
      }),
    }));
  };

  const loadDemoScenario = () => {
    setIncident({ ...INITIAL_DEMO_INCIDENT });
    showToast('Loaded Demo Scenario: Road accident (PP-4821)');
  };

  const resetToBlank = () => {
    const blank = createBlankIncident();
    setIncident(blank);
    setActiveView('wizard');
    showToast('Started incident report (PP-4821)');
  };

  const acknowledgeByResponder = () => {
    setIncident(prev => {
      const updatedTimeline = prev.timeline.map(item => {
        if (item.title.toLowerCase().includes('responder') || item.timeFormatted === '16:29') {
          return { ...item, isCompleted: true };
        }
        return item;
      });

      return {
        ...prev,
        handoffStatus: 'reviewed',
        responderInfo: {
          ...prev.responderInfo,
          acknowledged: true,
          acknowledgedAt: '16:29',
        },
        timeline: updatedTimeline,
      };
    });
    showToast('HANDOFF ACKNOWLEDGED — SIMULATION');
  };

  const markHandoffReceived = () => {
    setIncident(prev => ({
      ...prev,
      handoffStatus: 'received',
      responderInfo: {
        ...prev.responderInfo,
        handedOffAt: '16:30',
      },
    }));
    showToast('Handoff Received by Primary Triage Crew');
  };

  return (
    <IncidentContext.Provider
      value={{
        incident,
        activeView,
        setActiveView,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
        updateIncident,
        updatePersonObservation,
        setPersonUncertaintyReason,
        setPeopleCount,
        loadDemoScenario,
        resetToBlank,
        acknowledgeByResponder,
        markHandoffReceived,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncident = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncident must be used within an IncidentProvider');
  }
  return context;
};
