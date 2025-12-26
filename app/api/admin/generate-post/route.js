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

export async function POST(request) {
  try {
    const { jobName, jobDescription, platform } = await request.json();

    if (!jobName) {
      return NextResponse.json(
        { error: 'Job name is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const platformInstructions = platform === 'instagram'
      ? `
        - Use relevant hashtags (8-15 hashtags)
        - Keep caption engaging but concise (under 2200 characters)
        - Include a call to action
        - Use line breaks for readability
        - Include hashtags like #luxuryglass #customshower #glassrailing #atlantahomes #cummingga #alpharetta #interiordesign
      `
      : `
        - Write a more detailed, engaging post
        - Include a call to action
        - Keep it professional but personable
        - Can be slightly longer than Instagram
        - Minimal hashtags (2-3 max)
      `;

    const prompt = `
${BRAND_CONTEXT}

Create a ${platform || 'social media'} post for the following completed project:

Job Name: ${jobName}
Description: ${jobDescription || 'Custom glass installation'}

Requirements:
${platformInstructions}

Generate 2 different variations of the post. Each should highlight the quality and craftsmanship of our work.
Format the response as JSON with this structure:
{
  "variations": [
    { "content": "post content here" },
    { "content": "another variation here" }
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a social media marketing expert specializing in luxury home improvement businesses. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content || '';

    // Parse the JSON response
    let variations = [];
    try {
      const parsed = JSON.parse(responseText);
      variations = parsed.variations || [];
    } catch {
      // If JSON parsing fails, try to extract content
      variations = [{ content: responseText }];
    }

    return NextResponse.json({ variations });
  } catch (error) {
    console.error('Generate post error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate post' },
      { status: 500 }
    );
  }
}
