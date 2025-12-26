-- Add status column to leads table
ALTER TABLE leads
ADD COLUMN status VARCHAR(50) DEFAULT 'new';

-- Create sent_emails table for tracking email history
CREATE TABLE sent_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups by lead
CREATE INDEX idx_sent_emails_lead_id ON sent_emails(lead_id);
