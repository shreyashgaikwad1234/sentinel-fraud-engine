"use client"

import React from "react";
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, ShieldAlert, Zap, Info } from "lucide-react"
import { useDashboard } from "./DashboardState";

export function AlertCenterReact() {
  const { transactions } = useDashboard();
  const fraudTxns = transactions.filter(t => t.isFraud).slice(0, 5);

  return (
    <div className="glass neon-border p-8 rounded-4xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-danger/10 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-danger" />
          </div>
          <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-muted">Neural Alerts</h3>
        </div>
        <span className="text-[9px] font-black uppercase text-danger bg-danger/10 px-2 py-0.5 rounded animate-pulse">Critical Priority</span>
      </div>

      <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1">
        <AnimatePresence initial={false}>
          {fraudTxns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center">
               <ShieldAlert size={32} className="mb-4" />
               <p className="text-[10px] font-black uppercase tracking-widest">No active threats detected in buffer</p>
            </div>
          ) : (
            fraudTxns.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-danger/[0.03] border border-danger/20 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-danger/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 bg-danger/20 rounded-md text-danger">
                      <Zap size={12} />
                    </span>
                    <span className="text-[10px] font-black text-white uppercase tracking-wider italic">CRITICAL_THREAT</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold opacity-40">#{tx.id.slice(-6)}</span>
                </div>
                <p className="text-[11px] font-bold text-white mb-2 leading-tight uppercase tracking-tight">{tx.explanation}</p>
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest opacity-40">
                   <span>Loss Prevention: ${tx.amount.toLocaleString()}</span>
                   <span>Conf: {(tx.predictionConfidence * 100).toFixed(1)}%</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
