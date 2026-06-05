"use client"

import React from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react"
import { AreaChart, Area, ResponsiveContainer } from "recharts"

interface Props {
	title: string
	value: string
	icon: LucideIcon
	trend: string
	positive: boolean
	chartData: { value: number }[]
	color: string
}

export function MetricCardReact({ title, value, icon: Icon, trend, positive, chartData, color }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 5 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="enterprise-card p-4 group flex flex-col bg-surface min-h-[110px] transition-all duration-300"
		>
			<div className="flex justify-between items-start mb-3">
				<div className="flex items-center gap-2">
           <div className="p-1 bg-background rounded border border-border text-muted group-hover:text-primary transition-colors">
             <Icon size={12} />
           </div>
           <p className="text-[9px] font-black text-muted uppercase tracking-widest truncate max-w-[100px]">{title}</p>
        </div>
				<div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black tracking-tighter ${positive ? 'text-success bg-success/10' : 'text-danger bg-danger/10'}`}>
					{positive ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
					{trend}
				</div>
			</div>

			<div className="flex items-end justify-between gap-4 mt-auto">
				<h3 className="text-2xl font-black tracking-tighter text-foreground tabular-nums leading-none truncate">{value}</h3>
				
				<div className="h-6 w-16 opacity-30 group-hover:opacity-100 transition-opacity">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={chartData}>
							<Area 
								type="monotone" 
								dataKey="value" 
								stroke={color} 
								strokeWidth={1.5} 
								fill="transparent" 
								isAnimationActive={false}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</motion.div>
	)
}
