import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get job count
    const { count: jobCount } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });

    // Get post count
    const { count: postCount } = await supabase
      .from('social_posts')
      .select('*', { count: 'exact', head: true });

    // Get lead count and recent leads
    const { data: leads, count: leadCount } = await supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);

    // Get campaign count
    const { count: campaignCount } = await supabase
      .from('campaigns')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      jobs: jobCount || 0,
      posts: postCount || 0,
      leads: leadCount || 0,
      campaigns: campaignCount || 0,
      recentLeads: leads || [],
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({
      jobs: 0,
      posts: 0,
      leads: 0,
      campaigns: 0,
      recentLeads: [],
    });
  }
}
