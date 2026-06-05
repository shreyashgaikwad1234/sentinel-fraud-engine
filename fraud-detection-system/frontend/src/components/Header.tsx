"use client"

import { 
  Shield, 
  Search, 
  Bell, 
  User, 
  Cpu, 
  Activity, 
  Settings,
  LayoutGrid
} from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { motion } from "framer-motion"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-20 border-b border-white/5 bg-background/50 backdrop-blur-2xl">
      <div className="max-w-[1800px] mx-auto h-full px-8 flex items-center justify-between">
        {/* Left Side: Brand & Status */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg border border-primary/30">
              <Shield className="text-primary w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter uppercase">Sentinel</span>
              <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase opacity-80">Command Center</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Neural Status: Optimal</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
              <Cpu className="w-3 h-3 text-secondary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Model V4.2.0-Alpha</span>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden xl:flex flex-1 max-w-xl mx-12">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="GLOBAL SEARCH (CID / TXN_ID / MERCHANT)..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted/50"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-muted opacity-50">⌘K</div>
          </div>
        </div>

        {/* Right Side: Utils */}
        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors relative">
            <Bell className="w-5 h-5 text-muted" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors">
            <LayoutGrid className="w-5 h-5 text-muted" />
          </button>
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          <div className="flex items-center gap-3 pl-2">
            <div className="flex flex-col items-end">
              <span className="text-xs font-black uppercase tracking-tight">S. GAIKWAD</span>
              <span className="text-[9px] font-bold text-muted uppercase tracking-widest">Administrator</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[1px]">
              <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
