# Martech Stack Data Dictionary

## Overview
This dataset contains 26 enterprise martech tools with 29 fields covering tool metadata, usage metrics, contract management, and vendor relationships.

---

## Field Definitions

### Core Tool Information

**tool_name** (string)  
The name of the marketing technology tool.

**category** (string)  
The functional category of the tool (e.g., "Analytics", "CRM", "Marketing Automation").

**vendor** (string)  
The company that provides the tool.

**owner** (string)  
The person responsible for managing this tool within the organization.  
*Data Source: Internal (HR/IT system)*

**department** (string)  
The department that owns or primarily uses this tool.

**status** (string)  
Current status of the tool (e.g., "Active", "Inactive", "Under Review").

**integration_status** (string)  
Whether the tool is connected to other systems (e.g., "Connected", "Not Connected").  
*Data Source: Automated via integration monitoring*

---

### Financial & Contract Data

**cost_monthly** (currency)  
Monthly cost of the tool. $0.00 indicates free tier or usage-based pricing.

**cost_annual** (currency)  
Annual cost of the tool.  
*Data Source: Finance system API (NetSuite, Coupa)*

**renewal_date** (date)  
Date when the contract comes up for renewal.  
*Data Source: Manual entry during procurement*

**contract_start_date** (date | N/A)  
When the current contract period began. "N/A" for free tools.  
*Data Source: Manual entry during procurement*

**contract_length_months** (integer | N/A)  
Length of the contract in months (12, 24, or 36 typically).  
*Data Source: Manual entry during procurement*

**auto_renewal** (Yes | No | N/A)  
Whether the contract automatically renews.  
*Data Source: Manual entry during procurement*

**notice_period_days** (integer | N/A)  
Number of days notice required to cancel before renewal (typically 30, 60, or 90).  
*Data Source: Manual entry during procurement*

**last_day_to_cancel** (date | N/A)  
Calculated deadline to provide cancellation notice (renewal_date - notice_period_days). Missing this date means the contract will auto-renew.  
*Calculation: renewal_date - notice_period_days*

---

### Usage & Performance Metrics

**licensed_seats** (integer)  
Number of user licenses purchased. 0 indicates unlimited or not applicable (free tools).  
*Data Source: Vendor API*

**active_users_30d** (integer)  
Number of unique users who accessed the tool in the last 30 days.  
*Data Source: Vendor API or SSO provider*

**last_active_date** (date)  
Most recent date any user accessed the tool.  
*Data Source: SSO provider logs*

**plan_tier** (string)  
The subscription plan level (e.g., "Enterprise", "Professional", "Free").  
*Data Source: Vendor API*

**integration_count** (integer)  
Number of integrations/connections this tool has with other systems.  
*Data Source: Internal tracking system*

**health_score** (1-10)  
Overall health rating of the tool based on utilization, issues, and value.  
*Calculation: (active_users / licensed_seats) × other factors*

---

### Vendor Relationship Management

**csm_name** (string | N/A)  
Name of the Customer Success Manager assigned to your account.  
*Data Source: Manual entry during procurement*

**csm_email** (email | N/A)  
Email address of the CSM.  
*Data Source: Manual entry during procurement*

**account_manager_name** (string | N/A)  
Name of the sales/account representative.  
*Data Source: Manual entry during procurement*

**last_business_review** (date | N/A)  
Date of the most recent Quarterly Business Review (QBR) with the vendor.  
*Data Source: Manual entry after QBRs*

**next_business_review** (date | N/A)  
Scheduled date for the next QBR.  
*Data Source: Calendar sync or manual entry*

---

### Security & Compliance

**data_sensitivity_level** (string)  
Classification of data handled by the tool (e.g., "PII", "Internal", "Anonymized").

**auth_method** (string)  
Authentication method used (e.g., "SSO", "OAuth").  
*Data Source: SSO provider configuration*

---

### Communication & Notes

**slack_channel** (string)  
Slack channel for discussions about this tool.

**notes** (text)  
Free-form notes about the tool.  
*Data Source: Manual entry*

---

## Data Relationships & Logic

### Calculated Fields
- **health_score**: Higher utilization (active_users/licensed_seats) correlates with higher scores
- **Utilization rate**: active_users_30d / licensed_seats (when licensed_seats > 0)

### Business Rules
- Free tools (cost_annual = $0.00) show "N/A" for contract and vendor relationship fields
- Enterprise tier tools ($30K+ annually) typically have:
  - Longer contracts (24-36 months)
  - Longer notice periods (60-90 days)
  - Dedicated CSMs
  - Quarterly business reviews

### Data Integrity
- contract_start_date always precedes renewal_date
- CSM assignments are consistent per vendor (same vendor = same CSM)
- Integration counts are higher for central platforms (CRM, CDP, data warehouses)

---

## Dashboard Use Cases

### Key Visualizations You Can Build

**💰 Cost Management**
- Total stack cost by department
- Cost per active user
- Upcoming renewals (next 90 days)
- Contract expiration timeline

**📊 Utilization Analysis**
- Licensed vs active users by tool
- Utilization rate heatmap
- Underutilized tools (candidates for downsizing)
- Over-capacity tools (need more licenses)

**🏥 Health Monitoring**
- Health score distribution
- Tools needing attention (score < 6)
- Health trends by department
- Integration complexity vs health

**📅 Contract Management**
- Auto-renewal calendar
- Notice period alerts
- Contract length distribution
- QBR schedule

**🔗 Integration Insights**
- Most connected tools
- Integration dependency map
- Tools with few integrations (potential issues)

**👥 Ownership Dashboard**
- Tools by owner
- Department distribution
- CSM contact list
- Vendor relationship overview

---

## Data Freshness & Sources

| Field Type | Update Frequency | Data Source |
|------------|-----------------|-------------|
| Usage Metrics | Daily | Vendor APIs / SSO |
| Costs | Monthly | Finance System |
| Contract Info | As Updated | Manual Entry |
| Health Scores | Daily | Calculated |
| Integration Status | Real-time | Monitoring System |
| Vendor Contacts | As Updated | Manual Entry |

---

## Sample Queries

### Find tools up for renewal in next 90 days
```sql
SELECT tool_name, owner, renewal_date, cost_annual, notice_period_days
FROM martech_stack
WHERE renewal_date <= CURRENT_DATE + INTERVAL '90 days'
  AND auto_renewal = 'No'
ORDER BY renewal_date ASC
```

### Tools with low utilization (< 70%)
```sql
SELECT tool_name, licensed_seats, active_users_30d,
       ROUND((active_users_30d::numeric / licensed_seats * 100), 1) as utilization_pct
FROM martech_stack
WHERE licensed_seats > 0
  AND (active_users_30d::numeric / licensed_seats) < 0.70
ORDER BY utilization_pct ASC
```

### Total cost by department
```sql
SELECT department, COUNT(*) as tool_count,
       SUM(CAST(REPLACE(REPLACE(cost_annual, '$', ''), ',', '') AS DECIMAL)) as total_annual_cost
FROM martech_stack
GROUP BY department
ORDER BY total_annual_cost DESC
```

---

*Dataset Version: 1.0*  
*Last Updated: October 2025*  
*Total Records: 26 tools*
