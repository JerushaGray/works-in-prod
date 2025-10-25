"use client";

import type { MartechTool } from "@/lib/martech";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Mail,
  MessageSquare,
  User,
  Calendar,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useEffect, useState } from "react";

interface VendorCardsProps {
  tools: MartechTool[];
  loading: boolean;
}

export function VendorCards({ tools, loading }: VendorCardsProps) {
  const vendorMap = new Map<string, MartechTool[]>();

  // Group tools by vendor
  tools.forEach((tool) => {
    if (!vendorMap.has(tool.vendor)) {
      vendorMap.set(tool.vendor, []);
    }
    vendorMap.get(tool.vendor)?.push(tool);
  });

  // Aggregate vendor data
  const vendors = Array.from(vendorMap.entries())
    .map(([vendor, vendorTools]) => ({
      vendor,
      tools: vendorTools,
      totalCost: vendorTools.reduce((sum, tool) => sum + tool.cost_annual, 0),
      csm: vendorTools.find((t) => t.csm_name)?.csm_name || null,
      csmEmail: vendorTools.find((t) => t.csm_email)?.csm_email || null,
      accountManager:
        vendorTools.find((t) => t.account_manager)?.account_manager_name || null,
      lastReview:
        vendorTools.find((t) => t.last_business_review)?.last_business_review ||
        null,
      nextReview:
        vendorTools.find((t) => t.next_business_review)?.next_business_review ||
        null,
      slackChannel:
        vendorTools.find((t) => t.slack_channel)?.slack_channel || null,
    }))
    .sort((a, b) => b.totalCost - a.totalCost);

  const totalSpend = vendors.reduce((sum, v) => sum + v.totalCost, 0);
  const topVendors = vendors.slice(0, 10).map((v) => ({
    name: v.vendor,
    spend: v.totalCost,
  }));

  const COLORS = ["#84cc16", "#9333ea", "#a855f7", "#22c55e", "#7dd3fc", "#f9a8d4"];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Sequential reveal animation for bars
  const [visibleBars, setVisibleBars] = useState(0);

  useEffect(() => {
    if (topVendors.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        setVisibleBars((prev) => {
          if (prev >= topVendors.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
        index++;
      }, 150);
      return () => clearInterval(interval);
    }
  }, [tools]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#84cc16] to-[#9333ea] bg-clip-text text-transparent">
          Vendor Relationships
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage relationships with {vendors.length} vendors
        </p>
      </div>

      {/* Top Vendors Bar Chart */}
      {!loading && vendors.length > 0 && (
        <Card className="border border-border/50 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Top 10 Vendors by Annual Spend</CardTitle>
                <CardDescription>
                  Total annual spend: ${totalSpend.toLocaleString()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topVendors.slice(0, visibleBars)}
                  layout="vertical"
                  margin={{ top: 10, right: 40, left: 80, bottom: 10 }}
                >
                  <XAxis
                    type="number"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    width={150}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    labelStyle={{
                      fontWeight: "600",
                      color: "hsl(var(--primary))",
                    }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover) / 0.9)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                      color: "hsl(var(--popover-foreground))",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      padding: "0.5rem 0.75rem",
                      fontSize: "0.875rem",
                      transition: "all 0.2s ease",
                    }}
                  />
                  <Bar
                    dataKey="spend"
                    radius={[6, 6, 6, 6]}
                    barSize={24}
                    isAnimationActive={false}
                  >
                    {topVendors.slice(0, visibleBars).map((bar, index) => (
                      <Cell
                        key={bar.name}
                        fill={COLORS[index % COLORS.length]}
                        style={{
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                        }}
                      >
                        <motion.rect
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.15,
                            ease: "easeOut",
                          }}
                        />
                      </Cell>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vendor Detail Cards */}
      {!loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vendors.map(
            ({
              vendor,
              tools: vendorTools,
              totalCost,
              csm,
              csmEmail,
              accountManager,
              lastReview,
              nextReview,
              slackChannel,
            }) => (
              <Card key={vendor} className="flex flex-col transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{vendor}</CardTitle>
                    </div>
                    <Badge variant="secondary">{vendorTools.length} tools</Badge>
                  </div>
                  <CardDescription className="text-lg font-semibold text-foreground">
                    ${totalCost.toLocaleString()}/year
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  {/* Tools List */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Tools
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {vendorTools.map((tool) => (
                        <Badge key={tool.id} variant="outline" className="text-xs">
                          {tool.tool_name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Contacts */}
                  {(csm || accountManager) && (
                    <div className="space-y-2 border-t pt-4">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Contacts
                      </h4>
                      {csm && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{csm}</p>
                            {csmEmail && (
                              <a
                                href={`mailto:${csmEmail}`}
                                className="flex items-center gap-1 text-xs text-primary hover:underline"
                              >
                                <Mail className="h-3 w-3" />
                                {csmEmail}
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                      {accountManager && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <p>
                            <span className="text-muted-foreground">AM:</span>{" "}
                            {accountManager}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Business Reviews */}
                  {(lastReview || nextReview) && (
                    <div className="space-y-2 border-t pt-4">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Business Reviews
                      </h4>
                      <div className="space-y-1 text-sm">
                        {lastReview && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Last:</span>
                            <span>{formatDate(lastReview)}</span>
                          </div>
                        )}
                        {nextReview && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Next:</span>
                            <span className="font-medium">
                              {formatDate(nextReview)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Slack Link */}
                  {slackChannel && (
                    <div className="border-t pt-4">
                      <a
                        href={`slack://channel?team=&id=${slackChannel}`}
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <MessageSquare className="h-4 w-4" />
                        {slackChannel}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
