import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const BRAND_CONTEXT = `
Dream Build Luxury Glass LLC is a premium custom glass installation company based in Cumming, Georgia.
We serve the North Atlanta area including Alpharetta, Johns Creek, Milton, Roswell, and Forsyth County.

Our services include:
- Frameless shower enclosures
- Glass railings and handrails
- Glass partition walls
- Architectural glass installations

Brand voice: Professional, luxurious, sophisticated, local, trustworthy.
Tagline: "Elevate Your Lifestyle"
Phone: (404) 707-8819
Website: dbluxuryglass.com
`;

const TONE_INSTRUCTIONS = {
  professional: `Write in a formal, professional business tone. Be polished and respectful.`,
  friendly: `Write in a warm, friendly tone. Be personable and approachable while maintaining professionalism.`,
  follow_up: `Write a gentle follow-up email. Be polite and non-pushy, expressing continued interest in helping.`,
  generate: `Create a fresh email introducing our services and expressing interest in helping with their project.`,
};

export async function POST(request) {
  try {
    const { lead_name, existing_content, tone = 'professional' } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let prompt;

    if (existing_content && tone !== 'generate') {
      // Improve existing content
      prompt = `
${BRAND_CONTEXT}

You are helping write an email to a potential customer${lead_name ? ` named ${lead_name}` : ''}.

${TONE_INSTRUCTIONS[tone]}

Here is the current draft email:
---
${existing_content}
---

Please improve this email while maintaining the intended message. Make it more engaging and professional.
Keep it concise (2-4 paragraphs max).
Do NOT include a subject line in the response - just the email body.
Do NOT include greeting like "Subject:" - start directly with the content.
End with a professional sign-off from "The Dream Build Team".
`;
    } else {
      // Generate new content
      prompt = `
${BRAND_CONTEXT}

You are writing an email to a potential customer${lead_name ? ` named ${lead_name}` : ''} who has expressed interest in our custom glass services.

${TONE_INSTRUCTIONS[tone]}

Write a brief, engaging email that:
1. Thanks them for their interest
2. Briefly mentions our premium services
3. Invites them to schedule a consultation or ask questions
4. Includes a call to action

Keep it concise (2-4 paragraphs max).
Do NOT include a subject line in the response - just the email body.
Start with a greeting to ${lead_name || 'the customer'}.
End with a professional sign-off from "The Dream Build Team".
`;
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional email writer for a luxury glass installation company. Write concise, engaging emails.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const generatedContent = completion.choices[0]?.message?.content || '';

    // Also generate a subject line suggestion
    const subjectCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Generate a short, professional email subject line. Respond with ONLY the subject line, nothing else.',
        },
        {
          role: 'user',
          content: `Generate a subject line for this email:\n\n${generatedContent}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 50,
    });

    const suggestedSubject = subjectCompletion.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({
      content: generatedContent,
      subject: suggestedSubject,
    });
  } catch (error) {
    console.error('Generate email error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate email' },
      { status: 500 }
    );
  }
}
