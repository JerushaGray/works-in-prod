# Cancellation Deadline Feature

## Overview
The `last_day_to_cancel` field is a calculated column that shows the deadline to provide cancellation notice before a contract auto-renews. This is critical for martech stack management, as missing this deadline means you're locked in for another contract term.

---

## Calculation

```
last_day_to_cancel = renewal_date - notice_period_days
```

### Example:
- **Tool:** Demandbase
- **Renewal Date:** January 28, 2026
- **Notice Period:** 90 days
- **Last Day to Cancel:** October 30, 2025

If you don't submit cancellation notice by October 30, 2025, the contract will automatically renew on January 28, 2026.

---

## Current Dataset Analysis

### 🚨 **CRITICAL - Deadline < 30 Days**
Tools requiring immediate action:

**Demandbase**
- Last Day to Cancel: **October 30, 2025 (7 days away)**
- Renewal Date: January 28, 2026
- Annual Cost: **$58,668**
- Auto-Renewal: Yes
- **Action Required:** Decide to renew or cancel by Oct 30

---

### ⚠️ **WARNING - Deadline 30-60 Days**

**Heap** 
- Last Day to Cancel: December 18, 2025 (56 days)
- Annual Cost: $33,240
- **Action:** Schedule review meeting with Web Team

---

### 📋 **UPCOMING - Deadline 60-90 Days**

**Cloudflare Bot Management**
- Last Day to Cancel: January 5, 2026 (74 days)
- Annual Cost: $11,052
- **Action:** Monitor usage trends

---

### ❌ **MISSED DEADLINES**
These tools have already passed their cancellation deadline and will auto-renew:

1. **Algolia** - Missed by 22 days → Renews Nov 30, 2025
2. **Segment** - Missed by 54 days → Renews Oct 29, 2025  
3. **BlueConic** - Missed by 83 days → Renews Oct 30, 2025
4. **Lokalise** - Missed by 149 days → Renews Jul 26, 2025
5. **Datadog** - Missed by 188 days → Renews Jul 17, 2025
6. **Mutiny** - Missed by 201 days → Renews Jul 4, 2025
7. **Intercom** - Missed by 212 days → Renews Apr 24, 2025
8. **OneTrust** - Missed by 254 days → Renews Apr 12, 2025
9. **Optimizely** - Missed by 291 days → Renews Mar 6, 2025
10. **6sense** - Missed by 293 days → Renews Apr 3, 2025
11. **Typeform** - Missed by 341 days → Renews Jan 15, 2025

*This is realistic - in real martech operations, teams often miss cancellation windows for various reasons (forgot, still evaluating, champion left, etc.)*

---

## Dashboard Use Cases

### 1. **Cancellation Alert Widget**
```typescript
// Show tools with deadlines in next 30 days
SELECT tool_name, cost_annual, last_day_to_cancel, owner
FROM martech_stack
WHERE last_day_to_cancel BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
  AND auto_renewal = 'Yes'
ORDER BY last_day_to_cancel ASC
```

**UI:** Red badge with countdown - "7 days to decide on Demandbase ($58K)"

---

### 2. **Timeline View**
Visual timeline showing:
- Today's date (marker)
- Cancellation deadlines (red dots)
- Renewal dates (blue dots)
- Notice period spans (shaded regions)

---

### 3. **Notification System**
Email/Slack alerts at:
- **90 days before deadline:** "FYI - Decision needed soon"
- **30 days before deadline:** "Action required - Schedule review"
- **7 days before deadline:** "URGENT - Deadline approaching"
- **Deadline day:** "FINAL NOTICE - Cancel today or auto-renew"

---

### 4. **Cost Impact Calculator**
Show total cost of tools with approaching deadlines:

```
Deadlines in next 30 days: $58,668 (1 tool)
Deadlines in next 60 days: $91,908 (2 tools)
Deadlines in next 90 days: $102,960 (3 tools)
```

Helps prioritize which tools to review first.

---

### 5. **Missed Deadline Report**
For governance and process improvement:

```sql
SELECT tool_name, cost_annual, last_day_to_cancel, renewal_date,
       CURRENT_DATE - last_day_to_cancel as days_overdue
FROM martech_stack
WHERE last_day_to_cancel < CURRENT_DATE
  AND auto_renewal = 'Yes'
ORDER BY days_overdue DESC
```

**Insight:** "We missed 11 cancellation windows totaling $485K in automatic renewals. Let's improve our tracking process."

---

## Implementation Tips

