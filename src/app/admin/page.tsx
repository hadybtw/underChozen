"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  DollarSign,
  BarChart3,
  Activity,
  Lock,
  RefreshCw,
  Eye,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  TrendingDown,
  Mail,
  MapPin,
  Zap,
  MousePointerClick,
  Clock,
  MessageCircleQuestion,
  ScrollText,
  Tag,
} from "lucide-react";
import { GlassCard } from "@/components/glass-card";

const ease = [0.22, 1, 0.36, 1] as const;

type Tab = "overview" | "traffic" | "behavior" | "revenue" | "audience" | "live";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "traffic", label: "Traffic" },
  { id: "behavior", label: "Behavior" },
  { id: "revenue", label: "Revenue" },
  { id: "audience", label: "Audience" },
  { id: "live", label: "Live Feed" },
];

const STAGE_LABELS: Record<string, string> = {
  page_view: "Page Views",
  form_start: "Form Started",
  form_complete: "Form Completed",
  results_view: "Results Viewed",
  unlock_click: "Unlock Clicked",
  payment_complete: "Payment Complete",
};

const EVENT_COLORS: Record<string, string> = {
  page_view: "bg-accent-blue/20 text-accent-blue",
  form_start: "bg-accent/20 text-accent",
  form_complete: "bg-positive/20 text-positive",
  results_view: "bg-warning/20 text-warning",
  unlock_click: "bg-accent/20 text-accent",
  payment_complete: "bg-positive/20 text-positive",
  email_capture: "bg-accent-blue/20 text-accent-blue",
  pdf_download: "bg-muted/20 text-muted",
  share_click: "bg-accent/20 text-accent",
};

interface TimeSeriesPoint {
  date: string;
  views: number;
  emails: number;
  payments: number;
  revenue: number;
  sessions: number;
}

interface NameCount {
  name: string;
  count: number;
}

