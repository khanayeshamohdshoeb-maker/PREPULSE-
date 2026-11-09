import React from 'react';
import { IncidentProvider, useIncident } from './context/IncidentContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { IncidentWizard } from './components/flow/IncidentWizard';
import { HandoffMode } from './components/HandoffMode';
import { ResponderView } from './components/ResponderView';
import { HospitalView } from './components/HospitalView';
import { TimelineView } from './components/TimelineView';
import { PrivacyPage } from './components/PrivacyPage';
import { CheckCircle2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeView, toastMessage } = useIncident();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-red-600 selection:text-white font-sans antialiased">
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Strict Top Bar Contract Header */}
      <Header />

      {/* Main Viewport Container */}
      <main className="flex-1">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'wizard' && <IncidentWizard />}
        {activeView === 'handoff' && <HandoffMode />}
        {activeView === 'responder' && <ResponderView />}
        {activeView === 'hospital' && <HospitalView />}
        {activeView === 'timeline' && <TimelineView />}
        {activeView === 'privacy' && <PrivacyPage />}
      </main>

      {/* Quiet Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <IncidentProvider>
      <MainAppContent />
    </IncidentProvider>
  );
}
