import type { MartechTool } from "@/lib/martech"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, TrendingUp } from "lucide-react"

interface HealthScoreSummaryProps {
  tools: MartechTool[]
  loading: boolean
}

export function HealthScoreSummary({ tools, loading }: HealthScoreSummaryProps) {
  const healthDistribution = {
    excellent: tools.filter((t) => t.health_score >= 8).length,
    good: tools.filter((t) => t.health_score >= 6 && t.health_score < 8).length,
    needsAttention: tools.filter((t) => t.health_score < 6).length,
  }

  const averageHealth = tools.length > 0 ? tools.reduce((sum, tool) => sum + tool.health_score, 0) / tools.length : 0

  const departmentHealth = Array.from(
    tools.reduce((map, tool) => {
      if (!map.has(tool.department)) {
        map.set(tool.department, [])
      }
      map.get(tool.department)?.push(tool.health_score)
      return map
    }, new Map<string, number[]>()),
  )
    .map(([department, scores]) => ({
      department,
      average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
      count: scores.length,
    }))
    .sort((a, b) => b.average - a.average)

  const needsAttentionTools = tools.filter((t) => t.health_score < 6).sort((a, b) => a.health_score - b.health_score)

  const getHealthColor = (score: number) => {
    if (score >= 8) return "text-accent"
    if (score >= 6) return "text-primary"
    return "text-destructive"
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Health Score</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold ${getHealthColor(averageHealth)}`}>{averageHealth.toFixed(1)}/10</div>
          <p className="text-xs text-muted-foreground">Across {tools.length} tools</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Health Distribution</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Excellent (8+)</span>
              <Badge className="bg-accent text-accent-foreground">{healthDistribution.excellent}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Good (6-7)</span>
              <Badge className="bg-primary text-primary-foreground">{healthDistribution.good}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Needs Attention</span>
              <Badge variant="destructive">{healthDistribution.needsAttention}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Department</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {departmentHealth.length > 0 ? (
            <>
              <div className="text-2xl font-bold">{departmentHealth[0].department}</div>
              <p className="text-xs text-muted-foreground">
                Average score: {departmentHealth[0].average.toFixed(1)}/10 ({departmentHealth[0].count} tools)
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No data available</p>
          )}
        </CardContent>
      </Card>

      {needsAttentionTools.length > 0 && (
        <Card className="border-destructive md:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <CardTitle className="text-destructive">Tools Needing Attention</CardTitle>
                <CardDescription>{needsAttentionTools.length} tools with health score below 6</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {needsAttentionTools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3"
                >
                  <div>
                    <p className="font-medium">{tool.tool_name}</p>
                    <p className="text-sm text-muted-foreground">{tool.department}</p>
                  </div>
                  <Badge variant="destructive" className="text-lg font-bold">
                    {tool.health_score}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
