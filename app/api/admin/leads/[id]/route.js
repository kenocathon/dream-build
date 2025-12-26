import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET single lead with sent emails
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Get lead details
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (leadError) throw leadError;

    // Get sent emails for this lead
    const { data: emails, error: emailsError } = await supabase
      .from('sent_emails')
      .select('*')
      .eq('lead_id', id)
      .order('sent_at', { ascending: false });

    if (emailsError) {
      console.error('Failed to fetch emails:', emailsError);
    }

    return NextResponse.json({
      ...lead,
      sent_emails: emails || [],
    });
  } catch (error) {
    console.error('Get lead error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}

// PATCH - Update lead (status, etc.)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from('leads')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Update lead error:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE lead
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete lead error:', error);
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
