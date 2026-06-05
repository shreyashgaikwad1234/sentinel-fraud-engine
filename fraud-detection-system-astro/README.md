# Sentinel Fraud Intelligence Platform (v4.2.0-PRO)

[![Architecture: Astro](https://img.shields.io/badge/Architecture-Astro-FF5D01?style=flat-square&logo=astro)](https://astro.build)
[![Backend: FastAPI](https://img.shields.io/badge/Backend-FastAPI-05998B?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![ML: XGBoost](https://img.shields.io/badge/ML-XGBoost-EBBD2E?style=flat-square&logo=xgboost)](https://xgboost.ai)
[![UI: TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

**Sentinel** is a world-class, enterprise-grade AI Fraud Intelligence Platform designed to protect global payment networks. Inspired by industry-leading security products like **Stripe Radar**, **Palantir Foundry**, and **CrowdStrike**, it combines advanced machine learning (XGBoost + SMOTE) with a cinematic, high-density Command Center for real-time threat monitoring and investigation.

---

## 🚀 Key Features

### 🧠 Advanced AI & ML Core
*   **Predictive Inference Engine**: Real-time transaction scoring using a custom-trained XGBoost model.
*   **Explainable AI (SHAP)**: Human-readable rationale for every decision, visualizing exactly how features like "Location Mismatch" or "Device Risk" influenced the risk score.
*   **SMOTE-Optimized DNA**: Specifically trained to handle extreme class imbalance in financial datasets (0.17% fraud rate).

### 🏛️ Enterprise Command Center
*   **Case Investigation Mode**: A dedicated side-panel workflow for analysts to deep-dive into suspicious nodes, including audit timelines and behavioral factor attribution.
*   **Global Fraud Topology**: Interactive 3D-inspired threat map visualizing geographic attack clusters and transaction flow lines.
*   **Inference Pipeline**: A cinematic visualization of the 5-stage neural processing chain: Data Ingestion → Feature Extraction → Risk Assessment → Model Inference → Decision.

### 📊 Business Intelligence
*   **Executive Summary**: Real-time KPI tracking for Revenue Protected, Fraud Velocity, and System Uptime.
*   **Operational Intelligence Stream**: A Bloomberg-style live feed of ISO-20022 compliant transaction signals.
*   **Dual-Theme Architecture**: Seamless transition between high-contrast "Enterprise Light" and premium "Midnight Dark" modes with perfect WCAG accessibility.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | AstroJS (Latest), React (Islands), TypeScript |
| **Styling** | Tailwind CSS (v4), Framer Motion (v11) |
| **Visuals** | Recharts (Custom Enterprise Tooltips) |
| **Backend** | FastAPI, Uvicorn, Python 3.11 |
| **ML/DS** | XGBoost, Scikit-Learn, Pandas, SMOTE (imbalanced-learn), SHAP |
| **Data** | European Credit Card Dataset (Kaggle Standard) |

---

## 🏗️ System Architecture

Sentinel uses a **Hybrid Data Architecture**:
1.  **Core Source**: Real-world transaction data from `creditcard.csv`.
2.  **Live Backend**: FastAPI serves the trained `.joblib` model for real-time inferences.
3.  **Synthetic Engine**: A high-fidelity frontend service (`DataService.ts`) ensures the dashboard is always alive with realistic behavioral patterns even when backend nodes are syncing.

---

## 💻 Installation & Setup

### 1. Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/sentinel-fraud-engine.git
cd sentinel-fraud-engine

# Install Python dependencies
pip install -r requirements.txt

# Run the Detection Engine (FastAPI)
python src/app.py
```

### 2. Frontend Setup
```bash
# Navigate to the Astro platform
cd fraud-detection-system-astro

# Install Node dependencies
npm install

# Start the Command Center
npm run dev -- --port 4000
```

### 3. Model Training (Optional)
If you wish to re-train the model on your local hardware:
```bash
cd src
python trainer.py
```

---

## 🕵️ Data Science Deep-Dive

### The Model: XGBoost + SMOTE
Financial fraud detection is characterized by **extreme class imbalance**. Sentinel addresses this using **SMOTE** to generate synthetic fraudulent examples during training, ensuring the **XGBoost** classifier learns the subtle "DNA" of an attack rather than defaulting to a "Never Fraud" bias.

### Interpretability: SHAP
In banking, a "Black Box" is unacceptable. Sentinel utilizes **SHAP (SHapley Additive exPlanations)** to break down the model's output. Analysts can see:
*   **Red Bars**: Factors pushing the transaction towards a **BLOCKED** decision.
*   **Green Bars**: Trust indicators reducing the risk score.

---

## 📈 Executive Impact
Sentinel is designed to demonstrate three core proficiencies:
1.  **Staff-Level Engineering**: Modular Astro architecture, complex animations, and perfect responsive design.
2.  **Product Thinking**: Focus on operational value (Loss Prevented, Investigation Time) over purely academic metrics.
3.  **Data Science Maturity**: Handling real-world data constraints like imbalance, latency, and explainability.

---

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Sentinel Protocol** • *Securing the Global Financial Fabric through Neural Intelligence.*
