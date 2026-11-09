import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ShieldCheck } from 'lucide-react';

interface InteractiveMapProps {
  location: {
    address: string;
    crossStreets: string;
    coordinates: { lat: number; lng: number };
    accuracyText: string;
    isCurrentLocation: boolean;
    isDemoLocation?: boolean;
  };
  onChange: (updated: {
    address: string;
    crossStreets: string;
    coordinates: { lat: number; lng: number };
    accuracyText: string;
    isCurrentLocation: boolean;
    isDemoLocation: boolean;
  }) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ location, onChange }) => {
  const [mapType, setMapType] = useState<'street' | 'tactical'>('street');
  const [isLocating, setIsLocating] = useState(false);

  const presets = [
    {
      name: 'Demo Intersection',
      crossStreets: 'Main St & 2nd Ave',
      lat: 47.6042,
      lng: -122.3312,
    },
    {
      name: 'Harbor Blvd & Terminal 5',
      crossStreets: 'Industrial Zone Gate 2 entrance',
      lat: 47.5812,
      lng: -122.3619,
    },
    {
      name: 'West End Plaza',
      crossStreets: 'Market St & 7th Ave',
      lat: 47.6101,
      lng: -122.3385,
    },
  ];

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          onChange({
            address: `Device GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
            crossStreets: 'Near current physical location (consent granted)',
            coordinates: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
            accuracyText: `Within ~${Math.round(pos.coords.accuracy || 15)}m`,
            isCurrentLocation: true,
            isDemoLocation: false,
          });
        },
        () => {
          setIsLocating(false);
          onChange({
            address: 'Demo Intersection',
            crossStreets: 'Main St & 2nd Ave',
            coordinates: { lat: 47.6042, lng: -122.3312 },
            accuracyText: 'Simulated Demo Location Marker',
            isCurrentLocation: false,
            isDemoLocation: true,
          });
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
      onChange({
        address: 'Demo Intersection',
        crossStreets: 'Main St & 2nd Ave',
        coordinates: { lat: 47.6042, lng: -122.3312 },
        accuracyText: 'Simulated Demo Location Marker',
        isCurrentLocation: false,
        isDemoLocation: true,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Search / Preset bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-red-500" />
          <input
            type="text"
            value={location.address}
            onChange={(e) =>
              onChange({
                ...location,
                address: e.target.value,
                isDemoLocation: location.isDemoLocation ?? true,
              })
            }
            placeholder="Location name..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500 text-sm"
          />
        </div>

        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white rounded-lg border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
        >
          <Navigation className={`w-3.5 h-3.5 text-blue-400 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? 'Locating...' : 'Use Current Location'}</span>
        </button>
      </div>

      {/* Cross streets description */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">
          Nearest Landmark / Cross Streets
        </label>
        <input
          type="text"
          value={location.crossStreets}
          onChange={(e) =>
            onChange({
              ...location,
              crossStreets: e.target.value,
              isDemoLocation: location.isDemoLocation ?? true,
            })
          }
          placeholder="e.g. Main St & 2nd Ave"
          className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-600 text-xs focus:outline-none focus:border-red-500"
        />
      </div>

      {/* Presets quick buttons */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 text-[11px] font-medium mr-1">Demo presets:</span>
        {presets.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() =>
              onChange({
                address: p.name,
                crossStreets: p.crossStreets,
                coordinates: { lat: p.lat, lng: p.lng },
                accuracyText: 'Preset incident node',
                isCurrentLocation: false,
                isDemoLocation: true,
              })
            }
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] transition-colors"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Interactive Map Visual Area */}
      <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-inner select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={mapType === 'tactical' ? '#090d16' : '#0f172a'} />
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.6" />

          {/* Simulated Avenue Roads */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#334155" strokeWidth="32" strokeLinecap="round" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#475569" strokeWidth="28" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.4" />

          {/* Cross Street */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#334155" strokeWidth="32" strokeLinecap="round" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#475569" strokeWidth="28" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.4" />

          {/* Street Name Labels */}
          <text x="18" y="47%" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
            MAIN STREET
          </text>
          <text x="52%" y="30" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
            2ND AVENUE
          </text>

          {/* Radar ripple at scene location */}
          <circle cx="50%" cy="50%" r="28" fill="#ef4444" opacity="0.15" />
          <circle cx="50%" cy="50%" r="48" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        </svg>

        {/* Center Incident Pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none drop-shadow-lg">
          <div className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold shadow-md uppercase tracking-wider mb-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>DEMO SCENE</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center p-1 border border-red-500/40">
            <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white">
              <MapPin className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Map Type Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-md p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setMapType('street')}
            className={`px-2 py-1 rounded font-medium transition-colors ${
              mapType === 'street' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Street Map
          </button>
          <button
            type="button"
            onClick={() => setMapType('tactical')}
            className={`px-2 py-1 rounded font-medium transition-colors ${
              mapType === 'tactical' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tactical Dark
          </button>
        </div>

        {/* Coordinate badge at bottom left */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 rounded px-2.5 py-1 text-[11px] font-mono text-slate-300 flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {location.coordinates.lat.toFixed(4)}° N, {Math.abs(location.coordinates.lng).toFixed(4)}° W
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-amber-400 font-sans">SIMULATED DEMO LOCATION</span>
        </div>
      </div>

      {/* Notice */}
      <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/40 border border-slate-800 rounded-lg px-3 py-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="font-medium text-slate-300">
          Location captured for incident handoff. (SIMULATED DEMO LOCATION: Main St & 2nd Ave)
        </span>
      </div>
    </div>
  );
};
