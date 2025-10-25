-- Insert sample data into martech_stack table
INSERT INTO public.martech_stack (
  tool_name, category, vendor, cost_per_month, renewal_date, contract_length,
  status, health_score, utilization_rate, seats_purchased, seats_used,
  primary_contact, department, integration_status, last_review_date, notes
) VALUES
  ('HubSpot', 'CRM', 'HubSpot Inc.', 1200.00, '2025-03-15', 12, 'active', 85, 78.50, 50, 39, 'sarah@company.com', 'Sales', 'integrated', '2025-01-15', 'Primary CRM system'),
  ('Salesforce', 'CRM', 'Salesforce', 2500.00, '2025-06-01', 24, 'active', 92, 88.00, 100, 88, 'john@company.com', 'Sales', 'integrated', '2025-01-10', 'Enterprise CRM'),
  ('Mailchimp', 'Email Marketing', 'Intuit', 299.00, '2025-02-20', 12, 'active', 75, 65.00, 25, 16, 'marketing@company.com', 'Marketing', 'integrated', '2024-12-15', 'Email campaigns'),
  ('Google Analytics', 'Analytics', 'Google', 0.00, '2025-12-31', 12, 'active', 95, 100.00, 1, 1, 'analytics@company.com', 'Marketing', 'integrated', '2025-01-20', 'Free tier'),
  ('Slack', 'Communication', 'Salesforce', 800.00, '2025-04-10', 12, 'active', 90, 95.00, 150, 142, 'it@company.com', 'IT', 'integrated', '2025-01-05', 'Team communication'),
  ('Zoom', 'Video Conferencing', 'Zoom Video', 450.00, '2025-05-15', 12, 'active', 88, 82.00, 75, 61, 'it@company.com', 'IT', 'integrated', '2024-12-20', 'Video meetings'),
  ('Asana', 'Project Management', 'Asana Inc.', 599.00, '2025-07-01', 12, 'active', 80, 70.00, 50, 35, 'pm@company.com', 'Operations', 'partial', '2024-11-30', 'Project tracking'),
  ('Zendesk', 'Customer Support', 'Zendesk Inc.', 890.00, '2025-03-30', 12, 'active', 87, 91.00, 30, 27, 'support@company.com', 'Support', 'integrated', '2025-01-12', 'Support ticketing'),
  ('Tableau', 'Analytics', 'Salesforce', 1500.00, '2025-08-15', 24, 'active', 82, 68.00, 20, 13, 'analytics@company.com', 'Analytics', 'partial', '2024-12-01', 'Data visualization'),
  ('Marketo', 'Marketing Automation', 'Adobe', 3200.00, '2025-09-01', 24, 'trial', 70, 55.00, 40, 22, 'marketing@company.com', 'Marketing', 'partial', '2024-11-15', 'Evaluating for automation'),
  ('Jira', 'Project Management', 'Atlassian', 750.00, '2025-04-20', 12, 'active', 89, 85.00, 60, 51, 'dev@company.com', 'Engineering', 'integrated', '2025-01-08', 'Development tracking'),
  ('Intercom', 'Customer Support', 'Intercom Inc.', 680.00, '2025-02-28', 12, 'active', 84, 79.00, 25, 19, 'support@company.com', 'Support', 'integrated', '2024-12-10', 'Live chat support');
