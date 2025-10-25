"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ToolDetails {
  id: string;
  tool_name: string;
  category: string;
  department: string;
  owner: string;
  cost_annual: number;
  status: string;
  notes?: string;
}

interface PerformanceMetrics {
  date: string;
  utilization_rate: number;
  uptime: number;
  latency_ms: number;
}

export default function ToolDetailPage() {
  const { id } = useParams();
  const [tool, setTool] = useState<ToolDetails | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch main tool info
      const { data: toolData, error: toolError } = await supabase
        .from("martech_stack")
        .select("*")
        .eq("id", id)
        .single();

      if (toolError) {
        console.error("Tool fetch error:", toolError);
        setLoading(false);
        return;
      }

      setTool(toolData);

      // Fetch performance metrics
      const { data: metricsData, error: metricsError } = await supabase
        .from("tool_performance_metrics")
        .select("date, utilization_rate, uptime, latency_ms")
        .eq("tool_name", toolData.tool_name)
        .order("date", { ascending: true });

      if (!metricsError && metricsData) setMetrics(metricsData);
      setLoading(false);
    };

    fetchData();
  }, [id, supabase]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        Loading tool details...
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-destructive">
        Tool not found.
      </div>
    );
  }

  // Calculate spend percentile
  const [spendRank, setSpendRank] = useState<string | null>(null);
  useEffect(() => {
    const fetchSpendRank = async () => {
      const { data } = await supabase
        .from("martech_stack")
        .select("cost_annual");
      if (data) {
        const sorted = data.map((t) => t.cost_annual).sort((a, b) => a - b);
        const rank =
          (sorted.indexOf(tool.cost_annual) / sorted.length) * 100 || 0;
        setSpendRank(rank.toFixed(0));
      }
    };
    fetchSpendRank();
  }, [tool, supabase]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost" className="flex items-center gap-2 rounded-full">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        {spendRank && (
          <Badge variant="secondary" className="rounded-full text-sm">
            Top {100 - Number(spendRank)}% by Spend
          </Badge>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Tool Overview */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">
              {tool.tool_name}
            </CardTitle>
            <CardDescription>{tool.category}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>Department:</strong> {tool.department}
            </p>
            <p>
              <strong>Owner:</strong> {tool.owner}
            </p>
            <p>
              <strong>Status:</strong> {tool.status}
            </p>
            <p>
              <strong>Annual Cost:</strong> ${tool.cost_annual.toLocaleString()}
            </p>
            {tool.notes && (
              <div className="mt-4 p-3 bg-muted/30 rounded-md text-sm leading-relaxed">
                <strong>Notes:</strong>
                <p className="mt-1 text-muted-foreground">{tool.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column - Performance Insights */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Latest usage and reliability stats
            </CardDescription>
          </CardHeader>
          <CardContent>
            {metrics.length > 0 ? (
              <>
                <div className="flex justify-between text-sm mb-4">
                  <p>
                    <strong>Current Utilization:</strong>{" "}
                    {metrics[metrics.length - 1].utilization_rate.toFixed(1)}%
                  </p>
                  <p>
                    <strong>Uptime:</strong>{" "}
                    {metrics[metrics.length - 1].uptime.toFixed(2)}%
                  </p>
                </div>

                {/* Simple Visualization */}
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metrics}>
                      <XAxis
                        dataKey="date"
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
                        formatter={(value: number) => `${value.toFixed(1)}%`}
                      />
                      <Bar
                        dataKey="utilization_rate"
                        fill="#9333ea"
                        radius={[6, 6, 0, 0]}
                        barSize={24}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                No performance data available.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
