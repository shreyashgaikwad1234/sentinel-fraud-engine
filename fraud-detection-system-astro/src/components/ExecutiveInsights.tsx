"use client"

import React from "react";
import { motion } from "framer-motion"
import { Brain, TrendingUp, Target, Globe, Lightbulb, AlertCircle, ChevronRight } from "lucide-react"
import { useDashboard } from "./DashboardState";

export function ExecutiveInsightsReact() {
  const { stats } = useDashboard();
  
  const insights = [
    {
      icon: TrendingUp,
      label: "Fraud Trend",
      text: "Fraud attempts increased 8% this week, primarily in high-value merchant clusters.",
      impact: "HIGH",
      recommendation: "Increase velocity threshold for APAC nodes",
      confidence: 98
    },
    {
      icon: Brain,
      label: "Device Risk",
      text: "Most blocked transactions originated from new devices with spoofed fingerprints.",
      impact: "MEDIUM",
      recommendation: "Update biometric fingerprinting rules",
      confidence: 94
    },
    {
      icon: AlertCircle,
      label: "Peak Risk",
      text: "High-risk transactions are concentrated between 1 AM and 4 AM UTC daily.",
      impact: "CRITICAL",
      recommendation: "Enable adaptive friction during off-peak",
      confidence: 96
    },
    {
      icon: Target,
      label: "Model Precision",
      text: `Current detection accuracy remains at ${stats.detectionAccuracy}%, exceeding targets.`,
      impact: "STABLE",
      recommendation: "Review false positive clusters in queue",
      confidence: 99
    }
  ];

  return (
    <div className="glass neon-border p-8 rounded-4xl h-full flex flex-col bg-background/[0.02] transition-colors duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground">AI Business Intelligence</h3>
            <span className="text-[9px] font-bold text-muted uppercase tracking-widest opacity-60">Autonomous Insight Summary</span>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-lg text-[9px] font-black uppercase text-muted hover:text-primary transition-all">
           Export Report <ChevronRight size={10} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="enterprise-card p-6 flex flex-col bg-surface hover:border-primary/30 transition-all cursor-default group h-full shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
               <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted group-hover:text-primary group-hover:border-primary/20 transition-all shadow-inner">
                  <insight.icon size={18} />
               </div>
               <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${insight.impact === 'CRITICAL' ? 'bg-danger text-white' : insight.impact === 'HIGH' ? 'bg-danger/10 text-danger border border-danger/20' : insight.impact === 'MEDIUM' ? 'bg-warning/10 text-warning border border-warning/20' : 'bg-success/10 text-success border border-success/20'}`}>
                  {insight.impact}
               </div>
            </div>

            <div className="flex-1 flex flex-col space-y-4">
              <div className="space-y-1.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary opacity-80">{insight.label}</p>
                <p className="text-[11px] font-bold text-foreground leading-relaxed uppercase tracking-tight italic opacity-90">"{insight.text}"</p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-border/50 space-y-4">
                 <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-muted uppercase tracking-widest opacity-40">Actionable Plan</p>
                    <p className="text-[10px] font-bold text-foreground opacity-80 uppercase leading-tight tracking-tight">{insight.recommendation}</p>
                 </div>
                 <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
                    <span className="text-muted opacity-40">Confidence Index</span>
                    <span className="text-foreground tabular-nums">{insight.confidence}%</span>
                 </div>
                 <div className="h-1 bg-background rounded-full overflow-hidden border border-border/30">
                    <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: `${insight.confidence}%` }}
                       className="h-full bg-primary" 
                    />
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
