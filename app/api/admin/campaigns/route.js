import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all campaigns
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Get campaigns error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST new campaign
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, source, medium, placement, location, full_url, short_url } = body;

    if (!name || !source || !medium || !full_url) {
      return NextResponse.json(
        { error: 'Name, source, medium, and full_url are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('campaigns')
      .insert([{
        name,
        source,
        medium,
        placement: placement || null,
        location: location || null,
        full_url,
        short_url: short_url || null,
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}
