"use client"

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldAlert, Activity, Search, Globe, MoreHorizontal, Info, Target, Cpu, AlertTriangle, FileSearch } from "lucide-react";
import { useDashboard } from "./DashboardState";

export function LiveTransactionFeedReact() {
  const { filteredTransactions, setActiveTransaction, activeTransaction } = useDashboard();

  return (
    <div className="enterprise-card flex flex-col h-full bg-surface border-border/50">
      <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-background/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary/10 rounded-md text-primary">
            <Activity size={16} />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Intelligence Stream</h3>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-[9px] font-black text-muted uppercase tracking-widest opacity-40">
              <div className="w-1 h-1 bg-success rounded-full animate-pulse"></div>
              <span>Buffer: {filteredTransactions.length} pkts</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 px-6 py-2 border-b border-border bg-background/[0.05] text-[9px] font-black uppercase tracking-[0.2em] text-muted/60">
        <div className="col-span-2">Ref_ID</div>
        <div className="col-span-3">Merchant / Origin</div>
        <div className="col-span-2">Value</div>
        <div className="col-span-2 text-center">Risk</div>
        <div className="col-span-3 text-right">Decision</div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence initial={false}>
          {filteredTransactions.map((tx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setActiveTransaction(tx)}
              className={`grid grid-cols-12 px-6 py-2.5 border-b border-border items-center hover:bg-primary/[0.02] cursor-pointer transition-all ${activeTransaction?.id === tx.id ? 'bg-primary/[0.04] border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}`}
            >
              <div className="col-span-2">
                <span className="text-[10px] font-mono font-bold text-muted group-hover:text-primary tracking-tighter">#{tx.id.slice(-8)}</span>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col">
                   <span className="text-[11px] font-bold text-foreground truncate max-w-[140px]">{tx.merchant}</span>
                   <span className="text-[9px] text-muted font-medium uppercase tracking-tight opacity-50">{tx.location}</span>
                </div>
              </div>
              <div className="col-span-2">
                 <span className="text-[11px] font-black tabular-nums text-foreground">${tx.amount.toLocaleString()}</span>
              </div>
              <div className="col-span-2 flex justify-center">
                 <div className={`px-2 py-0.5 rounded-md border text-[9px] font-black tabular-nums ${tx.riskScore > 80 ? 'bg-danger/10 border-danger/20 text-danger' : tx.riskScore > 50 ? 'bg-warning/10 border-warning/20 text-warning' : 'bg-background border-border text-muted'}`}>
                    {tx.riskScore}%
                 </div>
              </div>
              <div className="col-span-3 text-right">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border transition-all ${
                  tx.action === "BLOCKED" 
                  ? "bg-danger text-white border-danger shadow-lg shadow-danger/10" 
                  : tx.action === "REVIEW"
                  ? "bg-warning/10 text-warning border-warning/30"
                  : "bg-success/5 text-success border-success/20"
                }`}>
                  {tx.action}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function FraudExplainabilityReact() {
  const { activeTransaction } = useDashboard();

  return (
    <div className="enterprise-card p-6 bg-surface h-full flex flex-col space-y-6 transition-colors duration-300">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-1.5 bg-primary/10 rounded-md text-primary border border-primary/20">
                <FileSearch size={16} />
             </div>
             <h3 className="text-xs font-black uppercase tracking-widest text-foreground">Decision Rationale</h3>
          </div>
          {activeTransaction && (
             <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${activeTransaction.isFraud ? 'bg-danger/10 text-danger border-danger/30' : 'bg-success/10 text-success border-success/30'}`}>
                Conf: {(activeTransaction.predictionConfidence * 100).toFixed(1)}%
             </div>
          )}
       </div>

       <AnimatePresence mode="wait">
          {!activeTransaction ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-20"
            >
               <div className="w-12 h-12 rounded-full border-2 border-dashed border-border flex items-center justify-center mb-4">
                  <Info size={20} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">Select active stream node to extract detection logic trace</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTransaction.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 flex-1 flex flex-col"
            >
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <Cpu size={12} className="text-muted" />
                     <span className="text-[9px] font-black text-muted uppercase tracking-[0.2em]">Detection Logic Trace</span>
                  </div>
                  <div className="p-5 bg-background rounded-2xl border border-border shadow-inner relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-1 h-full ${activeTransaction.isFraud ? 'bg-danger' : 'bg-primary'} opacity-30`} />
                    <p className="text-[11px] font-bold text-foreground leading-relaxed uppercase tracking-tight italic opacity-90">
                      "{activeTransaction.explanation}"
                    </p>
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                     <p className="text-[9px] font-black text-muted uppercase tracking-[0.2em]">Primary Drivers</p>
                     <span className="text-[8px] font-black text-muted uppercase opacity-40">Impact Weight</span>
                  </div>
                  <div className="space-y-4">
                     {activeTransaction.features.slice(0, 3).map((f) => (
                       <div key={f.name} className="space-y-2">
                          <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                             <span className="text-muted">{f.name}</span>
                             <span className="text-foreground tabular-nums">{(f.importance * 100).toFixed(0)}%</span>
                          </div>
                          <div className="h-1 bg-background rounded-full overflow-hidden border border-border/50">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${f.importance * 100}%` }}
                               className={`h-full ${f.direction === 'positive' ? 'bg-danger' : f.direction === 'negative' ? 'bg-success' : 'bg-muted'}`} 
                             />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="mt-auto p-4 bg-primary/[0.03] rounded-xl border border-primary/10 text-center">
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest">Recommended Action</p>
                  <p className="text-xs font-black text-foreground mt-1 uppercase italic tracking-tighter">
                     {activeTransaction.action === 'BLOCKED' ? 'Decline & Restrict Card' : activeTransaction.action === 'REVIEW' ? 'Escalate to Manual Ops' : 'Proceed with Authorization'}
                  </p>
               </div>
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
}
