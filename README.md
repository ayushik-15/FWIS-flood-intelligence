<div align="center">

# 🌊 FWIS | Flood & Waterlogging Intelligence System

### Preventative Flood Intelligence over Reactive Rerouting

*Turning citizen smartphones and municipal CCTV into a real-time, street-level flood depth sensing network.*

<br/>

![Build with Bharat 4.0](https://img.shields.io/badge/Build%20with-Bharat%204.0-FF6A1A?style=for-the-badge&labelColor=138808)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-DeepLabV3+-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Team Vision Grid** · Chandigarh University · National Level Hackathon, *Build with Bharat 4.0*

[Problem](#-the-problem) · [Solution](#-the-solution) · [Innovations](#-key-innovations) · [Architecture](#-system-architecture) · [Getting Started](#-getting-started) · [Team](#-team-vision-grid)

</div>

---

## 📖 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Key Innovations](#-key-innovations)
- [Clearance Hazard Index (CHI)](#-clearance-hazard-index-chi)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Feasibility & Challenges](#-feasibility--challenges)
- [Research & References](#-research--references)
- [Team Vision Grid](#-team-vision-grid)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚨 The Problem

> **"We know when it rains. We don't know which roads are actually passable."**

During heavy rainfall, urban commuters lack real-time, hyperlocal information about road passability. Hidden water depth leads to stalled engines, vehicle damage, and life-threatening situations.

- **Data Gap:** Drivers have no live information on how deep the water is on a specific road.
- **Blind Entry:** Weather apps predict *rainfall*, not *road conditions*. They cannot say whether a particular underpass is passable.
- **Reactive Navigation:** Routing apps respond only after disruption occurs, by which time vehicles may already be entering, or stuck in, flooded roads.
- **No Unified Intelligence:** Rainfall, elevation, CCTV, and ground observations exist in silos and are rarely fused into a single hyperlocal risk signal.

---

## 💡 The Solution

**FWIS** is an Edge-AI powered, crowdsourced platform that delivers **Preventative Warning over Reactive Rerouting**. It converts smartphones and existing municipal CCTV into a distributed flood-depth sensor network, with no new hardware to install.

### Reactive Navigation vs. FWIS

| Dimension | Reactive Navigation (e.g. Google Maps) | Weather Apps | **FWIS** |
| :--- | :--- | :--- | :--- |
| **Approach** | Reactive rerouting | Macro rainfall forecasts | **Preventative, street-level warning** |
| **When you find out** | After cars get stuck and traffic builds up | Before rain, with no road-level detail | **Before you enter the hazard (alerts ~500 m ahead)** |
| **What it tells you** | Traffic slowdown | Chance and intensity of rain | **Exact water depth in cm + vehicle-specific risk** |
| **Granularity** | Road-segment congestion | City / district level | **Hyperlocal, per street and underpass** |
| **Data sources** | Traffic and probe data | Meteorological models | **Citizen cameras, municipal CCTV, elevation, rainfall** |
| **Hardware capex** | None | None | **Zero.** Uses existing smartphones and CCTV |
| **Legal posture** | Implicit "route is fine" | N/A | **Graded risk levels, not binary "Safe" claims** |

---

## 🚀 Key Innovations

### 1. 🔬 Semantic Occlusion Depth Engine
Replaces flawed monocular depth estimation. FWIS uses **DeepLabV3+** (with SegFormer as an alternative) to segment the scene, then measures how much of a **submerged tire rim, curb, or other reference object** is hidden by water. Because the real-world dimensions of these objects are known, the occlusion ratio converts directly into **water depth in centimetres**.

### 2. ⚡ Edge-AI Optimization
**YOLOv8-Nano** runs *on the user's device* (via TensorFlow Lite / ONNX Runtime). It detects vehicles and filters out non-flood images before upload, so only valid, compressed data reaches the cloud. This cuts cloud load, bandwidth, and latency during peak monsoon hours, reducing cloud costs by up to **80%**.

### 3. 🚦 Clearance Hazard Index (CHI)
Moves beyond legally risky binary "Safe / Unsafe" tags to a **vehicle-aware, three-tier risk index**. The same flooded road is rated differently for a two-wheeler, a sedan, and an SUV. See the [CHI matrix](#-clearance-hazard-index-chi) below.

### 4. 🛡️ Trust & Anti-Spam Protocol
Crowdsourcing is only useful if it can be trusted. FWIS enforces:
- **Live camera only:** no gallery uploads.
- **EXIF metadata lock:** GPS and timestamp are cryptographically verified to reject old, fake, or relocated images.
- **Geofencing:** reports must originate at the location they claim.
- **Multi-point AI consensus:** reports are cross-checked against other reports, CCTV feeds, and geospatial data at the same location.

### 5. 🌧️ Cold-Start Hydrological Engine
Stays useful *before* critical mass adoption. When no photos have been uploaded for an area, FWIS falls back on **SRTM elevation models** and **rainfall intensity data (IMD)** to predict waterlogging-prone zones, so the system delivers value from day one.

---

## 🎯 Clearance Hazard Index (CHI)

CHI replaces a single "Safe / Unsafe" verdict with a **vehicle-specific risk matrix**. The tier shown to a user depends on both the estimated water depth *and* their vehicle class.

| CHI Tier | Meaning | Guidance |
| :--- | :--- | :--- |
| 🟢 **Low Risk** | Passable for all vehicles | Proceed with normal caution |
| 🟡 **Moderate Clearance Risk** | High-clearance vehicles only (SUVs) | Avoid unless your vehicle has high ground clearance |
| 🔴 **High Hazard** | Impassable | **Do not enter** |

### Example: same road, different vehicles

An illustrative reading for a single flooded road segment (thresholds are configurable per deployment):

| Vehicle Class | CHI Rating | Interpretation |
| :--- | :---: | :--- |
| 🏍️ **Two-Wheeler** | 🔴 **High Hazard** | Impassable. Do not enter |
| 🚗 **Sedan** | 🟡 **Moderate Risk** | Clearance risk. Reroute advised |
| 🚙 **SUV** | 🟢 **Low Risk** | Passable with caution |

> **Note:** CHI outputs are advisory risk levels and not guarantees of safety. This is by design: it avoids the legal liability of binary "safe" claims.

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────────────────────────────┐
│                         FRONTEND  (React + TS)                       │
│   Citizen App (live camera capture)  ·  Municipal Command Center     │
│   Leaflet / OSM live flood map  ·  CHI risk visualisation            │
└───────────────────────────────┬──────────────────────────────────────┘
                                │  Live capture + EXIF (GPS / Timestamp)
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                            EDGE AI  (On-Device)                      │
│   YOLOv8-Nano  ·  TensorFlow Lite / ONNX Runtime                     │
│   • Detects vehicles, people, flooded areas                          │
│   • Filters non-flood images  → cuts cloud load & latency            │
│   • Verifies EXIF lock before upload                                 │
└───────────────────────────────┬──────────────────────────────────────┘
                                │  Only valid, compressed data
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                       CLOUD CV / ML  (FastAPI + PyTorch)             │
│   DeepLabV3+ / SegFormer                                             │
│   • Semantic segmentation of tires, curbs, water                     │
│   • Occlusion ratio  →  water depth (cm)                             │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
          ┌─────────────────────┴─────────────────────┐
          ▼                                           ▼
┌─────────────────────────┐             ┌──────────────────────────────┐
│  GEOSPATIAL & RISK      │             │  ANTI-FRAUD & SECURITY       │
│  PostgreSQL + PostGIS   │◄───────────►│  EXIF validation             │
│  SRTM Elevation         │             │  Geofencing                  │
│  IMD Rainfall Data      │             │  Multi-point AI consensus    │
│  (Cold-Start Engine)    │             │  CCTV cross-checking         │
└────────────┬────────────┘             └──────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────────────┐
│               RISK ENGINE  →  CLEARANCE HAZARD INDEX (CHI)           │
│        Combines depth + rainfall + elevation + vehicle class         │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
                                ▼
                  🗺️  LIVE FLOOD MAP & EARLY WARNINGS
```

### Data Flow

1. **Secure Ingestion (Anti-Spam):** Mandatory live camera capture; EXIF metadata is verified to reject old or fake uploads.
2. **On-device Pre-processing:** YOLOv8-Nano detects vehicles and filters non-flood images, reducing cloud load and latency.
3. **Depth Estimation:** Semantic segmentation estimates water depth using vehicle tire and curb occlusion.
4. **Validation & Risk Prediction:** AI cross-checks user reports with CCTV and geospatial data to detect fake reports and predict flood risk.
5. **Live Dashboard:** A real-time map shows location, water depth, and traffic impact using the Clearance Hazard Index.

---

## 🧰 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, TypeScript, Tailwind CSS, Leaflet / OpenStreetMap |
| **Edge AI** | TensorFlow Lite / ONNX Runtime, YOLOv8-Nano |
| **Cloud CV / ML** | Python (FastAPI), PyTorch, DeepLabV3+ / SegFormer |
| **Geospatial & Risk** | PostgreSQL + PostGIS, SRTM Elevation API, IMD Rainfall Data |
| **Anti-Fraud & Security** | Cryptographic EXIF validation, geofencing, multi-point AI consensus |

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `>= 18`
- [Python](https://www.python.org/) `>= 3.10`
- [PostgreSQL](https://www.postgresql.org/) `>= 14` with the [PostGIS](https://postgis.net/) extension

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/fwis.git
cd fwis
```

### 2. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### 3. Run the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API docs will be available at `http://localhost:8000/docs`.

### 4. Configure the database

```bash
createdb fwis
psql -d fwis -c "CREATE EXTENSION IF NOT EXISTS postgis;"
```

> **Tip:** Copy `.env.example` to `.env` in both `frontend/` and `backend/` and fill in your database URL and any API keys (e.g. rainfall / elevation data sources).

### Suggested Project Structure

```text
fwis/
├── frontend/     # React + TypeScript + Tailwind + Leaflet
├── edge/         # YOLOv8-Nano models (TFLite / ONNX) & on-device logic
├── backend/      # FastAPI service, PyTorch inference, risk engine
├── data/         # SRTM elevation & rainfall ingestion scripts
└── README.md
```

> Adjust the folder names above to match your actual repository layout.

---

## ✅ Feasibility & Challenges

**Why FWIS is deployable today**

- **Zero hardware cost:** uses smartphones and existing CCTV.
- **Edge AI:** sends only valid, compressed data.
- **Open-source stack:** YOLOv8, PyTorch, and PostGIS.
- **Day-one ready:** Cold-Start Hydrological Engine.
- **Scalable:** pilot first, then city-wide deployment.

| Challenge | Mitigation |
| :--- | :--- |
| Depth accuracy drops in low light or muddy water | Multi-point AI validation cross-checks several reports at the same location; CV output is validated against rainfall and elevation data |
| Low user adoption early on | Cold-Start Engine keeps the system useful with no crowd data; CCTV feeds add coverage where users are few |
| Fake or spam uploads | Live-camera-only capture, EXIF lock, and geofencing reject bad data |
| Legal liability for "safe" claims | CHI gives graded risk levels, not a binary safe / unsafe verdict |

---

## 📚 Research & References

1. [Automated Flood Depth Estimation on Roadways](https://digitalcommons.odu.edu/cee_fac_pubs/117)
2. [Urban Flood Depth from Image Recognition and Deep Learning](https://link.springer.com/article/10.1007/s11269-023-03669-9)
3. [A Comprehensive Review of YOLO: From YOLOv1 and Beyond](https://arxiv.org/abs/2304.00501)
4. [YOLOv5, YOLOv8 and YOLOv10: The Go-To Detectors for Real-time Vision](https://arxiv.org/abs/2407.02988)
5. [Opportunities for Crowdsourcing in Urban Flood Monitoring](https://researchconnect.buffalo.edu/en/publications/opportunities-for-crowdsourcing-in-urban-flood-monitoring)
6. [FloodNet: A High Resolution Aerial Imagery Dataset for Post Flood Scene Understanding](https://doi.org/10.1109/ACCESS.2021.3090981)

### Related Repositories

- [STURM-FloodDepth](https://github.com/STURM-WEO/STURM-FloodDepth): Urban flood depth estimation
- [Flood Depths](https://github.com/nlonberg/flood-depths): Flood depth estimation from vehicles
- [Ultralytics YOLOv8](https://github.com/ultralytics/yolov8): Object detection
- [FloodNet](https://github.com/BinaLab/FloodNet-Supervised_v1.0): Flood scene understanding dataset

---

## 👥 Team Vision Grid

Built for **Build with Bharat 4.0**, a National Level Hackathon (CodeVerse, KCC Institute of Technology and Management, Greater Noida).

| Name | Role |
| :--- | :--- |
| **Ayushi Kushwaha** | Team Lead · Full Stack & AI Developer |
| **Mahika Negi** | Team Member |
| **Akshita Sachan** | Team Member |
| **Anirudh Bhavesh** | Team Member |
| **Prachi Mallick** | Team Member |

**Institution:** Chandigarh University

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please open an issue first for major changes so we can discuss the approach.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

**Made with ❤️ by Team Vision Grid for Build with Bharat 4.0 🇮🇳**

*Know before you go.*

</div>
