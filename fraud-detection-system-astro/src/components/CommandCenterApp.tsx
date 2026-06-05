"use client"

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Zap, 
  Clock, 
  Target, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight, 
  Activity, 
  Filter, 
  RefreshCcw 
} from "lucide-react";
import { DashboardProvider, useDashboard } from "./DashboardState";
import { HeaderReact } from "./Header";
import { ExecutiveSummaryReact } from "./ExecutiveSummary";
import { SimulationCenterReact } from "./SimulationCenter";
import { LiveTransactionFeedReact, FraudExplainabilityReact } from "./FraudFeedAndExplain";
import { RiskChartReact } from "./RiskChart";
import { ThreatMapReact } from "./ThreatMap";
import { FraudAnalyticsReact } from "./FraudAnalytics";
import { ExecutiveInsightsReact } from "./ExecutiveInsights";
import { FraudPipelineReact } from "./FraudPipeline";
import { ModelInsightsReact } from "./ModelInsights";
import { InvestigationPanel } from "./InvestigationPanel";

function AlertCenter({ onInvestigate }: { onInvestigate: (tx: any) => void }) {
   const { transactions } = useDashboard();
   const fraudAlerts = transactions.filter(t => t.action === "BLOCKED" || t.action === "REVIEW").slice(0, 10);

   return (
      <div className="enterprise-card p-6 bg-surface flex flex-col space-y-6 h-full shadow-sm">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="p-1.5 bg-danger/10 rounded-md text-danger border border-danger/20 shadow-sm">
                  <ShieldAlert size={16} />
               </div>
               <h3 className="text-xs font-black uppercase tracking-widest text-foreground">Priority Queue</h3>
            </div>
            <span className="text-[8px] font-black text-muted uppercase tracking-widest bg-background px-2 py-0.5 rounded border border-border">L3 Stream</span>
         </div>
         
         <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
            {fraudAlerts.length > 0 ? (
               fraudAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    onClick={() => onInvestigate(alert)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer group hover:border-primary/30 active:scale-[0.99] ${alert.action === 'BLOCKED' ? 'bg-danger/[0.02] border-danger/30 text-danger' : 'bg-warning/[0.02] border-warning/30 text-warning'}`}
                  >
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-background border border-border/50 rounded shadow-sm leading-none">{alert.action}</span>
                        <span className="text-[8px] font-bold opacity-30 tabular-nums">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                     </div>
                     <p className="text-[11px] font-bold uppercase leading-snug tracking-tight text-foreground/90">{alert.explanation.slice(0, 75)}...</p>
                     <div className="mt-4 flex justify-between items-center border-t border-border/40 pt-3">
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-40 leading-none">Impact: ${alert.amount.toLocaleString()}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex items-center gap-1 leading-none">Investigate <ChevronRight size={10} /></span>
                     </div>
                  </div>
               ))
            ) : (
               <div className="h-full flex flex-col items-center justify-center opacity-20 text-center py-20 grayscale">
                  <ShieldCheck size={48} className="mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest max-w-[140px] leading-relaxed">Queue Status: Nominal</p>
               </div>
            )}
         </div>

         <div className="pt-2">
            <button className="w-full py-3 bg-background border border-border rounded-xl text-[9px] font-black uppercase tracking-widest text-muted hover:text-primary hover:border-primary/20 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95">
               Audit History <ChevronRight size={10} />
            </button>
         </div>
      </div>
   );
}

function CommandCenterContent({ 
  investigatingCase, 
  setInvestigatingCase, 
  showFilters, 
  setShowFilters,
  isSyncing,
  setIsSyncing,
  showSyncToast,
  setShowSyncToast
}: any) {
  const { filters, setFilters, syncNodes } = useDashboard();

  const handleSync = async () => {
    setIsSyncing(true);
    await syncNodes();
    setIsSyncing(false);
    setShowSyncToast(true);
    setTimeout(() => setShowSyncToast(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <HeaderReact />
      
      <main className="pl-20 pt-16 flex-1 overflow-x-hidden">
        <div className="max-w-[1800px] mx-auto p-6 lg:p-8 space-y-8">
          
          <div className="flex justify-between items-center px-1 relative">
             <div className="flex items-center gap-3">
                <Activity size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted opacity-80">Platform Active - Node: GBR_LND_01</span>
             </div>
             <div className="flex items-center gap-4">
                <div className="relative">
                   <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-[9px] font-black uppercase transition-all shadow-sm ${showFilters ? 'bg-primary text-black border-primary' : 'bg-surface border-border text-muted hover:text-primary'}`}
                   >
                      <Filter size={12} /> {filters.decision === 'ALL' ? 'Filter Stream' : `Filtered: ${filters.decision}`}
                   </button>
                   
                   <AnimatePresence>
                      {showFilters && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-64 bg-card border border-border shadow-2xl rounded-xl p-4 z-[110]"
                        >
                           <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-4 border-b border-border pb-2">Stream Configuration</p>
                           <div className="space-y-4">
                              <div className="space-y-2">
                                 <label className="text-[8px] font-black text-muted uppercase">Decision Protocol</label>
                                 <div className="grid grid-cols-2 gap-2">
                                    {["ALL", "APPROVED", "REVIEW", "BLOCKED"].map(d => (
                                      <button 
                                        key={d}
                                        onClick={() => setFilters({ ...filters, decision: d as any })}
                                        className={`px-2 py-1.5 rounded text-[8px] font-bold border transition-all ${filters.decision === d ? 'bg-primary/20 border-primary text-primary' : 'bg-background border-border text-muted'}`}
                                      >
                                        {d}
                                      </button>
                                    ))}
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[8px] font-black text-muted uppercase">Min Risk Score: {filters.minRisk}%</label>
                                 <input 
                                   type="range" 
                                   min="0" max="100" 
                                   value={filters.minRisk}
                                   onChange={(e) => setFilters({ ...filters, minRisk: parseInt(e.target.value) })}
                                   className="w-full accent-primary bg-background rounded-lg h-1"
                                 />
                              </div>
                              <button 
                                onClick={() => {
                                  setFilters({ decision: "ALL", minRisk: 0, country: "ALL" });
                                  setShowFilters(false);
                                }}
                                className="w-full py-2 bg-background border border-border rounded-lg text-[8px] font-black uppercase text-muted hover:text-danger hover:border-danger/30 transition-all mt-2"
                              >
                                Reset All Filters
                              </button>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
                
                <button 
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded-lg text-[9px] font-black uppercase text-muted hover:text-primary transition-all shadow-sm disabled:opacity-50"
                >
                   {isSyncing ? <RefreshCcw size={12} className="animate-spin" /> : <RefreshCcw size={12} />}
                   {isSyncing ? 'Syncing...' : 'Force Node Sync'}
                </button>
             </div>

             <AnimatePresence>
                {showSyncToast && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="fixed bottom-10 right-10 flex items-center gap-3 px-4 py-3 bg-success text-white rounded-xl shadow-2xl z-[200]"
                  >
                     <ShieldCheck size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Nodes Synchronized Successfully</span>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

          <ExecutiveSummaryReact />
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            <div className="xl:col-span-8 space-y-8">
               <SimulationCenterReact />
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[320px]">
                  <FraudPipelineReact />
                  <ModelInsightsReact />
               </div>
            </div>
            <div className="xl:col-span-4 h-[640px] sticky top-20">
               <AlertCenter onInvestigate={(caseData) => setInvestigatingCase(caseData)} />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
             <div className="xl:col-span-12 h-[480px]">
                <ThreatMapReact />
             </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 min-h-[500px]">
             <div className="xl:col-span-8 h-[500px]">
                <LiveTransactionFeedReact />
             </div>
             <div className="xl:col-span-4 h-[500px]">
                <FraudExplainabilityReact />
             </div>
          </div>

          <div className="space-y-8 pb-12">
             <FraudAnalyticsReact />
             <ExecutiveInsightsReact />
          </div>
        </div>

        <footer className="px-8 py-10 border-t border-border bg-surface mt-10">
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Core Status: Nominal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted tracking-widest">Protocol: 4.2.0-PRO</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted opacity-40">
                 Enterprise Fraud Protection Infrastructure
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted opacity-40 mt-1">
                 Sentinel Security Systems
              </p>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
         {investigatingCase && (
           <motion.div 
             key="investigation-overlay"
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }} 
             className="fixed inset-0 z-[150]" 
           >
             <div 
               onClick={() => setInvestigatingCase(null)}
               className="absolute inset-0 bg-background/70 backdrop-blur-sm transition-colors" 
             />
             <InvestigationPanel tx={investigatingCase} onClose={() => setInvestigatingCase(null)} />
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}

export function CommandCenterApp() {
  const [mounted, setMounted] = useState(false);
  const [investigatingCase, setInvestigatingCase] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncToast, setShowSyncToast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="pl-20 h-screen flex flex-col items-center justify-center bg-background text-primary/20 animate-pulse">
        <span className="text-4xl font-black uppercase tracking-[1em]">Establishing Connection...</span>
      </div>
    );
  }

  return (
    <DashboardProvider>
      <CommandCenterContent 
        investigatingCase={investigatingCase}
        setInvestigatingCase={setInvestigatingCase}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        isSyncing={isSyncing}
        setIsSyncing={setIsSyncing}
        showSyncToast={showSyncToast}
        setShowSyncToast={setShowSyncToast}
      />
    </DashboardProvider>
  );
}
