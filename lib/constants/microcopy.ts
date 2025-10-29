// lib/constants/microcopy.ts
// Microcopy constants for Works in Prod UI
// Author: Jerusha Gray

export const MICROCOPY = {
  loading: {
    app: "Deploying good intentions…",
    dataFetch: "Syncing the unsyncable…",
    metricsRefresh: "Polishing the dashboards — or pretending to.",
    apiPing: "Checking heartbeat. No CPR required… yet.",
    supabaseQuery: "Waiting on data. Trust issues in progress."
  },
  success: {
    dataLoaded: "Stable (ish).",
    cronSuccess: "Heartbeat confirmed. Still alive in prod.",
    apiResponse: "All systems nominal. That’s suspicious.",
    metricsUpdated: "Updated. Possibly even correct.",
    connectionRestored: "Reconnected. Trust partially restored."
  },
  error: {
    fetchFailure: "Run-time errors give me trust issues.",
    apiTimeout: "The data ghosted us.",
    databaseError: "Supabase says no.",
    notFound: "Lost in prod. Happens to the best of us.",
    serverError: "Existential error. Try again after coffee."
  },
  empty: {
    noData: "Suspiciously quiet.",
    noLogs: "Nothing to report. Which is both good and bad.",
    noTools: "Your stack looks lonely.",
    noMetrics: "Performance unknown. Schrodinger’s uptime.",
    noResults: "You can’t measure what doesn’t exist."
  },
  notifications: {
    saveSuccess: "Saved. Probably where you meant to.",
    saveError: "Didn’t save. Definitely not your fault.",
    syncComplete: "Sync complete. Or at least confident.",
    deleteConfirm: "Gone forever. Like perfect data hygiene.",
    renewalReminder: "Non-renewal notice is coming. Panic early."
  },
  footer: {
    primary: "Run-time errors give me trust issues.",
    alt: "Observed. Measured. Mostly working.",
    fun: "Because chaos still counts as uptime."
  }
} as const;

export type MicrocopyCategory = keyof typeof MICROCOPY;
export type MicrocopyKeys<T extends MicrocopyCategory> = keyof typeof MICROCOPY[T];
