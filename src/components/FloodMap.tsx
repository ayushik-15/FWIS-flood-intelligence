import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { floodReports, type FloodReport } from '@/data/mockData';

const markerColors: Record<string, string> = {
  high: '#f43f5e',
  moderate: '#f59e0b',
  low: '#10b981',
};

const levelLabels: Record<string, string> = {
  high: 'High Hazard',
  moderate: 'Moderate Hazard',
  low: 'Low Hazard',
};

function createDivIcon(color: string, pulsing: boolean = false) {
  const pulseClass = pulsing ? 'marker-pulse' : '';
  return L.divIcon({
    className: `custom-marker ${pulseClass}`,
    html: `<div style="
      width: ${pulsing ? '20px' : '18px'};
      height: ${pulsing ? '20px' : '18px'};
      border-radius: 50%;
      background: ${color};
      border: 2px solid rgba(255,255,255,0.7);
      box-shadow: 0 0 12px ${color}, 0 0 4px ${color};
    "></div>`,
    iconSize: [pulsing ? 20 : 18, pulsing ? 20 : 18],
    iconAnchor: [pulsing ? 10 : 9, pulsing ? 10 : 9],
    popupAnchor: [0, -10],
  });
}

function buildPopupHtml(report: FloodReport, color: string) {
  return `
    <div style="font-family: system-ui, sans-serif; min-width: 200px; background: #0f172a; color: #e2e8f0; padding: 4px;">
      <div style="font-size: 13px; font-weight: 700; color: #f8fafc; margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
        ${report.location}
      </div>
      <div style="font-size: 11px; color: #94a3b8; margin-bottom: 2px;">Water Depth</div>
      <div style="font-size: 15px; font-weight: 700; color: #38bdf8; margin-bottom: 6px;">${report.waterDepth} cm</div>
      <div style="font-size: 11px; color: #94a3b8; margin-bottom: 2px;">Ingestion Source</div>
      <div style="font-size: 12px; color: #cbd5e1; margin-bottom: 6px;">${report.source}</div>
      <div style="display: inline-block; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 20px; background: ${color}33; color: ${color};">
        ${levelLabels[report.hazardLevel]}
      </div>
    </div>
  `;
}

interface FloodMapProps {
  newReport: FloodReport | null;
}

export default function FloodMap({ newReport }: FloodMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const newMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [28.6104, 77.0937],
      zoom: 14,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    floodReports.forEach((report) => {
      const color = markerColors[report.hazardLevel];
      const marker = L.marker([report.lat, report.lng], {
        icon: createDivIcon(color),
      }).addTo(map);

      marker.bindPopup(buildPopupHtml(report, color));
    });

    mapInstance.current = map;

    setTimeout(() => map.invalidateSize(), 200);

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!newReport || !mapInstance.current) return;

    if (newMarkerRef.current) {
      newMarkerRef.current.remove();
    }

    const color = markerColors[newReport.hazardLevel];
    const marker = L.marker([newReport.lat, newReport.lng], {
      icon: createDivIcon(color, true),
    }).addTo(mapInstance.current);

    marker.bindPopup(buildPopupHtml(newReport, color));
    marker.addTo(mapInstance.current);

    mapInstance.current.flyTo([newReport.lat, newReport.lng], 16, {
      duration: 1.2,
    });

    setTimeout(() => marker.openPopup(), 1400);

    newMarkerRef.current = marker;
  }, [newReport]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 z-[400] flex flex-col gap-1.5 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5">
        <span className="text-xs font-semibold text-slate-300 mb-0.5">Hazard Legend</span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
          <span className="text-xs text-slate-400">High</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
          <span className="text-xs text-slate-400">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          <span className="text-xs text-slate-400">Low</span>
        </div>
      </div>
    </div>
  );
}
