"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

interface MartechTableProps {
  tools: MartechTool[];
  loading: boolean;
  statusFilter: StatusFilter;
  departmentFilter: DepartmentFilter;
  departments: string[];
  onStatusFilterChange: (filter: StatusFilter) => void;
  onDepartmentFilterChange: (filter: DepartmentFilter) => void;
  onRefresh: () => void;
}

type SortField = "tool_name" | "cost_annual";
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
}: MartechTableProps) {
  const [sortField, setSortField] = useState<SortField>("tool_name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

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
            className="rounded-full"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
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
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : paginatedTools.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No tools found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTools.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell className="font-medium">{tool.tool_name}</TableCell>
                    <TableCell>{tool.category}</TableCell>
                    <TableCell>{tool.department}</TableCell>
                    <TableCell>{tool.owner}</TableCell>
                    <TableCell>${tool.cost_annual.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(tool.status)}>
                        {tool.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/tools/${tool.id}`)}
                        className="rounded-full px-4"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
