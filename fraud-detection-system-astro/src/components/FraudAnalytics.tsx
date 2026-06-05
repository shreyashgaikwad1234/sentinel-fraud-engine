"use client"

import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Info } from "lucide-react";
import { useDashboard } from "./DashboardState";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border p-4 rounded-xl shadow-2xl min-w-[160px] transition-colors duration-300 pointer-events-none">
        <p className="text-[10px] font-black text-foreground uppercase border-b border-border mb-2.5 pb-1.5 leading-none">{label || data.name}</p>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-muted uppercase">Value:</span>
            <span className="text-foreground tabular-nums">{payload[0].value.toLocaleString()}</span>
          </div>
          {data.trend && (
             <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-muted uppercase">Trend:</span>
                <span className={data.trend.startsWith('+') ? 'text-danger' : 'text-success'}>{data.trend}</span>
             </div>
          )}
          <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mt-2 pt-2 border-t border-border/50">Verified Data Node</p>
        </div>
      </div>
    );
  }
  return null;
};

export function FraudAnalyticsReact() {
  const { stats } = useDashboard();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Fraud Trend Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="enterprise-card p-8 bg-surface transition-colors duration-300"
      >
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-primary/10 rounded-md text-primary border border-primary/20">
                 <TrendingUp size={16} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground">Temporal Threat Distribution</h3>
           </div>
           <Info size={12} className="text-muted opacity-30 cursor-help" />
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.hourlyTrends}>
              <defs>
                <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="var(--danger)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="hour" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-secondary)', fontSize: 9, fontWeight: 700 }}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="fraud" 
                stroke="var(--danger)" 
                fillOpacity={1} 
                fill="url(#colorFraud)" 
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="enterprise-card p-8 bg-surface transition-colors duration-300"
      >
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-secondary/10 rounded-md text-secondary border border-secondary/20">
                 <BarChart3 size={16} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground">Vector Categorization</h3>
           </div>
           <Info size={12} className="text-muted opacity-30 cursor-help" />
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.categoryBreakdown} layout="vertical" margin={{ left: 10, right: 40 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'var(--text-secondary)', fontSize: 9, fontWeight: 700 }}
                width={120}
              />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                {stats.categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "var(--secondary)" : "var(--primary)"} opacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
