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
} from "lucide-react";
import { GlassCard } from "@/components/glass-card";

const ease = [0.22, 1, 0.36, 1] as const;

const STAGE_LABELS: Record<string, string> = {
  page_view: "Page Views",
  form_start: "Form Started",
  form_complete: "Form Completed",
  results_view: "Results Viewed",
  unlock_click: "Unlock Clicked",
  payment_complete: "Payment Complete",
};

interface AdminData {
  totalEmails: number;
  totalPayments: number;
  revenue: number;
  conversionRate: string;
  funnel: Record<string, number>;
  funnelStages: string[];
  recentEvents: {
    timestamp: string;
    event: string;
    properties: Record<string, string | number | boolean>;
    sessionId: string;
  }[];
  totalEvents: number;
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

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("uc_admin_key");
    if (stored) {
      setAdminKey(stored);
    }
  }, []);

  const fetchData = useCallback(
    async (key: string) => {
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
    },
    []
  );

  // Fetch on key set + auto-refresh every 30s
  useEffect(() => {
    if (!adminKey) return;
    fetchData(adminKey);
    const interval = setInterval(() => fetchData(adminKey), 30000);
    return () => clearInterval(interval);
  }, [adminKey, fetchData]);

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
                <h1 className="text-lg font-semibold tracking-tight">
                  Admin Access
                </h1>
              </div>
            </div>
            {error && (
              <p className="text-negative text-sm mb-4">{error}</p>
            )}
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

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8 sm:mb-10 flex items-end justify-between"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div>
          <p className="info-label mb-1">UnderChozen</p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Admin Dashboard
          </h1>
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
            <RefreshCw
              className={`w-4 h-4 text-muted ${loading ? "animate-spin" : ""}`}
            />
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
          {/* Top Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <GlassCard
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 rounded-md bg-accent-blue/10 flex items-center justify-center">
                  <Users className="w-3 h-3 text-accent-blue" />
                </div>
                <p className="info-label">Total Emails</p>
              </div>
              <p className="text-xl sm:text-2xl font-semibold tracking-tight tabular-nums">
                {data.totalEmails.toLocaleString()}
              </p>
            </GlassCard>

            <GlassCard
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 rounded-md bg-positive/10 flex items-center justify-center">
                  <CreditCard className="w-3 h-3 text-positive" />
                </div>
                <p className="info-label">Total Payments</p>
              </div>
              <p className="text-xl sm:text-2xl font-semibold tracking-tight tabular-nums">
                {data.totalPayments.toLocaleString()}
              </p>
            </GlassCard>

            <GlassCard
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 rounded-md bg-warning/10 flex items-center justify-center">
                  <DollarSign className="w-3 h-3 text-warning" />
                </div>
                <p className="info-label">Revenue</p>
              </div>
              <p className="text-xl sm:text-2xl font-semibold tracking-tight tabular-nums">
                ${data.revenue.toLocaleString()}
              </p>
            </GlassCard>

            <GlassCard
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                  <BarChart3 className="w-3 h-3 text-accent" />
                </div>
                <p className="info-label">Conversion Rate</p>
              </div>
              <p className="text-xl sm:text-2xl font-semibold tracking-tight tabular-nums">
                {data.conversionRate}%
              </p>
              <p className="text-[11px] text-muted/50 mt-1 font-light">
                Page view to payment
              </p>
            </GlassCard>
          </div>

          {/* Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="mb-8"
          >
            <GlassCard>
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
                  const prevCount =
                    i > 0 ? data.funnel[data.funnelStages[i - 1]] || 0 : 0;
                  const dropoff =
                    i > 0 && prevCount > 0
                      ? (((prevCount - count) / prevCount) * 100).toFixed(0)
                      : null;

                  return (
                    <div key={stage} className="group">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs sm:text-sm text-foreground/80 font-medium">
                          {STAGE_LABELS[stage] || stage}
                        </span>
                        <div className="flex items-center gap-2">
                          {dropoff && (
                            <span className="text-[10px] text-negative/60 font-light">
                              -{dropoff}%
                            </span>
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
                          transition={{
                            duration: 0.8,
                            delay: 0.3 + i * 0.08,
                            ease,
                          }}
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
          </motion.div>

          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <GlassCard>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-md bg-accent-blue/10 flex items-center justify-center">
                  <Activity className="w-3 h-3 text-accent-blue" />
                </div>
                <p className="info-label">Recent Events</p>
              </div>

              {data.recentEvents.length === 0 ? (
                <p className="text-sm text-muted/50 py-8 text-center">
                  No events recorded yet
                </p>
              ) : (
                <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted/50 text-xs border-b border-white/[0.05]">
                        <th className="pb-3 pr-4 font-medium">Timestamp</th>
                        <th className="pb-3 pr-4 font-medium">Event</th>
                        <th className="pb-3 pr-4 font-medium hidden sm:table-cell">
                          Session
                        </th>
                        <th className="pb-3 font-medium">Properties</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      {data.recentEvents.map((event, i) => (
                        <tr
                          key={`${event.timestamp}-${i}`}
                          className="text-foreground/70 hover:text-foreground/90 transition-colors"
                        >
                          <td className="py-2.5 pr-4 text-xs tabular-nums whitespace-nowrap text-muted/60">
                            {formatTimestamp(event.timestamp)}
                          </td>
                          <td className="py-2.5 pr-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/[0.04] text-xs font-medium">
                              {event.event}
                            </span>
                          </td>
                          <td className="py-2.5 pr-4 text-xs text-muted/40 font-mono hidden sm:table-cell">
                            {event.sessionId?.slice(0, 8)}...
                          </td>
                          <td className="py-2.5 text-xs text-muted/50 max-w-[200px] truncate">
                            {Object.keys(event.properties).length > 0
                              ? JSON.stringify(event.properties)
                              : "--"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </>
      )}
    </div>
  );
}
