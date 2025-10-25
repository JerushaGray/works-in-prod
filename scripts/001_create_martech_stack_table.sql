-- Create the martech_stack table
CREATE TABLE IF NOT EXISTS public.martech_stack (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_name TEXT NOT NULL,
  category TEXT NOT NULL,
  vendor TEXT NOT NULL,
  cost_per_month DECIMAL(10, 2) NOT NULL,
  renewal_date DATE NOT NULL,
  contract_length INTEGER NOT NULL, -- in months
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'trial', 'pending')),
  health_score INTEGER NOT NULL CHECK (health_score >= 0 AND health_score <= 100),
  utilization_rate DECIMAL(5, 2) NOT NULL CHECK (utilization_rate >= 0 AND utilization_rate <= 100),
  seats_purchased INTEGER NOT NULL,
  seats_used INTEGER NOT NULL,
  primary_contact TEXT,
  department TEXT NOT NULL,
  integration_status TEXT NOT NULL CHECK (integration_status IN ('integrated', 'partial', 'none')),
  last_review_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create an index on renewal_date for faster queries
CREATE INDEX IF NOT EXISTS idx_martech_stack_renewal_date ON public.martech_stack(renewal_date);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_martech_stack_status ON public.martech_stack(status);

-- Create an index on department for filtering
CREATE INDEX IF NOT EXISTS idx_martech_stack_department ON public.martech_stack(department);

-- Enable Row Level Security
ALTER TABLE public.martech_stack ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for authenticated users
CREATE POLICY "Enable all operations for authenticated users" ON public.martech_stack
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create a policy that allows read access for anon users (for public dashboards)
CREATE POLICY "Enable read access for anon users" ON public.martech_stack
  FOR SELECT
  USING (true);
