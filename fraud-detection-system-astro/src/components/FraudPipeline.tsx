"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Binary, Network, BrainCircuit, Settings2, ShieldCheck, ShieldAlert } from "lucide-react";
import { useDashboard } from "./DashboardState";

const STAGES = [
  { id: 1, label: "Input", icon: Database },
  { id: 2, label: "Features", icon: Binary },
  { id: 3, label: "Behavior", icon: Network },
  { id: 4, label: "Neural", icon: BrainCircuit },
  { id: 5, label: "Consensus", icon: Settings2 },
];

export function FraudPipelineReact() {
  const { activeTransaction } = useDashboard();
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (activeTransaction) {
      let stage = 0;
      const interval = setInterval(() => {
        stage++;
        setActiveStage(stage);
        if (stage > STAGES.length) {
          clearInterval(interval);
        }
      }, 600);
      return () => clearInterval(interval);
    } else {
      setActiveStage(0);
    }
  }, [activeTransaction]);

  return (
    <div className="enterprise-card p-6 bg-surface flex flex-col h-full">
      <div className="flex items-center gap-3 mb-8">
         <div className="p-1.5 bg-primary/10 rounded-md text-primary">
            <Network size={16} />
         </div>
         <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Inference Pipeline</h3>
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-[160px]">
        <div className="relative flex justify-between items-center px-4">
          {/* Progress Line Background */}
          <div className="absolute top-1/2 left-8 right-8 h-[1px] bg-border -translate-y-1/2 z-0"></div>

          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isCompleted = activeStage > stage.id;
            const isActive = activeStage === stage.id;

            return (
              <div key={stage.id} className="relative z-10 flex flex-col items-center flex-1">
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    borderColor: isActive ? "var(--primary)" : isCompleted ? "var(--success)" : "var(--border)",
                    backgroundColor: isActive ? "var(--surface)" : isCompleted ? "var(--success)" : "var(--surface)",
                    color: isCompleted ? "#FFFFFF" : isActive ? "var(--primary)" : "var(--text-muted)"
                  }}
                  className="w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-300 shadow-sm bg-surface"
                >
                  {isCompleted ? <ShieldCheck size={18} /> : <Icon size={18} />}
                </motion.div>
                
                {/* Stage Label */}
                <div className="mt-3 text-center">
                  <span className={`text-[8px] font-black uppercase tracking-tighter sm:tracking-widest whitespace-nowrap transition-colors duration-300 block ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted'}`}>
                    {stage.label}
                  </span>
                </div>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-glow"
                    className="absolute top-0 w-10 h-10 bg-primary/10 blur-xl rounded-full -z-10"
                  />
                )}
              </div>
            );
          })}

          {/* Decision Node */}
          <div className="relative z-10 flex flex-col items-center flex-1">
             <AnimatePresence mode="wait">
                {activeStage > STAGES.length && activeTransaction ? (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg ${activeTransaction.isFraud ? 'bg-danger text-white' : 'bg-success text-white'}`}
                  >
                     {activeTransaction.isFraud ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
                  </motion.div>
                ) : (
                  <div className="w-10 h-10 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted opacity-30 bg-surface">
                     <Settings2 size={18} />
                  </div>
                )}
             </AnimatePresence>
             <div className="mt-3 text-center">
                <span className="text-[8px] font-black uppercase tracking-widest text-muted block">Decision</span>
             </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-8 p-3 bg-background rounded-xl border border-border min-h-[50px] flex items-center">
         {!activeTransaction ? (
           <p className="w-full text-center text-[9px] font-bold text-muted uppercase tracking-[0.2em] animate-pulse">Awaiting Payload for Neural Processing...</p>
         ) : (
           <div className="w-full flex justify-between items-center px-2">
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-muted uppercase tracking-widest">Active Analysis</span>
                 <span className="text-[10px] font-bold text-foreground truncate max-w-[120px] sm:max-w-[200px]">#TXN-{activeTransaction.id.slice(-8)}</span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-muted uppercase tracking-widest">Conf.</span>
                    <span className="text-[10px] font-bold text-primary">{(activeTransaction.predictionConfidence * 100).toFixed(0)}%</span>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-muted uppercase tracking-widest">Risk</span>
                    <span className={`text-[10px] font-bold ${activeTransaction.isFraud ? 'text-danger' : 'text-success'}`}>{activeTransaction.riskScore}%</span>
                 </div>
              </div>
           </div>
         )}
      </div>
    </div>
  );
}
