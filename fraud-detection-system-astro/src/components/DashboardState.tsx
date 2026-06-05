"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateTransaction, initialStats, type Transaction, type SystemStats } from '../services/DataService';
import { ThemeProvider } from './ThemeContext';

interface Filters {
  decision: "ALL" | "APPROVED" | "REVIEW" | "BLOCKED";
  minRisk: number;
  country: string;
}

interface DashboardContextType {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  stats: SystemStats;
  demoMode: boolean;
  setDemoMode: (mode: boolean) => void;
  runSimulation: (forceFraud?: boolean) => Promise<Transaction>;
  activeTransaction: Transaction | null;
  setActiveTransaction: (tx: Transaction | null) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  syncNodes: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<SystemStats>(initialStats);
  const [demoMode, setDemoMode] = useState(true);
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState<Filters>({
    decision: "ALL",
    minRisk: 0,
    country: "ALL"
  });

  // Use PUBLIC_API_URL for cloud, fallback to localhost for dev
  const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    setTransactions(Array.from({ length: 15 }, (_, i) => ({
      ...generateTransaction(),
      id: `TXN-INIT-${1000 + i}`
    })));
  }, []);

  const filteredTransactions = transactions.filter(tx => {
    const matchDecision = filters.decision === "ALL" || tx.action === filters.decision;
    const matchRisk = tx.riskScore >= filters.minRisk;
    const matchCountry = filters.country === "ALL" || tx.country === filters.country;
    return matchDecision && matchRisk && matchCountry;
  });

  const addTransaction = useCallback((tx: Transaction) => {
    setTransactions(prev => [tx, ...prev].slice(0, 50));
    setStats(prev => {
      const isFraud = tx.isFraud;
      const newTotal = prev.totalTransactions + 1;
      const newFraud = isFraud ? prev.fraudDetected + 1 : prev.fraudDetected;
      return {
        ...prev,
        totalTransactions: newTotal,
        fraudDetected: newFraud,
        fraudRate: (newFraud / newTotal) * 100,
        revenueProtected: isFraud ? prev.revenueProtected + tx.amount : prev.revenueProtected,
      };
    });
  }, []);

  const runSimulation = async (forceFraud = false) => {
    const payload = {
      scaled_time: Math.random(),
      scaled_amount: Math.random() * 2,
      ...Object.fromEntries(Array.from({ length: 28 }, (_, i) => [`V${i + 1}`, (Math.random() - 0.5) * 4]))
    };

    let tx;
    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      tx = {
        ...generateTransaction(forceFraud),
        id: `TXN-API-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        amount: data.amount || Math.floor(Math.random() * 2000),
        riskScore: Math.floor(data.fraud_probability * 100) || (forceFraud ? 92 : 12),
        action: data.action || (forceFraud ? "BLOCKED" : "APPROVED")
      };
    } catch (e) {
      console.warn("API Node Unreachable, falling back to Synthetic Engine");
      tx = generateTransaction(forceFraud);
    }
    
    addTransaction(tx);
    setActiveTransaction(tx);
    return tx;
  };

  const syncNodes = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Refresh with a new burst of data
    const newTxns = Array.from({ length: 3 }, () => generateTransaction());
    newTxns.forEach(addTransaction);
  };

  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      const tx = generateTransaction();
      addTransaction(tx);
      // Occasionally set active transaction to show off explainability
      if (Math.random() > 0.8) setActiveTransaction(tx);
    }, 4000);

    return () => clearInterval(interval);
  }, [demoMode, addTransaction]);

  return (
    <ThemeProvider>
      <DashboardContext.Provider value={{ 
        transactions, 
        filteredTransactions,
        stats, 
        demoMode, 
        setDemoMode, 
        runSimulation,
        activeTransaction,
        setActiveTransaction,
        filters,
        setFilters,
        syncNodes
      }}>
        {children}
      </DashboardContext.Provider>
    </ThemeProvider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within a DashboardProvider');
  return context;
};
