import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get all leads
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Calculate stats
    const total = leads?.length || 0;

    // Group by source
    const bySource = (leads || []).reduce((acc, lead) => {
      const source = lead.source || 'direct';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    // Group by campaign
    const byCampaign = (leads || []).reduce((acc, lead) => {
      if (lead.utm_campaign) {
        acc[lead.utm_campaign] = (acc[lead.utm_campaign] || 0) + 1;
      }
      return acc;
    }, {});

    // Group by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const byDate = {};
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      byDate[dateStr] = 0;
    }

    (leads || []).forEach((lead) => {
      const date = new Date(lead.created_at).toISOString().split('T')[0];
      if (byDate.hasOwnProperty(date)) {
        byDate[date]++;
      }
    });

    // Format for charts
    const sourceChartData = Object.entries(bySource).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));

    const dateChartData = Object.entries(byDate).map(([date, leads]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      leads,
    }));

    const campaignChartData = Object.entries(byCampaign).map(([name, value]) => ({
      name,
      value,
    }));

    return NextResponse.json({
      total,
      bySource: sourceChartData,
      byDate: dateChartData,
      byCampaign: campaignChartData,
      recentLeads: (leads || []).slice(0, 10),
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({
      total: 0,
      bySource: [],
      byDate: [],
      byCampaign: [],
      recentLeads: [],
    });
  }
}
