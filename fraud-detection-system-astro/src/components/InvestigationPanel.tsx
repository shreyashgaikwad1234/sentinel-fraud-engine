"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  ShieldCheck, 
  User, 
  CreditCard, 
  MapPin, 
  Clock, 
  ChevronRight, 
  X,
  TrendingUp,
  Fingerprint,
  Zap,
  Activity,
  History,
  AlertTriangle,
  ClipboardList,
  UserCheck,
  CheckCircle2,
  FileText
} from "lucide-react";
import { useDashboard } from "./DashboardState";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

export function InvestigationPanel({ tx, onClose }: { tx: any, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"summary" | "behavior" | "audit">("summary");
  if (!tx) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="enterprise-card bg-surface fixed top-16 right-4 bottom-4 w-[520px] z-[200] shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col transition-colors duration-300 overflow-hidden"
    >
      {/* Header Section */}
      <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-background/[0.03]">
         <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl ${tx.action === 'BLOCKED' ? 'bg-danger text-white' : tx.action === 'REVIEW' ? 'bg-warning text-white' : 'bg-success text-white'}`}>
               {tx.isFraud ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div>
               <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Incident #{tx.id.slice(-8)}</h3>
               <p className="text-[10px] font-bold text-muted uppercase tracking-widest opacity-60">Status: {tx.action} • Priority: {tx.riskScore > 80 ? 'CRITICAL' : 'ELEVATED'}</p>
            </div>
         </div>
         <button onClick={onClose} className="p-2 hover:bg-background rounded-lg text-muted transition-all">
            <X size={20} />
         </button>
      </div>

      {/* Tabs */}
      <div className="px-8 border-b border-border flex gap-8 bg-background/[0.01]">
         {[
            { id: "summary", label: "Case Summary", icon: ClipboardList },
            { id: "behavior", label: "Behavior Analysis", icon: Activity },
            { id: "audit", label: "Audit Timeline", icon: History },
         ].map(tab => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`flex items-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-primary' : 'text-muted hover:text-foreground'}`}
           >
              <tab.icon size={12} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
           </button>
         ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
         <AnimatePresence mode="wait">
            {activeTab === "summary" && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                 {/* Metadata */}
                 <div className="grid grid-cols-2 gap-4">
                    {[
                       { label: "Txn Amount", value: `$${tx.amount.toLocaleString()}`, icon: CreditCard },
                       { label: "Origin Node", value: tx.location, icon: MapPin },
                       { label: "Detection Engine", value: "XGB_V4_PRO", icon: Zap },
                       { label: "Signal ID", value: tx.id.slice(4), icon: Fingerprint },
                    ].map((detail) => (
                      <div key={detail.label} className="p-4 bg-background border border-border rounded-xl space-y-1.5 shadow-inner">
                         <div className="flex items-center gap-2 text-muted opacity-60">
                            <detail.icon size={10} />
                            <span className="text-[8px] font-black uppercase tracking-widest">{detail.label}</span>
                         </div>
                         <p className="text-xs font-black text-foreground uppercase tracking-tight">{detail.value}</p>
                      </div>
                    ))}
                 </div>

                 {/* Detection Rationale */}
                 <div className="space-y-3">
                    <div className="flex items-center gap-2">
                       <FileText size={12} className="text-primary" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Operational Rationale</span>
                    </div>
                    <div className="p-5 bg-background rounded-2xl border border-border shadow-inner relative overflow-hidden group">
                       <div className={`absolute top-0 left-0 w-1 h-full ${tx.isFraud ? 'bg-danger' : 'bg-success'} opacity-30`} />
                       <p className="text-xs font-bold text-foreground leading-relaxed uppercase tracking-tight italic opacity-90 break-words">
                         "{tx.explanation}"
                       </p>
                    </div>

                 </div>

                 {/* Customer Profile */}
                 <div className="space-y-4">
                    <div className="flex items-center gap-2">
                       <UserCheck size={12} className="text-muted" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Customer Linkage</span>
                    </div>
                    <div className="p-4 rounded-xl bg-background border border-border flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                             <User size={18} className="text-primary" />
                          </div>
                          <div>
                             <p className="text-xs font-black text-foreground">#USR-842911</p>
                             <p className="text-[9px] font-bold text-muted uppercase">Verified Account (Tier 1)</p>
                          </div>
                       </div>
                       <button className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">View History</button>
                    </div>
                 </div>

                 {/* Analyst Workspace */}
                 <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Analyst Internal Notes</span>
                    <textarea 
                      placeholder="Enter investigation observations..."
                      className="w-full h-24 bg-background border border-border rounded-xl p-4 text-[11px] font-bold text-foreground placeholder:opacity-30 focus:outline-none focus:border-primary/50 transition-all uppercase tracking-tight"
                    />
                 </div>
              </motion.div>
            )}

            {activeTab === "behavior" && (
               <motion.div
                key="behavior"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                 <div className="h-[300px] w-full enterprise-card bg-background p-6 border-border/50 shadow-inner">
                    <p className="text-[9px] font-black text-muted uppercase tracking-widest mb-6 border-b border-border pb-2">SHAP Force Attribution (Model: XGB_PRO)</p>
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={tx.features} layout="vertical" margin={{ left: -10, right: 30 }}>
                          <XAxis type="number" hide domain={[0, 1]} />
                          <YAxis 
                             dataKey="name" 
                             type="category" 
                             axisLine={false} 
                             tickLine={false} 
                             tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}
                             width={120}
                          />
                          <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={12}>
                             {tx.features.map((entry: any, index: number) => (
                               <Cell 
                                key={`cell-${index}`} 
                                fill={entry.direction === 'positive' ? "var(--danger)" : entry.direction === 'negative' ? "var(--success)" : "var(--border)"} 
                                opacity={0.7}
                               />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-danger/[0.02] border border-danger/20 rounded-xl space-y-2">
                       <span className="text-[9px] font-black text-danger uppercase tracking-widest">Top Risk Factor</span>
                       <p className="text-xs font-black text-foreground uppercase">{tx.features[0].name}</p>
                    </div>
                    <div className="p-4 bg-success/[0.02] border border-success/20 rounded-xl space-y-2">
                       <span className="text-[9px] font-black text-success uppercase tracking-widest">Confidence Index</span>
                       <p className="text-xs font-black text-foreground uppercase">{(tx.predictionConfidence * 100).toFixed(1)}%</p>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === "audit" && (
              <motion.div
                key="audit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                 <div className="space-y-4 relative">
                    <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-border border-dashed z-0" />
                    {[
                       { title: "Network Intercept Reached", time: "T-0ms", status: "success", node: "AWS_US_EAST_1" },
                       { title: "Vector Encoding Protocol", time: "T-12ms", status: "success", node: "ENCODE_SERVICE_B" },
                       { title: "Neural Inference Stage", time: "T-38ms", status: tx.isFraud ? "danger" : "success", node: "XGB_NODE_7" },
                       { title: "Analyst Flag Triggered", time: "T-52ms", status: "warning", node: "QUE_SERVICE" },
                       { title: "Operational Decision", time: "T-64ms", status: "success", node: "FINAL_GATEWAY" },
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-6 relative z-10">
                         <div className={`mt-1.5 w-10 h-10 rounded-xl border-2 flex items-center justify-center bg-surface shadow-sm ${step.status === 'success' ? 'border-success/50 text-success' : step.status === 'danger' ? 'border-danger/50 text-danger' : 'border-warning/50 text-warning'}`}>
                            {step.status === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                         </div>
                         <div className="flex-1 space-y-1 bg-background p-4 rounded-2xl border border-border group hover:border-primary/20 transition-all">
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-black uppercase tracking-tight text-foreground">{step.title}</span>
                               <span className="text-[9px] font-bold text-muted tabular-nums opacity-40">{step.time}</span>
                            </div>
                            <p className="text-[8px] font-bold text-muted uppercase tracking-widest">Node: {step.node}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="px-8 py-6 border-t border-border bg-background/[0.04] grid grid-cols-2 gap-4">
         <button className="px-4 py-4 rounded-xl border border-border text-[10px] font-black uppercase tracking-widest text-muted hover:bg-background transition-all">Dismiss Signal</button>
         <button className={`px-4 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-all active:scale-95 ${tx.isFraud ? 'bg-danger shadow-danger/20 hover:bg-danger/90' : 'bg-primary shadow-primary/20 hover:bg-primary/90'}`}>Submit Resolution</button>
      </div>
    </motion.div>
  );
}
