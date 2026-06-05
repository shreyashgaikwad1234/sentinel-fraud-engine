"use client"

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Target, BarChart3, TrendingUp, Info, ChevronRight, Activity, ShieldCheck, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { useDashboard } from "./DashboardState";

export function ModelInsightsReact() {
  const { activeTransaction } = useDashboard();

  const metrics = [
    { label: "Accuracy", value: "99.1%", status: "OPTIMAL" },
    { label: "Precision", value: "98.7%", status: "STABLE" },
    { label: "Recall", value: "96.2%", status: "STABLE" },
    { label: "F1 Score", value: "97.4%", status: "OPTIMAL" },
    { label: "ROC-AUC", value: "0.992", status: "STABLE" },
  ];

  const displayFeatures = activeTransaction?.features.slice(0, 5) || [
    { name: "Txn Amount", importance: 0.85, direction: "positive" },
    { name: "Device Risk", importance: 0.72, direction: "positive" },
    { name: "Location Mismatch", importance: 0.64, direction: "positive" },
    { name: "Velocity Pattern", importance: 0.58, direction: "neutral" },
    { name: "Behavior Lag", importance: 0.45, direction: "negative" },
  ];

  return (
    <div className="enterprise-card bg-surface flex flex-col h-[320px] transition-all duration-300">
      <div className="px-5 py-3 border-b border-border flex justify-between items-center bg-background/[0.02]">
         <div className="flex items-center gap-3">
            <div className="p-1.5 bg-secondary/10 rounded-md text-secondary border border-secondary/20">
               <Cpu size={14} />
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground">Detection Engine Performance</h3>
         </div>
         <span className="text-[8px] font-black text-muted uppercase tracking-widest bg-background px-2 py-0.5 rounded border border-border tabular-nums">XGB_V4_PRO</span>
      </div>

      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left: SHAP Chart */}
        <div className="col-span-7 p-5 border-r border-border flex flex-col space-y-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <BarChart3 size={12} className="text-muted" />
                 <span className="text-[9px] font-black text-muted uppercase tracking-widest">Feature SHAP Contribution</span>
              </div>
           </div>
           <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={displayFeatures} layout="vertical" margin={{ left: -10, right: 35, top: 0, bottom: 0 }}>
                    <XAxis type="number" hide domain={[0, 1]} />
                    <YAxis 
                       dataKey="name" 
                       type="category" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: 'var(--text-secondary)', fontSize: 9, fontWeight: 800 }}
                       width={110}
                    />
                    <Tooltip 
                       cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                       content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                             const data = payload[0].payload;
                             return (
                                <div className="bg-card border border-border p-2 rounded shadow-2xl min-w-[150px] z-50">
                                   <p className="text-[9px] font-black text-foreground uppercase border-b border-border mb-1.5 pb-1">{data.name}</p>
                                   <div className="flex justify-between items-center text-[9px] font-bold">
                                      <span className="text-muted uppercase">Weight:</span>
                                      <span className="text-foreground">{(data.importance * 100).toFixed(1)}%</span>
                                   </div>
                                   <div className="flex justify-between items-center text-[9px] font-bold mt-1">
                                      <span className="text-muted uppercase">Risk Vector:</span>
                                      <span className={data.direction === 'positive' ? 'text-danger' : data.direction === 'negative' ? 'text-success' : 'text-muted'}>
                                         {data.direction === 'positive' ? '+ INCR_FRAUD' : data.direction === 'negative' ? '- REDUCE_RISK' : 'NEUTRAL'}
                                      </span>
                                   </div>
                                </div>
                             );
                          }
                          return null;
                       }}
                    />
                    <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={8}>
                       {displayFeatures.map((entry, index) => (
                         <Cell 
                           key={`cell-${index}`} 
                           fill={entry.direction === 'positive' ? "var(--danger)" : entry.direction === 'negative' ? "var(--success)" : "var(--border)"} 
                           fillOpacity={0.7}
                         />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Right: Model Metrics */}
        <div className="col-span-5 p-5 bg-background/[0.01] space-y-4">
           <div className="flex items-center gap-2">
              <Target size={12} className="text-muted" />
              <span className="text-[9px] font-black text-muted uppercase tracking-widest">Operational Metrics</span>
           </div>
           <div className="grid grid-cols-1 gap-1.5">
              {metrics.slice(0, 5).map((m) => (
                <div key={m.label} className="flex justify-between items-center px-2 py-1.5 bg-background rounded-lg border border-border group hover:border-primary/20 transition-all">
                   <span className="text-[8px] font-bold text-muted uppercase tracking-tight">{m.label}</span>
                   <div className="flex flex-col items-end leading-none">
                      <span className="text-[10px] font-black text-foreground tabular-nums">{m.value}</span>
                      <span className="text-[6px] font-black text-success mt-0.5 opacity-60 tracking-widest uppercase">{m.status}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Bottom: Detection Logic Summary */}
      <div className="px-5 py-2 border-t border-border bg-background/[0.04] flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Zap size={10} className="text-primary" />
            <div className="flex flex-col flex-1 min-w-0">
               <p className="text-[8px] font-black text-muted uppercase tracking-widest leading-none">Prediction Logic Trace</p>
               <p className="text-[10px] font-bold text-foreground leading-normal uppercase tracking-tight mt-1 group-hover:text-primary transition-colors">
                  {activeTransaction ? `Logic: ${activeTransaction.explanation}` : "Awaiting operational stream for detection trace generation..."}
               </p>
            </div>
         </div>
         <div className="flex items-center gap-1 opacity-20">
            <ChevronRight size={10} />
         </div>
      </div>
    </div>
  );
}
