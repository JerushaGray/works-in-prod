"use client"

import type { MartechTool } from "@/lib/martech"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Calendar } from "lucide-react"

interface RenewalsSectionProps {
  tools: MartechTool[]
  loading: boolean
}

export function RenewalsSection({ tools, loading }: RenewalsSectionProps) {
  const today = new Date()
  const ninetyDaysFromNow = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)

  const upcomingRenewals = tools
    .filter((tool) => {
      const renewalDate = new Date(tool.renewal_date)
      return renewalDate >= today && renewalDate <= ninetyDaysFromNow
    })
    .sort((a, b) => new Date(a.renewal_date).getTime() - new Date(b.renewal_date).getTime())

  const isPastCancelDate = (tool: MartechTool) => {
    if (!tool.last_day_to_cancel) return false
    return new Date(tool.last_day_to_cancel) < today
  }

  const getDaysUntilRenewal = (renewalDate: string) => {
    const days = Math.ceil((new Date(renewalDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return days
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Upcoming Renewals</CardTitle>
            <CardDescription>Tools renewing in the next 90 days</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : upcomingRenewals.length === 0 ? (
          <p className="text-center text-muted-foreground">No upcoming renewals in the next 90 days</p>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool Name</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead>Days Until</TableHead>
                  <TableHead>Annual Cost</TableHead>
                  <TableHead>Auto Renewal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingRenewals.map((tool) => {
                  const daysUntil = getDaysUntilRenewal(tool.renewal_date)
                  const pastCancel = isPastCancelDate(tool)

                  return (
                    <TableRow key={tool.id}>
                      <TableCell className="font-medium">{tool.tool_name}</TableCell>
                      <TableCell>{formatDate(tool.renewal_date)}</TableCell>
                      <TableCell>
                        <Badge variant={daysUntil <= 30 ? "destructive" : "secondary"} className="font-mono">
                          {daysUntil}d
                        </Badge>
                      </TableCell>
                      <TableCell>${tool.cost_annual.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={tool.auto_renewal ? "default" : "outline"}>
                          {tool.auto_renewal ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {pastCancel && !tool.auto_renewal && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Past Cancel Date
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
