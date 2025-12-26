import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET single job
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Get job error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

// PUT update job
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, image_url } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Job name is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('jobs')
      .update({ name, description, image_url })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Update job error:', error);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE job
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // First delete related social posts
    await supabase
      .from('social_posts')
      .delete()
      .eq('job_id', id);

    // Then delete the job
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete job error:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
