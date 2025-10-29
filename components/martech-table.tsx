"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { MartechTool, StatusFilter, DepartmentFilter } from "@/lib/martech";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, RefreshCw } from "lucide-react";

interface MartechTableProps {
  tools: MartechTool[];
  loading: boolean;
  statusFilter: StatusFilter;
  departmentFilter: DepartmentFilter;
  departments: string[];
  onStatusFilterChange: (filter: StatusFilter) => void;
  onDepartmentFilterChange: (filter: DepartmentFilter) => void;
  onRefresh: () => void;
  onViewDetails: (toolId: string) => void; // ✅ added for drawer integration
}

type SortField = "tool_name" | "cost_annual" | "health_score";
type SortDirection = "asc" | "desc";

export function MartechTable({
  tools,
  loading,
  statusFilter,
  departmentFilter,
  departments,
  onStatusFilterChange,
  onDepartmentFilterChange,
  onRefresh,
  onViewDetails, // ✅ new prop
}: MartechTableProps) {
  const [sortField, setSortField] = useState<SortField>("tool_name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedTools = [...tools].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === "asc" ? 1 : -1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * modifier;
    }
    return ((aValue as number) - (bValue as number)) * modifier;
  });

  const totalPages = Math.ceil(sortedTools.length / itemsPerPage);
  const paginatedTools = sortedTools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-accent text-accent-foreground";
      case "Inactive":
        return "bg-muted text-muted-foreground";
      case "Under Review":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return "text-accent";
    if (score >= 6) return "text-primary";
    return "text-destructive";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Martech Stack</CardTitle>
            <CardDescription>
              {tools.length} tools across {departments.length} departments
            </CardDescription>
          </div>
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="mb-4 flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(e.target.value as StatusFilter)
            }
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Review">Under Review</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) =>
              onDepartmentFilterChange(e.target.value as DepartmentFilter)
            }
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("tool_name")}
                    className="flex items-center gap-1"
                  >
                    Tool Name
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("cost_annual")}
                    className="flex items-center gap-1"
                  >
                    Annual Cost
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("health_score")}
                    className="flex items-center gap-1"
                  >
                    Health Score
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : paginatedTools.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No tools found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTools.map((tool, index) => (
                  <motion.tr
                    key={tool.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.02,
                      ease: "easeOut",
                    }}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="font-medium">
                      {tool.tool_name}
                    </TableCell>
                    <TableCell>{tool.category}</TableCell>
                    <TableCell>{tool.department}</TableCell>
                    <TableCell>{tool.owner}</TableCell>
                    <TableCell>${tool.cost_annual.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(tool.status)}>
                        {tool.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${getHealthScoreColor(
                          tool.health_score
                        )}`}
                      >
                        {tool.health_score}/10
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(tool.id)} // ✅ call drawer handler
                        className="rounded-full px-4 py-1 text-sm font-medium border-primary/40 text-primary hover:bg-primary/10 transition-all"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
