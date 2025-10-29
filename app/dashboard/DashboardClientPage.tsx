"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase"; // ✅ unified import for both browser + server
import type { MartechTool, StatusFilter, DepartmentFilter } from "@/lib/martech";
import { MartechTable } from "@/components/martech-table";
import { RenewalsSection } from "@/components/renewals-section";
import { UtilizationInsights } from "@/components/utilization-insights";
import { VendorCards } from "@/components/vendor-cards";
import { HealthScoreSummary } from "@/components/health-score-summary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// ✅ Drawer for inline tool detail view
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import ToolDetailsDrawer from "@/components/tool-details-drawer";

export function DashboardClientPage() {
  const [supabase, setSupabase] = useState<any>(null); // ✅ lazy init
  const [tools, setTools] = useState<MartechTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [departmentFilter, setDepartmentFilter] = useState<DepartmentFilter>("all");
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  // ✅ Create Supabase client only after mount
  useEffect(() => {
    const client = getSupabaseClient();
    setSupabase(client);
  }, []);

  // ✅ Fetch tools only when supabase is ready
  useEffect(() => {
    if (!supabase) return;
    fetchTools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function fetchTools() {
    try {
      setLoading(true);
      console.log("[v0] Supabase client initialized:", !!supabase);

      const { data, error } = await supabase
        .from("martech_stack")
        .select("*")
        .order("tool_name", { ascending: true });

      if (error) {
        console.error("[v0] Supabase error:", error);
        setError(`Database error: ${error.message}`);
        throw error;
      }

      console.log("[v0] Fetched tools:", data?.length || 0);
      setTools(data || []);
      setError(null);
    } catch (error) {
      console.error("[v0] Error fetching tools:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch tools");
    } finally {
      setLoading(false);
    }
  }

  const filteredTools = tools.filter((tool) => {
    if (statusFilter !== "all" && tool.status !== statusFilter) return false;
    if (departmentFilter !== "all" && tool.department !== departmentFilter) return false;
    return true;
  });

  const departments = Array.from(new Set(tools.map((t) => t.department)));

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500 bg-red-50 p-4 dark:bg-red-950">
            <h3 className="font-semibold text-red-900 dark:text-red-100">Connection Error</h3>
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              Check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and
              NEXT_PUBLIC_SUPABASE_ANON_KEY are set correctly.
            </p>
            <Button
              onClick={fetchTools}
              variant="outline"
              size="sm"
              className="mt-3 bg-transparent"
            >
              Retry Connection
            </Button>
          </div>
        )}

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <HealthScoreSummary tools={tools} loading={loading} />
            <RenewalsSection tools={tools} loading={loading} />
            <MartechTable
              tools={filteredTools}
              loading={loading}
              statusFilter={statusFilter}
              departmentFilter={departmentFilter}
              departments={departments}
              onStatusFilterChange={setStatusFilter}
              onDepartmentFilterChange={setDepartmentFilter}
              onRefresh={fetchTools}
              onViewDetails={(toolId) => setSelectedToolId(toolId)}
            />
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <UtilizationInsights tools={tools} loading={loading} />
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="space-y-6">
            <VendorCards tools={tools} loading={loading} />
          </TabsContent>
        </Tabs>

        {/* ✅ Drawer for Tool Details */}
        <Sheet open={!!selectedToolId} onOpenChange={() => setSelectedToolId(null)}>
          <SheetContent
            side="right"
            className="w-[450px] sm:w-[600px] overflow-y-auto border-l border-border/50 shadow-xl"
          >
            {selectedToolId && <ToolDetailsDrawer id={selectedToolId} />}
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
}
