import { Radio, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-10 flex flex-col gap-4 px-6 py-5 border-b border-white/5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-500/20">
          <Radio className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
            FWIS <span className="text-emerald-400">|</span> Real-time Flood Hazard Dashboard
          </h1>
          <p className="text-xs text-slate-400">Team Vision Grid</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold text-emerald-300">
            System Active — 14 Live Nodes
          </span>
        </div>
        <div className="hidden items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 sm:flex">
          <Activity className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-300">v2.1</span>
        </div>
      </div>
    </header>
  );
}
