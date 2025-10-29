"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { motion, useSpring } from "framer-motion";

// ✅ Recharts dynamically imported (client-only)
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });

interface Props {
  id: string;
}

interface ToolDetails {
  id: string;
  tool_name: string;
  category: string;
  vendor: string;
  owner: string;
  department: string;
  status: string;
  cost_annual: number;
  notes?: string;
}

interface PerformanceMetrics {
  check_time: string;
  api_uptime_pct: number;
  avg_latency_ms: number;
  error_rate_pct: number;
}

export default function ToolDetailsDrawer({ id }: Props) {
  const supabase = getSupabaseClient();

  // --- State
  const [tool, setTool] = useState<ToolDetails | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Springs (must always be declared before conditionals)
  const uptimeSpring = useSpring(0, { stiffness: 80, damping: 20 });
  const latencySpring = useSpring(0, { stiffness: 80, damping: 20 });
  const errorRateSpring = useSpring(0, { stiffness: 80, damping: 20 });

  // --- Fetch tool + performance data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: toolData, error: toolError } = await supabase
        .from("martech_stack")
        .select("*")
        .eq("id", id)
        .single();

      if (toolError || !toolData) {
        console.error("Tool fetch error:", toolError);
        setTool(null);
        setLoading(false);
        return;
      }

      setTool(toolData);

      const { data: metricsData, error: metricsError } = await supabase
        .from("tool_performance_metrics")
        .select("check_time, api_uptime_pct, avg_latency_ms, error_rate_pct")
        .eq("tool_id", toolData.id)
        .order("check_time", { ascending: true });

      if (!metricsError && metricsData) setMetrics(metricsData);
      setLoading(false);
    };

    fetchData();
  }, [id, supabase]);

  // --- Update metric values when data changes
  useEffect(() => {
    if (metrics.length === 0) return;
    const latest = metrics[metrics.length - 1];
    uptimeSpring.set(latest.api_uptime_pct ?? 0);
    latencySpring.set(latest.avg_latency_ms ?? 0);
    errorRateSpring.set(latest.error_rate_pct ?? 0);
  }, [metrics, uptimeSpring, latencySpring, errorRateSpring]);

  // --- Conditional rendering AFTER hooks
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="p-6 text-destructive text-sm">
        Unable to load tool details.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-background text-foreground">
      {/* --- Header --- */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CardTitle className="text-2xl font-semibold text-foreground">
          {tool.tool_name}
        </CardTitle>
        <Badge variant="secondary" className="rounded-full">
          {tool.status}
        </Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <CardDescription>
          {tool.category} · {tool.vendor}
        </CardDescription>
      </motion.div>

      {/* --- Overview --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="border border-border bg-background shadow-sm">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>Department:</strong> {tool.department}
            </p>
            <p>
              <strong>Owner:</strong> {tool.owner}
            </p>
            <p>
              <strong>Annual Cost:</strong>{" "}
              ${tool.cost_annual?.toLocaleString()}
            </p>

            {tool.notes && (
              <motion.div
                className="mt-3 bg-muted/30 rounded-md p-3 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <strong>User Notes:</strong>
                <p className="text-muted-foreground text-sm mt-1 whitespace-pre-line">
                  {tool.notes}
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* --- Performance Metrics --- */}
      <Card className="border border-border bg-background shadow-sm">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>API uptime and latency trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-purple-100 p-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Uptime</p>
              <motion.p className="text-lg font-semibold text-purple-700">
                {uptimeSpring.get().toFixed(2)}%
              </motion.p>
            </div>

            <div className="rounded-xl bg-gray-100 p-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Latency</p>
              <motion.p className="text-lg font-semibold">
                {latencySpring.get().toFixed(1)} ms
              </motion.p>
            </div>

            <div className="rounded-xl bg-lime-100 p-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Error Rate</p>
              <motion.p className="text-lg font-semibold text-lime-700">
                {errorRateSpring.get().toFixed(2)}%
              </motion.p>
            </div>
          </div>

          {metrics.length > 0 ? (
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics}>
                  <XAxis
                    dataKey="check_time"
                    tick={{ fontSize: 10 }}
                    interval={metrics.length > 6 ? "preserveStartEnd" : 0}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0,0,0,0.8)",
                      color: "#fff",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                    }}
                    formatter={(value: number, key: string) => {
                      if (key === "avg_latency_ms") return `${value.toFixed(1)} ms`;
                      if (key.includes("pct")) return `${value.toFixed(2)}%`;
                      return value;
                    }}
                  />
                  <Bar
                    dataKey="api_uptime_pct"
                    fill="#9333ea"
                    radius={[6, 6, 0, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No performance data available.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
