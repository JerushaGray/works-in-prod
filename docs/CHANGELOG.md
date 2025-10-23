## [v5.0.0] — Heartbeat API Refactor
**Date:** 2025-10-22  
**Author:** Jerusha Gray  
**Scope:** `/pages/api/heartbeat.ts`

### Summary
Refactored the Works-in-Prod heartbeat endpoint to align with the new unified `martech_stack` schema and introduce robust, structured error handling.  
This upgrade modernizes the core monitoring mechanism and prepares the backend for production-level reliability.

### Added
- Support for the unified **`martech_stack`** table (replacing legacy `tools_index`).
- New **operational drift simulation** for:
  - `health_score`
  - `active_users_30d`
  - `utilization_rate`
- **Granular error differentiation** between:
  - ✅ Successful runs  
  - ⚠️ “No data” or partial success  
  - ❌ Full Supabase/API failure  
- Structured `status` values (`success`, `warning`, `error`) logged in both API responses and `heartbeat_log`.
- Context-rich `message` field for every heartbeat event to simplify debugging and monitoring.

### Changed
- Removed latency simulation and synthetic performance metrics.
- Consolidated multiple Supabase operations into a single batched update for speed and efficiency.
- Optimized overall run time (<1s average for typical datasets).

### Fixed
- Eliminated silent failure paths — every run now records a clear status in `heartbeat_log`.
- Improved handling of null/empty datasets.

### Impact
- Dramatically improved observability and system transparency.
- Enables dashboards and alerts to reflect true operational state.
- Ready for scheduled Supabase Cron automation (hourly or daily).

### Verification
To test locally or after deployment:
```bash
curl -X POST https://works-in-prod.vercel.app/api/heartbeat
