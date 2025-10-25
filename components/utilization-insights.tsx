"use client";

import type { MartechTool } from "@/lib/martech";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingDown, Users, ArrowUpDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface UtilizationInsightsProps {
  tools: MartechTool[];
  loading: boolean;
}

export function UtilizationInsights({ tools, loading }: UtilizationInsightsProps) {
  const [sortDesc, setSortDesc] = useState(true);

  // Compute utilization + sort
  const toolsWithUtilization = tools
    .map((tool) => ({
      ...tool,
      utilizationRate:
        tool.licensed_seats > 0
          ? (tool.active_users_30d / tool.licensed_seats) * 100
          : 0,
    }))
    .sort((a, b) =>
      sortDesc
        ? b.utilizationRate - a.utilizationRate
        : a.utilizationRate - b.utilizationRate
    );

  const lowUtilizationTools = toolsWithUtilization.filter(
    (tool) => tool.utilizationRate < 70
  );

  const avgRate =
    toolsWithUtilization.reduce((sum, t) => sum + t.utilizationRate, 0) /
    (toolsWithUtilization.length || 1);
  const totalCost = toolsWithUtilization.reduce(
    (sum, t) => sum + t.cost_annual,
    0
  );

  const getBarColor = (rate: number) => {
    if (rate >= 80) return "bg-[#84cc16]";
    if (rate >= 60) return "bg-[#a855f7]";
    if (rate >= 40) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <Card className="shadow-sm border-border/50 bg-gradient-to-br from-[#9333ea]/10 to-[#84cc16]/10">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">Avg Utilization</p>
            <p className="text-2xl font-bold text-[#9333ea]">
              {avgRate.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 bg-gradient-to-br from-[#84cc16]/10 to-[#9333ea]/10">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">Total Annual Cost</p>
            <p className="text-2xl font-bold text-[#84cc16]">
              ${totalCost.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 bg-gradient-to-br from-red-500/10 to-[#9333ea]/10">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">Low Utilization Tools</p>
            <p className="text-2xl font-bold text-destructive">
              {lowUtilizationTools.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Utilization Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Utilization Insights</CardTitle>
              <CardDescription>
                Track seat usage across all tools ({lowUtilizationTools.length} tools below 70%)
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : toolsWithUtilization.length === 0 ? (
            <p className="text-center text-muted-foreground">No utilization data available</p>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tool Name</TableHead>
                    <TableHead>Licensed Seats</TableHead>
                    <TableHead>Active Users (30d)</TableHead>
                    <TableHead
                      className="cursor-pointer select-none"
                      onClick={() => setSortDesc(!sortDesc)}
                    >
                      <div className="flex items-center gap-1">
                        Utilization Rate <ArrowUpDown className="h-3 w-3 opacity-60" />
                      </div>
                    </TableHead>
                    <TableHead>Annual Cost</TableHead>
                    <TableHead>Cost per Active User</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {toolsWithUtilization.map((tool, index) => {
                    const costPerUser =
                      tool.active_users_30d > 0
                        ? tool.cost_annual / tool.active_users_30d
                        : tool.cost_annual;

                    return (
                      <TableRow
                        key={tool.id}
                        className="transition-all duration-300 hover:bg-muted/40 fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <TableCell className="font-medium">{tool.tool_name}</TableCell>
                        <TableCell>{tool.licensed_seats}</TableCell>
                        <TableCell>{tool.active_users_30d}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 w-40">
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className={`${getBarColor(
                                  tool.utilizationRate
                                )} h-2 transition-all`}
                                style={{ width: `${tool.utilizationRate}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">
                              {tool.utilizationRate.toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>${tool.cost_annual.toLocaleString()}</TableCell>
                        <TableCell className="font-mono text-sm">
                          ${costPerUser.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Low Utilization Alert */}
      {lowUtilizationTools.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              <div>
                <CardTitle className="text-destructive">Low Utilization Alert</CardTitle>
                <CardDescription>
                  {lowUtilizationTools.length} tools below 70% utilization
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowUtilizationTools.slice(0, 5).map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3"
                >
                  <div>
                    <p className="font-medium">{tool.tool_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {tool.active_users_30d} of {tool.licensed_seats} seats used
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">{tool.utilizationRate.toFixed(1)}%</Badge>
                    <p className="mt-1 text-sm text-muted-foreground">
                      ${tool.cost_annual.toLocaleString()}/yr
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bar Chart Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Tools by Utilization</CardTitle>
          <CardDescription>Visual Snapshot of Utilization Rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={toolsWithUtilization.slice(0, 10)}
                margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
                barCategoryGap={20}
              >
                <XAxis
                  dataKey="tool_name"
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  formatter={(value: number) => `${value.toFixed(1)}% utilization`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />
                <Bar dataKey="utilizationRate" radius={[6, 6, 0, 0]} barSize={28}>
                  {toolsWithUtilization.slice(0, 10).map((tool, index) => {
                    const rate = tool.utilizationRate;
                    let fill = "#9333ea"; // Default purple
                    if (rate >= 85) fill = "#84cc16";
                    else if (rate >= 70) fill = "#a855f7";
                    else if (rate >= 50) fill = "#facc15";
                    else fill = "#ef4444";
                    return (
                      <Cell
                        key={`bar-${index}`}
                        fill={fill}
                        style={{
                          filter:
                            rate >= 85
                              ? "drop-shadow(0 0 4px rgba(132,204,22,0.4))"
                              : "none",
                        }}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#84cc16]" />
              <span>Excellent (85%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#a855f7]" />
              <span>Good (70–84%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#facc15]" />
              <span>Fair (50–69%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span>Low (&lt;50%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
