# 🌧️ FWIS | Flood & Waterlogging Intelligence System

> **Preventative Flood Intelligence over Reactive Rerouting.**  
> Turning citizen smartphones and municipal CCTV into a real-time, street-level flood depth sensing network.

[![Build with Bharat 4.0](https://img.shields.io/badge/Hackathon-Build%20with%20Bharat%204.0-orange?style=for-the-badge)](https://github.com/ayushik-15/FWIS-flood-intelligence)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📌 Executive Summary

During monsoon downpours across urban India, roads flood within minutes. Existing navigation platforms like Google Maps operate **reactively**—they reroute traffic only *after* vehicles stall and gridlocks form. 

**FWIS (Flood & Waterlogging Intelligence System)** is an Edge-AI driven platform designed to provide **hyperlocal, preventative warnings** before commuters enter hazardous waterlogged zones. By utilizing Computer Vision to calculate tire and curb occlusion ratios, FWIS estimates exact water depth in centimeters and maps real-time vehicle passability across the city.

---

## 🎯 The Core Problem vs. FWIS Solution

| Current Navigation Tools (e.g., Google Maps) | FWIS Preventative Intelligence |
| :--- | :--- |
| **Reactive:** Knows a road is flooded only after vehicles get stuck. | **Preventative:** Warns drivers 500 meters *before* reaching the hazard zone. |
| **Macroscopic:** Shows traffic delay lines without explaining the root cause. | **Hyperlocal:** Displays exact water depth (cm) and vehicle-specific risk levels. |
| **High Capex IoT Dependency:** Requires expensive physical sensors on every street. | **Zero Hardware Capex:** Harnesses citizen smartphones, dashcams, and municipal CCTV. |

---

## ✨ Key Features & Innovations

### 1. 🛞 Semantic Occlusion Depth Engine
Replaces imprecise monocular depth estimation. FWIS uses semantic segmentation (**DeepLabV3+ / SegFormer**) to measure the percentage of submerged tire rims, vehicle bodies, and road curbs against standard manufacturer dimensions to output physical water depth in centimeters.

### 2. ⚡ Edge-AI Optimization (YOLOv8-Nano)
Integrates lightweight **YOLOv8-Nano** on-device via TensorFlow Lite/ONNX Runtime to filter non-flood images and compress visual data locally, reducing cloud latency and compute costs by over 80%.

### 3. 🚗 Clearance Hazard Index (CHI)
Eliminates binary "Safe / Unsafe" labels that carry legal liability. FWIS outputs a vehicle-aware, three-tier risk matrix based on air intake heights and exhaust clearances:

```text
🟢 LOW RISK                --> Passable for all vehicles
🟡 MODERATE CLEARANCE RISK --> High-clearance vehicles only (SUVs / Commercial)
🔴 HIGH HAZARD             --> Impassable. Engine hydro-locking threat
4. 🛡️ Trust & Anti-Spam ProtocolPrevents malicious traffic manipulation and fake uploads through mandatory live camera captures, cryptographic EXIF metadata locking (GPS + System Timestamp), and multi-point spatial AI consensus.5. 🌧️ Cold-Start Hydrological EngineEnsures system utility on Day 1—even with zero crowdsourced uploads—by fusing SRTM Digital Elevation Models (DEM) with real-time precipitation intensity overlays.🚦 Clearance Hazard Index (CHI) MatrixVehicle TypeClearance ThresholdSystem Status BadgeActionable Advice🏍️️ Two-WheelerSubmerged Exhaust (> 15 cm)🔴 High HazardImpassable. High stalling risk.🚗 Sedan / HatchbackAir Intake Threat (> 25 cm)🟡 Moderate RiskProceed with extreme caution or reroute.🚙 SUV / CommercialHigh Clearance (> 40 cm)🟢 Low RiskPassable with controlled speed.🛠️ Tech Stack & System ArchitecturePlaintext┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                              │
│         React.js + Tailwind CSS + Lucide Icons + Leaflet/OSM           │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                        EDGE-AI LAYER (On-Device)                       │
│           TensorFlow Lite / ONNX Runtime (YOLOv8-Nano)                 │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                    CLOUD CV & GEOSPATIAL BACKEND                       │
│    FastAPI (Python) + PyTorch (DeepLabV3+) + PostgreSQL/PostGIS        │
└────────────────────────────────────────────────────────────────────────┘
Frontend: React, TypeScript, Tailwind CSS, Lucide React, Leaflet MapsEdge ML: YOLOv8-Nano (Object Detection & Local Filtering)Cloud Computer Vision: PyTorch, DeepLabV3+, OpenCV (Semantic Segmentation)Geospatial Engine: PostgreSQL with PostGIS extension, SRTM Elevation APIs🚀 Getting Started LocallyPrerequisitesNode.js (v18.0 or higher)npm or pnpmInstallationClone the Repository:Bashgit clone [https://github.com/ayushik-15/FWIS-flood-intelligence.git](https://github.com/ayushik-15/FWIS-flood-intelligence.git)
cd FWIS-flood-intelligence
Install Dependencies:Bashnpm install
Start Development Server:Bashnpm run dev
Access the Dashboard:Open your browser and navigate to http://localhost:5173.👥 Team Vision GridAyushi Kushwaha — Team Lead / Full Stack & AI DeveloperMahika Negi — Team MemberAkshita Sachan — Team MemberAnirudh Bhavesh — Team MemberPrachi Mallick — Team Member📚 Academic & Engineering ReferencesAutomated Flood Depth Estimation on Roadways using Computer Vision — Old Dominion University ResearchFloodNet: A High Resolution Aerial Imagery Dataset for Post Flood Scene Understanding — IEEE AccessUltralytics YOLOv8 Architecture Overview — Ultralytics GitHub
