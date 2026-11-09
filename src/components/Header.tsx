import React from 'react';
import { useIncident } from '../context/IncidentContext';
import { ActiveView } from '../types/incident';
import { ShieldAlert, Sun, Moon, Play } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isDarkMode,
    toggleDarkMode,
    resetToBlank,
    loadDemoScenario,
  } = useIncident();

  const navLinks: { id: ActiveView; label: string }[] = [
    { id: 'landing', label: 'Overview' },
    { id: 'handoff', label: 'Incident Card' },
    { id: 'responder', label: 'Responder View' },
    { id: 'hospital', label: 'Receiving Team' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'privacy', label: 'Privacy & Safety' },
  ];

  const handleLoadDemo = () => {
    loadDemoScenario();
    setActiveView('handoff');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 dark:bg-black/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Bar: Brand, 6 clean links, controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => setActiveView('landing')}
          className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:bg-red-500 transition-colors">
            <span className="text-base font-black">P</span>
          </div>
          <span className="font-display font-black tracking-wider text-white">PREPULSE</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveView(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive ? 'text-white font-semibold' : 'hover:text-white text-slate-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Secondary demo control: Load Demo */}
          <button
            type="button"
            onClick={handleLoadDemo}
            className="px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="Load complete PP-4821 demo scenario for instant review"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Load Demo</span>
          </button>

          {/* Primary Action: Start an Incident */}
          <button
            type="button"
            onClick={resetToBlank}
            className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-md shadow-red-600/30 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-95"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Start an Incident</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle Field Theme"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Scroller */}
      <div className="lg:hidden flex items-center gap-3 overflow-x-auto px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 text-xs">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveView(link.id)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors ${
              activeView === link.id
                ? 'bg-red-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
};
