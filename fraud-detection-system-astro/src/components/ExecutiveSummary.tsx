"use client"

import React from "react";
import { Zap, ShieldCheck, Activity, AlertTriangle, Clock, Target, DollarSign, Timer, BarChart3 } from "lucide-react";
import { useDashboard } from "./DashboardState";
import { MetricCardReact } from "./MetricCard";

export function ExecutiveSummaryReact() {
  const { stats } = useDashboard();

  const kpis = [
    { title: "Transactions Today", value: stats.totalTransactions.toLocaleString(), trend: "+12.4%", positive: true, icon: Activity, color: "var(--primary)" },
    { title: "Fraud Cases", value: stats.fraudDetected.toLocaleString(), trend: "-2.1%", positive: true, icon: AlertTriangle, color: "var(--danger)" },
    { title: "Revenue Protected", value: `$${(stats.revenueProtected / 1000000).toFixed(2)}M`, trend: "+$24k", positive: true, icon: DollarSign, color: "var(--success)" },
    { title: "System Uptime", value: "99.99%", trend: "STABLE", positive: true, icon: Clock, color: "var(--success)" },
    { title: "Avg Risk Score", value: "14.2%", trend: "STABLE", positive: true, icon: Target, color: "var(--secondary)" },
    { title: "Loss Prevented", value: `$${(stats.fraudLossPrevented / 1000000).toFixed(1)}M`, trend: "+12%", positive: true, icon: ShieldCheck, color: "var(--success)" },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground uppercase">Sentinel <span className="text-primary italic">Fraud Intelligence Platform</span></h1>
          <p className="text-muted text-[10px] font-black uppercase tracking-[0.3em] mt-1 opacity-60">AI-Powered Fraud Detection • Explainable Risk Scoring • Real-Time Monitoring</p>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted">
           <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
              <span>Network Status: Nominal</span>
           </div>
           <div className="h-4 w-[1px] bg-border" />
           <div className="flex items-center gap-2">
              <Timer size={14} className="text-primary" />
              <span>Avg Investigation: {stats.avgInvestigationTime}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <MetricCardReact 
            key={kpi.title}
            {...kpi}
            chartData={Array.from({ length: 15 }, () => ({ value: Math.floor(Math.random() * 60) + 20 }))}
          />
        ))}
      </div>
    </section>
  );
}
