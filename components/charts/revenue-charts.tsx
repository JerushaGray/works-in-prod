"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import Recharts components (client-only)
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false, loading: () => <Skeleton className="h-64 w-full" /> }
);
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

interface RevenueData {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const memoData = useMemo(() => data ?? [], [data]);
  const isLoading = memoData.length === 0;

  return (
    <Card className="p-4">
      <CardContent>
        <div className="w-full h-64 relative">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Skeleton className="h-64 w-full" />
              </motion.div>
            ) : (
              <motion.div
                key="chart"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={memoData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                    <XAxis dataKey="month" stroke="#9333ea" />
                    <YAxis stroke="#84cc16" />
                    <Tooltip cursor={{ stroke: "#9333ea", strokeWidth: 1 }} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#9333ea"
                      strokeWidth={2}
                      dot={{ r: 4, stroke: "#84cc16", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// Example demo data for fallback/testing
export const demoRevenueData: RevenueData[] = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1900 },
  { month: "Mar", revenue: 1600 },
  { month: "Apr", revenue: 2100 },
  { month: "May", revenue: 2500 },
];