### In Supabase/Database
```sql
-- Create view for active cancellation alerts
CREATE VIEW active_cancellation_alerts AS
SELECT 
  tool_name,
  cost_annual,
  last_day_to_cancel,
  renewal_date,
  owner,
  CASE 
    WHEN last_day_to_cancel < CURRENT_DATE THEN 'Missed'
    WHEN last_day_to_cancel <= CURRENT_DATE + INTERVAL '7 days' THEN 'Urgent'
    WHEN last_day_to_cancel <= CURRENT_DATE + INTERVAL '30 days' THEN 'Critical'
    WHEN last_day_to_cancel <= CURRENT_DATE + INTERVAL '60 days' THEN 'Warning'
    ELSE 'Upcoming'
  END as priority
FROM martech_stack
WHERE status = 'Active' AND auto_renewal = 'Yes'
ORDER BY last_day_to_cancel ASC;
```

### In React/Next.js Component
```typescript
interface CancellationAlert {
  tool_name: string;
  cost_annual: number;
  last_day_to_cancel: string;
  days_until_deadline: number;
}

function CancellationAlertBadge({ tool }: { tool: CancellationAlert }) {
  const getBadgeColor = (days: number) => {
    if (days < 0) return 'bg-gray-500'; // Missed
    if (days <= 7) return 'bg-red-600'; // Urgent
    if (days <= 30) return 'bg-orange-500'; // Critical
    if (days <= 60) return 'bg-yellow-500'; // Warning
    return 'bg-blue-500'; // Upcoming
  };
  
  const getBadgeText = (days: number) => {
    if (days < 0) return `Missed by ${Math.abs(days)}d`;
    if (days === 0) return 'Today!';
    return `${days}d left`;
  };
  
  return (
    <div className={`${getBadgeColor(tool.days_until_deadline)} text-white px-3 py-1 rounded-full`}>
      {getBadgeText(tool.days_until_deadline)}
    </div>
  );
}
```

---

## Business Value

### Cost Avoidance
By tracking cancellation deadlines, you can:
- **Avoid unwanted renewals** of unused tools
- **Negotiate better rates** by showing willingness to cancel
- **Consolidate tools** before renewal rather than paying for overlap

**Example:** If you catch 3 underutilized tools before their deadlines ($100K combined), you save $100K annually.

### Process Improvement
- **Accountability:** Clear deadlines for owners to review tools
- **Planning:** Schedule QBRs 60 days before cancel deadline
- **Compliance:** Document why tools auto-renewed (decision or oversight?)

### Risk Management
- **Budget Planning:** Know which contracts will definitely renew
- **Dependency Mapping:** Identify critical tools approaching renewal
- **Vendor Leverage:** Use deadline as negotiating tool

---

## FAQs

**Q: What if notice_period_days is N/A?**  
A: Free tools or tools without contracts show "N/A" for both notice period and last day to cancel.

**Q: Should we always cancel by the deadline?**  
A: No! The deadline is just a decision point. Many tools should renew. But you need to *decide* by this date rather than let it auto-renew by default.

**Q: What happens if we miss the deadline?**  
A: The contract auto-renews for another term. You're locked in until the next renewal cycle.

**Q: Can we calculate this in the frontend instead?**  
A: Yes, but storing it in the database allows for:
- SQL queries and filtering
- Database indexes for performance
- Consistency across all applications
- Easy sorting and alerts

---

## Best Practices

1. **Set Calendar Reminders** - Add 90-day, 30-day, and 7-day reminders for each deadline
2. **Assign Owners** - Each tool owner is responsible for their cancellation decisions
3. **Document Decisions** - Note in the tool record why you renewed or canceled
4. **Review Quarterly** - Look at all deadlines in next 90 days every quarter
5. **Learn from Misses** - If you miss deadlines, improve your process

---

## Sample Dashboard Widget

```
┌─────────────────────────────────────────────────────────┐
│ 🚨 CANCELLATION DEADLINES                                │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ ⚠️  Demandbase - 7 days left                             │
│     Annual Cost: $58,668                                 │
│     Owner: Sarah Chen                                    │
│     [Review Tool] [Schedule QBR] [Extend Notice]        │
│                                                           │
│ 📋 Heap - 56 days left                                   │
│     Annual Cost: $33,240                                 │
│     Owner: Marcus Rodriguez                              │
│     [Mark for Review]                                    │
│                                                           │
├─────────────────────────────────────────────────────────┤
│ Next 90 Days: 3 tools requiring decisions ($102,960)    │
│ [View All Deadlines →]                                   │
└─────────────────────────────────────────────────────────┘
```

---

*This calculated field turns your martech tracker from a passive inventory into an active contract management tool.*
