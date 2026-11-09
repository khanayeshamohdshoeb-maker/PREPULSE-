import React from 'react';
import { useIncident } from '../context/IncidentContext';
import { ShieldCheck, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useIncident();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-auto no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Mission Statement */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center text-white text-xs font-black">
            P
          </div>
          <div>
            <span className="font-bold text-slate-200">PREPULSE</span>
            <span className="text-slate-500 mx-2">·</span>
            <span className="text-slate-400">
              Don't diagnose. Don't guess. Capture what matters.
            </span>
          </div>
        </div>

        {/* Quiet links */}
        <div className="flex items-center gap-5 text-slate-400">
          <button
            type="button"
            onClick={() => setActiveView('privacy')}
            className="hover:text-white transition-colors"
          >
            Privacy & Safety Notice
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => setActiveView('timeline')}
            className="hover:text-white transition-colors"
          >
            Simulated Timeline
          </button>
          <span>·</span>
          <span className="text-slate-500">
            Prototype Only · Not Connected to 911
          </span>
        </div>
      </div>
    </footer>
  );
};
