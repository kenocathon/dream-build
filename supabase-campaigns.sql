-- Run this in Supabase SQL Editor to create the campaigns table

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  source VARCHAR(100) NOT NULL,
  medium VARCHAR(100) NOT NULL,
  placement VARCHAR(100),
  location VARCHAR(255),
  full_url TEXT NOT NULL,
  short_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_campaigns_created_at ON campaigns(created_at DESC);
