import { Clock, MapPin, Droplets, AlertTriangle, Video } from 'lucide-react';
import { floodReports } from '@/data/mockData';

const levelStyles: Record<string, { badge: string; label: string }> = {
  high: { badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30', label: 'High' },
  moderate: { badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30', label: 'Moderate' },
  low: { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', label: 'Low' },
};

const sourceIcon: Record<string, typeof Video> = {
  'CCTV Node #04': Video,
  'Citizen Upload': MapPin,
  'Passenger App': Droplets,
};

export default function ActivityLog() {
  return (
    <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
          <Clock className="w-4 h-4 text-emerald-400" />
          Recent Activity Log
        </h2>
        <span className="text-xs text-slate-500">{floodReports.length} reports</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Timestamp</th>
              <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Location</th>
              <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Est. Depth</th>
              <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Hazard Level</th>
              <th className="px-5 py-3 text-xs font-medium text-slate-400 whitespace-nowrap">Ingestion Source</th>
            </tr>
          </thead>
          <tbody>
            {floodReports.map((report) => {
              const style = levelStyles[report.hazardLevel];
              const Icon = sourceIcon[report.source] || AlertTriangle;
              return (
                <tr
                  key={report.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-5 py-3.5 text-xs text-slate-300 whitespace-nowrap font-mono">
                    {report.timestamp}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-200 whitespace-nowrap">
                    {report.location}
                  </td>
                  <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                    <span className="font-semibold text-cyan-300">{report.waterDepth} cm</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-full border text-xs font-semibold ${style.badge}`}>
                      {style.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <Icon className="w-3.5 h-3.5" />
                      {report.source}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
