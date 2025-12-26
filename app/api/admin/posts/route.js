import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all posts
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('social_posts')
      .select('*, jobs(name, image_url), campaigns(name, source)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST new post
export async function POST(request) {
  try {
    const body = await request.json();
    const { job_id, campaign_id, platform, content, image_url, status, scheduled_for } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Post content is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('social_posts')
      .insert([{
        job_id: job_id || null,
        campaign_id: campaign_id || null,
        platform: platform || 'both',
        content,
        image_url,
        status: status || 'draft',
        scheduled_for,
      }])
      .select('*, jobs(name, image_url), campaigns(name, source)')
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
