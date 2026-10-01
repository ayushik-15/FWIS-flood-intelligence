export type HazardLevel = 'high' | 'moderate' | 'low';
export type IngestionSource = 'CCTV Node #04' | 'Citizen Upload' | 'Passenger App';

export interface FloodReport {
  id: string;
  lat: number;
  lng: number;
  location: string;
  waterDepth: number;
  hazardLevel: HazardLevel;
  timestamp: string;
  source: IngestionSource;
}

export const floodReports: FloodReport[] = [
  {
    id: '1',
    lat: 28.6092,
    lng: 77.0937,
    location: 'Sector 17 Underpass',
    waterDepth: 32,
    hazardLevel: 'high',
    timestamp: '2026-10-01 09:42',
    source: 'CCTV Node #04',
  },
  {
    id: '2',
    lat: 28.6139,
    lng: 77.0902,
    location: 'Cyber Hub Gate 3',
    waterDepth: 18,
    hazardLevel: 'moderate',
    timestamp: '2026-10-01 09:31',
    source: 'Citizen Upload',
  },
  {
    id: '3',
    lat: 28.6048,
    lng: 77.0987,
    location: 'MG Road Junction',
    waterDepth: 8,
    hazardLevel: 'low',
    timestamp: '2026-10-01 09:18',
    source: 'Passenger App',
  },
  {
    id: '4',
    lat: 28.6172,
    lng: 77.0875,
    location: 'IFFCO Chowk Roundabout',
    waterDepth: 24,
    hazardLevel: 'moderate',
    timestamp: '2026-10-01 08:57',
    source: 'CCTV Node #04',
  },
  {
    id: '5',
    lat: 28.6011,
    lng: 77.1015,
    location: 'Sikanderpur Metro Exit',
    waterDepth: 41,
    hazardLevel: 'high',
    timestamp: '2026-10-01 08:44',
    source: 'Citizen Upload',
  },
  {
    id: '6',
    lat: 28.6205,
    lng: 77.0941,
    location: 'Huda City Centre Road',
    waterDepth: 5,
    hazardLevel: 'low',
    timestamp: '2026-10-01 08:20',
    source: 'Passenger App',
  },
];

export interface VehicleRow {
  type: string;
  icon: string;
  status: string;
  level: HazardLevel;
}

export const vehicleMatrix: VehicleRow[] = [
  {
    type: 'Two-Wheeler',
    icon: '🏍️',
    status: 'Impassable',
    level: 'high',
  },
  {
    type: 'Sedan / Hatchback',
    icon: '🚗',
    status: 'Moderate Clearance Hazard',
    level: 'moderate',
  },
  {
    type: 'SUV / Commercial',
    icon: '🚙',
    status: 'Low Risk — Proceed with caution',
    level: 'low',
  },
];
