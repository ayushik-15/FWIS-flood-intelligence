import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import FloodMap from '@/components/FloodMap';
import ActivityLog from '@/components/ActivityLog';
import type { FloodReport } from '@/data/mockData';

function App() {
  const [newReport, setNewReport] = useState<FloodReport | null>(null);

  const handleAnalysisComplete = useCallback(() => {
    setNewReport({
      id: 'analysis-' + Date.now(),
      lat: 28.6092,
      lng: 77.0937,
      location: 'Sector 17 Underpass',
      waterDepth: 38,
      hazardLevel: 'high',
      timestamp: '2026-10-01 10:05',
      source: 'Citizen Upload',
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-rose-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <Header />

        {/* Main content area: left panel + map */}
        <div className="flex flex-col gap-4 p-4 sm:p-6 lg:flex-row lg:items-stretch">
          {/* Left Control Panel */}
          <div className="w-full lg:w-[340px] lg:flex-shrink-0">
            <ControlPanel onAnalysisComplete={handleAnalysisComplete} />
          </div>

          {/* Map */}
          <div className="flex-1 min-h-[400px] lg:min-h-[560px]">
            <FloodMap newReport={newReport} />
          </div>
        </div>

        {/* Bottom Activity Log */}
        <div className="px-4 pb-6 sm:px-6">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
}

export default App;
