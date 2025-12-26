import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { createEmail } from '@/lib/emailTemplate';

export async function POST(request) {
  try {
    const { lead_id, to_email, subject, content } = await request.json();

    if (!to_email || !subject || !content) {
      return NextResponse.json(
        { error: 'Email, subject, and content are required' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create branded HTML email
    const htmlContent = createEmail(content);

    // Send via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error: sendError } = await resend.emails.send({
      from: 'Dream Build Luxury Glass <support@dbluxuryglass.com>',
      to: [to_email],
      replyTo: 'support@dbluxuryglass.com',
      subject,
      html: htmlContent,
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Save to sent_emails table
    const { error: dbError } = await supabase
      .from('sent_emails')
      .insert([{
        lead_id: lead_id || null,
        to_email,
        subject,
        content, // Store plain text version for display
      }]);

    if (dbError) {
      console.error('Database error:', dbError);
      // Email was sent, so don't fail the request
    }

    // Update lead status to contacted if it was 'new'
    if (lead_id) {
      const { data: lead } = await supabase
        .from('leads')
        .select('status')
        .eq('id', lead_id)
        .single();

      if (lead?.status === 'new' || !lead?.status) {
        await supabase
          .from('leads')
          .update({ status: 'contacted' })
          .eq('id', lead_id);
      }
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
