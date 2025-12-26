import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all jobs
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Get jobs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST new job
export async function POST(request) {
  try {
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
      .insert([{ name, description, image_url }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Create job error:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
