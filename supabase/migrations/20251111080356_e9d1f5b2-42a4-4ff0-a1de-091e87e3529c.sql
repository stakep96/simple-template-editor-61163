-- Create site_templates table
CREATE TABLE IF NOT EXISTS public.site_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id TEXT UNIQUE NOT NULL,
  config JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.site_templates ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read templates (for preview pages)
CREATE POLICY "Allow public read access" ON public.site_templates
  FOR SELECT
  USING (true);

-- Allow everyone to insert/update templates (for editor)
CREATE POLICY "Allow public insert/update access" ON public.site_templates
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access" ON public.site_templates
  FOR UPDATE
  USING (true);