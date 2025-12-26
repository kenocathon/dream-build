-- Add campaign_id to social_posts table
ALTER TABLE social_posts
ADD COLUMN campaign_id UUID REFERENCES campaigns(id);

-- Add image_url to campaigns table for campaign media
ALTER TABLE campaigns
ADD COLUMN image_url TEXT;

-- Create index for better query performance
CREATE INDEX idx_social_posts_campaign_id ON social_posts(campaign_id);
