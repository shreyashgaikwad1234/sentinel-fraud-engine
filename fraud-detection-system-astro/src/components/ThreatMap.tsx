"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "./DashboardState";
import { Globe, MapPin, Zap, Info, TrendingUp, ShieldAlert, Activity } from "lucide-react";

export function ThreatMapReact() {
  const { transactions } = useDashboard();
  const [hoveredNode, setHoveredNode] = useState<any>(null);

  const fraudNodes = [
    { country: "USA", transactions: 2420, fraud: 12, risk: 42, coords: { x: "20%", y: "40%" } },
    { country: "India", transactions: 1840, fraud: 8, risk: 28, coords: { x: "70%", y: "60%" } },
    { country: "Germany", transactions: 920, fraud: 4, risk: 12, coords: { x: "50%", y: "35%" } },
    { country: "China", transactions: 3100, fraud: 24, risk: 68, coords: { x: "80%", y: "45%" } },
    { country: "Russia", transactions: 1200, fraud: 18, risk: 54, coords: { x: "75%", y: "25%" } },
    { country: "Brazil", transactions: 750, fraud: 6, risk: 32, coords: { x: "30%", y: "75%" } },
  ];

  return (
    <div className="enterprise-card p-6 bg-surface h-[480px] flex flex-col relative overflow-hidden transition-colors duration-300">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary/10 rounded-md text-primary border border-primary/20">
            <Globe size={16} />
          </div>
          <div className="flex flex-col">
             <h3 className="font-black text-xs uppercase tracking-widest text-foreground leading-none">Global Network Activity</h3>
             <span className="text-[9px] font-bold text-muted uppercase tracking-widest mt-1">Operational Node Intercepts</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden sm:flex items-center gap-3 px-3 py-1 bg-background border border-border rounded-lg shadow-inner">
              <div className="flex items-center gap-1.5">
                 <div className="w-1 h-1 bg-success rounded-full animate-pulse" />
                 <span className="text-[8px] font-black text-muted uppercase tracking-widest">14.2k Active</span>
              </div>
              <div className="h-2 w-[1px] bg-border" />
              <div className="flex items-center gap-1.5">
                 <Activity size={10} className="text-primary" />
                 <span className="text-[8px] font-black text-muted uppercase tracking-widest">128 req/s</span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 relative border border-border/50 rounded-2xl bg-background/[0.03] overflow-hidden group/map shadow-inner">
        {/* Geographic Grid Overlay */}
        <div className="absolute inset-0 bg-neural-grid bg-grid-xs opacity-5 dark:opacity-20 transition-opacity"></div>
        
        {/* Animated Connection Paths */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-10">
           <defs>
             <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
               <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8" />
               <stop offset="100%" stopColor="var(--danger)" stopOpacity="0" />
             </linearGradient>
           </defs>
           <motion.path 
             d="M 20% 40% Q 50% 20% 80% 45%" 
             fill="transparent" 
             stroke="url(#pathGrad)" 
             strokeWidth="1.5"
             className="animate-flow"
           />
           <motion.path 
             d="M 70% 60% Q 50% 50% 30% 75%" 
             fill="transparent" 
             stroke="url(#pathGrad)" 
             strokeWidth="1"
             className="animate-flow"
           />
        </svg>

        {/* Fraud Activity Nodes */}
        {fraudNodes.map((node, i) => (
          <div 
            key={node.country} 
            className="absolute cursor-pointer transition-all hover:scale-125 z-20 group/node" 
            style={{ left: node.coords.x, top: node.coords.y }}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="relative">
              {/* Density Ring */}
              <motion.div 
                animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className={`absolute inset-[-10px] rounded-full blur-sm ${node.risk > 50 ? 'bg-danger/40' : 'bg-primary/40'}`}
              />
              <div className={`w-2.5 h-2.5 rounded-full border-2 border-surface shadow-2xl transition-colors ${node.risk > 50 ? 'bg-danger shadow-danger/40' : 'bg-primary shadow-primary/40'}`}></div>
            </div>
          </div>
        ))}

        {/* Hover Information Card */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute bottom-4 left-4 p-4 bg-card/95 backdrop-blur-xl border border-border shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-xl z-30 pointer-events-none min-w-[180px]"
            >
              <div className="flex justify-between items-center mb-3 border-b border-border/50 pb-2">
                 <div className="flex items-center gap-2">
                    <MapPin size={10} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{hoveredNode.country}</span>
                 </div>
                 <div className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-tighter ${hoveredNode.risk > 50 ? 'bg-danger text-white' : 'bg-primary/20 text-primary'}`}>
                    {hoveredNode.risk > 50 ? 'HIGH_RISK' : 'MODERATE'}
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold uppercase text-muted">Node Traffic:</span>
                    <span className="text-[10px] font-black text-foreground tabular-nums">{hoveredNode.transactions.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold uppercase text-muted">Fraud Intercepts:</span>
                    <span className="text-[10px] font-black text-danger tabular-nums">{hoveredNode.fraud}</span>
                 </div>
                 <div className="flex justify-between items-center pt-1 border-t border-border/30">
                    <span className="text-[8px] font-bold uppercase text-muted">Risk Density:</span>
                    <span className="text-[10px] font-black text-foreground tabular-nums">{hoveredNode.risk}%</span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 grid grid-cols-6 gap-3">
         {fraudNodes.map(node => (
           <div key={node.country} className="p-2.5 rounded-lg bg-background border border-border hover:border-primary/30 transition-all cursor-default group relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-[8px] font-black text-muted uppercase tracking-tighter mb-1 group-hover:text-primary text-center truncate w-full">{node.country}</p>
                <span className="text-[10px] font-black tabular-nums">{node.fraud} <span className="text-[7px] opacity-30 ml-0.5">CASES</span></span>
              </div>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-primary/20 transition-all duration-500 group-hover:bg-primary/40`} style={{ width: `${node.risk}%` }} />
           </div>
         ))}
      </div>
    </div>
  );
}
