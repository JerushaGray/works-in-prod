// -----------------------------------------------------------------------------
// Works in Prod — Heartbeat Endpoint (v4: Batched + Summary Metrics)
// -----------------------------------------------------------------------------
//
// Purpose:
//   Logs simulated system drift and performance metrics to Supabase.
//   Triggered manually or by Supabase Cron.
//
// Tables:
//   tools_index(id, name, category, vendor, updated_at)
//   stack_audit_log(id, tool_id, change_type, changed_field,
//                   previous_value, new_value, changed_by, change_reason, created_at)
//   heartbeat_log(id, run_time, updated_tools, inserted_metrics,
//                 duration_ms, status, message,
//                 avg_health numeric, avg_latency numeric)
//
// -----------------------------------------------------------------------------

import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

// ───────────────────────────────────────────────
// Utility helpers
// ───────────────────────────────────────────────
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function jitter(base: number, range: number, min = 0, max = 100) {
  const delta = (Math.random() - 0.5) * range * 2
  return clamp(base + delta, min, max)
}

// ───────────────────────────────────────────────
// Main handler
// ───────────────────────────────────────────────
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const start = performance.now()
  const nowIso = new Date().toISOString()

  try {
    // 1️⃣ Load all tools
    const { data: tools, error: toolsError } = await supabase
      .from('tools_index')
      .select('id, name, category, vendor, updated_at')

    if (toolsError) throw toolsError

    if (!tools || tools.length === 0) {
      const duration_ms = Math.round(performance.now() - start)
      await supabase.from('heartbeat_log').insert({
        run_time: nowIso,
        updated_tools: 0,
        inserted_metrics: 0,
        duration_ms,
        status: 'success',
        message: 'No tools found in tools_index',
        avg_health: 0,
        avg_latency: 0
      })
      return res.status(200).json({ ok: true, updated: 0, inserted: 0, message: 'No tools found' })
    }

    // 2️⃣ Simulate drift for all tools
    const auditRows: any[] = []
    const healthValues: number[] = []
    const latencyValues: number[] = []

    for (const t of tools) {
      const healthScore = jitter(95, 3, 85, 100)
      const latency = Math.round(jitter(300, 50, 100, 800))
      const changeType = latency > 600 ? 'Performance Degradation' : 'Routine Update'

      auditRows.push({
        tool_id: t.id,
        change_type: changeType,
        changed_field: 'heartbeat_sim',
        previous_value: 'N/A',
        new_value: `Health ${healthScore} | Latency ${latency}ms`,
        changed_by: 'System',
        change_reason: 'Automated heartbeat check',
        created_at: nowIso
      })

      healthValues.push(healthScore)
      latencyValues.push(latency)
    }

    const avgHealth = healthValues.reduce((a, b) => a + b, 0) / healthValues.length
    const avgLatency = latencyValues.reduce((a, b) => a + b, 0) / latencyValues.length

    // 3️⃣ Batch insert all audit logs at once
    const { error: auditError } = await supabase.from('stack_audit_log').insert(auditRows)
    if (auditError) throw auditError

    // 4️⃣ Write a single summary row to heartbeat_log
    const duration_ms = Math.round(performance.now() - start)
    const { error: logError } = await supabase.from('heartbeat_log').insert({
      run_time: nowIso,
      updated_tools: tools.length,
      inserted_metrics: auditRows.length,
      duration_ms,
      status: 'success',
      message: 'Batched heartbeat (v4 with summary metrics)',
      avg_health: Math.round(avgHealth * 100) / 100,
      avg_latency: Math.round(avgLatency * 100) / 100
    })
    if (logError) throw logError

    return res.status(200).json({
      ok: true,
      updated: tools.length,
      inserted: auditRows.length,
      avg_health: Math.round(avgHealth * 100) / 100,
      avg_latency: Math.round(avgLatency * 100) / 100,
      duration_ms
    })
  } catch (err: any) {
    const duration_ms = Math.round(performance.now() - start)

    try {
      await supabase.from('heartbeat_log').insert({
        run_time: nowIso,
        updated_tools: 0,
        inserted_metrics: 0,
        duration_ms,
        status: 'error',
        message: `Heartbeat failed: ${err.message}`,
        avg_health: 0,
        avg_latency: 0
      })
    } catch {}

    return res.status(500).json({ ok: false, error: err?.message ?? 'unknown error' })
  }
}
