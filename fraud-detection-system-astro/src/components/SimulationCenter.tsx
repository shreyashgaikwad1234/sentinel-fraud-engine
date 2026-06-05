"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, ArrowRight, ShieldCheck, ShieldAlert, Loader2, Sparkles, Fingerprint, Database, Binary, Network, BrainCircuit, Settings2 } from "lucide-react";
import { useDashboard } from "./DashboardState";

const STEPS = [
  { id: 1, label: "Data Ingestion", desc: "Capturing transaction metadata", icon: Database },
  { id: 2, label: "Feature Extraction", desc: "Encoding behavioral vectors", icon: Binary },
  { id: 3, label: "Risk Assessment", desc: "Scoring behavioral anomalies", icon: Network },
  { id: 4, label: "Model Inference", desc: "Running XGB_V4 prediction", icon: BrainCircuit },
  { id: 5, label: "Decision reached", desc: "Finalizing operational response", icon: Settings2 },
];

export function SimulationCenterReact() {
  const { runSimulation } = useDashboard();
  const [status, setStatus] = useState<"idle" | "running" | "completed">("idle");
  const [currentStep, setCurrentStage] = useState(0);
  const [result, setResult] = useState<any>(null);

  const startSimulation = async (forceFraud = false) => {
    setStatus("running");
    setResult(null);
    
    for (let i = 1; i <= STEPS.length; i++) {
      setCurrentStage(i);
      await new Promise(r => setTimeout(r, 600));
    }

    const tx = await runSimulation(forceFraud);
    setResult(tx);
    setStatus("completed");
  };

  return (
    <div className="enterprise-card p-8 bg-surface h-full flex flex-col relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none group-hover:bg-primary/[0.04] transition-all duration-700" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
                 <Zap size={18} />
              </div>
              <div className="flex flex-col">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Simulation Terminal</h3>
                 <span className="text-[9px] font-bold text-muted uppercase tracking-widest">Inference Test Suite v4.2.0</span>
              </div>
           </div>
           <div className="flex items-center gap-3 bg-background border border-border px-3 py-1 rounded-full">
              <span className={`w-1.5 h-1.5 rounded-full ${status === 'running' ? 'bg-primary animate-pulse' : 'bg-muted opacity-30'}`} />
              <span className="text-[9px] font-black text-muted uppercase tracking-widest">{status === 'running' ? 'Active' : 'Ready'}</span>
           </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="space-y-10"
              >
                <div className="w-20 h-20 rounded-3xl bg-background border border-border flex items-center justify-center relative mx-auto group-hover:border-primary/40 transition-all duration-500 shadow-inner">
                  <Fingerprint className="w-10 h-10 text-muted opacity-30 group-hover:text-primary group-hover:opacity-100 transition-all" />
                  <div className="absolute inset-[-10px] bg-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-black tracking-tight text-foreground uppercase italic leading-none">Execute <span className="not-italic text-primary">Inference Protocol</span></h4>
                  <p className="text-[10px] text-muted font-bold max-w-[280px] leading-relaxed uppercase tracking-widest opacity-60">
                    Inject high-variance synthetic payload to validate detection engine accuracy and latency metrics.
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                   <button 
                    onClick={() => startSimulation(false)}
                    className="px-6 py-3 bg-background border border-border text-foreground rounded-xl font-black text-[9px] uppercase tracking-widest shadow-sm hover:border-primary/40 hover:bg-primary/[0.02] transition-all flex items-center gap-2 group/btn"
                   >
                    <Play size={10} className="text-muted group-hover/btn:text-primary transition-colors" fill="currentColor" /> Authorized Flow
                   </button>
                   <button 
                    onClick={() => startSimulation(true)}
                    className="px-6 py-3 bg-danger text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-danger/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                   >
                    <Sparkles size={10} /> Force Anomalous
                   </button>
                </div>
              </motion.div>
            )}

            {status === "running" && (
              <motion.div
                key="running"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-sm space-y-6"
              >
                <div className="space-y-3">
                  {STEPS.map((step) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={step.id} className="relative">
                         <motion.div 
                          animate={{ opacity: currentStep >= step.id ? 1 : 0.2, x: currentStep === step.id ? 10 : 0 }}
                          className="flex items-center gap-5"
                         >
                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${currentStep > step.id ? 'bg-success border-success text-white' : currentStep === step.id ? 'bg-surface border-primary text-primary shadow-[0_0_10px_rgba(0,229,255,0.1)]' : 'border-border text-muted'}`}>
                               {currentStep > step.id ? <ShieldCheck size={14} /> : <StepIcon size={14} className={currentStep === step.id ? 'animate-pulse' : ''} />}
                            </div>
                            <div className="flex flex-col text-left">
                               <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep === step.id ? 'text-primary' : 'text-muted'}`}>Step {step.id}: {step.label}</span>
                               <span className="text-[8px] font-bold text-muted/40 uppercase tracking-tighter">{step.desc}</span>
                            </div>
                         </motion.div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {status === "completed" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8"
              >
                <div className={`p-8 rounded-3xl border-2 shadow-2xl relative overflow-hidden ${result.isFraud ? 'bg-danger/[0.03] border-danger/30 text-danger shadow-danger/5' : 'bg-success/[0.03] border-success/30 text-success shadow-success/5'}`}>
                   <div className="relative z-10 flex flex-col items-center text-center gap-6">
                      <div className={`p-4 rounded-2xl shadow-lg ${result.isFraud ? 'bg-danger text-white' : 'bg-success text-white'}`}>
                         {result.isFraud ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
                      </div>
                      <div className="space-y-2">
                        <h4 className={`text-3xl font-black tracking-tighter uppercase italic ${result.isFraud ? 'text-danger' : 'text-success'}`}>
                           {result.action}
                        </h4>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted opacity-60">Engine Decision Confirmed</p>
                      </div>

                      <div className="grid grid-cols-3 w-full gap-4 mt-4 pt-6 border-t border-border/50">
                         <div className="space-y-1">
                            <p className="text-[8px] font-bold text-muted uppercase tracking-widest">Amount</p>
                            <p className="text-base font-black tabular-nums text-foreground">${result.amount.toLocaleString()}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[8px] font-bold text-muted uppercase tracking-widest">Risk</p>
                            <p className={`text-base font-black tabular-nums ${result.isFraud ? 'text-danger' : 'text-success'}`}>{result.riskScore}%</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[8px] font-bold text-muted uppercase tracking-widest">Confidence</p>
                            <p className="text-base font-black tabular-nums text-foreground">{(result.predictionConfidence * 100).toFixed(1)}%</p>
                         </div>
                      </div>
                   </div>

                   <div className="mt-6 p-4 bg-background rounded-xl border border-border text-left relative z-10 overflow-hidden shadow-inner">
                      <div className="absolute top-0 left-0 w-0.5 h-full bg-primary opacity-40" />
                      <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-1.5">Neural Decision DNA</p>
                      <p className="text-[11px] font-bold leading-relaxed italic text-foreground break-words uppercase tracking-tight">
                         "{result.explanation}"
                      </p>
                   </div>
                </div>

                <button 
                  onClick={() => setStatus("idle")}
                  className="text-[9px] font-black uppercase tracking-[0.4em] text-muted hover:text-primary transition-colors flex items-center gap-3 mx-auto"
                >
                  <ArrowRight size={10} className="rotate-180" /> Reset Terminal Environment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
