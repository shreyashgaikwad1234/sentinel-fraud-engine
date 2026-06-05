"use client"

import { motion } from "framer-motion"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer 
} from "recharts"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend: {
    value: string
    positive: boolean
  }
  chartData: { value: number }[]
  color?: "primary" | "secondary" | "accent" | "destructive"
}

export function StatCard({ title, value, icon: Icon, trend, chartData, color = "primary" }: StatCardProps) {
  const colorMap = {
    primary: "hsl(187, 100%, 50%)",
    secondary: "hsl(266, 100%, 50%)",
    accent: "hsl(158, 100%, 50%)",
    destructive: "hsl(346, 100%, 50%)"
  }

  const selectedColor = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="command-panel group p-6 h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl bg-${color}/10 border border-${color}/20 group-hover:neon-glow transition-all`}>
          <Icon className={`w-6 h-6 text-${color}`} style={{ color: selectedColor }} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${
          trend.positive ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
        }`}>
          {trend.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend.value}
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <h3 className="text-muted text-[10px] font-black uppercase tracking-[0.2em]">{title}</h3>
        <p className="text-4xl font-black tracking-tighter tabular-nums truncate">
          {value}
        </p>
      </div>

      <div className="h-16 w-full opacity-50 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={selectedColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={selectedColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={selectedColor} 
              strokeWidth={2} 
              fill={`url(#grad-${title})`} 
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute -inset-[1px] rounded-2xl bg-${color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none blur-sm`} />
    </motion.div>
  )
}
