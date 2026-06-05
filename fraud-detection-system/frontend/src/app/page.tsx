"use client";

import React, { useState, useEffect } from "react";
import { 
  Activity, 
  AlertTriangle,
  CreditCard,
  Zap,
  ShieldCheck,
  LayoutDashboard,
  Cpu,
  Globe,
  DollarSign,
  TrendingUp,
  Fingerprint
} from "lucide-react";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { RiskChart } from "@/components/RiskChart";
import { TransactionFeed } from "@/components/TransactionFeed";
import { motion, AnimatePresence } from "framer-motion";

interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  is_fraud: boolean;
  fraud_probability: number;
  action: string;
}

interface Stats {
  total_transactions: number;
  total_frauds: number;
}

export default function FraudDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats>({ total_transactions: 0, total_frauds: 0 });
  const [simulating, setSimulating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const API_URL = "http://localhost:8000";

  const fetchData = async () => {
    try {
      const [txRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/transactions`),
        fetch(`${API_URL}/stats`)
      ]);
      const txData = await txRes.json();
      const statsData = await statsRes.json();
      setTransactions(txData);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  const handleSimulate = async () => {
    setSimulating(true);
    try {
      const mockPayload = {
        scaled_time: Math.random(),
        scaled_amount: Math.random() * 2,
        ...Object.fromEntries(Array.from({ length: 28 }, (_, i) => [`V${i + 1}`, (Math.random() - 0.5) * 4]))
      };

      await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockPayload)
      });
      fetchData();
    } catch (error) {
      console.error("Simulation failed:", error);
    } finally {
      setTimeout(() => setSimulating(false), 800);
    }
  };

  const chartData = [
    { name: "Approved", value: stats.total_transactions - stats.total_frauds, color: "hsl(158, 100%, 50%)" },
    { name: "Blocked", value: stats.total_frauds, color: "hsl(346, 100%, 50%)" }
  ];

  // Mock Sparkline Data
  const generateMockSparkline = () => Array.from({ length: 10 }, () => ({ value: Math.random() * 100 }));

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="particles-bg" />
      <div className="scanline" />
      
      <Header />

      <main className="pt-28 pb-12 px-8 max-w-[1800px] mx-auto space-y-12">
        {/* Hero Section */}
        <section className="relative py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-primary shadow-[0_0_10px_#00E5FF]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/80">Command & Control</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter uppercase leading-none italic">
              Sentinel <span className="text-primary not-italic">Fraud Engine</span>
            </h1>
            <p className="text-muted text-sm font-bold uppercase tracking-[0.2em] max-w-2xl mt-4 leading-relaxed">
              Real-time AI-powered transaction monitoring and neural threat intelligence infrastructure for enterprise-grade financial protection.
            </p>
          </motion.div>

          {/* Action Center - Absolute Positioned on Large Screens */}
          <div className="lg:absolute top-12 right-0 flex items-center gap-6">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase text-accent tracking-widest">System Confidence</span>
                <TrendingUp className="w-3 h-3 text-accent" />
              </div>
              <span className="text-4xl font-black tabular-nums neon-text-accent">99.8%</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSimulate}
              disabled={simulating}
              className="relative overflow-hidden group bg-primary text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <div className="flex items-center gap-3 relative z-10">
                {simulating ? <Zap className="w-4 h-4 animate-spin" /> : <Fingerprint className="w-4 h-4" />}
                <span>{simulating ? "Scanning..." : "Generate Fraud Simulation"}</span>
              </div>
            </motion.button>
          </div>
        </section>

        {/* KPI Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard 
            title="Transactions Processed" 
            value={stats.total_transactions.toLocaleString()} 
            icon={Activity}
            trend={{ value: "+14.2%", positive: true }}
            chartData={generateMockSparkline()}
            color="primary"
          />
          <StatCard 
            title="Fraud Detected" 
            value={stats.total_frauds} 
            icon={AlertTriangle}
            trend={{ value: "+0.8%", positive: false }}
            chartData={generateMockSparkline()}
            color="destructive"
          />
          <StatCard 
            title="Risk Velocity" 
            value="1.2ms" 
            icon={Zap}
            trend={{ value: "-4.1%", positive: true }}
            chartData={generateMockSparkline()}
            color="accent"
          />
          <StatCard 
            title="Model Confidence" 
            value="99.4%" 
            icon={Cpu}
            trend={{ value: "STABLE", positive: true }}
            chartData={generateMockSparkline()}
            color="secondary"
          />
          <StatCard 
            title="Revenue Protected" 
            value="$1.4M" 
            icon={DollarSign}
            trend={{ value: "+$24k", positive: true }}
            chartData={generateMockSparkline()}
            color="accent"
          />
          <StatCard 
            title="Threat Severity" 
            value="CRITICAL" 
            icon={ShieldCheck}
            trend={{ value: "HIGH", positive: false }}
            chartData={generateMockSparkline()}
            color="destructive"
          />
        </section>

        {/* Main Dashboard Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Risk Analysis & Stats */}
          <div className="xl:col-span-12 h-full">
             <RiskChart data={chartData} />
          </div>

          {/* Live Feed */}
          <div className="xl:col-span-12 h-[600px]">
            <TransactionFeed transactions={transactions} />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-[1800px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Uptime: 99.99%</span>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Kernel: 4.2.0-SENTINEL</div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Accuracy: 99.82%</div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted mb-2">Sentinel Protocol • Neural Threat Intelligence Infrastructure</p>
            <p className="text-[9px] font-bold text-muted/30 uppercase tracking-widest">&copy; 2026 Secured via Distributed Neural Network Inferences</p>
          </div>
        </div>
      </footer>

      {/* Futuristic Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[200] opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_70%)]" />
      </div>
    </div>
  );
}
