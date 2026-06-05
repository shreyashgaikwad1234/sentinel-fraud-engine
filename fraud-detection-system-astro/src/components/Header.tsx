"use client"

import { Search, Bell, User, Shield, Moon, Sun, Terminal } from "lucide-react";
import { useDashboard } from "./DashboardState";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";

export function HeaderReact() {
  const { demoMode, setDemoMode } = useDashboard();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-20 right-0 h-16 bg-surface border-b border-border z-[90] px-6 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
            <Shield className="text-primary w-5 h-5" />
          </div>
          <div className="flex flex-col leading-none">
             <span className="text-sm font-black tracking-tight uppercase">Sentinel</span>
             <span className="text-[8px] font-black text-muted uppercase tracking-[0.2em] mt-0.5">Fraud Ops Center</span>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-border mx-2"></div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="relative flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border group transition-all cursor-pointer">
            <Search size={14} className="text-muted group-hover:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search ref_id or merchant..." 
              className="bg-transparent border-none outline-none text-[11px] font-bold text-foreground placeholder:text-muted/60 w-56 uppercase tracking-tight"
            />
            <span className="text-[8px] font-black text-muted opacity-40 ml-4">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Status indicator */}
        <div className="hidden xl:flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-muted mr-4">
           <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-success rounded-full" />
              <span>Gateway: Nominal</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-success rounded-full" />
              <span>Inference: Active</span>
           </div>
        </div>

        <div className="h-4 w-[1px] bg-border mx-2"></div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-background border border-transparent hover:border-border transition-all text-muted hover:text-primary"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Stream Toggle */}
        <button 
          onClick={() => setDemoMode(!demoMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${demoMode ? 'bg-success/10 border-success/20 text-success' : 'bg-background border-border text-muted hover:border-primary/30'}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${demoMode ? 'bg-success animate-pulse' : 'bg-muted'}`}></span>
          {demoMode ? 'Stream: Active' : 'Stream: Paused'}
        </button>

        <div className="h-6 w-[1px] bg-border mx-2"></div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-background text-muted transition-all">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-danger rounded-full ring-2 ring-surface"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden md:block">
              <p className="text-[11px] font-black leading-none mb-1 text-foreground">S. GAIKWAD</p>
              <p className="text-[8px] font-bold text-muted uppercase tracking-widest leading-none">Security Administrator</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden group hover:border-primary/40 transition-all cursor-pointer">
               <User size={16} className="text-primary group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
