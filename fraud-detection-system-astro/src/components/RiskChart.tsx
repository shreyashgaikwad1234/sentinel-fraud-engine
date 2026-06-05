"use client"

import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"
import { motion } from "framer-motion"
import { Cpu, Zap, Activity, Info, BarChart3 } from "lucide-react"
import { useDashboard } from "./DashboardState";

const radarData = [
  { subject: 'Velocity', A: 120, fullMark: 150 },
  { subject: 'Consistency', A: 98, fullMark: 150 },
  { subject: 'Complexity', A: 86, fullMark: 150 },
  { subject: 'Origin Risk', A: 99, fullMark: 150 },
  { subject: 'Payload Size', A: 85, fullMark: 150 },
];

export function RiskChartReact() {
  const { transactions, stats } = useDashboard();
  
  const pieData = [
    { name: "Approved", value: stats.totalTransactions - stats.fraudDetected, color: "#00C853" },
    { name: "Blocked", value: stats.fraudDetected, color: "#FF1744" }
  ];

  return (
    <div className="space-y-8 h-full">
      {/* Risk Distribution Pie */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass neon-border p-8 flex flex-col rounded-4xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-muted">Global Distribution</h3>
          </div>
          <Info className="w-4 h-4 text-muted/30 cursor-help" />
        </div>

        <div className="flex-1 min-h-[200px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
                cornerRadius={12}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    strokeWidth={0} 
                  />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted">SEC_SCORE</span>
            <span className="text-2xl font-black">99.8%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {pieData.map((item) => (
            <div key={item.name} className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">{item.name}</span>
              </div>
              <span className="text-xl font-black tabular-nums">{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Model Explainability / Feature Importance */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass neon-border p-8 flex flex-col rounded-4xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Cpu className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-muted">Feature Importance</h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
            <Zap className="w-3 h-3 text-secondary animate-pulse" />
            <span className="text-[9px] font-black uppercase text-secondary">SHAP_CORE</span>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[250px]">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={transactions[0]?.features || [
                  { name: "Amount Velocity", importance: 0.8 },
                  { name: "Device Shift", importance: 0.6 },
                  { name: "IP Reputation", importance: 0.4 },
                  { name: "Location", importance: 0.3 },
                  { name: "Time Anomaly", importance: 0.2 }
                ]}
                margin={{ left: -20 }}
              >
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                  width={100}
                />
                <Bar 
                  dataKey="importance" 
                  fill="hsl(266, 100%, 50%)" 
                  radius={[0, 4, 4, 0]} 
                  barSize={12}
                />
              </BarChart>
           </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/5">
          <p className="text-[10px] font-bold text-muted/60 uppercase tracking-widest mb-2">AI Reasoning</p>
          <p className="text-[11px] font-medium leading-relaxed opacity-80 italic">
            {transactions[0]?.explanation || "System idling. Awaiting network activity for real-time inference explanation."}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
