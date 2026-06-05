export interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  merchant: string;
  location: string;
  country: string;
  device: string;
  ipRisk: number;
  behaviorScore: number;
  riskScore: number;
  isFraud: boolean;
  predictionConfidence: number;
  action: "APPROVED" | "REVIEW" | "BLOCKED";
  explanation: string;
  features: { name: string; importance: number; direction: "positive" | "negative" | "neutral" }[];
}

export interface SystemStats {
  totalTransactions: number;
  fraudDetected: number;
  fraudRate: number;
  revenueProtected: number;
  fraudLossPrevented: number;
  modelConfidence: number;
  detectionAccuracy: number;
  falsePositiveRate: number;
  chargebackSavings: number;
  reviewQueue: number;
  avgInvestigationTime: string;
  hourlyTrends: { hour: string; fraud: number; total: number }[];
  categoryBreakdown: { name: string; value: number; trend: string }[];
  riskDistribution: { range: string; count: number }[];
}

const MERCHANTS = ["Amazon.com", "Apple Store", "Uber Technologies", "Airbnb", "Walmart Inc.", "Stripe Payments", "PayPal Holdings", "Target Corp", "Steam Games", "Netflix"];
const LOCATIONS = ["New York, USA", "Mumbai, IND", "Berlin, DEU", "Beijing, CHN", "Moscow, RUS", "Sao Paulo, BRA", "London, GBR", "Tokyo, JPN"];
const DEVICES = ["iPhone 15 Pro (iOS 17.4)", "MacBook Pro (macOS 14.2)", "Samsung S24 Ultra", "Chrome 122 (Windows 11)", "Pixel 8 Pro (Android 14)"];
const COUNTRIES = ["USA", "India", "Germany", "China", "Russia", "Brazil", "UK", "Japan"];

const FRAUD_REASONS = [
  "Account Takeover Risk: Multiple failed login attempts followed by high-value transaction.",
  "Card Testing Campaign: Pattern of low-value authorizations from distributed proxies.",
  "Synthetic Identity Pattern: Missing historical linkage between device fingerprint and billing address.",
  "Cross-Border Payment Spike: Transaction origin conflicts with primary cardholder geolocation.",
  "Merchant Abuse Pattern: Rapid succession of refunds and purchases on high-risk merchant node.",
  "Velocity Fraud Cluster: Multiple transactions within 120 seconds exceeding daily volume threshold.",
  "Chargeback Abuse Detection: User ID associated with high historical dispute rates."
];

export const generateTransaction = (forceFraud = false): Transaction => {
  const rand = Math.random();
  let action: "APPROVED" | "REVIEW" | "BLOCKED";
  let riskScore: number;
  let isFraud = false;

  if (forceFraud || rand < 0.03) {
    action = "BLOCKED";
    riskScore = Math.floor(Math.random() * 15) + 85; // 85-100
    isFraud = true;
  } else if (rand < 0.10) {
    action = "REVIEW";
    riskScore = Math.floor(Math.random() * 25) + 50; // 50-75
    isFraud = Math.random() > 0.4;
  } else {
    action = "APPROVED";
    riskScore = Math.floor(Math.random() * 30); // 0-30
    isFraud = false;
  }

  const amount = isFraud ? Math.floor(Math.random() * 4500) + 500 : Math.floor(Math.random() * 800) + 5;
  
  const features = [
    { name: "Amount Variance", importance: isFraud ? 0.82 : 0.15, direction: isFraud ? "positive" : "negative" },
    { name: "Location Match", importance: isFraud ? 0.94 : 0.88, direction: isFraud ? "positive" : "negative" },
    { name: "Device Reputation", importance: isFraud ? 0.76 : 0.92, direction: isFraud ? "positive" : "negative" },
    { name: "Velocity Cluster", importance: isFraud ? 0.68 : 0.05, direction: isFraud ? "positive" : "neutral" },
    { name: "Behavioral Lag", importance: 0.42, direction: "neutral" }
  ].sort((a, b) => b.importance - a.importance) as any;

  return {
    id: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    amount,
    merchant: MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)],
    location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
    country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
    device: DEVICES[Math.floor(Math.random() * DEVICES.length)],
    ipRisk: isFraud ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20),
    behaviorScore: isFraud ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 30),
    riskScore,
    isFraud,
    predictionConfidence: 0.94 + Math.random() * 0.05,
    action,
    explanation: action === "APPROVED" ? "Transaction verified: Metadata aligns with historical customer behavior and trusted device fingerprint." : FRAUD_REASONS[Math.floor(Math.random() * FRAUD_REASONS.length)],
    features
  };
};

export const initialStats: SystemStats = {
  totalTransactions: 842911,
  fraudDetected: 1204,
  fraudRate: 0.14,
  revenueProtected: 14205400,
  fraudLossPrevented: 4208000,
  modelConfidence: 99.8,
  detectionAccuracy: 99.1,
  falsePositiveRate: 0.04,
  chargebackSavings: 2840000,
  reviewQueue: 142,
  avgInvestigationTime: "14.2m",
  hourlyTrends: Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    total: Math.floor(Math.random() * 5000) + 2000,
    fraud: Math.floor(Math.random() * 50) + 10
  })),
  categoryBreakdown: [
    { name: "Account Takeover", value: 400, trend: "+12%" },
    { name: "Card Testing", value: 300, trend: "-4%" },
    { name: "Identity Theft", value: 250, trend: "+8%" },
    { name: "Synthetic ID", value: 150, trend: "+15%" },
    { name: "Merchant Abuse", value: 104, trend: "-2%" }
  ],
  riskDistribution: [
    { range: "0-20", count: 700000 },
    { range: "21-40", count: 120000 },
    { range: "41-60", count: 15000 },
    { range: "61-80", count: 5000 },
    { range: "81-100", count: 2911 }
  ]
};
