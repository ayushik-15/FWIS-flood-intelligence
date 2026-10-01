import { useRef, useState } from 'react';
import { Upload, Ruler, MapPin, BadgeCheck, Gauge, ImageIcon, Trash2, CheckCircle2 } from 'lucide-react';

interface ChiResult {
  waterDepth: string;
  location: string;
  exifStatus: string;
}

interface AnalyzedVehicle {
  icon: string;
  type: string;
  status: string;
  dot: string;
  color: 'rose' | 'amber';
}

interface ControlPanelProps {
  onAnalysisComplete: () => void;
}

const defaultVehicles: AnalyzedVehicle[] = [
  { icon: '🏍️', type: 'Two-Wheeler', status: 'Impassable', dot: '🔴', color: 'rose' },
  { icon: '🚗', type: 'Sedan / Hatchback', status: 'Moderate Clearance Hazard', dot: '🟡', color: 'amber' },
  { icon: '🚙', type: 'SUV / Commercial', status: 'Low Risk — Proceed with caution', dot: '🟢', color: 'amber' },
];

const analyzedVehicles: AnalyzedVehicle[] = [
  { icon: '🏍️', type: 'Two-Wheeler', status: 'High Hazard (Impassable)', dot: '🔴', color: 'rose' },
  { icon: '🚗', type: 'Sedan / Hatchback', status: 'High Hazard (Air Intake Risk)', dot: '🔴', color: 'rose' },
  { icon: '🚙', type: 'SUV / Commercial', status: 'Moderate Clearance Risk', dot: '🟡', color: 'amber' },
];

export default function ControlPanel({ onAnalysisComplete }: ControlPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const defaultChi: ChiResult = {
    waterDepth: '~32 cm',
    location: 'Sector 17 Underpass',
    exifStatus: 'Verified',
  };

  const analyzedChi: ChiResult = {
    waterDepth: '~38 cm',
    location: 'Sector 17 Underpass (GPS Verified)',
    exifStatus: '✅ Authenticated',
  };

  const chi = showResult ? analyzedChi : defaultChi;
  const vehicles = showResult ? analyzedVehicles : defaultVehicles;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setShowResult(false);
    }
  };

  const handleAnalyze = () => {
    if (!preview) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
      onAnalysisComplete();
    }, 2000);
  };

  const handleClear = () => {
    setPreview(null);
    setShowResult(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Upload Card */}
      <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 shadow-xl">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
          <Upload className="w-4 h-4 text-emerald-400" />
          Upload Citizen Hazard Image
        </h2>

        {!preview ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors group"
          >
            <ImageIcon className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 transition-colors mb-2" />
            <span className="text-xs text-slate-400 group-hover:text-slate-300">
              Click to select an image
            </span>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-rose-500/80 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running Edge YOLOv8 & Cloud Semantic Segmentation...
                </>
              ) : showResult ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Analysis Complete
                </>
              ) : (
                <>
                  <Gauge className="w-4 h-4" />
                  Analyze Depth
                </>
              )}
            </button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      {/* CHI Output Card */}
      <div
        className={`rounded-2xl backdrop-blur-xl border p-5 shadow-xl transition-all duration-500 ${
          showResult
            ? 'bg-slate-900/60 border-emerald-500/30 opacity-100'
            : 'bg-slate-900/40 border-white/10 opacity-60'
        }`}
      >
        <h2 className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
          <Gauge className="w-4 h-4 text-amber-400" />
          Clearance Hazard Index (CHI)
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-400">Water Depth</span>
            </div>
            <span className="text-sm font-bold text-cyan-300">{chi.waterDepth}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span className="text-xs text-slate-400">Location</span>
            </div>
            <span className="text-sm font-semibold text-rose-300">{chi.location}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400">EXIF Status</span>
            </div>
            <span className="text-sm font-semibold text-emerald-300">{chi.exifStatus}</span>
          </div>
        </div>
        {!showResult && (
          <p className="text-xs text-slate-500 mt-3 text-center">
            Upload and analyze an image to populate results
          </p>
        )}
      </div>

      {/* Vehicle Passability Matrix */}
      <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 shadow-xl">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
          <Gauge className="w-4 h-4 text-emerald-400" />
          Vehicle Passability Matrix
        </h2>
        <div className="space-y-2.5">
          {vehicles.map((row) => (
            <div
              key={row.type}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 ${
                row.color === 'rose'
                  ? 'bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/15'
                  : 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{row.icon}</span>
                <span className="text-xs font-medium text-slate-200">{row.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{row.dot}</span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    row.color === 'rose'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {row.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
