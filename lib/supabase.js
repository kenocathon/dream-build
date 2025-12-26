import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getJob(id) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createJob({ name, description, image_url }) {
  const { data, error } = await supabase
    .from('jobs')
    .insert([{ name, description, image_url }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateJob(id, updates) {
  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteJob(id) {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Social posts
export async function getPosts() {
  const { data, error } = await supabase
    .from('social_posts')
    .select('*, jobs(name)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createPost({ job_id, platform, content, image_url, status = 'draft', scheduled_for }) {
  const { data, error } = await supabase
    .from('social_posts')
    .insert([{ job_id, platform, content, image_url, status, scheduled_for }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id, updates) {
  const { data, error } = await supabase
    .from('social_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase
    .from('social_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Leads
export async function getLeads(filters = {}) {
  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.source) {
    query = query.eq('source', filters.source);
  }
  if (filters.utm_campaign) {
    query = query.eq('utm_campaign', filters.utm_campaign);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createLead({ name, email, phone, source, utm_source, utm_medium, utm_campaign }) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{ name, email, phone, source, utm_source, utm_medium, utm_campaign }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Analytics helpers
export async function getLeadStats() {
  const { data, error } = await supabase
    .from('leads')
    .select('source, utm_campaign, created_at');

  if (error) throw error;

  // Group by source
  const bySource = data.reduce((acc, lead) => {
    const source = lead.source || 'direct';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  // Group by campaign
  const byCampaign = data.reduce((acc, lead) => {
    if (lead.utm_campaign) {
      acc[lead.utm_campaign] = (acc[lead.utm_campaign] || 0) + 1;
    }
    return acc;
  }, {});

  // Group by date (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const byDate = data
    .filter(lead => new Date(lead.created_at) >= thirtyDaysAgo)
    .reduce((acc, lead) => {
      const date = new Date(lead.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

  return {
    total: data.length,
    bySource,
    byCampaign,
    byDate
  };
}
