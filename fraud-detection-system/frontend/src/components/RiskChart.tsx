"use client"

import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from "recharts"
import { motion } from "framer-motion"
import { Cpu, Zap, Activity, Info } from "lucide-react"

interface RiskChartProps {
  data: {
    name: string
    value: number
    color: string
  }[]
}

const radarData = [
  { subject: 'Velocity', A: 120, fullMark: 150 },
  { subject: 'Consistency', A: 98, fullMark: 150 },
  { subject: 'Complexity', A: 86, fullMark: 150 },
  { subject: 'Origin Risk', A: 99, fullMark: 150 },
  { subject: 'Payload Size', A: 85, fullMark: 150 },
];

export function RiskChart({ data }: RiskChartProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      {/* Risk Distribution Pie */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="command-panel p-8 flex flex-col"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] neon-text-primary">Global Distribution</h3>
          </div>
          <Info className="w-4 h-4 text-muted/30 cursor-help" />
        </div>

        <div className="flex-1 min-h-[250px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={105}
                paddingAngle={8}
                dataKey="value"
                cornerRadius={12}
                animationDuration={2500}
              >
                {data.map((entry, index) => (
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
            <span className="text-3xl font-black">99.8%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">{item.name}</span>
              </div>
              <span className="text-2xl font-black tabular-nums">{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Neural Radar Analysis */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="command-panel p-8 flex flex-col"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Cpu className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-secondary">Neural Vectors</h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
            <Zap className="w-3 h-3 text-secondary animate-pulse" />
            <span className="text-[9px] font-black uppercase text-secondary">AI_THOUGHT_PROCESS</span>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 900 }}
              />
              <Radar
                name="Sentinel Core"
                dataKey="A"
                stroke="hsl(266, 100%, 50%)"
                fill="hsl(266, 100%, 50%)"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 space-y-4">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <p className="text-[10px] font-bold text-muted/60 uppercase tracking-widest mb-2">Decision Rationale</p>
            <p className="text-[11px] font-medium leading-relaxed opacity-80 italic">
              "System identifies persistent pattern consistency in high-value clusters across EU-WEST regions. Feature 'Origin Risk' currently dominating decision vector."
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