interface AdminData {
  totalEmails: number;
  totalPayments: number;
  revenue: number;
  conversionRate: string;
  funnel: Record<string, number>;
  funnelStages: string[];
  totalEvents: number;
  todayViews: number;
  yesterdayViews: number;
  todaySessions: number;
  timeSeries: TimeSeriesPoint[];
  hourlyViews: number[];
  topSources: NameCount[];
  topMediums: NameCount[];
  topPages: { page: string; count: number }[];
  devices: NameCount[];
  browsers: NameCount[];
  totalSessions: number;
  avgEventsPerSession: string;
  bounceRate: string;
  topCities: { city: string; count: number }[];
  emailCaptureRate: string;
  recentEmails: {
    email: string;
    source: string;
    jobTitle: string;
    city: string;
    timestamp: string;
  }[];
  revenueSourceList: { source: string; amount: number }[];
  avgOrderValue: string;
  recentPayments: {
    email: string;
    amount: number;
    tier: string;
    timestamp: string;
  }[];
  recentEvents: {
    timestamp: string;
    event: string;
    properties: Record<string, string | number | boolean>;
    sessionId: string;
  }[];
  // Behavior
  scrollDepthPct: Record<string, number>;
  sectionEngagement: { section: string; count: number }[];
  avgTimeOnPage: number;
  ctaClickRanking: { cta: string; count: number }[];
  faqEngagement: { question: string; count: number }[];
  exitIntentShown: number;
  exitIntentConverted: number;
  promoAttempts: number;
  promoSuccesses: number;
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function trendPct(current: number, previous: number): { value: string; positive: boolean } {
  if (previous === 0) return { value: current > 0 ? "+100%" : "0%", positive: current >= 0 };
  const pct = ((current - previous) / previous) * 100;
  return { value: `${pct >= 0 ? "+" : ""}${pct.toFixed(0)}%`, positive: pct >= 0 };
}

// ── Sparkline (inline SVG) ──
function Sparkline({ data, color = "#8B5CF6", height = 32, width = 80 }: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="mt-2 opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── SVG Line Chart ──
function LineChart({ data, dataKey, label, color = "#8B5CF6" }: {
  data: TimeSeriesPoint[];
  dataKey: keyof TimeSeriesPoint;
  label: string;
  color?: string;
}) {
  if (data.length < 2) return <p className="text-sm text-muted/50 py-8 text-center">Not enough data</p>;

  const values = data.map((d) => Number(d[dataKey]));
  const max = Math.max(...values, 1);
  const chartW = 600;
  const chartH = 200;
  const padX = 40;
  const padY = 20;
  const innerW = chartW - padX * 2;
  const innerH = chartH - padY * 2;

  const points = values
    .map((v, i) => {
      const x = padX + (i / (values.length - 1)) * innerW;
      const y = padY + innerH - (v / max) * innerH;
      return `${x},${y}`;
    })
    .join(" ");

  // Y-axis labels
  const yLabels = [0, Math.round(max / 2), max];
  // X-axis labels (every ~7 days)
  const xStep = Math.max(1, Math.floor(data.length / 5));

  return (
    <div>
      <p className="text-xs text-muted/50 mb-3">{label}</p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-[600px]" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {yLabels.map((v) => {
            const y = padY + innerH - (v / max) * innerH;
            return (
              <g key={v}>
                <line x1={padX} y1={y} x2={chartW - padX} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <text x={padX - 6} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="10">
                  {v}
                </text>
              </g>
            );
          })}
          {/* X labels */}
          {data.map((d, i) => {
            if (i % xStep !== 0 && i !== data.length - 1) return null;
            const x = padX + (i / (values.length - 1)) * innerW;
            return (
              <text key={d.date} x={x} y={chartH - 4} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">
                {formatShortDate(d.date)}
              </text>
            );
          })}
          {/* Area fill */}
          <polygon
            points={`${padX},${padY + innerH} ${points} ${padX + innerW},${padY + innerH}`}
            fill={`${color}10`}
          />
          {/* Line */}
          <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ── Horizontal Bar ──
function HBar({ items, color = "from-accent to-accent-blue" }: {
  items: { label: string; value: number }[];
  color?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-foreground/70 truncate max-w-[60%]">{item.label}</span>
            <span className="text-xs font-semibold tabular-nums text-foreground/80">{item.value.toLocaleString()}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${color}`}
              style={{ width: `${(item.value / max) * 100}%`, transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Device Icon ──
function DeviceIcon({ name }: { name: string }) {
  if (name === "mobile") return <Smartphone className="w-3.5 h-3.5" />;
  if (name === "tablet") return <Tablet className="w-3.5 h-3.5" />;
  return <Monitor className="w-3.5 h-3.5" />;
}

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [eventFilter, setEventFilter] = useState<string>("all");

  useEffect(() => {
    const stored = localStorage.getItem("uc_admin_key");
    if (stored) setAdminKey(stored);
  }, []);

  const fetchData = useCallback(async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin?key=${encodeURIComponent(key)}`);
      if (res.status === 401) {
        setError("Invalid admin key");
        setAdminKey(null);
        localStorage.removeItem("uc_admin_key");
        return;
      }
      if (!res.ok) {
        setError("Failed to load data");
        return;
      }
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!adminKey) return;
    fetchData(adminKey);
    const interval = setInterval(() => fetchData(adminKey), activeTab === "live" ? 10000 : 30000);
    return () => clearInterval(interval);
  }, [adminKey, fetchData, activeTab]);

  const handleLogin = () => {
    if (!keyInput.trim()) return;
    localStorage.setItem("uc_admin_key", keyInput.trim());
    setAdminKey(keyInput.trim());
  };

  // Login gate
  if (!adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <GlassCard className="max-w-sm w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="info-label">Authentication</p>
                <h1 className="text-lg font-semibold tracking-tight">Admin Access</h1>
              </div>
            </div>
            {error && <p className="text-negative text-sm mb-4">{error}</p>}
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter admin key"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07] text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
              autoFocus
            />
            <button
              onClick={handleLogin}
              className="w-full mt-4 px-4 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Enter Dashboard
            </button>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  const funnelMax =
    data && data.funnelStages.length > 0
      ? Math.max(...data.funnelStages.map((s) => data.funnel[s] || 0), 1)
      : 1;

  // Sparkline data: last 7 days
  const last7 = data?.timeSeries.slice(-7) || [];
  const spark = {
    views: last7.map((d) => d.views),
    sessions: last7.map((d) => d.sessions),
    emails: last7.map((d) => d.emails),
    payments: last7.map((d) => d.payments),
    revenue: last7.map((d) => d.revenue),
  };

  const viewsTrend = data ? trendPct(data.todayViews, data.yesterdayViews) : null;

  // Filtered events for live feed
  const filteredEvents =
    data?.recentEvents.filter((e) => eventFilter === "all" || e.event === eventFilter) || [];

  const uniqueEventTypes = data
    ? Array.from(new Set(data.recentEvents.map((e) => e.event)))
    : [];

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-6 sm:mb-8 flex items-end justify-between"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div>
          <p className="info-label mb-1">UnderChozen</p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          {lastRefresh && (
            <span className="text-xs text-muted/50 hidden sm:block">
              Updated {formatTimestamp(lastRefresh.toISOString())}
            </span>
          )}
          <button
            onClick={() => adminKey && fetchData(adminKey)}
            disabled={loading}
            className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center hover:bg-white/[0.07] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-muted ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("uc_admin_key");
              setAdminKey(null);
              setData(null);
            }}
            className="text-xs text-muted/50 hover:text-muted transition-colors"
          >
            Logout
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-accent/15 text-accent border border-accent/20"
                : "text-muted/60 hover:text-muted hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-negative/10 border border-negative/20 text-negative text-sm">
          {error}
        </div>
      )}

      {!data && loading && (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-6 h-6 text-muted animate-spin" />
        </div>
      )}

      {data && (
        <>
          {/* ════════════════════ OVERVIEW ════════════════════ */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6">
                {/* Page Views Today */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-accent-blue/10 flex items-center justify-center">
                      <Eye className="w-3 h-3 text-accent-blue" />
                    </div>
                    <p className="info-label">Views Today</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">{data.todayViews.toLocaleString()}</p>
                  {viewsTrend && (
                    <div className={`flex items-center gap-1 mt-1 ${viewsTrend.positive ? "text-positive" : "text-negative"}`}>
                      {viewsTrend.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="text-[10px] font-medium">{viewsTrend.value} vs yesterday</span>
                    </div>
                  )}
                  <Sparkline data={spark.views} color="#60A5FA" />
                </GlassCard>

                {/* Sessions Today */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                      <Globe className="w-3 h-3 text-accent" />
                    </div>
                    <p className="info-label">Sessions</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">{data.todaySessions.toLocaleString()}</p>
                  <p className="text-[10px] text-muted/50 mt-1">{data.bounceRate}% bounce</p>
                  <Sparkline data={spark.sessions} color="#8B5CF6" />
                </GlassCard>

                {/* Emails */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-accent-blue/10 flex items-center justify-center">
                      <Mail className="w-3 h-3 text-accent-blue" />
                    </div>
                    <p className="info-label">Emails</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">{data.totalEmails.toLocaleString()}</p>
                  <p className="text-[10px] text-muted/50 mt-1">{data.emailCaptureRate}% capture rate</p>
                  <Sparkline data={spark.emails} color="#60A5FA" />
                </GlassCard>

                {/* Payments */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-positive/10 flex items-center justify-center">
                      <CreditCard className="w-3 h-3 text-positive" />
                    </div>
                    <p className="info-label">Payments</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">{data.totalPayments.toLocaleString()}</p>
                  <p className="text-[10px] text-muted/50 mt-1">{data.conversionRate}% conversion</p>
                  <Sparkline data={spark.payments} color="#34D399" />
                </GlassCard>

                {/* Revenue */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-warning/10 flex items-center justify-center">
                      <DollarSign className="w-3 h-3 text-warning" />
                    </div>
                    <p className="info-label">Revenue</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">${data.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-muted/50 mt-1">${data.avgOrderValue} AOV</p>
                  <Sparkline data={spark.revenue} color="#FBBF24" />
                </GlassCard>

                {/* Sessions Total */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                      <BarChart3 className="w-3 h-3 text-accent" />
                    </div>
                    <p className="info-label">Total Sessions</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">{data.totalSessions.toLocaleString()}</p>
                  <p className="text-[10px] text-muted/50 mt-1">{data.avgEventsPerSession} events/session</p>
                </GlassCard>
              </div>

              {/* Funnel */}
              <GlassCard className="mb-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 text-accent" />
                  </div>
                  <p className="info-label">Conversion Funnel</p>
                </div>
                <div className="space-y-3">
                  {data.funnelStages.map((stage, i) => {
                    const count = data.funnel[stage] || 0;
                    const pct = funnelMax > 0 ? (count / funnelMax) * 100 : 0;
                    const prevCount = i > 0 ? data.funnel[data.funnelStages[i - 1]] || 0 : 0;
                    const dropoff =
                      i > 0 && prevCount > 0
                        ? (((prevCount - count) / prevCount) * 100).toFixed(0)
                        : null;

                    return (
                      <div key={stage}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs sm:text-sm text-foreground/80 font-medium">
                            {STAGE_LABELS[stage] || stage}
                          </span>
                          <div className="flex items-center gap-2">
                            {dropoff && (
                              <span className="text-[10px] text-negative/60 font-light">-{dropoff}%</span>
                            )}
                            <span className="text-xs sm:text-sm font-semibold tabular-nums text-foreground/90">
                              {count.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-blue"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {data.totalEvents > 0 && (
                  <p className="text-[11px] text-muted/40 mt-4 font-light">
                    {data.totalEvents.toLocaleString()} total events tracked
                  </p>
                )}
              </GlassCard>

              {/* Views line chart + Top Interactions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <GlassCard className="lg:col-span-2">
                  <LineChart data={data.timeSeries} dataKey="views" label="Daily Page Views (30 days)" color="#60A5FA" />
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                      <MousePointerClick className="w-3 h-3 text-accent" />
                    </div>
                    <p className="info-label">Top Interactions</p>
                  </div>
                  {data.ctaClickRanking.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No click data yet</p>
                  ) : (
                    <div className="space-y-2.5">
                      {data.ctaClickRanking.slice(0, 5).map((item) => (
                        <div key={item.cta} className="flex items-center justify-between">
                          <span className="text-xs text-foreground/70 truncate max-w-[70%]">
                            {item.cta.replace(/_/g, " ")}
                          </span>
                          <span className="text-xs font-semibold tabular-nums text-foreground/80">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </div>
            </motion.div>
          )}

          {/* ════════════════════ TRAFFIC ════════════════════ */}
          {activeTab === "traffic" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* Daily visitors chart */}
              <GlassCard className="mb-6">
                <LineChart data={data.timeSeries} dataKey="sessions" label="Daily Sessions (30 days)" color="#8B5CF6" />
              </GlassCard>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* Top Sources */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-accent" />
                    </div>
                    <p className="info-label">Top UTM Sources</p>
                  </div>
                  {data.topSources.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No UTM sources yet</p>
                  ) : (
                    <HBar items={data.topSources.map((s) => ({ label: s.name, value: s.count }))} />
                  )}
                </GlassCard>

                {/* Top Pages */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-accent-blue/10 flex items-center justify-center">
                      <Eye className="w-3 h-3 text-accent-blue" />
                    </div>
                    <p className="info-label">Top Pages</p>
                  </div>
                  {data.topPages.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No page data yet</p>
                  ) : (
                    <HBar
                      items={data.topPages.map((p) => ({ label: p.page, value: p.count }))}
                      color="from-accent-blue to-accent"
                    />
                  )}
                </GlassCard>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Devices */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-positive/10 flex items-center justify-center">
                      <Monitor className="w-3 h-3 text-positive" />
                    </div>
                    <p className="info-label">Devices</p>
                  </div>
                  {data.devices.every((d) => d.count === 0) ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No device data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {data.devices.map((d) => {
                        const total = data.devices.reduce((s, x) => s + x.count, 0) || 1;
                        const pct = ((d.count / total) * 100).toFixed(0);
                        return (
                          <div key={d.name} className="flex items-center gap-3">
                            <DeviceIcon name={d.name} />
                            <span className="text-sm text-foreground/80 capitalize flex-1">{d.name}</span>
                            <span className="text-xs text-muted/50">{pct}%</span>
                            <span className="text-sm font-semibold tabular-nums">{d.count}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </GlassCard>

                {/* Browsers */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-warning/10 flex items-center justify-center">
                      <Globe className="w-3 h-3 text-warning" />
                    </div>
                    <p className="info-label">Browsers</p>
                  </div>
                  {data.browsers.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No browser data yet</p>
                  ) : (
                    <HBar
                      items={data.browsers.map((b) => ({ label: b.name, value: b.count }))}
                      color="from-warning to-accent"
                    />
                  )}
                </GlassCard>
              </div>

              {/* Hourly distribution */}
              <GlassCard className="mt-6">
                <p className="text-xs text-muted/50 mb-3">Hourly Page Views (last 24h)</p>
                <div className="flex items-end gap-[2px] h-20">
                  {data.hourlyViews.map((v, i) => {
                    const max = Math.max(...data.hourlyViews, 1);
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-accent/40 to-accent-blue/40 rounded-t-sm relative group"
                        style={{ height: `${(v / max) * 100}%`, minHeight: v > 0 ? "2px" : "0" }}
                      >
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-muted/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {i}:00 ({v})
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-muted/30">0:00</span>
                  <span className="text-[9px] text-muted/30">12:00</span>
                  <span className="text-[9px] text-muted/30">23:00</span>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ════════════════════ BEHAVIOR ════════════════════ */}
          {activeTab === "behavior" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                      <Clock className="w-3 h-3 text-accent" />
                    </div>
                    <p className="info-label">Avg Time on Page</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">
                    {data.avgTimeOnPage > 60
                      ? `${Math.floor(data.avgTimeOnPage / 60)}m ${data.avgTimeOnPage % 60}s`
                      : `${data.avgTimeOnPage}s`}
                  </p>
                </GlassCard>
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-accent-blue/10 flex items-center justify-center">
                      <Mail className="w-3 h-3 text-accent-blue" />
                    </div>
                    <p className="info-label">Exit Intent</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">{data.exitIntentShown}</p>
                  <p className="text-[10px] text-muted/50 mt-1">
                    {data.exitIntentShown > 0
                      ? `${((data.exitIntentConverted / data.exitIntentShown) * 100).toFixed(1)}% converted`
                      : "No data yet"}
                  </p>
                </GlassCard>
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-positive/10 flex items-center justify-center">
                      <MousePointerClick className="w-3 h-3 text-positive" />
                    </div>
                    <p className="info-label">Total CTA Clicks</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">
                    {data.ctaClickRanking.reduce((s, c) => s + c.count, 0)}
                  </p>
                </GlassCard>
                <GlassCard>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-warning/10 flex items-center justify-center">
                      <Tag className="w-3 h-3 text-warning" />
                    </div>
                    <p className="info-label">Promo Codes</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">{data.promoAttempts}</p>
                  <p className="text-[10px] text-muted/50 mt-1">
                    {data.promoAttempts > 0
                      ? `${data.promoSuccesses} valid (${((data.promoSuccesses / data.promoAttempts) * 100).toFixed(0)}%)`
                      : "No attempts yet"}
                  </p>
                </GlassCard>
              </div>

              {/* Scroll Depth + Section Engagement */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                      <ScrollText className="w-3 h-3 text-accent" />
                    </div>
                    <p className="info-label">Scroll Depth</p>
                  </div>
                  {Object.values(data.scrollDepthPct).every((v) => v === 0) ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No scroll data yet</p>
                  ) : (
                    <HBar
                      items={[25, 50, 75, 100].map((d) => ({
                        label: `${d}%`,
                        value: data.scrollDepthPct[String(d)] || 0,
                      }))}
                      color="from-accent to-accent-blue"
                    />
                  )}
                  <p className="text-[10px] text-muted/40 mt-3">% of sessions reaching each depth</p>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-accent-blue/10 flex items-center justify-center">
                      <Eye className="w-3 h-3 text-accent-blue" />
                    </div>
                    <p className="info-label">Section Engagement</p>
                  </div>
                  {data.sectionEngagement.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No section data yet</p>
                  ) : (
                    <HBar
                      items={data.sectionEngagement.map((s) => ({
                        label: s.section.replace(/_/g, " "),
                        value: s.count,
                      }))}
                      color="from-accent-blue to-accent"
                    />
                  )}
                </GlassCard>
              </div>

              {/* Button Clicks + FAQ Engagement */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-positive/10 flex items-center justify-center">
                      <MousePointerClick className="w-3 h-3 text-positive" />
                    </div>
                    <p className="info-label">Button Clicks</p>
                  </div>
                  {data.ctaClickRanking.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No click data yet</p>
                  ) : (
                    <HBar
                      items={data.ctaClickRanking.map((c) => ({
                        label: c.cta.replace(/_/g, " "),
                        value: c.count,
                      }))}
                      color="from-positive to-accent"
                    />
                  )}
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-warning/10 flex items-center justify-center">
                      <MessageCircleQuestion className="w-3 h-3 text-warning" />
                    </div>
                    <p className="info-label">FAQ Engagement</p>
                  </div>
                  {data.faqEngagement.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No FAQ data yet</p>
                  ) : (
                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                      {data.faqEngagement.map((f) => (
                        <div key={f.question} className="flex items-center justify-between gap-2">
                          <span className="text-xs text-foreground/70 truncate max-w-[75%]">{f.question}</span>
                          <span className="text-xs font-semibold tabular-nums text-foreground/80 shrink-0">{f.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </div>
            </motion.div>
          )}

          {/* ════════════════════ REVENUE ════════════════════ */}
          {activeTab === "revenue" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* Revenue KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <GlassCard>
                  <p className="info-label mb-2">Total Revenue</p>
                  <p className="text-xl font-semibold tabular-nums">${data.revenue.toLocaleString()}</p>
                </GlassCard>
                <GlassCard>
                  <p className="info-label mb-2">Total Payments</p>
                  <p className="text-xl font-semibold tabular-nums">{data.totalPayments}</p>
                </GlassCard>
                <GlassCard>
                  <p className="info-label mb-2">Avg Order Value</p>
                  <p className="text-xl font-semibold tabular-nums">${data.avgOrderValue}</p>
                </GlassCard>
                <GlassCard>
                  <p className="info-label mb-2">Conversion Rate</p>
                  <p className="text-xl font-semibold tabular-nums">{data.conversionRate}%</p>
                </GlassCard>
              </div>

              {/* Revenue over time */}
              <GlassCard className="mb-6">
                <LineChart data={data.timeSeries} dataKey="revenue" label="Daily Revenue (30 days)" color="#FBBF24" />
              </GlassCard>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Revenue by source */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-warning/10 flex items-center justify-center">
                      <DollarSign className="w-3 h-3 text-warning" />
                    </div>
                    <p className="info-label">Revenue by Source</p>
                  </div>
                  {data.revenueSourceList.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No revenue data yet</p>
                  ) : (
                    <HBar
                      items={data.revenueSourceList.map((r) => ({ label: r.source, value: r.amount }))}
                      color="from-warning to-positive"
                    />
                  )}
                </GlassCard>

                {/* Recent payments */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-positive/10 flex items-center justify-center">
                      <CreditCard className="w-3 h-3 text-positive" />
                    </div>
                    <p className="info-label">Recent Payments</p>
                  </div>
                  {data.recentPayments.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No payments yet</p>
                  ) : (
                    <div className="space-y-2.5 overflow-y-auto max-h-[300px]">
                      {data.recentPayments.map((p, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                          <div className="min-w-0">
                            <p className="text-sm text-foreground/80 truncate">{p.email || "—"}</p>
                            <p className="text-[10px] text-muted/40">{formatTimestamp(p.timestamp)}</p>
                          </div>
                          <div className="text-right ml-3">
                            <p className="text-sm font-semibold tabular-nums text-positive">${p.amount}</p>
                            <p className="text-[10px] text-muted/40 capitalize">{p.tier}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </div>
            </motion.div>
          )}

          {/* ════════════════════ AUDIENCE ════════════════════ */}
          {activeTab === "audience" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* Top cities */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-accent" />
                    </div>
                    <p className="info-label">Top Cities</p>
                  </div>
                  {data.topCities.length === 0 ? (
                    <p className="text-sm text-muted/50 py-4 text-center">No city data yet</p>
                  ) : (
                    <HBar
                      items={data.topCities.map((c) => ({ label: c.city, value: c.count }))}
                      color="from-accent to-positive"
                    />
                  )}
                </GlassCard>

                {/* Session stats */}
                <GlassCard>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-md bg-accent-blue/10 flex items-center justify-center">
                      <Users className="w-3 h-3 text-accent-blue" />
                    </div>
                    <p className="info-label">Session Analytics</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted/60">Total Sessions</span>
                      <span className="text-sm font-semibold tabular-nums">{data.totalSessions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted/60">Avg Events / Session</span>
                      <span className="text-sm font-semibold tabular-nums">{data.avgEventsPerSession}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted/60">Bounce Rate</span>
                      <span className="text-sm font-semibold tabular-nums">{data.bounceRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted/60">Email Capture Rate</span>
                      <span className="text-sm font-semibold tabular-nums">{data.emailCaptureRate}%</span>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Email list */}
              <GlassCard>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-md bg-accent-blue/10 flex items-center justify-center">
                    <Mail className="w-3 h-3 text-accent-blue" />
                  </div>
                  <p className="info-label">Recent Email Captures</p>
                </div>
                {data.recentEmails.length === 0 ? (
                  <p className="text-sm text-muted/50 py-4 text-center">No emails captured yet</p>
                ) : (
                  <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-muted/50 text-xs border-b border-white/[0.05]">
                          <th className="pb-3 pr-4 font-medium">Email</th>
                          <th className="pb-3 pr-4 font-medium">Source</th>
                          <th className="pb-3 pr-4 font-medium hidden sm:table-cell">Job Title</th>
                          <th className="pb-3 pr-4 font-medium hidden sm:table-cell">City</th>
                          <th className="pb-3 font-medium">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.03]">
                        {data.recentEmails.map((em, i) => (
                          <tr key={i} className="text-foreground/70">
                            <td className="py-2.5 pr-4 text-xs truncate max-w-[180px]">{em.email}</td>
                            <td className="py-2.5 pr-4">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/[0.04] text-xs">
                                {em.source}
                              </span>
                            </td>
                            <td className="py-2.5 pr-4 text-xs text-muted/50 hidden sm:table-cell">{em.jobTitle || "—"}</td>
                            <td className="py-2.5 pr-4 text-xs text-muted/50 hidden sm:table-cell">{em.city || "—"}</td>
                            <td className="py-2.5 text-xs text-muted/50 whitespace-nowrap">
                              {formatTimestamp(em.timestamp)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          )}

          {/* ════════════════════ LIVE FEED ════════════════════ */}
          {activeTab === "live" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* Filter */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                <button
                  onClick={() => setEventFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    eventFilter === "all"
                      ? "bg-accent/15 text-accent border border-accent/20"
                      : "text-muted/50 hover:text-muted bg-white/[0.03] border border-transparent"
                  }`}
                >
                  All Events
                </button>
                {uniqueEventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setEventFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                      eventFilter === type
                        ? "bg-accent/15 text-accent border border-accent/20"
                        : "text-muted/50 hover:text-muted bg-white/[0.03] border border-transparent"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <GlassCard>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-5 rounded-md bg-positive/10 flex items-center justify-center">
                    <Activity className="w-3 h-3 text-positive" />
                  </div>
                  <p className="info-label">Live Event Stream</p>
                  <span className="ml-auto text-[10px] text-muted/40">Auto-refresh 10s</span>
                </div>

                {filteredEvents.length === 0 ? (
                  <p className="text-sm text-muted/50 py-8 text-center">No events recorded yet</p>
                ) : (
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {filteredEvents.map((event, i) => (
                      <div
                        key={`${event.timestamp}-${i}`}
                        className="flex items-start gap-3 py-2.5 border-b border-white/[0.03] last:border-0"
                      >
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium mt-0.5 shrink-0 ${
                            EVENT_COLORS[event.event] || "bg-white/[0.06] text-muted/60"
                          }`}
                        >
                          {event.event}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted/40 tabular-nums">
                              {formatTimestamp(event.timestamp)}
                            </span>
                            <span className="text-[10px] text-muted/30 font-mono">
                              {event.sessionId?.slice(0, 8)}
                            </span>
                          </div>
                          {Object.keys(event.properties).length > 0 && (
                            <p className="text-[10px] text-muted/40 mt-0.5 truncate">
                              {Object.entries(event.properties)
                                .filter(([k]) => !["userAgent", "screenWidth"].includes(k))
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(" | ")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
