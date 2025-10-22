// -----------------------------------------------------------------------------
// Works in Prod — Heartbeat Endpoint
// -----------------------------------------------------------------------------
//
// Purpose:
//   Simulates hourly system drift and logs metrics to Supabase.
//   Triggered manually or by Supabase Cron.
//
// -----------------------------------------------------------------------------
//
// Notes / Assumptions
//
// Tables & columns: This matches the schema we’ve iterated on:
//
//   tools(id, name, category, owner, current_health, current_latency_ms, updated_at)
//   metrics(id, tool_id, check_time, health_score, latency_ms, uptime_pct, notes)
//   heartbeat_log(id, run_time, updated_tools, inserted_metrics, duration_ms, status, message)
//
// RLS: Using the secret key server-side bypasses RLS as intended for this job.
// Keep SUPABASE_SECRET_KEY only in Vercel / Vault.
//
// Scheduling: Point your Supabase Cron job to
//   POST https://<your-domain>/api/heartbeat
//   on 0 * * * *.
//
// Auth (optional): If you want to restrict who can call it,
// add a simple header check for an X-CRON-KEY and store that key in Vercel envs.
//
// If your current DB still uses earlier column names
// (e.g., baseline_health, health, latency, last_check),
// run a migration script to align everything without losing data.
//
// -----------------------------------------------------------------------------

import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client (uses the new key model)
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
  // Allow POST (you can keep GET for manual testing if you want)
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const start = performance.now()

  try {
    // 1) Load tools with the fields we need
    const { data: tools, error: toolsError } = await supabase
      .from('tools')
      .select('id, name, current_health, current_latency_ms')

    if (toolsError) throw toolsError

    if (!tools || tools.length === 0) {
      // Still log the run even if there are no tools yet
      const duration_ms = Math.round(performance.now() - start)
      await supabase.from('heartbeat_log').insert({
        run_time: new Date().toISOString(),
        updated_tools: 0,
        inserted_metrics: 0,
        duration_ms,
        status: 'success',
        message: 'No tools found'
      })
      return res
        .status(200)
        .json({ ok: true, updated: 0, inserted: 0, message: 'No tools found' })
    }

    const nowIso = new Date().toISOString()

    // 2) Prepare metric rows & tool upserts
    const metricRows: Array<{
      tool_id: string
      check_time: string
      health_score: number
      latency_ms: number
      uptime_pct: number
      notes: string
    }> = []

    const toolUpserts: Array<{
      id: string
      current_health: number
      current_latency_ms: number
      updated_at: string
    }> = []

    for (const t of tools) {
      const baseHealth =
        typeof t.current_health === 'number' ? t.current_health : 85
      const baseLatency =
        typeof t.current_latency_ms === 'number' ? t.current_latency_ms : 300

      const newHealth = jitter(baseHealth, 3, 60, 100) // keep between 60–100
      const newLatency = Math.round(
        clamp(baseLatency + (Math.random() - 0.5) * 300, 50, 10000)
      )
      const uptime = clamp(99 + (Math.random() - 0.5) * 0.3, 95, 100)

      metricRows.push({
        tool_id: t.id,
        check_time: nowIso,
        health_score: newHealth,
        latency_ms: newLatency,
        uptime_pct: uptime,
        notes: 'auto heartbeat'
      })

      toolUpserts.push({
        id: t.id,
        current_health: newHealth,
        current_latency_ms: newLatency,
        updated_at: nowIso
      })
    }

    // 3) Write metrics in a single batch
    const { error: metricsError } = await supabase
      .from('metrics')
      .insert(metricRows)
    if (metricsError) throw metricsError

    // 4) Upsert summarized tool state (one call)
    const { error: toolsUpsertError } = await supabase
      .from('tools')
      .upsert(toolUpserts, { onConflict: 'id' })
    if (toolsUpsertError) throw toolsUpsertError

    // 5) Log the run
    const duration_ms = Math.round(performance.now() - start)
    await supabase.from('heartbeat_log').insert({
      run_time: nowIso,
      updated_tools: tools.length,
      inserted_metrics: metricRows.length,
      duration_ms,
      status: 'success',
      message: 'auto heartbeat'
    })

    return res.status(200).json({
      ok: true,
      updated: tools.length,
      inserted: metricRows.length,
      duration_ms
    })
  } catch (err: any) {
    const duration_ms = Math.round(performance.now() - start)

    // Attempt to record the failure, but don’t crash on logging error
    try {
      await supabase.from('heartbeat_log').insert({
        run_time: new Date().toISOString(),
        updated_tools: 0,
        inserted_metrics: 0,
        duration_ms,
        status: 'error',
        message: err?.message ?? 'unknown error'
      })
    } catch {}

    return res
      .status(500)
      .json({ ok: false, error: err?.message ?? 'unknown error' })
  }
}
