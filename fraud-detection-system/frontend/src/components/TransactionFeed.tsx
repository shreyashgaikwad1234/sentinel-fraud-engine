"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShieldCheck, 
  ShieldAlert, 
  Terminal, 
  Globe, 
  Monitor, 
  CreditCard,
  ChevronRight,
  MapPin,
  Clock,
  Activity
} from "lucide-react"

interface Transaction {
  id: string
  timestamp: string
  amount: number
  is_fraud: boolean
  fraud_probability: number
  action: string
}

interface TransactionFeedProps {
  transactions: Transaction[]
}

export function TransactionFeed({ transactions }: TransactionFeedProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="command-panel flex flex-col h-full overflow-hidden border-primary/20 bg-background/80">
      {/* Bloomberg Header */}
      <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-3xl">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-1.5 rounded-md">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] neon-text-primary">Live Neural Stream</h2>
            <span className="text-[9px] font-bold text-muted uppercase tracking-widest">ISO-20022 Compliant Signal</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary/60">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            LIVE_BUFFER: {transactions.length}
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="text-[9px] font-black uppercase tracking-widest text-muted">
            UTC: {mounted ? new Date().toISOString().slice(11, 19) : "--:--:--"}
          </div>
        </div>
      </div>
      
      {/* Bloomberg Table Columns */}
      <div className="grid grid-cols-12 px-6 py-3 border-b border-white/10 bg-black/40 text-[9px] font-black uppercase tracking-widest text-muted/50">
        <div className="col-span-2">TXN_REFERENCE</div>
        <div className="col-span-2">TIMESTAMP</div>
        <div className="col-span-2">VALUE (USD)</div>
        <div className="col-span-2">ORIGIN_METADATA</div>
        <div className="col-span-2">RISK_VECTOR</div>
        <div className="col-span-2 text-right">PROTOCOL_ACTION</div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence initial={false} mode="popLayout">
          {transactions.map((tx) => (
            <motion.div 
              key={tx.id}
              layout
              initial={{ opacity: 0, x: -20, backgroundColor: "rgba(0, 229, 255, 0.1)" }}
              animate={{ opacity: 1, x: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`grid grid-cols-12 px-6 py-3 border-b border-white/5 items-center hover:bg-white/5 transition-all group relative cursor-pointer ${
                tx.is_fraud ? "border-l-2 border-l-destructive" : "border-l-2 border-l-accent"
              }`}
            >
              {/* Scanline Effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-r from-primary/20 to-transparent transition-opacity" />

              <div className="col-span-2 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-primary/80 group-hover:text-primary transition-colors">
                  {tx.id.slice(0, 12).toUpperCase()}
                </span>
              </div>

              <div className="col-span-2 text-[10px] font-mono font-medium opacity-50">
                {new Date(tx.timestamp).toLocaleTimeString([], { hour12: false })}
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black tracking-tight">
                    {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </span>
                </div>
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <Globe className="w-3 h-3 opacity-30" />
                <span className="text-[9px] font-bold text-muted uppercase">EU_WEST_1</span>
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[60px] border border-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${tx.fraud_probability * 100}%` }}
                      className={`h-full ${tx.is_fraud ? "bg-destructive shadow-[0_0_10px_rgba(255,0,61,0.5)]" : "bg-accent shadow-[0_0_10px_rgba(0,255,163,0.5)]"}`} 
                    />
                  </div>
                  <span className={`text-[10px] font-black w-8 tabular-nums ${tx.is_fraud ? "text-destructive" : "text-accent"}`}>
                    {(tx.fraud_probability * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="col-span-2 text-right">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.1em] border ${
                  tx.is_fraud 
                  ? "bg-destructive/10 text-destructive border-destructive/30" 
                  : "bg-accent/10 text-accent border-accent/30"
                }`}>
                  {tx.is_fraud ? <ShieldAlert className="w-2.5 h-2.5" /> : <ShieldCheck className="w-2.5 h-2.5" />}
                  {tx.action}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {transactions.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center py-40 opacity-20">
            <Activity className="w-16 h-16 animate-pulse-slow mb-6" />
            <p className="text-xs font-black uppercase tracking-[0.5em]">Establishing Neural Connection...</p>
          </div>
        )}
      </div>
    </div>
  )
}
