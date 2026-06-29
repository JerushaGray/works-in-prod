// -----------------------------------------------------------------------------
// Works in Prod — Heartbeat Endpoint (v5: Unified + Error-Aware)
// -----------------------------------------------------------------------------
//
// Purpose:
//   Refreshes operational metrics for the unified martech_stack table,
//   logs drift + audit events, and records summary metrics to heartbeat_log.
//
// Tables:
//   martech_stack(id, tool_name, health_score, licensed_seats, active_users_30d, utilization_rate)
//   stack_audit_log(...)
//   heartbeat_log(...)
//
// -----------------------------------------------------------------------------

import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// ───────────────────────────────────────────────
// Supabase client (server-side key, request-time)
// ───────────────────────────────────────────────
function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  )
}

// ───────────────────────────────────────────────
// Utility functions
// ───────────────────────────────────────────────
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function jitter(base: number, range: number, min = 0, max = 100) {
  const delta = (Math.random() - 0.5) * range * 2
  return clamp(base + delta, min, max)
}

// ───────────────────────────────────────────────
// Route handlers
// ───────────────────────────────────────────────
async function runHeartbeat(): Promise<Response> {
  const supabase = getSupabase()
  const start = performance.now()
  const nowIso = new Date().toISOString()
  let contextMessage = 'OK'
  let runStatus: 'success' | 'warning' | 'error' = 'success'

  try {
    // 1️⃣ Load current tools from martech_stack
    const { data: stack, error: fetchError } = await supabase
      .from('martech_stack')
      .select('id, tool_name, health_score, licensed_seats, active_users_30d, utilization_rate')

    if (fetchError) {
      runStatus = 'error'
      contextMessage = `Fetch failed: ${fetchError.message}`
      throw fetchError
    }

    if (!stack || stack.length === 0) {
      runStatus = 'warning'
      contextMessage = 'No tools found in martech_stack'
      const duration_ms = Math.round(performance.now() - start)
      await supabase.from('heartbeat_log').insert({
        run_time: nowIso,
        updated_tools: 0,
        inserted_metrics: 0,
        duration_ms,
        status: runStatus,
        message: contextMessage,
        avg_health: 0,
        avg_latency: 0
      })
      return Response.json({ ok: true, message: contextMessage })
    }

    // 2️⃣ Generate simulated drift + audit events
    const updates: any[] = []
    const audits: any[] = []
    const healthValues: number[] = []
    const utilValues: number[] = []

    for (const t of stack) {
      const newHealth = jitter(t.health_score ?? 85, 3, 60, 100)
      const baseUsers = t.active_users_30d ?? 0
      const seats = t.licensed_seats ?? 0
      const userDrift = clamp(baseUsers + Math.round((Math.random() - 0.5) * 10), 0, seats)
      const utilization = seats > 0 ? userDrift / seats : 0

      updates.push({
        id: t.id,
        health_score: newHealth,
        active_users_30d: userDrift,
        utilization_rate: utilization,
        updated_at: nowIso
      })

      audits.push({
        tool_id: t.id,
        change_type: 'Automated Drift',
        changed_field: 'health/utilization',
        previous_value: `H:${t.health_score ?? 'NA'} U:${t.utilization_rate ?? 'NA'}`,
        new_value: `H:${newHealth.toFixed(1)} U:${utilization.toFixed(2)}`,
        changed_by: 'System',
        change_reason: 'Routine heartbeat drift',
        created_at: nowIso
      })

      healthValues.push(newHealth)
      utilValues.push(utilization)
    }

    // 3️⃣ Apply batch updates to martech_stack
    const { error: upsertError } = await supabase
      .from('martech_stack')
      .upsert(updates, { onConflict: 'id' })
    if (upsertError) {
      runStatus = 'error'
      contextMessage = `Upsert failed: ${upsertError.message}`
      throw upsertError
    }

    // 4️⃣ Write audit records
    const { error: auditError } = await supabase.from('stack_audit_log').insert(audits)
    if (auditError) {
      runStatus = 'warning'
      contextMessage = `Partial success: metrics updated but audit log failed (${auditError.message})`
    }

    // 5️⃣ Log summary metrics
    const avgHealth =
      healthValues.reduce((a, b) => a + b, 0) / healthValues.length
    const avgUtil =
      utilValues.reduce((a, b) => a + b, 0) / utilValues.length
    const duration_ms = Math.round(performance.now() - start)

    const { error: logError } = await supabase.from('heartbeat_log').insert({
      run_time: nowIso,
      updated_tools: updates.length,
      inserted_metrics: audits.length,
      duration_ms,
      status: runStatus,
      message: contextMessage,
      avg_health: Math.round(avgHealth * 100) / 100,
      avg_utilization: Math.round(avgUtil * 10000) / 100
    })
    if (logError) throw logError

    return Response.json({
      ok: true,
      updated: updates.length,
      inserted: audits.length,
      avg_health: avgHealth.toFixed(2),
      avg_utilization: (avgUtil * 100).toFixed(1) + '%',
      duration_ms,
      status: runStatus,
      message: contextMessage
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
        message: `Unhandled error: ${err?.message ?? 'unknown'}`,
        avg_health: 0,
        avg_utilization: 0
      })
    } catch {}
    return Response.json(
      { ok: false, error: err?.message ?? 'unknown error', message: contextMessage },
      { status: 500 }
    )
  }
}

export async function GET() {
  return runHeartbeat()
}

export async function POST() {
  return runHeartbeat()
}
